import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeftCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
      <motion.div
        className="text-center bg-white shadow-lg rounded-2xl p-8 max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-2">
          Oops! Page not found
        </p>
        <p className="text-sm text-gray-500 mb-6">
          No match for <span className="font-mono text-gray-800">{location.pathname}</span>
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition"
          >
            <ArrowLeftCircle size={20} />
            Go Back
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition"
          >
            <Home size={20} />
            Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
