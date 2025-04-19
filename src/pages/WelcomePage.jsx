import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.contentContainer}>
          <h1 style={styles.heading}>Welcome to Workout Wizards</h1>
          <p style={styles.text}>Track your workouts, goals, and nutrition all in one place!</p>
          <p style={styles.text}>Start your fitness journey now!</p>
          <Link to="/auth">
            <button style={styles.button}>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',  // Make the background fixed
    backgroundColor: '#000',  // Fallback color
    backgroundImage: 'url("/images/Welcome page3.webp")', // Your background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',  // Full height of the screen
    display: 'flex',
    alignItems: 'center',  // Vertically center the content
    justifyContent: 'center',  // Horizontally center the content
  },
  overlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0, 0, 0, 0.5)',  // Dark overlay to enhance text visibility
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    padding: '20px',
  },
  contentContainer: {
    maxWidth: '600px',  // Limit the width of the content
    color: '#fff',  // White text color for contrast
  },
  heading: {
    fontSize: '3.5rem',  // Make the heading bold and large
    fontWeight: '700',  // Bold font for the heading
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.5rem',
    marginTop: '10px',
    marginBottom: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1.25rem',
    backgroundColor: '#ff6347',  // Tomato red button color
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
};

export default WelcomePage;
