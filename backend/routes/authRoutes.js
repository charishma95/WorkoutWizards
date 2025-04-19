// /routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Register user route
router.post('/signup', registerUser);

// Login user route
router.post('/login', loginUser);

module.exports = router;
