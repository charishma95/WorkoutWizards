import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WorkoutLogForm = () => {
  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (duration <= 0 || caloriesBurned < 0) {
      setMessage({ type: 'error', text: 'Duration must be > 0 and calories ≥ 0' });
      return;
    }

    const workoutData = {
      workoutType,
      duration: Number(duration),
      caloriesBurned: Number(caloriesBurned),
      date: date || new Date().toISOString(),
      location,
      sets,
      reps,
      notes,
      category
    };

    try {
      await axios.post('http://localhost:5000/api/workout/add', workoutData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setMessage({ type: 'success', text: 'Workout saved. Redirecting…' });
      setWorkoutType('');
      setDuration('');
      setCaloriesBurned('');
      setDate('');
      setLocation('');
      setSets('');
      setReps('');
      setNotes('');
      setCategory('');

      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Could not save workout.'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {message && (
        <div
          style={{
            ...styles.banner,
            backgroundColor: message.type === 'success' ? '#2d6a4f' : '#9d0208'
          }}
        >
          {message.text}
        </div>
      )}
      <input style={styles.input} type="text" placeholder="Workout Type" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)} required />
      <input style={styles.input} type="number" placeholder="Duration (minutes)" value={duration} onChange={(e) => setDuration(e.target.value)} required />
      <input style={styles.input} type="number" placeholder="Calories Burned" value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} required />
      <input style={styles.input} type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

      {/* Optional fields */}
      <select style={styles.input} value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">Workout Location</option>
        <option value="Home">Home</option>
        <option value="Gym">Gym</option>
        <option value="Outdoor">Outdoor</option>
      </select>

      <input style={styles.input} type="number" placeholder="Number of Sets" value={sets} onChange={(e) => setSets(e.target.value)} />
      <input style={styles.input} type="number" placeholder="Reps per Set" value={reps} onChange={(e) => setReps(e.target.value)} />

      <select style={styles.input} value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Workout Category</option>
        <option value="Cardio">Cardio</option>
        <option value="Strength">Strength</option>
        <option value="Flexibility">Flexibility</option>
        <option value="HIIT">HIIT</option>
      </select>

      <textarea style={{ ...styles.input, height: '60px' }} placeholder="Workout Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />

      <button type="submit" style={styles.button}>Save Workout</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#ee6c4d',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  banner: {
    padding: '10px',
    borderRadius: '6px',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '20px',
  }
};

export default WorkoutLogForm;
