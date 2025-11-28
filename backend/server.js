// Archivo: server.js
// Backend para E-commerce con Node.js y Express.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// ✅ IMPORTAR LAS RUTAS PRIMERO
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();
const PORT = 3000;

// Configuración de Middlewares
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// ✅ USAR LAS RUTAS DESPUÉS DE IMPORTARLAS
app.use('/api/productos', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/estadisticas', statsRoutes);

// --- SIMULACIÓN DE BASE DE DATOS EN MEMORIA ---
const db = {
    usuarios: [
        { id: 'user-admin', email: 'admin@ecommerce.com', password: 'password123', rol: 'admin' },
        { id: 'user-normal', email: 'staff@ecommerce.com', password: 'password456', rol: 'usuario' }
    ],
    productos: [
        { id: 'P001', nombre: 'Laptop Gamer', precio: 1299.99, stock: 15, barcode: '978-0134448554', id_numerico: '1234567890' },
        { id: 'P002', nombre: 'Monitor Curvo 4K', precio: 499.99, stock: 30, barcode: '978-0130001111', id_numerico: '0987654321' },
    ], 
    ventas: [
        { producto_id: 'P001', nombre: 'Laptop Gamer', cantidad: 17, mes: 'Nov' },
        { producto_id: 'P002', nombre: 'Monitor 4K', cantidad: 10, mes: 'Nov' },
    ]
};

// --- FUNCIÓN DE AUTENTICACIÓN SIMULADA ---
function validateToken(token) {
    return db.usuarios.find(u => u.id === token) || null;
}

// --- MIDDLEWARE DE AUTORIZACIÓN PARA ADMINISTRADORES ---
function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization']; 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. Se requiere token de autenticación.' });
    }

    const token = authHeader.split(' ')[1];
    const user = validateToken(token); 

    if (!user) {
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }

    if (user.rol !== 'admin') {
        return res.status(403).json({ message: 'Acceso prohibido. Requiere rol de Administrador.' });
    }
    
    req.user = user; 
    next();
}

// =======================================================
// ==================== RUTAS PÚBLICAS =====================
// =======================================================

// Ruta: POST /api/login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    const user = db.usuarios.find(u => u.email === email && u.password === password);

    if (user) {
        return res.status(200).json({ 
            token: user.id,
            rol: user.rol,
            message: 'Inicio de sesión exitoso.'
        });
    } else {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
    }
});

// Ruta: GET /api/productos
app.get('/api/productos', (req, res) => {
    res.status(200).json({ 
        message: 'Lista de productos recuperada.',
        data: db.productos
    });
});

// =======================================================
// ==================== RUTAS DE ADMIN =====================
// =======================================================

// Ruta: POST /api/productos/registrar
app.post('/api/productos/registrar', authenticateAdmin, (req, res) => {
    const { barcode, id_numerico, nombre, precio, stock } = req.body;

    if (!barcode || !id_numerico || !nombre || !precio || !stock) {
        return res.status(400).json({ message: 'Faltan campos obligatorios del producto.' });
    }
    
    if (db.productos.some(p => p.barcode === barcode)) {
        return res.status(409).json({ message: 'El producto con este código de barras ya existe.' });
    }

    const newId = 'P' + (db.productos.length + 1).toString().padStart(3, '0');
    const newProduct = {
        id: newId,
        barcode,
        id_numerico,
        nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock, 10),
        fecha_registro: new Date().toISOString()
    };

    db.productos.push(newProduct);
    
    console.log(`[DB] Nuevo producto registrado: ${nombre} por el Admin: ${req.user.email}`);
    res.status(201).json({ 
        message: 'Producto registrado con éxito en el servidor y web.',
        producto: newProduct
    });
});

// Ruta: GET /api/estadisticas/top-productos
app.get('/api/estadisticas/top-productos', authenticateAdmin, (req, res) => {
    const topProductsData = db.ventas.map(sale => ({
        product: sale.nombre, 
        sales: sale.cantidad, 
        month: sale.mes
    })).sort((a, b) => b.sales - a.sales);

    res.status(200).json({ 
        message: 'Datos de estadísticas recuperados.',
        data: topProductsData
    });
});

// =======================================================
// ======================= INICIO ==========================
// =======================================================
app.listen(PORT, () => {
    console.log(`Servidor Express ejecutándose en http://localhost:${PORT}`);
    console.log('Endpoints disponibles:');
    console.log(`  POST /api/login`);
    console.log(`  GET /api/productos`);
    console.log(`  POST /api/productos/registrar (Requiere Admin)`);
    console.log(`  GET /api/estadisticas/top-productos (Requiere Admin)`);
});