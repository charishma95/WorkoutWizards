const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
    workoutType: { type: String, required: true },
    duration: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true },
    location: { type: String },  // New
    category: { type: String },  // New
    sets: { type: Number },      // New
    reps: { type: Number },      // New
    notes: { type: String },     // New
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Link to the user who logged this workout
    required: true,
  },
});

const WorkoutLog = mongoose.model('WorkoutLog', workoutLogSchema);

module.exports = WorkoutLog;
