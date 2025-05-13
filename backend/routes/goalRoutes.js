const express = require('express');
const router = express.Router();
const { createGoal, getUserGoals } = require('../controllers/goalController');
const verifyToken = require('../middleware/verifyToken');

router.post('/goal', verifyToken, createGoal);
router.get('/goal', verifyToken, getUserGoals);

module.exports = router;

