// ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const role = JSON.parse(localStorage.getItem("userdata") || "{}").role;

  if (!user || role !== "User") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserProtectedRoute;