import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  createHabit,
  fetchCategories,
  fetchHabitById,
  updateHabit,
} from "./HabitSclice";
import Navbar from "../Dashboard/Navbar";
import {
  Calendar,
  Clock,
  Target,
  Type,
  BookText,
  Tag,
} from "lucide-react"; // nice clean icons

const frequencyOptions = [
  { label: "Daily", value: 1 },
  { label: "Weekly", value: 2 },
];

export default function NewHabitForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories, createStatus, error, habitDetails } = useSelector(
    (s) => s.habits
  );

  const [form, setForm] = useState({
    name: "",
    description: "",
    targetCount: 0,
    frequency: 1,
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().add(1, "month").format("YYYY-MM-DD"),
    categoryId: "",
    reminderTime: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
    if (id) dispatch(fetchHabitById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (id && habitDetails) {
      setForm({
        ...habitDetails,
        startDate: dayjs(habitDetails.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(habitDetails.endDate).format("YYYY-MM-DD"),
        reminderTime: habitDetails.reminderTime
          ? dayjs(`1970-01-01T${habitDetails.reminderTime}`).format("HH:mm")
          : "",
      });
    }
  }, [habitDetails, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.categoryId) return alert("Please select a category");

    const payload = {
      ...form,
      targetCount: Number(form.targetCount),
      frequency: Number(form.frequency),
      categoryId: Number(form.categoryId),
      startDate: new Date(form.startDate).toISOString(),
      endDate: new Date(form.endDate).toISOString(),
      reminderTime: form.reminderTime || null,
    };

    const action = id
      ? updateHabit({ id, data: payload })
      : createHabit(payload);

    dispatch(action).then((res) => {
      if (res.meta.requestStatus === "fulfilled") navigate("/user/habit");
    });
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg space-y-8 mt-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          {id ? "✏️ Update Habit" : "Create New Habit"}
        </h2>
        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        {/* --- Info Section --- */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <Type size={18} /> Habit Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Morning Run"
            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            required
          />

          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <BookText size={18} /> Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add details about this habit..."
            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* --- Goal Section --- */}
        <div className="p-4 border rounded-xl bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Target size={18} /> Habit Goal
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="targetCount"
              value={form.targetCount}
              onChange={handleChange}
              placeholder="Target Count"
              min="0"
              className="p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
            />

            <select
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
              className="p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
            >
              {frequencyOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* --- Schedule Section --- */}
        <div className="p-4 border rounded-xl bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar size={18} /> Schedule
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
              <Clock size={18} /> Reminder Time
            </label>
            <input
              type="time"
              name="reminderTime"
              value={form.reminderTime}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* --- Category Section --- */}
        <div className="p-4 border rounded-xl bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Tag size={18} /> Select Category
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, categoryId: cat.id }))
                }
                className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition ${
                  form.categoryId === cat.id
                    ? "ring-2 ring-offset-2 ring-indigo-500 scale-105"
                    : "opacity-80 hover:opacity-100"
                }`}
                style={{ backgroundColor: cat.colorCode, color: "white" }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={createStatus === "loading"}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          {createStatus === "loading"
            ? id
              ? "Updating..."
              : "Creating..."
            : id
            ? "Update Habit"
            : "Add Habit"}
        </button>
      </form>
    </>
  );
}
