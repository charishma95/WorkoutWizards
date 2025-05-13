const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const WorkoutLog = require('../models/WorkoutLog');
const router = express.Router();

// ✅ POST - Add a new workout log
router.post('/add', verifyToken, async (req, res) => {
  const { workoutType, duration, caloriesBurned, date } = req.body;
  const userId = req.user.id;

  if (!workoutType || !duration || !caloriesBurned || !date) {
    return res.status(400).json({ message: 'Please provide all required workout details.' });
  }

  try {
    const newWorkout = new WorkoutLog({ workoutType, duration, caloriesBurned, date, userId });
    await newWorkout.save();
    res.status(201).json({ message: 'Workout log added successfully!', newWorkout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
