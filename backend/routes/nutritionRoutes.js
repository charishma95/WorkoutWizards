const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { addNutritionLog, getNutritionLogs } = require('../controllers/nutritionController');

router.post('/add', verifyToken, addNutritionLog);
router.get('/all', verifyToken, getNutritionLogs);

module.exports = router;
