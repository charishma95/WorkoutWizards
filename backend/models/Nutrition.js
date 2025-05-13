const mongoose = require('mongoose');

const nutritionLogSchema = new mongoose.Schema({
  foodItem: { type: String, required: true },
  calories: { type: Number, required: true },
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], default: 'Lunch' },
  protein: { type: Number },
  carbs: { type: Number },
  fat: { type: Number },
  servingSize: { type: String },
  quantity: { type: Number },
  tags: [String],
  dateTime: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('NutritionLog', nutritionLogSchema);
