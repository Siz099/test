import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('jwtToken');
  const userStr = localStorage.getItem('user');
  
  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check user role if roles are specified
  if (allowedRoles.length > 0) {
    try {
      const user = JSON.parse(userStr);
      const userRole = user?.role?.toLowerCase();
      
      if (!allowedRoles.includes(userRole)) {
        // Redirect based on user role
        if (userRole === 'admin') {
          return <Navigate to="/admin/dashboard" replace />;
        } else if (userRole === 'partner') {
          return <Navigate to="/partner/dashboard" replace />;
        } else {
          return <Navigate to="/home" replace />;
        }
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;