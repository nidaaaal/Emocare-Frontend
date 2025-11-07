import React from 'react';
import { toast } from 'react-toastify';

export default function PendingApprovalScreen({ profile }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          {/* Status Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-5xl">⏳</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">!</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Account Verification Pending
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Hello, {profile?.name || 'Psychologist'} 👩‍⚕️
            </p>
            <p className="text-lg text-gray-500">
              Your account is currently under review by our admin team
            </p>
          </div>

          {/* Status Card */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-8 border-l-4 border-yellow-500">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-3xl">📋</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Verification Status</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span>Application submitted successfully</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span>Credentials under review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-500">Admin approval pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's Being Reviewed */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🔍</span> What We're Reviewing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎓</span>
                  <h3 className="font-semibold text-gray-800">Professional Credentials</h3>
                </div>
                <p className="text-sm text-gray-600">License verification and qualifications</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📄</span>
                  <h3 className="font-semibold text-gray-800">Documentation</h3>
                </div>
                <p className="text-sm text-gray-600">Uploaded certificates and licenses</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">✅</span>
                  <h3 className="font-semibold text-gray-800">Account Information</h3>
                </div>
                <p className="text-sm text-gray-600">Personal and professional details</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🛡️</span>
                  <h3 className="font-semibold text-gray-800">Background Check</h3>
                </div>
                <p className="text-sm text-gray-600">Compliance and security verification</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Review Timeline</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10 relative">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold text-gray-800">Application Received</h3>
                    <p className="text-sm text-gray-600">Your application has been successfully submitted</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center z-10 relative animate-pulse">
                    <span className="text-white text-sm">⟳</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold text-gray-800">Under Review</h3>
                    <p className="text-sm text-gray-600">Our admin team is reviewing your credentials</p>
                    <p className="text-xs text-yellow-600 mt-1 font-medium">This typically takes 2-5 business days</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center z-10 relative">
                    <span className="text-gray-500 text-sm">⏸</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold text-gray-500">Approval</h3>
                    <p className="text-sm text-gray-500">You'll receive notification once approved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-teal-50 rounded-xl p-6 border border-teal-200 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>📧</span> What Happens Next?
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 mt-1">•</span>
                <span>You'll receive an email notification once your account is approved</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 mt-1">•</span>
                <span>Upon approval, you'll have full access to the dashboard and can start accepting clients</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 mt-1">•</span>
                <span>If additional information is needed, our team will contact you directly</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium shadow-md"
            >
              🔄 Refresh Status
            </button>
            <button
              onClick={() => {
                toast.info('Contact support at admin@emocare.com');
              }}
              className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              📞 Contact Support
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Expected review time: <span className="font-semibold">2-5 business days</span>
          </p>
        </div>
      </div>
    </div>
  );
}


