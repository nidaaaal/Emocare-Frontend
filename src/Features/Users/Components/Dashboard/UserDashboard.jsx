// src/Features/Users/Components/UserDashboard.jsx
import { useEffect, useState } from "react";
import api from "../../../../Api/baseurl";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import WellnessQuote from "./WellnessQuote";
import ImageSlider from "./ImageSlider";
import StatsOverview from "./StatsOverview";
import WellnessRecommendations from "./WellnessRecommendations";
import Footer from "./Footer";

export default function UserDashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile", { withCredentials: true });
        if (res.data?.success) setProfile(res.data.data);
      } catch (e) {
        console.error("Profile fetch failed:", e?.message);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Navbar */}
      <Navbar user={profile} />

      {/* Hero Section */}
      <HeroSection name={profile?.fullName || "Guest"} />

      {/* Main Dashboard Content */}
      <main className="container mx-auto px-4 py-10 space-y-12">
        <WellnessQuote />

        <ImageSlider profile={profile} />

        <StatsOverview profile={profile} />

        <WellnessRecommendations profile={profile} />

        {/* Additional Awareness Section */}
        <section className="bg-white shadow-lg rounded-xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-emerald-600">
            Mental Health Awareness
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Learning about mental wellness is a lifelong journey. Explore tips,
            engage in daily habits, and track your progress to maintain a
            balanced mind and positive lifestyle.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Practice mindfulness daily</li>
            <li>Keep track of your mood and stress levels</li>
            <li>Engage in regular physical activity</li>
            <li>Connect with supportive communities</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
