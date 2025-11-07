import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import api from "../../../../Api/baseurl";
import {
  PlayCircleIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react";
import { Flame } from "lucide-react"; // for streak 🔥

const HabitCard = ({ habit, categories }) => {
  const category = categories.find((x) => x.id === habit.categoryId);
  const color = category?.colorCode || "#6366f1"; // default indigo
  const categoryName = category?.name || "Uncategorized";

  const ended =
    habit.isEnded ||
    (habit.endDate && dayjs().isAfter(dayjs(habit.endDate)));
  const status = ended ? "Ended" : "Ongoing";

  // ✅ Stats state
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get(`/habit/${habit.id}/stats`, {
          withCredentials: true,
        });
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to load habit stats:", err);
      }
    };
    fetchStats();
  }, [habit.id]);

  const totalCompletions = stats?.totalCompletions ?? habit.completionCount ?? 0;
  const currentStreak = stats?.currentStreak ?? 0;
  const longestStreak = stats?.longestStreak ?? 0;
  const completionPercentage = stats
    ? Math.round(stats.completionPercentage)
    : 0;

  return (
    <Link
      to={`/user/habit/${habit.id}`}
      className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
      style={{ border: `1px solid ${color}40`, backgroundColor: `${color}0d` }} // pastel bg
    >
      <div className="p-6 flex flex-col gap-4">
        {/* Category + Status */}
        <div className="flex items-center justify-between">
          <span
            className="self-start px-3 py-1 text-xs font-medium rounded-full"
            style={{ backgroundColor: color + "20", color }}
          >
            {categoryName}
          </span>
          <span className="text-xs font-semibold text-gray-600">{status}</span>
        </div>

        {/* Habit Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{habit.name}</h2>
          {habit.description && (
            <p className="text-sm text-gray-700 mt-2 line-clamp-2">
              {habit.description}
            </p>
          )}
        </div>
      </div>

      {/* Progress Section */}
      <div className="p-6 pt-0 border-t border-gray-200 flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{completionPercentage}%</span>
          <span>{totalCompletions} completions</span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%`, backgroundColor: color }}
          ></div>
        </div>

        {/* Streak + Longest */}
        <div className="flex items-center justify-between text-xs text-gray-700 mt-2">
          <span className="flex items-center gap-1">
            <Flame size={14} className="text-orange-500" />
            {currentStreak} day streak
          </span>
          <span className="text-gray-600">
            🔝 Longest: <span className="font-semibold">{longestStreak}</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HabitCard;