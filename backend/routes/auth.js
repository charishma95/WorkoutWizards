const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User model
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

// User registration (Sign Up)
router.post('/signup', async (req, res) => {
  console.log("Received signup request");

  const { fullName, email, password } = req.body;

  try {
    // Check if user already exists
    console.log(`Checking if user exists: ${email}`);
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ fullName, email, password });
    await user.save();

    console.log('User successfully registered:', user);  // Log new user data
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Error saving user:', error);  // Log any error
    res.status(500).json({ message: 'Server error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and return JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token and username
    res.json({
      token,
      username: user.fullName,  // Send the username (full name) along with the token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
