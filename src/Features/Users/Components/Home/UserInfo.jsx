import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

export default function UserInfoCard({ user }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
      <div className="flex items-center gap-4 mb-4">
        <FaUserCircle className="text-4xl text-indigo-500" />
        <h2 className="text-xl font-semibold text-gray-800">Your Profile</h2>
      </div>
      <div className="space-y-2">
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Name:</span>
          <span className="text-gray-600">{user.name}</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-700">ID:</span>
          <span className="text-gray-600">{user.userid}</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-600">{user.email || 'Not provided'}</span>
        </p>
      </div>
    </div>
  );
}