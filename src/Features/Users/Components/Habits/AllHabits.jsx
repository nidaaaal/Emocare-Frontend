import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchHabits } from "./HabitSclice";
import { Link } from "react-router-dom";
import { PlayCircleIcon, LeafIcon, CheckCircleIcon } from "@phosphor-icons/react";
import Navbar from "../Dashboard/Navbar";
import { SummaryCard } from "./Cards";
import { LightningIcon } from "@phosphor-icons/react/dist/ssr";
import HabitCard from "./HabitCard";


export default function AllHabits() {
  const dispatch = useDispatch();
  const { habits, loading, error, categories } = useSelector(
    (state) => state.habits
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchHabits());
  }, [dispatch]);

  const totalHabits = habits.length;
  const active = habits.filter((h) => !h.isEnded).length;
  const completed = habits.filter((h) => h.isFinished).length;
  const totalActions = habits.reduce(
    (sum, h) => sum + (h.completionCount || 0),
    0
  );

  const summaryData = [
    {
      title: "Total Habits",
      value: totalHabits,
      icon: <LeafIcon size={28} className="text-emerald-800" />,
      color: "text-green-500",
    },
    {
      title: "Active",
      value: active,
      icon: <PlayCircleIcon size={28} className="text-emerald-800" />,
      color: "text-emerald-500",
    },
    {
      title: "Completed",
      value: completed,
      icon: <CheckCircleIcon size={28} className="text-emerald-800" />,
      color: "text-blue-500",
    },
    {
      title: "Total Actions",
      value: totalActions,
      icon: <LightningIcon size={28} className="text-emerald-800" />,
      color: "text-yellow-500",
    },
  ];

  const filterOptions = ["All Habits", "Active", "Completed", "Ended", "Upcoming"];

  const filteredHabits = habits.filter((habit) =>
    habit.name
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Habit Tracker
          </h1>
          <Link
            to="/user/habit/create"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-transform transform hover:scale-105"
          >
            + Add New Habit
          </Link>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryData.map((data, index) => (
            <SummaryCard key={index} {...data} />
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-lg mb-8">
          <div className="relative w-full md:w-1/3">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search habits..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {filterOptions.map((option, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                  index === 0
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Habit Cards Grid */}
        {loading ? (
          <p className="text-gray-500 text-center">Loading habits...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHabits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} categories={categories} />
            ))}
          </div>
        )}

        {!loading && filteredHabits.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            No habits match your search.
          </p>
        )}
      </div>
    </>
  );
}