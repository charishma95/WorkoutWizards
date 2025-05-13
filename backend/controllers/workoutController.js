const WorkoutLog = require('../models/WorkoutLog'); // Import the WorkoutLog model
const jwt = require('jsonwebtoken');

// Middleware to verify the JWT and extract userId
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(403).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// POST route to log a workout
const logWorkout = async (req, res) => {
  const {
    workoutType,
    duration,
    caloriesBurned,
    date,
    location,
    category,
    sets,
    reps,
    notes
  } = req.body;

  const userId = req.user.id; // Extract userId from the decoded token

  if (!workoutType || !duration || !caloriesBurned || !date) {
    return res.status(400).json({ message: 'Please provide all required workout details.' });
  }

  try {
    const newWorkout = new WorkoutLog({
      workoutType,
      duration,
      caloriesBurned,
      date,
      location,
      category,
      sets,
      reps,
      notes,
      userId, // Attach the userId
    });

    await newWorkout.save(); // Save the workout to MongoDB
    res.status(201).json(newWorkout); // Respond with the created workout log
  } catch (err) {
    res.status(500).json({ message: 'Failed to save workout log', error: err.message });
  }
};

const getWorkoutHistory = async (req, res) => {
  const userId = req.user.id; // Extract userId from the decoded token

  console.log('User ID from token:', userId); // ✅ Debug: Log userId

  try {
    const workouts = await WorkoutLog.find({ userId });
    res.status(200).json(workouts); // Respond with the workout logs
  } catch (err) {
    console.error('Error fetching workouts:', err.message);
    res.status(500).json({ message: 'Failed to fetch workout logs', error: err.message });
  }
};

module.exports = { verifyToken, logWorkout, getWorkoutHistory };
