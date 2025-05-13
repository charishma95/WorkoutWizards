import React from 'react';

const CardContainer = ({ children }) => {
  return (
    <div style={styles.container}>
      {children}
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(135deg, #1f1f1f, #2e2e2e)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
    color: '#ffffff',
    marginBottom: '20px',
    width: '100%',
  },
};

export default CardContainer;