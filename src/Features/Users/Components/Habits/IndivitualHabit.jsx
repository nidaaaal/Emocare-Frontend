import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchCategories, fetchHabitById } from "./HabitSclice";
import api from "../../../../Api/baseurl";
import dayjs from "dayjs";
import Navbar from "../Dashboard/Navbar";
import InfoCard from "./InfoCard";
import NotificationToggle from "../Notification/NotificationToaggle";
import ModalWrapper from "../Ui/ModalWrapper";
import HabitComplition from "./HabitComplition";
import { Pencil, CheckCircle2, Trash2, ArrowLeft, AlertTriangle } from "lucide-react";

export default function HabitDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCompleting, setIsCompleting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFinishedToday, setIsFinishedToday] = useState(false); // 
  
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { habitDetails, loading, error, categories } = useSelector(
    (state) => state.habits
  );

  useEffect(() => {
    dispatch(fetchCategories());
    if (id) dispatch(fetchHabitById(id));

    const fetchProgress = async () => {
      const res = (await api.get(`/habit/${id}/stats`)).data;
      setProgress(res.data.completionPercentage);
    };

    const checkFinishedToday = async () => {
      try {
        const res = (await api.get(`/habit/${id}/finished`)).data;
        setIsFinishedToday(res.data); // ✅ expects backend returns { finished: true/false }
      } catch (err) {
        console.error("Error checking finished status:", err);
      }
    };

    fetchProgress();
    checkFinishedToday();
  }, [id, dispatch]);


  // --- Loading and Error States (unchanged) ---
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-500"></div>
      </div>
    );
  if (error)
    return (
      <p className="p-6 text-red-600 text-center font-medium bg-red-50 rounded-md max-w-md mx-auto">
        {error}
      </p>
    );
  if (!habitDetails)
    return (
      <p className="p-6 text-gray-500 text-center">Habit not found.</p>
    );

  const {
    name,
    description,
    targetCount,
    frequency,
    startDate,
    endDate,
    reminderTime,
    categoryId,
    isEnded,
    completionCount,
  } = habitDetails;

  const categoryFromStore = categories.find((c) => c.id === categoryId);
  const finalCategory = categoryFromStore || {};
  const color = finalCategory.colorCode || "#3b82f6";
  const categoryName = finalCategory.name || "Uncategorized";


  // 💡 FIX: Updated delete handler to use the modal state
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await api.delete(`/habit/${id}`, { withCredentials: true });
      navigate("/user/habit");
    } catch (err) {
      console.error("Error deleting habit:", err);
      alert("Failed to delete habit. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsConfirmingDelete(false); // Close modal on completion
    }
  };
  
  // 💡 FIX: Accessibility fix for the disabled Edit link
  const handleEditClick = (e) => {
    if (isEnded) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Navbar />
      <NotificationToggle habitId={id} reminderTime={reminderTime} />

      <div className="p-6 max-w-3xl mx-auto">
        {/* 💡 FIX: Semantic back link */}
        <Link
          to="/user/habit"
          className="mb-6 flex items-center gap-2 text-blue-600 hover:underline text-sm font-medium w-fit"
        >
          <ArrowLeft size={16} />
          Back to All Habits
        </Link>

        <div
          className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
          style={{ borderTop: `6px solid ${color}` }}
        >
          <div className="p-6 space-y-5">
            {/* --- Category, Title, Description, Info Grid (unchanged) --- */}
            <div className="flex items-center justify-between">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: color + "20", color }}>
                {categoryName}
              </span>
              {isEnded && (
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                  Finished
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800">{name}</h1>
            {description && (
              <p className="text-gray-600 leading-relaxed">{description}</p>
            )}
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <InfoCard label="Target Count" value={targetCount} />
              <InfoCard label="Frequency" value={frequency === 1 ? "Daily" : "Weekly"}/>
              <InfoCard label="Start Date" value={dayjs(startDate).format("MMM D, YYYY")}/>
              <InfoCard label="End Date" value={dayjs(endDate).format("MMM D, YYYY")}/>
              <InfoCard label="Reminder Time" value={reminderTime || "No reminder set"}/>
              <InfoCard label="Completed" value={completionCount} />
            </div>
            
            {/* Progress Bar (unchanged) */}
            <div>
              <div className="flex items-center justify-between mb-1 text-xs text-gray-500">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%`, backgroundColor: isEnded ? "red" : color }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={`/user/habit/update/${id}`}
                onClick={handleEditClick} // 💡 FIX: Prevent click when disabled
                aria-disabled={isEnded} // 💡 FIX: Accessibility attribute
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow transition aria-disabled:opacity-60 aria-disabled:pointer-events-none"
              >
                <Pencil size={16} /> Edit
              </Link>

             {!isEnded && (
      <>
    <button
      onClick={() => setIsCompleting(true)}
      disabled={isFinishedToday} // ✅ disable if already finished today
      className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium shadow transition 
        ${isFinishedToday 
          ? "bg-gray-400 cursor-not-allowed text-white" 
          : "bg-green-600 hover:bg-green-700 text-white"}`}
    >
      <CheckCircle2 size={16} /> 
      {isFinishedToday ? "Completed Today" : "Mark Complete"}
    </button>

    <ModalWrapper
      isOpen={isCompleting}
      onClose={() => setIsCompleting(false)}
    >
      <HabitComplition
        id={id}
        onSuccess={() => {
          setIsCompleting(false);
          dispatch(fetchHabitById(id));
          setIsFinishedToday(true); // ✅ update state instantly after completion
        }}
      />
    </ModalWrapper>
  </>
)}


              {/* 💡 FIX: Open confirmation modal instead of using window.confirm */}
              <button
                onClick={() => setIsConfirmingDelete(true)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium shadow transition"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 💡 FIX: Delete confirmation modal */}
      <ModalWrapper isOpen={isConfirmingDelete} onClose={() => setIsConfirmingDelete(false)}>
        <div className="p-4 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                Delete Habit
            </h3>
            <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                    Are you sure you want to delete this habit? This action cannot be undone.
                </p>
            </div>
            <div className="flex justify-center gap-3 mt-4">
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-6 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 disabled:opacity-50"
                >
                    {isDeleting ? "Deleting..." : "Yes, Delete"}
                </button>
                <button
                    onClick={() => setIsConfirmingDelete(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Cancel
                </button>
            </div>
        </div>
      </ModalWrapper>
    </>
  );
}