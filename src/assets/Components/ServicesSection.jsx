import React from "react";
import { motion } from "framer-motion";
import { Heart, Target, BookOpen } from "lucide-react";

const services = [
  { 
    title: "Therapy Sessions", 
    description: "Personalized one-on-one sessions with licensed professionals.", 
    icon: <Heart className="w-10 h-10 text-pink-500" /> 
  },
  { 
    title: "Habit Build", 
    description: "Connect and share experiences in guided group settings.", 
    icon: <Target className="w-10 h-10 text-blue-500" /> 
  },
  { 
    title: "Self-Help Resources", 
    description: "Access curated mental wellness tools and guides.", 
    icon: <BookOpen className="w-10 h-10 text-green-500" /> 
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 text-center">
        <motion.h3 
          className="text-4xl font-bold mb-14 text-gray-800"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="p-8 shadow-md rounded-xl bg-white hover:shadow-xl transition transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-5">{service.icon}</div>
              <h4 className="text-2xl font-semibold mb-4 text-gray-800">{service.title}</h4>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
