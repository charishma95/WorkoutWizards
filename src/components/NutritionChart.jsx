import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const NutritionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await axios.get('http://localhost:5000/api/nutrition-log/history', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Group calories by mealType or foodItem
      const grouped = res.data.reduce((acc, meal) => {
        const label = meal.mealType || meal.foodItem;
        acc[label] = (acc[label] || 0) + meal.calories;
        return acc;
      }, {});

      const formatted = Object.entries(grouped).map(([name, value]) => ({ name, value }));
      setData(formatted);
    };

    fetchMeals();
  }, []);

  return (
    <div>
      <h3 style={{ color: 'white', marginBottom: '10px' }}>🥗 Calories by Meal Type</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NutritionChart;
