import React from 'react';

export default function VerifiedDashboard({ profile, stats }) {
  const upcomingSessions = [
    { id: 1, client: 'Sarah Johnson', time: '10:00 AM', type: 'Video Call', status: 'upcoming' },
    { id: 2, client: 'Michael Chen', time: '2:00 PM', type: 'In-Person', status: 'upcoming' },
    { id: 3, client: 'Emily Davis', time: '4:30 PM', type: 'Video Call', status: 'upcoming' },
  ];

  const recentActivities = [
    { id: 1, type: 'session', message: 'Completed session with John Smith', time: '2 hours ago', icon: '✓' },
    { id: 2, type: 'message', message: 'New message from client', time: '4 hours ago', icon: '💬' },
    { id: 3, type: 'task', message: 'Review completed assessment', time: '1 day ago', icon: '📋' },
    { id: 4, type: 'appointment', message: 'New appointment scheduled', time: '2 days ago', icon: '📅' },
  ];

  const StatCard = ({ title, value, icon, color, subtitle, trend }) => (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-white bg-opacity-30`}>
          <span className="text-2xl">{icon}</span>
        </div>
        {trend && (
          <span className={`text-sm font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <h3 className="text-lg font-medium text-gray-700 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      {subtitle && <p className="text-sm text-gray-600 mt-2">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold text-gray-800">
                  Welcome back, {profile?.name || 'Psychologist'} 👩‍⚕️
                </h1>
                <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Verified
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <p className="text-lg">
                  Here's your comprehensive dashboard overview for today
                </p>
                {profile?.specialization && (
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium">
                    {profile.specialization}
                  </span>
                )}
                {profile?.licenseNumber && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                    License: {profile.licenseNumber}
                  </span>
                )}
              </div>
              {/* Quick Stats in Header */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-teal-600 font-semibold">✓</span>
                  <span>Account Active</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-blue-600 font-semibold">📅</span>
                  <span>Last Active: Today</span>
                </div>
                {profile?.experience && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-purple-600 font-semibold">⭐</span>
                    <span>{profile.experience} years experience</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium shadow-md flex items-center gap-2">
                <span>➕</span> New Session
              </button>
              <button className="px-6 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
                <span>📅</span> View Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Today's Sessions"
            value={stats.todaySessions || 0}
            icon="📅"
            color="from-blue-400 to-blue-600"
            subtitle={`${stats.todaySessions || 0} scheduled appointments`}
            trend={stats.todaySessions > 0 ? 12 : undefined}
          />
          <StatCard
            title="Pending Tasks"
            value={stats.pendingTasks || 0}
            icon="📋"
            color="from-green-400 to-green-600"
            subtitle="Review and assessments"
          />
          <StatCard
            title="New Messages"
            value={stats.newMessages || 0}
            icon="💬"
            color="from-yellow-400 to-yellow-600"
            subtitle="Unread messages"
          />
          <StatCard
            title="Total Clients"
            value={stats.totalClients || 0}
            icon="👥"
            color="from-purple-400 to-purple-600"
            subtitle="Active clients"
            trend={stats.totalClients > 0 ? 8 : undefined}
          />
          <StatCard
            title="Monthly Earnings"
            value={`$${(stats.monthlyEarnings || 0).toLocaleString()}`}
            icon="💰"
            color="from-emerald-400 to-emerald-600"
            subtitle="Current month"
            trend={stats.monthlyEarnings > 0 ? 15 : undefined}
          />
          <StatCard
            title="Average Rating"
            value={stats.averageRating > 0 ? stats.averageRating.toFixed(1) : 'N/A'}
            icon="⭐"
            color="from-orange-400 to-orange-600"
            subtitle={stats.averageRating > 0 ? "Based on client reviews" : "No reviews yet"}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span>📅</span> Upcoming Sessions
              </h2>
              <button className="text-teal-500 hover:text-teal-600 font-medium text-sm">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {upcomingSessions && upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-xl border-l-4 border-teal-500 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg mb-1">{session.client}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <span>🕐</span> {session.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <span>💻</span> {session.type}
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {session.status}
                      </span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="px-4 py-1.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium">
                        Start Session
                      </button>
                      <button className="px-4 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Reschedule
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <span className="text-4xl mb-4 block">📅</span>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No Upcoming Sessions</h3>
                  <p className="text-sm text-gray-500 mb-4">You don't have any scheduled sessions today.</p>
                  <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium">
                    Schedule New Session
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>🔔</span> Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-2 bg-teal-100 rounded-lg text-teal-600 text-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full text-center text-teal-500 hover:text-teal-600 font-medium text-sm">
                View All Activity
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>⚡</span> Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-center">
                  <div className="text-2xl mb-2">📝</div>
                  <div className="text-sm font-medium">New Note</div>
                </button>
                <button className="p-4 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm font-medium">Reports</div>
                </button>
                <button className="p-4 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-center">
                  <div className="text-2xl mb-2">👤</div>
                  <div className="text-sm font-medium">Clients</div>
                </button>
                <button className="p-4 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-center">
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="text-sm font-medium">Settings</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>📈</span> Performance Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-teal-600">94%</p>
              <p className="text-sm text-gray-600 mt-1">Session Completion</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-blue-600">18</p>
              <p className="text-sm text-gray-600 mt-1">Sessions This Week</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-green-600">4.8/5</p>
              <p className="text-sm text-gray-600 mt-1">Client Satisfaction</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-purple-600">2.5h</p>
              <p className="text-sm text-gray-600 mt-1">Avg. Session Time</p>
            </div>
          </div>
        </div>

        {/* Professional Profile Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>👤</span> Professional Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Info */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-5 rounded-xl border border-teal-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🎓</span> Professional Details
                </h3>
                <div className="space-y-3">
                  {profile?.specialization && (
                    <div className="flex items-start justify-between">
                      <span className="text-gray-600 font-medium">Specialization:</span>
                      <span className="text-gray-800 font-semibold text-right">{profile.specialization}</span>
                    </div>
                  )}
                  {profile?.licenseNumber && (
                    <div className="flex items-start justify-between">
                      <span className="text-gray-600 font-medium">License Number:</span>
                      <span className="text-gray-800 font-semibold text-right">{profile.licenseNumber}</span>
                    </div>
                  )}
                  {profile?.experience && (
                    <div className="flex items-start justify-between">
                      <span className="text-gray-600 font-medium">Years of Experience:</span>
                      <span className="text-gray-800 font-semibold text-right">{profile.experience} years</span>
                    </div>
                  )}
                  {profile?.education && (
                    <div className="flex items-start justify-between">
                      <span className="text-gray-600 font-medium">Education:</span>
                      <span className="text-gray-800 font-semibold text-right">{profile.education}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📧</span> Contact Information
                </h3>
                <div className="space-y-3">
                  {profile?.email && (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600">Email:</span>
                      <span className="text-gray-800 font-medium">{profile.email}</span>
                    </div>
                  )}
                  {profile?.phone && (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600">Phone:</span>
                      <span className="text-gray-800 font-medium">{profile.phone}</span>
                    </div>
                  )}
                  {profile?.location && (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600">Location:</span>
                      <span className="text-gray-800 font-medium">{profile.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Credentials & Certifications */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-xl border border-purple-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>✅</span> Account Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Verification Status:</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Account Status:</span>
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
                      Active
                    </span>
                  </div>
                  {profile?.verifiedDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Verified On:</span>
                      <span className="text-gray-800 font-semibold">
                        {new Date(profile.verifiedDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Member Since:</span>
                    <span className="text-gray-800 font-semibold">
                      {profile?.joinDate ? new Date(profile.joinDate).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions for Profile */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-5 rounded-xl border border-orange-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>⚡</span> Profile Management
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-white rounded-lg hover:shadow-md transition-all text-center border border-gray-200">
                    <div className="text-2xl mb-2">✏️</div>
                    <div className="text-xs font-medium text-gray-700">Edit Profile</div>
                  </button>
                  <button className="p-3 bg-white rounded-lg hover:shadow-md transition-all text-center border border-gray-200">
                    <div className="text-2xl mb-2">🔒</div>
                    <div className="text-xs font-medium text-gray-700">Security</div>
                  </button>
                  <button className="p-3 bg-white rounded-lg hover:shadow-md transition-all text-center border border-gray-200">
                    <div className="text-2xl mb-2">📄</div>
                    <div className="text-xs font-medium text-gray-700">Documents</div>
                  </button>
                  <button className="p-3 bg-white rounded-lg hover:shadow-md transition-all text-center border border-gray-200">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="text-xs font-medium text-gray-700">Analytics</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

