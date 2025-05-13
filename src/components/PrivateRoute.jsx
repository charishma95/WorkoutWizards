import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // Otherwise, allow access to the route
  return children;
};

export default PrivateRoute;
