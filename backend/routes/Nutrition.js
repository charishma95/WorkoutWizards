const express = require('express');
const router = express.Router();
const { addMeal, getMeals } = require('../controllers/nutritionController');
const verifyToken = require('../middleware/verifyToken');

// POST /api/nutrition-log/add
router.post('/add', verifyToken, addMeal);

// GET /api/nutrition-log
router.get('/', verifyToken, getMeals);

module.exports = router;
