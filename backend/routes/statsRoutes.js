const express = require('express');
const router = express.Router();

// GET /api/stats/top-productos
router.get('/top-productos', (req, res) => {
    // Tu lógica de estadísticas aquí
    res.json({ message: 'Stats endpoint' });
});

module.exports = router;