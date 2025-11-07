// DailyCheckIn.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../../../../Api/baseurl";
import { Smile, Frown, Meh, Heart, Angry, Coffee } from "lucide-react";

export default function DailyCheckIn({ onDailyQuote, onComplete }) {
  const [mood, setMood] = useState("");
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quote, setQuote] = useState("");

  const moods = [
    { label: "Happy", icon: <Smile className="w-5 h-5" /> },
    { label: "Sad", icon: <Frown className="w-5 h-5" /> },
    { label: "Calm", icon: <Coffee className="w-5 h-5" /> },
    { label: "Grateful", icon: <Heart className="w-5 h-5" /> },
    { label: "Frustrated", icon: <Meh className="w-5 h-5" /> },
    { label: "Angry", icon: <Angry className="w-5 h-5" /> },
  ];

  const handleSubmit = async () => {
    if (!mood || !entry.trim()) {
      setError("Please select a mood and write your journal entry.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post(
        "/reflection/Daily",
        { prompt: entry, mood },
        { withCredentials: true }
      );

      if (res.data.success) {
        const dailyQuote = res.data.data?.trim() || "";
        setQuote(dailyQuote);
        sessionStorage.setItem("dailyQuote", dailyQuote);
        onDailyQuote?.(dailyQuote);
        toast.success("Reflection submitted!");

        // ✅ Close modal and mark complete
        onComplete?.();
      } else {
        toast.error("Failed to submit reflection.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-emerald-50 rounded-2xl shadow p-6 border border-emerald-100"
    >
      <h2 className="text-xl font-semibold text-emerald-900 flex items-center justify-center gap-2 mb-6">
        Daily Check-In
      </h2>

      {/* Mood & Entry Form */}
      {!quote && (
        <>
          <p className="mb-3 text-sm font-medium text-emerald-800">
            How are you feeling today?
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
            {moods.map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => setMood(label)}
                type="button"
                className={`flex flex-col items-center p-3 rounded-xl border text-sm transition-all ${
                  mood === label
                    ? "bg-emerald-600 text-white border-emerald-600 shadow"
                    : "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                }`}
              >
                {icon}
                <span className="mt-1">{label}</span>
              </button>
            ))}
          </div>

          <p className="mb-3 text-sm font-medium text-emerald-800">
            Journal Entry
          </p>
          <textarea
            className="w-full p-4 h-32 border border-emerald-200 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
            placeholder="Write your thoughts..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full mt-6 py-3 rounded-xl text-white font-semibold shadow-md transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {loading ? "Submitting..." : "Start Reflection"}
          </motion.button>
        </>
      )}
    </motion.div>
  );
}
