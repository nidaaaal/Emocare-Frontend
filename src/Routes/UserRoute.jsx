import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
  const role = JSON.parse(localStorage.getItem("userdata") || "{}").role;

  if (role !== "User") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // renders nested routes
};

export default UserProtectedRoute;
