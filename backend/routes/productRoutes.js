const express = require('express');
const router = express.Router();

// Datos de ejemplo
const productos = [
    { id: 1, nombre: 'Laptop Gamer', precio: 1299.99, barcode: '978-0134448554' },
    { id: 2, nombre: 'Monitor Curvo 4K', precio: 499.99, barcode: '978-0130001111' },
];

// GET /api/productos
router.get('/', (req, res) => {
    res.json({
        success: true,
        data: productos,
        total: productos.length
    });
});

module.exports = router;