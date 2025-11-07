import React, { useState, useEffect } from 'react';
import api from '../../Api/baseurl';
import PendingApprovalScreen from './Components/PendingApprovalScreen';
import VerifiedDashboard from './Components/VerifiedDashboard';

export default function PsyDashboard() {
  const [profile, setProfile] = useState(null);
  const [isApproved, setIsApproved] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    todaySessions: 0,
    pendingTasks: 0,
    newMessages: 0,
    totalClients: 0,
    monthlyEarnings: 0,
    averageRating: 0
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const userData = JSON.parse(localStorage.getItem('userdata') || '{}');
        setProfile(userData);

        // Fetch psychologist profile with approval status
        try {
          const res = await api.get('/psychologist/profile', { withCredentials: true });
          if (res.data?.success && res.data?.data) {
            const psychologistData = res.data.data;
            setProfile(prev => ({ ...prev, ...psychologistData }));
            setIsApproved(psychologistData.isApproved || false);
            
            // Update stats with real data if available
            if (psychologistData.stats) {
              setStats(psychologistData.stats);
            }
          }
        } catch (apiError) {
          // If profile endpoint doesn't exist, try alternative endpoint
          console.log('Primary profile endpoint failed, trying alternative...');
          
          // Alternative: Get by ID if available
          const userId = userData.userid || localStorage.getItem('userid');
          if (userId) {
            try {
              const altRes = await api.get(`/psychologist/${userId}`, { withCredentials: true });
              if (altRes.data?.success && altRes.data?.data) {
                const psychologistData = altRes.data.data;
                setIsApproved(psychologistData.isApproved !== undefined ? psychologistData.isApproved : null);
                setProfile(prev => ({ ...prev, ...psychologistData }));
              }
            } catch (altError) {
              console.log('Alternative endpoint also failed:', altError);
              // Default to checking localStorage or setting as pending
              setIsApproved(false); // Assume pending if can't verify
            }
          } else {
            setIsApproved(false); // Assume pending if no user ID
          }
        }
      } catch (error) {
        console.error('Profile fetch failed:', error);
        setIsApproved(false); // Default to pending on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show pending approval screen if not approved
  if (isApproved === false) {
    return <PendingApprovalScreen profile={profile} />;
  }

  // Show verified dashboard if approved
  return <VerifiedDashboard profile={profile} stats={stats} />;
}
