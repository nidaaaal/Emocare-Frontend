import React from 'react';
import { FaRegCalendarCheck, FaRegCalendarTimes } from 'react-icons/fa';

export default function ReflectionCard({ reflection, isLoading, hasSubmittedToday, onShowCheckIn }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
      <div className="flex items-center gap-4 mb-4">
        {hasSubmittedToday ? (
          <FaRegCalendarCheck className="text-4xl text-green-500" />
        ) : (
          <FaRegCalendarTimes className="text-4xl text-amber-500" />
        )}
        <h2 className="text-xl font-semibold text-gray-800">Daily Reflection</h2>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ) : hasSubmittedToday ? (
        <>
          <p className="text-lg text-gray-800 font-semibold mb-2 flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Today's reflection completed
          </p>
          <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 shadow-sm">
            <p className="text-gray-700 italic relative pl-4 before:absolute before:left-0 before:top-1 before:text-2xl before:text-indigo-400 before:content">
              {reflection}
            </p>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500 shadow-sm">
            <p className="text-amber-700 flex items-center gap-2">
              <span className="text-amber-500">⚠</span>
              You haven't submitted today's reflection yet
            </p>
          </div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
            onClick={onShowCheckIn}
          >
            Start Daily Check-In
          </button>
        </div>
      )}
    </div>
  );
}