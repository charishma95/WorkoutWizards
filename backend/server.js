const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import the database connection and authentication routes
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');  // Import authentication routes

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON bodies

// Connect to MongoDB
connectDB();  // Call the database connection function

// Routes
app.use('/api/auth', authRoutes);  // Use auth routes for authentication API

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
