import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import WorkoutLog from './pages/WorkoutLog';
import Goals from './pages/Goals';
import NutritionLog from './pages/NutritionLog';
import WelcomePage from './pages/WelcomePage';  // Import the WelcomePage

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation can be added here later */}
        <Routes>
          <Route path="/" element={<WelcomePage />} /> {/* Set WelcomePage as the default route */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workout-log" element={<WorkoutLog />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/nutrition-log" element={<NutritionLog />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
