import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

 const PsyProtectedRoute = ({ children }) => {
  const role = JSON.parse(localStorage.getItem("userdata") || "{}").role;

  if (role !== "Psychologist") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PsyProtectedRoute;