// src/components/PrivateRoute.jsx

import { Navigate } from 'react-router-dom';  // Only import Navigate

// This component will protect your routes
const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token'); // Check if there's a token in localStorage

  // If no token, redirect to login page (AuthPage), else render the element (protected route)
  return token ? element : <Navigate to="/auth" />;
};

export default PrivateRoute;
