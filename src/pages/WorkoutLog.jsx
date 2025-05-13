import React, { useState } from 'react';
import WorkoutLogForm from '../components/WorkoutLogForm'; // Assuming you are now using WorkoutLogForm component

const WorkoutLog = () => {
  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ workoutType, duration, caloriesBurned });
    // Send data to the backend to store workout log
  };

  return (
    <div style={styles.container}>
      {/* Removed the "Welcome to your Workout Log" heading */}
      
      <div style={styles.formContainer}>
        {/* You can remove the <h2> tag here too if you want it removed */}
        <h2 style={styles.header}>Log Your Workout</h2>
        
        <WorkoutLogForm 
          workoutType={workoutType} 
          setWorkoutType={setWorkoutType}
          duration={duration} 
          setDuration={setDuration} 
          caloriesBurned={caloriesBurned}
          setCaloriesBurned={setCaloriesBurned}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: 'url("/images/Workout page2.jpg")', // Ensure this path is correct
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '110vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slight transparency for readability
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
    width: '80%',
    maxWidth: '400px',
  },
  header: {
    fontSize: '2rem',
    color: 'white',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    marginBottom: '15px',
  },
  button: {
    padding: '12px',
    fontSize: '1rem',
    backgroundColor: '#ff6347',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
}; 

export default WorkoutLog;