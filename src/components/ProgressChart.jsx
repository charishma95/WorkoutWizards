import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProgressBarChart = ({ data }) => {
  // Using data directly as the values are already set from the parent (Dashboard)
  const chartData = {
    labels: ['Workouts Completed', 'Calories Burned', 'Goals Set'],
    datasets: [
      {
        label: 'Progress',
        data: [data.workoutsCompleted, data.caloriesBurned, data.goalsSet], // Accessing data directly
        backgroundColor: ['#ff6347', '#4caf50', '#ffeb3b'], // Different colors for each bar
        borderColor: 'rgba(0,0,0,0.1)', // Border color for each bar
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'User Progress Overview',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ProgressBarChart;
