import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import WorkoutChart from '../components/WorkoutChart';
import WorkoutDurationChart from '../components/WorkoutDurationChart';
import WorkoutTypePieChart from '../components/WorkoutTypePieChart';
import CardContainer from '../components/cards/CardContainer';
import SectionHeader from '../components/cards/SectionHeader';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [progress, setProgress] = useState({
    caloriesBurned: 0,
    workoutsCompleted: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [filterDuration, setFilterDuration] = useState('All');
  const [quote, setQuote] = useState('');
  const [toast, setToast] = useState('');

  const quotes = [
    "Push harder than yesterday if you want a different tomorrow.",
    "Your only limit is you.",
    "Sweat now, shine later.",
    "One more rep. One more step.",
    "You don’t have to go fast, you just have to go."
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username') || 'Guest';
      setUsername(storedUsername);

      try {
        const res = await axios.get('http://localhost:5000/api/workout/history', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const workouts = res.data;
        const totalCalories = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
        setProgress({
          caloriesBurned: totalCalories,
          workoutsCompleted: workouts.length,
        });
        setRecentActivities(workouts);
        setFilteredActivities(workouts);
      } catch (err) {
        console.error('Error loading workout history:', err);
      }
    };

    fetchUserData();

    const random = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[random]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToast('👋 Logged out successfully!');
    setTimeout(() => navigate('/'), 2000);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    applyFilters(type, filterDuration);
  };

  const handleDurationChange = (range) => {
    setFilterDuration(range);
    applyFilters(filterType, range);
  };

  const applyFilters = (type, durationRange) => {
    let filtered = [...recentActivities];

    if (type !== 'All') {
      filtered = filtered.filter(w => w.workoutType?.toLowerCase() === type.toLowerCase());
    }

    if (durationRange !== 'All') {
      const [min, max] = durationRange.split('-').map(Number);
      filtered = filtered.filter(w => w.duration >= min && w.duration <= max);
    }

    setFilteredActivities(filtered);
  };

  const handleDownloadImage = () => {
    const node = document.getElementById('progress-card');
    toPng(node)
      .then((dataUrl) => {
        download(dataUrl, 'WorkoutWizards_Progress.png');
      })
      .catch((err) => {
        console.error('Error generating image:', err);
      });
  };

  const shareMessage = `🔥 I’ve completed ${progress.workoutsCompleted} workouts and burned ${progress.caloriesBurned} calories on WorkoutWizards!`;

  return (
    <div style={styles.container}>
      {toast && <div style={styles.toast}>{toast}</div>}
      <header style={styles.header}>
        <img src="/images/logo2.png" alt="Logo" style={styles.logo} />

        <div style={styles.userInfo}>
          <div>
            <h2>Welcome, {username}</h2>
            <p>Goal: Burn 2000 Calories this week</p>
            <p style={{ color: '#ffc', fontStyle: 'italic' }}>💬 {quote}</p>
          </div>
        </div>

        <div style={styles.links}>
          <Link to="/workout-log" className="btn btn-custom">Log a Workout</Link>
          <Link to="/goals" className="btn btn-custom">Set a Goal</Link>
          <Link to="/nutrition-log" className="btn btn-custom">Track Nutrition</Link>
          <button onClick={handleLogout} className="btn btn-custom">Logout</button>
        </div>
      </header>

      <CardContainer>
        <SectionHeader>🔥 Your Stats</SectionHeader>
        <div id="progress-card" style={styles.metrics}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>{progress.workoutsCompleted}</h3>
            <p style={styles.cardText}>Workouts Completed</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>{progress.caloriesBurned}</h3>
            <p style={styles.cardText}>Calories Burned</p>
          </div>
        </div>

        <div style={styles.shareButtons}>
          <p style={{ color: 'white' }}>📣 Share your progress:</p>
          <FacebookShareButton url="https://workoutwizards.com" quote={shareMessage}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <TwitterShareButton url="https://workoutwizards.com" title={shareMessage}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <button onClick={handleDownloadImage} className="btn btn-custom">📥 Download for Instagram</button>
        </div>
      </CardContainer>

      <CardContainer>
        <SectionHeader>📊 Workout Analytics</SectionHeader>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <select className="form-control" onChange={(e) => handleFilterChange(e.target.value)} value={filterType}>
            <option value="All">All Types</option>
            {[...new Set(recentActivities.map(w => w.workoutType))].filter(Boolean).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select className="form-control" onChange={(e) => handleDurationChange(e.target.value)} value={filterDuration}>
            <option value="All">All Durations</option>
            <option value="0-20">0-20 min</option>
            <option value="21-40">21-40 min</option>
            <option value="41-60">41-60 min</option>
            <option value="61-120">61+ min</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', paddingTop: '20px' }}>
          <div style={{ flex: '1 1 45%' }}>
            <WorkoutChart data={filteredActivities} />
          </div>
          <div style={{ flex: '1 1 45%' }}>
            <WorkoutDurationChart data={filteredActivities} />
          </div>
          <div style={{ flex: '1 1 100%' }}>
            <WorkoutTypePieChart data={filteredActivities.filter(w => w.workoutType)} />
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    background: 'linear-gradient(to right, #1f1c2c, #928dab)',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '20px',
    flexWrap: 'wrap',
  },
  logo: {
    height: '50px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  profilePic: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  metrics: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    flex: 1,
    margin: '0 10px',
  },
  cardTitle: {
    fontSize: '2rem',
    color: '#fff',
  },
  cardText: {
    color: '#ccc',
  },
  links: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '10px',
  },
  shareButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginTop: '20px',
  },
  toast: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
    borderRadius: '6px',
    marginBottom: '10px'
  },
};

export default Dashboard;
