// src/Features/Users/Components/Dashboard/ImageSlider.jsx
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import slide1 from "../../../../assets/Images/userdashboard/slide1.jpg";
import slide2 from "../../../../assets/Images/userdashboard/slide3.jpg";
import slide3 from "../../../../assets/Images/userdashboard/slide2.jpg";

export default function ImageSlider({ profile }) {
  const baseSlides = useMemo(
    () => [
      {
        id: 1,
        image: slide1,
        title: "Morning Clarity",
        desc: "Begin with 3 minutes of mindful breathing.",
      },
      {
        id: 2,
        image: slide2,
        title: "Fuel Your Focus",
        desc: "A balanced plate helps a balanced mind.",
      },
      {
        id: 3,
        image: slide3,
        title: "Unwind Gently",
        desc: "Try a guided body scan before bed.",
      },
    ],
    []
  );

  const slides = useMemo(() => {
    const name = profile?.fullName?.split(" ")[0] || "you";
    return baseSlides.map((s, idx) => ({
      ...s,
      desc: idx === 0 ? `Hey ${name}, ${s.desc}` : s.desc,
    }));
  }, [baseSlides, profile]);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[idx].id}
          src={slides[idx].image}
          alt={slides[idx].title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Slide info */}
      <div className="absolute bottom-5 left-5 right-5">
        <div className="max-w-xl bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md">
          <h3 className="text-lg md:text-xl font-bold text-gray-900">
            {slides[idx].title}
          </h3>
          <p className="text-sm md:text-base text-gray-700 mt-1">{slides[idx].desc}</p>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 right-5 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIdx(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === idx ? "bg-emerald-600 scale-125" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
