import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Auth/AuthSclice';

export default function UserDashboard() {
  // const user =JSON.parse(localStorage.getItem("userdata"));
  const user = useSelector(state=>state.auth.user);
  const navigate = useNavigate();
        
  const dispatch = useDispatch();
  const id = (localStorage.getItem("userId"));

 let handlelogout = async ()=>{
    localStorage.removeItem("userId");
        localStorage.removeItem("userdata");
        await dispatch(logout());
      navigate('/');

 }
  console.log(user)
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome, {user.fullName}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Your Info</h2>
            <p><span className="font-medium">Name:</span> {user.fullName}</p>
            <p><span className="font-medium">Id:</span> {user.id}</p>
            <p><span className="font-medium">Account Status:</span> {user.isActive?"Active":"Inactive"}</p>

          </div>

          {/* Placeholder for future widgets */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-green-600">Coming Soon</h2>
            <p>Here you can show recent orders, tasks, mood, etc.</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Quick Actions</h2>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              View Orders
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Track Mood
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handlelogout}>
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
