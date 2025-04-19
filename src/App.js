import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import WorkoutLog from './pages/WorkoutLog';
import Goals from './pages/Goals';
import NutritionLog from './pages/NutritionLog';
import WelcomePage from './pages/WelcomePage';  // Import the WelcomePage
import PrivateRoute from './components/PrivateRoute';  // Import PrivateRoute

const App = () => {
  return (
    <Router>
      <div>
        {/* Add your navigation bar here if needed */}
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<WelcomePage />} />  {/* WelcomePage as the default route */}
          
          {/* Auth Routes */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/workout-log" element={<PrivateRoute element={<WorkoutLog />} />} />
          <Route path="/goals" element={<PrivateRoute element={<Goals />} />} />
          <Route path="/nutrition-log" element={<PrivateRoute element={<NutritionLog />} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

