// src/Features/Users/Components/Dashboard/StatsOverview.jsx
import { motion } from "framer-motion";
import { FaRegSmile, FaCalendarCheck, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function StatsOverview({ profile }) {
  const createdAt = profile?.createdAt ? new Date(profile.createdAt) : null;
  const lastLogin = profile?.lastLogin ? new Date(profile.lastLogin) : null;

  const daysSinceJoin = createdAt
    ? Math.max(1, Math.round((Date.now() - createdAt.getTime()) / 86400000))
    : "—";

  const hoursSinceLastLogin = lastLogin
    ? Math.max(0, Math.round((Date.now() - lastLogin.getTime()) / 3600000))
    : "—";

  const tasksCompleted = profile?.stats?.tasksCompleted ?? 0;
  const moodScore = profile?.stats?.moodScore ?? 8.2; 
  const meditatedHours = profile?.stats?.meditatedHours ?? 3;

  const items = [
    { icon: <FaRegSmile />, label: "Mood Score", value: `${moodScore}/10` },
    { icon: <FaCalendarCheck />, label: "Tasks Completed", value: tasksCompleted },
    { icon: <FaClock />, label: "Hours Meditated", value: meditatedHours },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
        >
          <div className="text-emerald-600 text-3xl mb-3">{it.icon}</div>
          <div className="text-sm text-gray-500">{it.label}</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{it.value}</div>
        </motion.div>
      ))}

      {/* Join meta */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
        className="sm:col-span-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0"
      >
        <p className="text-sm text-emerald-900">
          You joined {daysSinceJoin === "—" ? "recently" : `${daysSinceJoin} day(s)`} ago •
          Last login {hoursSinceLastLogin === "—" ? "—" : `${hoursSinceLastLogin}h`} ago
        </p>
        <Link
          to="/user/habit/create"
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:underline transition"
        >
          Build a new habit →
        </Link>
      </motion.div>
    </section>
  );
}
