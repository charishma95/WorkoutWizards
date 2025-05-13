import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Hook for navigation

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when the request is sent
    setError(''); // Clear any previous error messages

    try {
      // Sending POST request to the login endpoint
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      console.log('Login successful:', response.data);

      // Store JWT token and username in localStorage
      localStorage.setItem('token', response.data.token);  // Store the token
      localStorage.setItem('username', response.data.username);  // Store the username

      // Redirect to the dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response?.data);

      // Show error message if login fails
      setError('Invalid credentials or server error!');

      // Optional: reset form after a failed attempt
      setEmail('');
      setPassword('');
    } finally {
      setLoading(false); // Stop loading when request is completed
    }
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        
        {/* Show error message if login fails */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Disable submit button while loading */}
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
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
  error: {
    color: 'red',
    fontSize: '0.9rem',
    margin: '10px 0',
  },
};

export default LoginForm;
