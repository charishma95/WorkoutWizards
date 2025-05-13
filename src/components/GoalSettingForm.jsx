import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from '../components/ProgressBar';

const GoalSettingForm = () => {
  const [goals, setGoals] = useState([]);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [goalType, setGoalType] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [motivation, setMotivation] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [reminder, setReminder] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const goalData = {
        goalType,
        target,
        deadline,
        motivation,
        priority,
        category,
        reminder,
      };

      const response = await axios.post(
        'http://localhost:5000/api/goals/goal',
        goalData,
        getAuthConfig()
      );

      if (response.data.message) {
        setSuccessMessage(response.data.message);
        setGoalType('');
        setTarget('');
        setDeadline('');
        setMotivation('');
        setPriority('');
        setCategory('');
        setReminder('');
      }
    } catch (error) {
      console.error('Error submitting goal:', error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    }
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/goals/goal',
          getAuthConfig()
        );
        setGoals(res.data);
      } catch (err) {
        console.error('Failed to fetch goals:', err);
      }
    };

    const fetchWorkoutHistory = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/workout/history',
          getAuthConfig()
        );
        const totalCalories = res.data.reduce((sum, w) => sum + w.caloriesBurned, 0);
        setCaloriesBurned(totalCalories);
      } catch (err) {
        console.error('Failed to fetch workout history:', err);
      }
    };

    fetchGoals();
    fetchWorkoutHistory();
  }, [successMessage]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Set Your Fitness Goal</h2>
      <form onSubmit={handleGoalSubmit} style={styles.form}>
        <input type="text" placeholder="🎯 Goal Type" value={goalType} onChange={(e) => setGoalType(e.target.value)} required style={styles.input} />
        <input type="number" placeholder="🎯 Target (e.g., 2000)" value={target} onChange={(e) => setTarget(e.target.value)} required style={styles.input} />
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required style={styles.input} />
        <textarea placeholder="📝 Why is this goal important?" value={motivation} onChange={(e) => setMotivation(e.target.value)} style={{ ...styles.input, height: '60px' }} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} required style={styles.input}>
          <option value="">🚦 Priority Level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required style={styles.input}>
          <option value="">🏋️ Goal Category</option>
          <option value="Endurance">Endurance</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
          <option value="Nutrition">Nutrition</option>
        </select>
        <select value={reminder} onChange={(e) => setReminder(e.target.value)} style={styles.input}>
          <option value="">🔔 Reminder Frequency</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>
        <button type="submit" style={styles.button}>Set Goal</button>
      </form>

      {successMessage && <div style={styles.success}>{successMessage}</div>}
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}

      {goals.length > 0 ? (
        <div style={{ marginTop: '40px', width: '100%' }}>
          <h3 style={{ textAlign: 'center', color: '#fff' }}>Your Saved Goals</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Target</th>
                <th style={styles.th}>Deadline</th>
                <th style={styles.th}>Priority</th>
                <th style={styles.th}>Progress</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal, idx) => (
                <tr key={idx}>
                  <td style={styles.td}>{goal.goalType}</td>
                  <td style={styles.td}>{goal.target}</td>
                  <td style={styles.td}>{new Date(goal.deadline).toLocaleDateString()}</td>
                  <td style={styles.td}>{goal.priority}</td>
                  <td style={styles.td}><ProgressBar value={caloriesBurned} max={goal.target} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ color: 'gray', marginTop: '40px' }}>No goals set yet.</div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '10px',
    fontFamily: 'Poppins, sans-serif',
    color: '#ffffff',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '12px',
    backgroundColor: '#ff6347',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'transform 0.3s ease-in-out, background 0.3s ease-in-out',
  },
  success: {
    marginTop: '10px',
    color: 'limegreen',
    textAlign: 'center',
  },
  error: {
    marginTop: '10px',
    color: 'red',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
  },
  td: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
  },
};

export default GoalSettingForm;
