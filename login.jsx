const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password, phone, address, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const newUser = await User.create({ name, email, password: hashedPassword, phone, address, role });
        res.json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;