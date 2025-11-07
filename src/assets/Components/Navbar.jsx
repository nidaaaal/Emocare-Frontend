import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false); // scrolling down → hide
    } else {
      setShow(true); // scrolling up → show
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  // Handles section navigation
  const handleNavClick = (sectionId) => {
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 300); // allow landing page to render
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      } bg-white shadow-md`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Emocare
        </h1>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => handleNavClick("services")}
              className="hover:text-indigo-600"
            >
              Services
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick("about")}
              className="hover:text-indigo-600"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick("testimonials")}
              className="hover:text-indigo-600"
            >
              Testimonials
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick("contact")}
              className="hover:text-indigo-600"
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Login Button */}
        <Link
          to="/login"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
