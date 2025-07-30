import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Auth/AuthSclice';
import DailyCheckIn from './Components/Reflection/DailyPrompt';
import api from '../../Api/baseurl';

export default function UserDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(null); // null = loading
  const [reflection,SetReflection] = useState("");

  const user = JSON.parse(localStorage.getItem("userdata") || "{}");

  useEffect(() => {
    const fetchReflectionStatus = async () => {
      try {
        const res = await api.get("/reflection/Daily");
        if(res.data.success){
                  console.log(res.data.data);

          SetReflection(res.data.data)
        }

        const notSubmitted =
          !res.data.data || res.data.message?.toLowerCase().includes("not found");

        setHasSubmittedToday(!notSubmitted);
        setShowCheckIn(notSubmitted);
      } catch (error) {
        console.error("Reflection fetch failed", error);
        setHasSubmittedToday(false); // fallback to showing modal
        setShowCheckIn(true);
      }
    };

    fetchReflectionStatus();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate('/');
  };

  const handleReflectionSuccess = () => {
    setHasSubmittedToday(true);
    setShowCheckIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Welcome, {user.fullName}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Your Info</h2>
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Id:</span> {user.userid}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-green-600">Daily Reflection</h2>
            {hasSubmittedToday ? (
              <>
             <p className="text-lg text-gray-800 font-semibold mb-2">
                🌟 Great job! You've completed today's check-in.
              </p>
          <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 shadow-sm">
              <p className="text-gray-700 italic relative pl-4 before:absolute before:left-0 before:top-1 before:text-2xl before:text-indigo-400 before:content-['“'] after:absolute after:bottom-1 after:right-0 after:text-2xl after:text-indigo-400 after:content-['”']">
                {reflection}
              </p>
            </div>
            </>
            ) : (
              <p className="text-red-500">⚠️ You haven't submitted today's reflection yet.</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Quick Actions</h2>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
            onClick={()=>{navigate('/user/chat')}}>
              Chat With AI
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => setShowCheckIn(true)}
            >
              Start Daily Check-In
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </div>
        </div>

        {showCheckIn && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                onClick={() => setShowCheckIn(false)}
              >
                ✖
              </button>
              <DailyCheckIn onSuccess={handleReflectionSuccess} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
