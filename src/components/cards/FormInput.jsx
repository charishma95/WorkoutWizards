import React from 'react';

const FormInput = ({ type = 'text', placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={styles.input}
    required
  />
);

const styles = {
  input: {
    padding: '12px',
    fontSize: '1rem',
    backgroundColor: '#2c2c2c',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '8px',
    outline: 'none',
    marginBottom: '10px',
    width: '100%',
  },
};

export default FormInput;
