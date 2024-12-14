import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import Header from './Header';
import GoalList from './GoalList';
import PodList from './PodList';
import PodModal from './PodModal';
import { useTheme } from '../ThemeProvider';
import axios from 'axios';
import { Goal, Pod } from '../../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, logout } = useAuthStore();
  const { theme } = useTheme();

  const [goals, setGoals] = useState<Goal[]>([]);
  const [pods, setPods] = useState<Pod[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/login');
    } else if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, loading, navigate]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/goals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(response.data.goals);
      setPods(response.data.pods);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePodCreated = (newPod: Pod) => {
    setPods((prevPods) => [...prevPods, newPod]);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Header onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Goals</h2>
            <GoalList goals={goals} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Pods</h2>
            <PodList pods={pods} onPodCreated={handlePodCreated} />
          </div>
        </div>
      </main>

      <PodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPodCreated={handlePodCreated}
      />
    </div>
  );
};

export default Dashboard;

