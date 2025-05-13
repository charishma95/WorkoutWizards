const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Goal = require('../models/Goal');

// POST /api/goals/goal - Add a new goal
router.post('/goal', verifyToken, async (req, res) => {
  try {
    const { goalType, target, deadline, motivation, priority, category, reminder } = req.body;
    const goal = new Goal({
      user: req.userId,
      goalType,
      target,
      deadline,
      motivation,
      priority,
      category,
      reminder,
    });

    await goal.save();
    res.status(201).json({ message: 'Goal set successfully', goal });
  } catch (err) {
    res.status(500).json({ message: 'Failed to set goal', error: err.message });
  }
});

// GET /api/goals/goal - Get goals for the logged-in user
router.get('/goal', verifyToken, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.userId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch goals', error: err.message });
  }
});

module.exports = router;
