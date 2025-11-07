import React from "react";
import { motion } from "framer-motion";
import img from "../Images/AiGenarated/ai1.jpeg";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-r from-indigo-50 to-indigo-100 py-16 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:flex md:items-center md:gap-12">
        
        {/* Image */}
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative group">
            <img
              src={img}
              alt="About Emocare"
              className="rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 rounded-xl bg-black/10 group-hover:bg-black/20 transition duration-500"></div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          className="md:w-1/2 md:pl-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold mb-4 text-gray-800">
            About <span className="text-indigo-600">Emocare</span>
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            At Emocare, we believe emotional wellness is just as important as
            physical health. Our platform connects you with certified therapists,
            offering a safe, supportive, and confidential space for healing.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            With cutting-edge tools and personalized guidance, we empower you to
            take charge of your mental well-being—anytime, anywhere.
          </p>

          <motion.a
            href="#"
            whileHover={{ x: 5 }}
            className="text-indigo-600 font-semibold inline-flex items-center group"
          >
            Learn More
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
