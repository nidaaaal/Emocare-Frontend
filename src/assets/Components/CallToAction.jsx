import React from "react";
import { useNavigate } from "react-router-dom";

export default function CallToAction() {
  const navigate =  useNavigate();
  return (
    <section
      id="contact"
      className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500 py-16 text-center text-white"
    >
      <div className="container mx-auto px-6">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-4 animate-fade-in">
          Start Your Healing Journey Today
        </h3>
        <p className="mb-8 text-lg md:text-xl opacity-90 max-w-2xl mx-auto animate-fade-in delay-200">
          Connect with our certified therapists and take the first step toward
          emotional well-being. Your safe space is just a click away.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={()=>navigate("/login")}
            className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold shadow-lg hover:bg-gray-100 hover:scale-105 transform transition duration-300"
          >
            Get Started
          </button>
          <a
            href="/learn-more"
            className="border border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-indigo-600 transition duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
