const NutritionLog = require('../models/Nutrition');

const addNutritionLog = async (req, res) => {
  const userId = req.user.id;
  const {
    foodItem,
    calories,
    mealType,
    protein,
    carbs,
    fat,
    servingSize,
    quantity,
    tags,
    dateTime
  } = req.body;

  if (!foodItem || !calories) {
    return res.status(400).json({ message: 'Food item and calories are required.' });
  }

  try {
    const newLog = new NutritionLog({
      foodItem,
      calories,
      mealType,
      protein,
      carbs,
      fat,
      servingSize,
      quantity,
      tags,
      dateTime: dateTime || new Date(),
      userId
    });

    await newLog.save();
    res.status(201).json({ message: 'Meal logged successfully!', log: newLog });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getNutritionLogs = async (req, res) => {
  const userId = req.user.id;

  try {
    const logs = await NutritionLog.find({ userId }).sort({ dateTime: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logs', error: error.message });
  }
};

module.exports = { addNutritionLog, getNutritionLogs };
