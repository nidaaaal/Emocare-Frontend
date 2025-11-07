import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { fadeInBoth } from "../../Utils/motionVariants";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// Lazy load big sections
const HeroSection = lazy(() => import("../Components/HeroSection"));
const BodySection = lazy(() => import("../Components/BodySection"));
const ServicesSection = lazy(() => import("../Components/ServicesSection"));
const AboutSection = lazy(() => import("../Components/AboutSection"));
const TestimonialsSection = lazy(() => import("../Components/TestimonialsSection"));
const CallToAction = lazy(() => import("../Components/CallToAction"));

export default function LandingPage() {
  const sections = [
    HeroSection,
    BodySection,
    ServicesSection,
    AboutSection,
    TestimonialsSection,
    CallToAction,
  ];

  return (
    <>
      <Navbar />
      
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        {sections.map((Section, idx) => (
          <motion.div
            key={idx}
            variants={fadeInBoth(idx * 0.15, 20)}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{
              amount: 0.3,
              once: false,
              margin: "0px 0px -100px 0px"
            }}
          >
            <Section />
          </motion.div>
        ))}
      </Suspense>

      <Footer />
    </>
  );
}
