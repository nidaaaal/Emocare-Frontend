// src/Features/Users/Components/Dashboard/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import defaultProfile from "../../../../assets/Images/userdashboard/profile.webp";
import { useDispatch } from "react-redux";
import api from "../../../../Api/baseurl";

export default function Navbar({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const profilePic = user?.profileImageUrl || defaultProfile;
  const name = JSON.parse(localStorage.getItem("userdata")).name;
  const routes = [
    { to: "/user/home", label: "Home" },
    { to: "/user/habit", label: "Habits" },
    { to: "/user/task", label: "Tasks" },
    { to: "/user/chat", label: "Chat Sessions" },
    { to: "/user/profile", label: "Profile" },
  ];

  const handleLogout = async() => {
    await api.post("/authentication/logout");
    localStorage.clear(); 
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-lime-400" />
          <span className="font-extrabold text-xl tracking-tight text-emerald-700">
            Emocare
          </span>
        </motion.div>

        {/* Routes */}
        <div className="hidden md:flex items-center gap-6">
          {routes.map((r) => {
            const active = location.pathname === r.to;
            return (
              <Link
                key={r.to}
                to={r.to}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-emerald-700"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                {r.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm font-medium text-gray-800">
            {name || "Guest"}
          </span>
          <img
            src={profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-emerald-300 object-cover"
          />
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
