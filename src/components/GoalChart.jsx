import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const GoalChart = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const res = await axios.get('http://localhost:5000/api/workout/goal', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const formatted = res.data.map(goal => ({
        date: new Date(goal.deadline).toLocaleDateString(),
        target: goal.target,
      }));

      setGoals(formatted);
    };

    fetchGoals();
  }, []);

  return (
    <div>
      <h3 style={{ color: 'white', marginBottom: '10px' }}>📈 Fitness Goals</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={goals}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="target" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoalChart;
