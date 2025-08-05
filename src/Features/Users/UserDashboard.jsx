import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Auth/AuthSclice';
import DailyCheckIn from './Components/Reflection/DailyPrompt';
import api from '../../Api/baseurl';
import { toast } from 'react-toastify';

export default function UserDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(null); // null = loading
  const [reflection, setReflection] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [weeklyReflections, setWeeklyReflections] = useState([]);

  const user = JSON.parse(localStorage.getItem("userdata") || "{}");

  const fetchReflectionStatus = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/reflection/Daily",{
        withCredentials:true
      });
      const ress = await api.get("/reflection/Weekly",{
        withCredentials:true
      });
      setWeeklyReflections(ress.data.data)
      if (res.data.success) {
        setReflection(res.data.data || "");
        setHasSubmittedToday(true);
      } else {
        setHasSubmittedToday(false);
      }
    } catch (error) {
      console.error("Reflection fetch failed", error);
      setHasSubmittedToday(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReflectionStatus();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate('/');
  };

  const handlePrompt = () => {
    if (hasSubmittedToday) {
      toast.info("You've already completed today's check-in.");
    } else {
      setShowCheckIn(true);
    }
  };

  const handleReflectionSuccess = () => {
    fetchReflectionStatus(); // Refetch the reflection status after submission
    setShowCheckIn(false);
    toast.success("Daily check-in completed successfully!");
  };

  const handleCloseModal = () => {
    setShowCheckIn(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome back, <span className="text-blue-600">{user.fullName}</span>
            </h1>
            <p className="text-gray-600">How are you feeling today?</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Your Profile
            </h2>
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Name:</span>
                <span className="text-gray-600">{user.name}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium text-gray-700">ID:</span>
                <span className="text-gray-600">{user.userid}</span>
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-green-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Daily Reflection
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-20">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : hasSubmittedToday ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-lg font-semibold">Great job! You've completed today's check-in.</p>
                </div>
                {reflection && (
                  <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 shadow-sm">
                    <p className="text-gray-700 italic relative pl-4 before:absolute before:left-0 before:top-1 before:text-2xl">
                      {reflection}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p>You haven't submitted today's reflection yet.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/user/chat')}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chat With AI
            </button>
            <button
              onClick={handlePrompt}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Daily Check-In
            </button>
          </div>
        </div>

        {showCheckIn && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full relative animate-fade-in">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                onClick={handleCloseModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <DailyCheckIn onSuccess={handleReflectionSuccess} />
            </div>

          </div>
        )}

        <Link to="/user/calendar">
          <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            View Reflection Calendar 📅
          </button>
        </Link>
      </div>      
    </div>
  );s
}