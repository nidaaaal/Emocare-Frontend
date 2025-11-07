import React from "react";
import img from"../Images/AiGenarated/ai2.jpeg";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
export default function HeroSection() {
  const  navigate = useNavigate();
  return (
    <section className="bg-indigo-50 py-16 md:py-24">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-snug">
            Your Mental Wellness, <span className="text-indigo-600">Our Priority</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Connect with professional therapists and take the first step towards a healthier, happier you. 
            Personalized care for every emotional journey.
          </p>
          <button
           onClick={()=>navigate("/login")}
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-indigo-700 transition-all"
          >
            Get Started
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={img}
            alt="Therapy Session"
            className="rounded-2xl shadow-lg max-w-sm md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
