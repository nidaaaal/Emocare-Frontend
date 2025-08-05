import React from 'react';

export default function DashboardHeader({ user }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, <span className="text-indigo-600">{user.fullName}</span>
      </h1>
      <div className="mt-2 md:mt-0 text-sm text-gray-500">
        Last login: {new Date().toLocaleString()}
      </div>
    </div>
  );
}