// Archivo: server.js - Versión Final con PostgreSQL y Roles
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg'); // Cliente de PostgreSQL
require('dotenv').config(); // Para cargar variables de entorno (DB_USER, DB_PASSWORD, etc.)

const app = express();
const PORT = 3000;

// Configuración de Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// =======================================================
// ==================== CONEXIÓN A POSTGRESQL ============
// =======================================================

// Configuración de la conexión usando variables de entorno
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect((err) => {
    if (err) {
        console.error('❌ Error de conexión a PostgreSQL:', err.stack);
        return;
    }
    console.log('✅ Conexión a PostgreSQL exitosa');
});

// =======================================================
// ==================== MIDDLEWARES DE AUTENTICACIÓN ======
// =======================================================

/**
 * Función que busca el usuario por token (su ID) en la base de datos.
 * @param {string} token - user-admin o user-normal
 * @returns {object|null} Objeto de usuario o null
 */
async function findUserByToken(token) {
    try {
        // Busca en la tabla 'usuarios'
        const result = await pool.query('SELECT id, email, rol FROM usuarios WHERE id = $1', [token]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error al buscar usuario por token:', error);
        return null;
    }
}

/**
 * Middleware para autenticar CUALQUIER usuario (Admin o Staff).
 * Permite acceder a rutas comunes (como la búsqueda de productos para la venta).
 */
async function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. Se requiere token de autenticación.'
        });
    }

    const token = authHeader.split(' ')[1];
    const user = await findUserByToken(token); // Busca en PostgreSQL

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado.'
        });
    }

    req.user = user; // Guarda los datos del usuario en la solicitud
    next();
}

/**
 * Middleware para autenticar SOLO al Administrador.
 * Permite acceder a rutas críticas (como el registro de productos).
 */
async function authenticateAdmin(req, res, next) {
    // Primero autenticamos a cualquier usuario
    await authenticateUser(req, res, async () => {
        // Luego verificamos el rol
        if (req.user && req.user.rol === 'admin') {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: 'Acceso prohibido. Requiere rol de Administrador.'
            });
        }
    });
}

// --- FUNCIÓN PARA VALIDAR CÓDIGOS EAN-13 ---
function validarEAN13(barcode) {
    // Verifica que sea string, tenga 13 dígitos y todos sean números
    if (typeof barcode !== 'string' || barcode.length !== 13 || !/^\d+$/.test(barcode)) {
        return false;
    }
    return true;
}

// =======================================================
// ==================== RUTAS PÚBLICAS =====================
// =======================================================

// Ruta: POST /api/login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca usuario por email y password en PostgreSQL
        const result = await pool.query(
            'SELECT id, rol FROM usuarios WHERE email = $1 AND password = $2',
            [email, password]
        );
        const user = result.rows[0];

        if (user) {
            return res.status(200).json({
                success: true,
                token: user.id, // El ID de usuario actúa como token
                rol: user.rol,
                message: 'Inicio de sesión exitoso.'
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas.'
            });
        }
    } catch (error) {
        console.error('Error en la ruta /api/login:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
});

// =======================================================
// ============ RUTAS PARA ESCÁNER FLUTTER ================
// =======================================================

// Ruta: GET /api/productos/buscar/:barcode
// Acceso permitido para Staff (usuario) y Admin (Usa authenticateUser)
app.get('/api/productos/buscar/:barcode', authenticateUser, async (req, res) => {
    const { barcode } = req.params;

    try {
        const result = await pool.query(
            'SELECT barcode, nombre, precio, stock FROM productos WHERE barcode = $1',
            [barcode]
        );
        
        // --- LOG DE DIAGNÓSTICO ---
        if (result.rows.length === 0) {
            console.log(`[DB Búsqueda] Código ${barcode} NO encontrado.`);
        } else {
            console.log(`[DB Búsqueda] Código ${barcode} ENCONTRADO:`, result.rows[0]);
        }
        // --- FIN LOG ---

        const producto = result.rows[0];

        if (producto) {
            return res.status(200).json({
                success: true,
                message: 'Producto encontrado',
                data: producto
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado en la base de datos'
            });
        }
    } catch (error) {
        console.error('Error en la ruta /api/productos/buscar:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
});

// =======================================================
// ==================== RUTAS DE ADMIN =====================
// =======================================================

// Ruta: POST /api/productos/registrar
// Acceso permitido SOLAMENTE para Admin (Usa authenticateAdmin)
app.post('/api/productos/registrar', authenticateAdmin, async (req, res) => {
    // Flutter envía: barcode, id_numerico, nombre, precio, stock
    const { barcode, id_numerico, nombre, precio, stock } = req.body;

    if (!barcode || !id_numerico || !nombre || !precio || !stock) {
        return res.status(400).json({
            success: false,
            message: 'Faltan campos obligatorios del producto.'
        });
    }

    if (!validarEAN13(barcode)) {
        return res.status(400).json({
            success: false,
            message: 'El código de barras debe tener exactamente 13 dígitos numéricos (formato EAN-13).'
        });
    }

    try {
        // 1. Verificar si ya existe
        const existing = await pool.query('SELECT barcode FROM productos WHERE barcode = $1', [barcode]);
        if (existing.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'El producto con este código de barras ya existe.'
            });
        }

        // 2. Registrar nuevo producto en PostgreSQL
        const insertQuery = `
            INSERT INTO productos (barcode, id_numerico, nombre, precio, stock)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING barcode, nombre, precio, stock, fecha_registro;
        `;
        const result = await pool.query(insertQuery, [
            barcode,
            id_numerico,
            nombre,
            parseFloat(precio),
            parseInt(stock, 10)
        ]);

        const newProduct = result.rows[0];

        console.log(`[DB] Nuevo producto registrado: ${newProduct.nombre} - Código: ${newProduct.barcode}`);

        res.status(201).json({
            success: true,
            message: 'Producto registrado con éxito.',
            producto: newProduct
        });

    } catch (error) {
        console.error('Error al registrar producto en DB:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor al registrar.' });
    }
});

// =======================================================
// ==================== RUTAS DE PRUEBA ====================
// =======================================================

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Endpoint no encontrado: ${req.method} ${req.originalUrl}`
    });
});

// =======================================================
// ======================= INICIO ==========================
// =======================================================
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express ejecutándose en http://localhost:${PORT}`);
    console.log('\n🔑 Credenciales de prueba (PostgreSQL):');
    console.log(`  Admin: admin@ecommerce.com / password123`);
    console.log(`  Staff: staff@ecommerce.com / password456`);
});