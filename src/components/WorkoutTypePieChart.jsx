import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#ff6347', '#20b2aa', '#9370db', '#f4a460', '#87cefa', '#e9967a', '#FF6384', '#36A2EB', '#FF9F40'];

const WorkoutTypePieChart = ({ data = [] }) => {
  const typeCounts = data.reduce((acc, workout) => {
    if (workout.workoutType) {
      const normalized = workout.workoutType.trim().toLowerCase();
      acc[normalized] = (acc[normalized] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.entries(typeCounts).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize first letter
    value: count,
  }));

  return (
    <div>
      <h3 style={{ color: 'white', marginBottom: '10px' }}>🍩 Workout Types Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
          <Legend wrapperStyle={{ color: 'white' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkoutTypePieChart;
