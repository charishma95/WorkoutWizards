const Goal = require('../models/Goal');

// @desc    Create a new goal
// @route   POST /api/goals/goal
// @access  Private
exports.createGoal = async (req, res) => {
  try {
    const { goalType, target, deadline, motivation, priority, category, reminder } = req.body;

    const newGoal = new Goal({
      user: req.user.id,  // ✅ Fix here
      goalType,
      target,
      deadline,
      motivation,
      priority,
      category,
      reminder
    });

    await newGoal.save();
    res.status(201).json({ message: 'Goal set successfully', goal: newGoal });
  } catch (err) {
    console.error('Error creating goal:', err.message);
    res.status(500).json({ message: 'Server error while creating goal' });
  }
};

// @desc    Get all goals for the logged-in user
// @route   GET /api/goals/goal
// @access  Private
exports.getUserGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ deadline: 1 });  // ✅ Fix here
    res.status(200).json(goals);
  } catch (err) {
    console.error('Error fetching goals:', err.message);
    res.status(500).json({ message: 'Server error while fetching goals' });
  }
};
