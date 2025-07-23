import React from 'react';

export default function PsyDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-semibold text-blue-700 mb-4">Welcome, Psychologist 👩‍⚕️</h1>
        <p className="text-gray-600 mb-6">
          Here's your dashboard overview. You can manage your sessions, view assigned tasks, and check recent activity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-blue-800">Today's Sessions</h2>
            <p className="text-sm text-gray-700 mt-1">3 scheduled</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-green-800">Pending Tasks</h2>
            <p className="text-sm text-gray-700 mt-1">5 to review</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-yellow-800">New Messages</h2>
            <p className="text-sm text-gray-700 mt-1">2 unread</p>
          </div>
        </div>
      </div>
    </div>
  );
}
