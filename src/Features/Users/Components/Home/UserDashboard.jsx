import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Auth/AuthSclice';
import api from '../../Api/baseurl';
import Dashboard from '../../components/Dashboard';

export default function UserDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(null);
  const [reflection, setReflection] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("userdata") || "{}");

  useEffect(() => {
    const fetchReflectionStatus = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/reflection/Daily");
        if (res.data.success) {
          setReflection(res.data.data);
          setHasSubmittedToday(true);
        } else {
          setHasSubmittedToday(false);
        }
      } catch (error) {
        console.error("Reflection fetch failed", error);
        setHasSubmittedToday(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReflectionStatus();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate('/');
  };

  const handleReflectionSuccess = (newReflection) => {
    setReflection(newReflection);
    setHasSubmittedToday(true);
    setShowCheckIn(false);
  };

  return (
    <Dashboard
      user={user}
      reflection={reflection}
      isLoading={isLoading}
      hasSubmittedToday={hasSubmittedToday}
      showCheckIn={showCheckIn}
      onLogout={handleLogout}
      onShowCheckIn={() => setShowCheckIn(true)}
      onCloseCheckIn={() => setShowCheckIn(false)}
      onReflectionSuccess={handleReflectionSuccess}
    />
  );
}