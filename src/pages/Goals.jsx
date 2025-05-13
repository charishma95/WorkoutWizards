import React from 'react';
import GoalSettingForm from '../components/GoalSettingForm';

const Goals = () => {
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <GoalSettingForm />
      </div>
    </div>
  );
};

const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#000', // ✅ fallback color
      backgroundImage: 'url("/images/Workout page2.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // ✅ fills entire viewport height
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start', // better for scrollable forms
      flexDirection: 'column',
    },
    formContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)',
      width: '90%',
      maxWidth: '500px',
      margin: 'auto',
    },
  };
  
export default Goals;
