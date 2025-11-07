import { useState } from "react";

export default function OtpModal({ isOpen, onClose, onVerify }) {
  const [otp, setOtp] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp); // Pass OTP back to parent for verification
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="w-full border border-gray-300 rounded-lg p-2 mb-4 text-center tracking-widest text-lg"
          />
          <div className="flex justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
