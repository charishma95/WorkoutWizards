import React, { useState } from 'react';
const NutritionLog = () => {
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ foodItem, calories });
    // Save meal data to backend
  };

  return (
    <div>
      <h2>Log Your Meal</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Food Item"
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <button type="submit">Save Meal</button>
      </form>
    </div>
  );
};

export default NutritionLog;
