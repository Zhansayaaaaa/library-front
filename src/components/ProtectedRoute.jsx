
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode' 

const ProtectedRoute = ({ children, acceptedRoles }) => {
  const token = localStorage.getItem('token'); 
  const location = useLocation();

  if (!token) {
    
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  try {
  const decodedToken = jwtDecode(token); 
 
  const userRole = decodedToken.role; 

  
  if (acceptedRoles && !acceptedRoles.includes(userRole)) {
    
    return <Navigate to="/" state={{ from: location }} replace />; 
  }
  return children;
} catch (error) {
  console.error("Error decoding the token:", error);
  return <Navigate to="/signin" state={{ from: location }} replace />;
}
};

export default ProtectedRoute;
