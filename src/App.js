import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/customTheme.css';
import Dashboard from './pages/Dashboard';
import WelcomePage from './pages/WelcomePage';
import AuthPage from './pages/AuthPage';
import PrivateRoute from './components/PrivateRoute';
import WorkoutLogForm from './pages/WorkoutLog';
import Goals from './pages/Goals';
import NutritionLog from './pages/NutritionLog';



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/workout-log"
          element={
            <PrivateRoute>
              <WorkoutLogForm />
            </PrivateRoute>
          }
        />
        <Route
  path="/goals"
  element={
    <PrivateRoute>
      <Goals />
    </PrivateRoute>
  }
/>
<Route
  path="/nutrition-log"
  element={
    <PrivateRoute>
      <NutritionLog />
    </PrivateRoute>
  }
/>

        {/* Catch-all Route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
