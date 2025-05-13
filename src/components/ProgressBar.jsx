import React from 'react';

const ProgressBar = ({ value, max }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div style={{ width: '100%', backgroundColor: '#444', borderRadius: '6px', overflow: 'hidden', marginBottom: '10px' }}>
      <div style={{
        width: `${percentage}%`,
        backgroundColor: '#4caf50',
        color: '#fff',
        padding: '6px 10px',
        fontWeight: 'bold',
        transition: 'width 0.4s ease-in-out'
      }}>
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

export default ProgressBar;
