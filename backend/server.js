// Archivo: server.js - Versión Final con PostgreSQL y Roles
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg'); // Cliente de PostgreSQL
const fs = require('fs').promises; // Para leer el archivo SQL
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

// Script SQL para inicializar la base de datos
const initSQL = `
-- ----------------------------------------------------
-- 1. CREAR LA TABLA DE PRODUCTOS
-- ----------------------------------------------------
DROP TABLE IF EXISTS productos CASCADE;
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    barcode VARCHAR(13) UNIQUE NOT NULL,
    id_numerico VARCHAR(20),
    nombre VARCHAR(255) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL CHECK (precio >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------
-- 2. CREAR LA TABLA DE USUARIOS
-- ----------------------------------------------------
DROP TABLE IF EXISTS usuarios CASCADE;
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL, 
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('admin', 'staff', 'user')),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------
-- 3. INSERTAR LOS USUARIOS DE PRUEBA
-- ----------------------------------------------------
INSERT INTO usuarios (email, password, rol) VALUES
('admin@ecommerce.com', 'password123', 'admin'),
('staff@ecommerce.com', 'password456', 'staff')
ON CONFLICT (email) DO NOTHING;

-- ----------------------------------------------------
-- 4. INSERTAR PRODUCTOS INICIALES
-- ----------------------------------------------------
INSERT INTO productos (barcode, id_numerico, nombre, precio, stock) VALUES
('7750241000587', '5555555555', 'Inca Kola 500ml', 3.50, 100),
('7750241000594', '6666666666', 'Gaseosa Coca-Cola 500ml', 3.20, 80)
ON CONFLICT (barcode) DO NOTHING;
`;

// Función para inicializar la base de datos
async function initializeDatabase() {
    let client;
    try {
        client = await pool.connect();
        console.log('✅ Conexión a PostgreSQL exitosa');

        // Verificar si las tablas ya existen
        const tableCheck = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('usuarios', 'productos')
        `);

        // Si no existen ambas tablas, ejecutar el script de inicialización
        if (tableCheck.rows.length < 2) {
            console.log('🔄 Inicializando base de datos...');
            await client.query(initSQL);
            console.log('✅ Base de datos inicializada correctamente');
            
            // Verificar los datos insertados
            const usersCount = await client.query('SELECT COUNT(*) FROM usuarios');
            const productsCount = await client.query('SELECT COUNT(*) FROM productos');
            
            console.log(`📊 Usuarios creados: ${usersCount.rows[0].count}`);
            console.log(`📊 Productos creados: ${productsCount.rows[0].count}`);
        } else {
            console.log('✅ Las tablas ya existen, omitiendo inicialización');
        }

    } catch (err) {
        console.error('❌ Error de conexión a PostgreSQL:', err.message);
        
        // Error específico para tabla no existe
        if (err.code === '42P01') {
            console.log('💡 Ejecutando script de creación de tablas...');
            try {
                await client.query(initSQL);
                console.log('✅ Tablas creadas exitosamente');
            } catch (initError) {
                console.error('❌ Error al crear tablas:', initError.message);
            }
        }
    } finally {
        if (client) client.release();
    }
}

// =======================================================
// ==================== MIDDLEWARES DE AUTENTICACIÓN ======
// =======================================================

/**
 * Función que busca el usuario por token (su ID) en la base de datos.
 * @param {number} token - ID del usuario, usado como token simple.
 * @returns {object|null} Objeto de usuario o null
 */
async function findUserByToken(token) {
    try {
        const result = await pool.query('SELECT id, email, rol FROM usuarios WHERE id = $1', [token]);
        return result.rows[0] || null;
    } catch (error) {
        console.error("Error en findUserByToken:", error.message);
        return null;
    }
}

/**
 * Middleware para autenticar CUALQUIER usuario (Admin o Staff).
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
    
    const userId = parseInt(token, 10);
    if (isNaN(userId) || userId <= 0) {
        return res.status(401).json({ success: false, message: 'Token de usuario inválido.' });
    }

    const user = await findUserByToken(userId);

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado.'
        });
    }

    req.user = user;
    next();
}

/**
 * Middleware para autenticar SOLO al Administrador.
 */
function authenticateAdmin(req, res, next) {
    authenticateUser(req, res, () => {
        if (req.user && req.user.rol === 'admin') {
            next();
        } else {
            if (!res.headersSent) {
                return res.status(403).json({
                    success: false,
                    message: 'Acceso prohibido. Requiere rol de Administrador.'
                });
            }
        }
    });
}

// --- FUNCIÓN PARA VALIDAR CÓDIGOS EAN-13 ---
function validarEAN13(barcode) {
    if (typeof barcode !== 'string' || barcode.length !== 13 || !/^\d+$/.test(barcode)) {
        return false;
    }
    return true;
}

// =======================================================
// ==================== RUTAS PÚBLICAS =====================
// =======================================================

// Ruta: GET /api/productos - Catálogo público
app.get('/api/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT barcode, nombre, precio FROM productos ORDER BY nombre ASC');
        
        // CORRECCIÓN: Convertir precios a números
        const productosConPreciosNumericos = result.rows.map(producto => ({
            ...producto,
            precio: Number(producto.precio)
        }));

        return res.status(200).json({
            success: true,
            message: 'Catálogo de productos cargado con éxito.',
            data: productosConPreciosNumericos
        });
    } catch (error) {
        console.error('❌ ERROR 500 en /api/productos:', error.code || 'Desconocido', error.message);
        
        // Si es error de tabla no existe, intentar inicializar
        if (error.code === '42P01') {
            console.log('🔄 Intentando inicializar tablas automáticamente...');
            try {
                await initializeDatabase();
                // Reintentar la consulta
                const retryResult = await pool.query('SELECT barcode, nombre, precio FROM productos ORDER BY nombre ASC');
                
                // CORRECCIÓN: También convertir en el reintento
                const productosRetry = retryResult.rows.map(producto => ({
                    ...producto,
                    precio: Number(producto.precio)
                }));

                return res.status(200).json({
                    success: true,
                    message: 'Catálogo de productos cargado con éxito.',
                    data: productosRetry
                });
            } catch (retryError) {
                console.error('❌ Error al reintentar:', retryError.message);
            }
        }
        
        return res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor al obtener el catálogo.',
            errorCode: error.code || '500_DB_FAIL'
        });
    }
});

// Ruta: POST /api/login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT id, rol FROM usuarios WHERE email = $1 AND password = $2',
            [email, password]
        );
        const user = result.rows[0];

        if (user) {
            return res.status(200).json({
                success: true,
                token: user.id.toString(), 
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
app.get('/api/productos/buscar/:barcode', authenticateUser, async (req, res) => {
    const { barcode } = req.params;

    try {
        const result = await pool.query(
            'SELECT barcode, nombre, precio, stock FROM productos WHERE barcode = $1',
            [barcode]
        );
        
        const producto = result.rows[0];

        if (producto) {
            // CORRECCIÓN CLAVE: Convertir precio y stock a números
            const productoFormateado = {
                barcode: producto.barcode,
                nombre: producto.nombre,
                precio: Number(producto.precio),  // ← Convertir a número
                stock: Number(producto.stock)     // ← Convertir a número
            };

            console.log(`[DB Búsqueda] Código ${barcode} ENCONTRADO:`, productoFormateado);
            
            return res.status(200).json({
                success: true,
                message: 'Producto encontrado',
                data: productoFormateado  // ← Enviar el objeto formateado
            });
        } else {
            console.log(`[DB Búsqueda] Código ${barcode} NO encontrado.`);
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
app.post('/api/productos/registrar', authenticateAdmin, async (req, res) => {
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
        const existing = await pool.query('SELECT barcode FROM productos WHERE barcode = $1', [barcode]);
        if (existing.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'El producto con este código de barras ya existe.'
            });
        }

        // CORRECCIÓN: Asegurar conversión a números
        const precioNumerico = parseFloat(precio);
        const stockNumerico = parseInt(stock, 10);

        const insertQuery = `
            INSERT INTO productos (barcode, id_numerico, nombre, precio, stock)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING barcode, nombre, precio, stock, fecha_registro;
        `;
        const result = await pool.query(insertQuery, [
            barcode,
            id_numerico,
            nombre,
            precioNumerico, // ← Ya convertido a número
            stockNumerico   // ← Ya convertido a número
        ]);

        const newProduct = result.rows[0];

        console.log(`[DB] Nuevo producto registrado: ${newProduct.nombre} - Código: ${newProduct.barcode}`);
        console.log(`[DB] Tipo de precio insertado:`, typeof newProduct.precio);

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
async function startServer() {
    await initializeDatabase();
    
    app.listen(PORT, () => {
        console.log(`🚀 Servidor Express ejecutándose en http://localhost:${PORT}`);
        console.log('\n🔑 Credenciales de prueba (PostgreSQL):');
        console.log(`  Admin: admin@ecommerce.com / password123`);
        console.log(`  Staff: staff@ecommerce.com / password456`);
        console.log('\n📊 Endpoints disponibles:');
        console.log(`  GET  /api/productos - Catálogo público`);
        console.log(`  POST /api/login - Iniciar sesión`);
        console.log(`  GET  /api/productos/buscar/:barcode - Buscar producto (requiere auth)`);
        console.log(`  POST /api/productos/registrar - Registrar producto (solo admin)`);
    });
}

startServer();