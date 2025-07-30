// ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {
  const role = JSON.parse(localStorage.getItem("userdata") || "{}").role;

  if (role !== "User") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserProtectedRoute;