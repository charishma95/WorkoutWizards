const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  goalType: {
    type: String,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  motivation: {
    type: String,
    default: '',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  category: {
    type: String,
    enum: ['Endurance', 'Strength', 'Flexibility', 'Nutrition'],
    default: 'Endurance',
  },
  reminder: {
    type: String,
    enum: ['Daily', 'Weekly', ''],
    default: '',
  }
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
