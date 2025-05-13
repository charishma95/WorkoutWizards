import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const WorkoutDurationChart = ({ data = [] }) => {
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    duration: item.duration,
  }));

  return (
    <div>
      <h3 style={{ color: 'white', marginBottom: '10px' }}>📈 Workout Duration Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" label={{ value: 'Minutes', angle: -90, position: 'insideLeft', fill: '#ccc' }} />
          <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
          <Legend wrapperStyle={{ color: 'white' }} />
          <Line type="monotone" dataKey="duration" stroke="#20b2aa" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkoutDurationChart;
