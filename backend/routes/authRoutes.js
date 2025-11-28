const express = require('express');
const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
    // Tu lógica de login aquí
    res.json({ message: 'Login endpoint' });
});

module.exports = router;