import React from 'react';
const Goals = () => {
  return (
    <div>
      <h2>Your Goals</h2>
      {/* Add goal progress, set new goals, and visualize progress */}
      <p>Goal: Lose 5kg</p>
      <progress value="3" max="5"></progress>
    </div>
  );
};

export default Goals;
