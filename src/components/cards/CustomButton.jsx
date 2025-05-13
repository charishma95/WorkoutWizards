import React from 'react';

const CustomButton = ({ text, onClick, type = 'button' }) => (
  <button style={styles.button} onClick={onClick} type={type}>
    {text}
  </button>
);

const styles = {
  button: {
    padding: '12px 20px',
    fontSize: '1rem',
    background: 'linear-gradient(135deg, #ff6347, #ff7f50)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background 0.3s ease',
  },
};

export default CustomButton;