import React, { useState } from 'react';
const WorkoutLog = () => {
  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ workoutType, duration, caloriesBurned });
    // Send data to the backend to store workout log
  };

  return (
    <div>
      <h2>Log Your Workout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Workout Type"
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duration (in minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories Burned"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
        />
        <button type="submit">Save Workout</button>
      </form>
    </div>
  );
};

export default WorkoutLog;
