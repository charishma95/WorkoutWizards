const express = require('express');
const router = express.Router();

const {
  verifyToken,
  logWorkout,
  getWorkoutHistory
} = require('../controllers/workoutController');

// Route to add a new workout log
router.post('/add', verifyToken, logWorkout);

// Route to get workout history
router.get('/history', verifyToken, getWorkoutHistory);

module.exports = router;
