const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import the database connection and routes
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');  // Authentication routes
const workoutRoutes = require('./routes/workoutRoutes');  // ✅ Correct file name
const goalRoutes = require('./routes/goalRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON bodies

// Connect to MongoDB
connectDB();  // Call the database connection function

// Routes
app.use('/api/auth', authRoutes);           // Authentication routes
app.use('/api/workout', workoutRoutes);     // ✅ Workout log and history routes
app.use('/api/goals', goalRoutes);
app.use('/api/nutrition-log', nutritionRoutes);


// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack trace
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
