import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RoleGuard = ({ children, allowedRole }) => {
  const location = useLocation();
  const userStr = localStorage.getItem("jc_user");
  
  if (!userStr) {
    // If no user is logged in, they can browse the public site, but let's let App.jsx handle specific protected routes
    return children; 
  }

  try {
    const user = JSON.parse(userStr);
    
    // If the logged in user is a company, and they are trying to access a seeker/public page
    if (user.role === 'company' && allowedRole === 'seeker') {
      return <Navigate to="/company/dashboard" replace />;
    }

    // If a seeker tries to access a company page
    if (user.role === 'seeker' && allowedRole === 'company') {
      return <Navigate to="/" replace />;
    }
    
    return children;
  } catch (error) {
    console.error("Failed to parse user from local storage", error);
    return children;
  }
};

export default RoleGuard;
