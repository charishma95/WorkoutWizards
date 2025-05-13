import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import axios from 'axios';

const WorkoutChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      const res = await axios.get('http://localhost:5000/api/workout/history', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const formatted = res.data.map(w => ({
        date: new Date(w.date).toLocaleDateString(),
        calories: w.caloriesBurned,
      }));

      setData(formatted);
    };

    fetchWorkoutData();
  }, []);

 return (
    <div>
      <h3 style={{ color: 'white', marginBottom: '10px' }}>📊 Workout Calories Burned</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
          <Bar dataKey="calories" fill="#20b2aa" /> {/* Teal color like the line */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkoutChart;








