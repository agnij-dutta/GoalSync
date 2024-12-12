import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import Header from './Header';
import GoalList from './GoalList';
import PodList from './PodList';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Goals</h2>
            <GoalList />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Pods</h2>
            <PodList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;