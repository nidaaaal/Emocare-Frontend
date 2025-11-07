import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import img from "../../../../assets/Images/userdashboard/img3.jpg";
import ModalWrapper from "../Ui/ModalWrapper";
import DailyCheckIn from "../Reflection/DailyPrompt";
import api from "../../../../Api/baseurl";

export default function HeroSection({ name }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkInCompleted, setCheckInCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await api.get("/reflection/Daily", { withCredentials: true });
        setCheckInCompleted(res.data.success === true);
      } catch (err) {
        console.error("Error checking daily status:", err);
      }
    }
    fetchStatus();
  }, []);

  return (
    <>
      <section className="relative bg-gradient-to-r from-emerald-500 via-green-400 to-lime-300 text-white py-20 overflow-hidden rounded-b-3xl shadow-lg">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={img}
            alt="Wellness background"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-lime-100 to-emerald-200 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaLeaf className="text-lime-100 drop-shadow-md text-4xl md:text-5xl" />
            Welcome back, {name}
          </motion.h1>

          {/* Buttons */}
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {/* Daily Check-In */}
            {checkInCompleted ? (
              <button
                disabled
                className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-semibold rounded-2xl shadow-lg"
              >
                <FaCheckCircle className="text-white" /> Check-In Completed
              </button>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-8 py-4 bg-yellow-400 text-yellow-900 font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:bg-yellow-300 transition-all duration-300"
              >
                Daily Check-In
              </button>
            )}

            {/* Finish Habit */}
            <button
              onClick={() => navigate("/user/habit")}
              className="flex items-center gap-2 px-8 py-4 bg-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:bg-blue-400 transition-all duration-300"
            >
              Finish Habit
            </button>

            {/* Finish Task */}
            <button
              onClick={() => navigate("/tasks")}
              className="flex items-center gap-2 px-8 py-4 bg-purple-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:bg-purple-400 transition-all duration-300"
            >
              Finish Task
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modal for Daily Check-In */}
      <ModalWrapper isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DailyCheckIn
          onComplete={() => {
            setCheckInCompleted(true);
            setIsModalOpen(false); // close modal after submit
          }}
        />
      </ModalWrapper>
    </>
  );
}
