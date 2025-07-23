import React from "react";

export default function AccountTypeModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-xl font-bold mb-4">Choose Account Type</h2>
        <div className="space-y-4">
          <button
            onClick={() => onSelect("user")}
            className="bg-blue-500 text-white px-6 py-2 rounded w-full"
          >
            👤 Register as User
          </button>
          <button
            onClick={() => onSelect("psychologist")}
            className="bg-purple-600 text-white px-6 py-2 rounded w-full"
          >
            🧠 Register as Psychologist
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-600 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
