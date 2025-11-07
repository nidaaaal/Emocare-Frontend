import { X } from "lucide-react";

// src/utils/motionVariants.js
export const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 25,
    transition: { duration: 0.5, delay }
  }
});

export const fadeInDown = (delay = 0) => ({
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay }
  }
});

export const fadeInBoth = (delay = 0, distance = 30) => ({
  hidden: { 
    opacity: 0, 
    y: distance,
    transition: { 
      duration: 0.5, 
      ease: [0.42, 0, 0.58, 1] // Smooth ease-in-out
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.7, 
      delay,
      ease: [0.42, 0, 0.58, 1],
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    y: -distance, // Reverse direction on exit
    transition: { 
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1] 
    }
  }
});