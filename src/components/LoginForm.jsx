import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from React Router

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending POST request to the login endpoint
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log('Login successful:', response.data);

      // Store JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to the dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response?.data);
      alert('Invalid credentials!');
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Login
      </button>
    </form>
  );
};

const styles = {
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ff6347',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default LoginForm;
