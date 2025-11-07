import { FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";

export default function BodySection() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 rounded-2xl shadow-xl p-10 max-w-5xl mx-auto mt-12 text-center overflow-hidden">
      {/* Decorative floating leaf */}
      <motion.div
        className="absolute top-4 left-4 text-emerald-200 text-6xl opacity-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <FaLeaf />
      </motion.div>

      <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-6">
        Your Awareness Journey
      </h2>

      <p className="text-gray-700 md:text-lg leading-relaxed mb-6">
        Awareness is the <span className="font-semibold text-teal-500">first step</span> toward change.
        Every mindful breath you take, every moment you choose yourself,
        brings you closer to a healthier and more balanced life.
      </p>

      <p className="text-gray-800 md:text-base leading-relaxed">
        Our platform is here to guide you — from tracking your mental wellness patterns
        to connecting you with professionals who care.  
        <span className="italic text-teal-600"> Keep moving forward.</span> Small steps today lead to a better tomorrow.
      </p>
    </section>
  );
}
