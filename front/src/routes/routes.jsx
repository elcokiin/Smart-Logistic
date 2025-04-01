import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requiredRole) {
    if (requiredRole === 'admin' && userRole !== 'admin' && userRole !== 'superadmin') {
      return <Navigate to="/unauthorized" />;
    }

    if (requiredRole === 'superadmin' && userRole !== 'superadmin') {
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};