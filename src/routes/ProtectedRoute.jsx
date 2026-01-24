import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Higher-Order Component to protect routes based on authentication.
 * @param {Array} allowedRoles - (Optional) List of roles allowed to access the route
 */
const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect to home/unauthorized if role is not allowed
    return <Navigate to="/" replace />;
  }

  // Instructor Onboarding Guards
  if (user?.role === 'instructor') {
      // If attempting to access dashboard but not approved
      if (location.pathname.includes('/instructor-dashboard')) {
          if (user.status === 'pending_enrollment') return <Navigate to="/instructor-enrollment" replace />;
          if (user.status === 'pending_approval') return <Navigate to="/waiting-approval" replace />;
      }
  }

  return <Outlet />;
};

export default ProtectedRoute;
