import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

const SignUpForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // To store error messages
  const [successMessage, setSuccessMessage] = useState('');  // To store success messages
  const navigate = useNavigate();  // useNavigate hook to handle redirection

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    setSuccessMessage(''); // Clear previous success messages

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        fullName,
        email,
        password
      });

      console.log('Sign-up successful:', response.data);
      setSuccessMessage('User registered successfully! Redirecting to login...');
      
      // Redirect to the login page or dashboard after successful sign-up
      setTimeout(() => {
        navigate('/dashboard');  // Redirect to dashboard after 2 seconds (optional)
      }, 2000);

    } catch (error) {
      if (error.response && error.response.data.message === 'User already exists') {
        setErrorMessage('User already exists. Please try a different email.');
      } else {
        setErrorMessage('Sign-up failed. Please try again.');
      }
      console.error('Sign-up failed:', error.response?.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUpSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={styles.input}
        />
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
          Sign Up
        </button>
      </form>

      {/* Display error message if sign-up fails */}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      {/* Display success message if sign-up is successful */}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
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
  },
};

export default SignUpForm;
