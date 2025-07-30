import React, { useState } from 'react';
import api from '../../Api/baseurl';
import { toast } from 'react-toastify';

export default function ForgotPassword({ onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOldPassword = async () => {
    try {
      const res = await api.post('/authentication/ForgotPassword/ByPrevious', {
        email,
        previousPassword
      });
      if (res.data.success) {
        setStep(2);
        setError('');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      setError('Verification failed. Try again.');
    }
  };

  const handleSetNewPassword = async () => {
        let payload ={
            email :email,
            newPassword :newPassword
        }

      const res = await api.patch('/authentication/ForgotPassword/Password',payload);
      if (res.data.success) {
        toast.success('Password changed successfully!');
        onClose();
      } else {
        toast.error(res.data.message)
    } 
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-2 border rounded mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter previous password"
              className="w-full p-2 border rounded mb-3"
              value={previousPassword}
              onChange={(e) => setPreviousPassword(e.target.value)}
            />
            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              onClick={handleVerifyOldPassword}
            >
              Verify
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-2 border rounded mb-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
            <button
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
              onClick={handleSetNewPassword}
            >
              Set New Password
            </button>
          </>
        )}

        <button className="mt-4 text-sm text-gray-600 hover:underline" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
