import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

 const AdminProtectedRoute = ({ children }) => {    
const role = JSON.parse(localStorage.getItem("userdata") || "{}").role;

  if (role !== "Admin") {
        return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;