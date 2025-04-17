import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';  // Import LoginForm
import SignUpForm from '../components/SignUpForm'; // Import SignUpForm

const AuthPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true); // Toggle between Login and SignUp

  return (
    <div style={styles.authContainer}>
      <div style={styles.formContainer}>
        <img src="/images/logo2.png" alt="Logo" style={styles.logo} />  {/* Logo Image */}
        <h2 style={styles.heading}>{isLoginForm ? 'Login' : 'Sign Up'}</h2>

        {/* Conditional rendering based on isLoginForm state */}
        {isLoginForm ? <LoginForm /> : <SignUpForm />}

        <button onClick={() => setIsLoginForm(!isLoginForm)} style={styles.toggleLink}>
          {isLoginForm ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
};

const styles = {
    authContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: 'url(/images/Authpage.jpg)', // Adding the background image
      backgroundSize: 'cover',  // Ensure the image covers the full container
      backgroundPosition: 'center',  // Center the background image
      padding: '0 20px',
      position: 'relative',  // To position the overlay correctly
    },
    overlay: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Dark overlay for readability
      zIndex: '0',  // Keep the overlay behind the form
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Lighter greyish-white for the form background
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',  // Soft shadow
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: '1',
      },      
    logo: {
      display: 'block',
      margin: '0 auto',
      width: '250px',  // Adjust logo size
      height: 'auto',
      marginBottom: '20px',
    },
    heading: {
      fontSize: '2rem',
      color: '#333',
      marginBottom: '20px',
    },
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
    buttonHover: {
      backgroundColor: '#e04e34',  // Darker shade on hover
    },
    toggleLink: {
      color: '#007bff',
      textDecoration: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
  };
  
  export default AuthPage;
  