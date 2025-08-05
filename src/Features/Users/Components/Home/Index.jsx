import DashboardHeader from './DashBoardHeader';
import UserInfoCard from './UserInfoCard';
import ReflectionCard from './ReflectionCard';
import QuickActions from './QuickActions';
import ReflectionModal from './ReflectionModal';

export default function Dashboard({
  user,
  reflection,
  isLoading,
  hasSubmittedToday,
  showCheckIn,
  onLogout,
  onShowCheckIn,
  onCloseCheckIn,
  onReflectionSuccess
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <DashboardHeader user={user} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <UserInfoCard user={user} />
          <ReflectionCard 
            reflection={reflection}
            isLoading={isLoading}
            hasSubmittedToday={hasSubmittedToday}
            onShowCheckIn={onShowCheckIn}
          />
        </div>

        <QuickActions 
          onShowCheckIn={onShowCheckIn}
          onLogout={onLogout}
        />

        {showCheckIn && (
          <ReflectionModal 
            onClose={onCloseCheckIn}
            onSuccess={onReflectionSuccess}
          />
        )}
      </div>
    </div>
  );
}