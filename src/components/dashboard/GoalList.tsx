import React, { useState, useEffect } from 'react';
import { Target, Plus } from 'lucide-react';
import { Goal, User } from '../../types';
import GoalModal from './GoalModal';
import api from '../../services/api';

interface GoalListProps {
  user?: User;
  onGoalCreated?: (goal: Goal) => void;
}

const GoalList: React.FC<GoalListProps> = ({ user, onGoalCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGoals();
  }, [user]);

  const fetchGoals = async () => {
    try {
      if (!user) return;
      const token = localStorage.getItem('auth_token');
      const response = await api.get(`/goals?userId=${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGoals(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load goals. Please try again later.');
      console.error('Error fetching goals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoalCreated = (newGoal: Goal) => {
    setGoals(prevGoals => [...prevGoals, newGoal]);
    onGoalCreated?.(newGoal);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchGoals}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Goal
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal._id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Target className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{goal.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{goal.description}</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {goal.category}
              </span>
            </div>

            <div className="mt-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                      {goal.progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-700">
                  <div
                    style={{ width: `${goal.progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 dark:bg-blue-400"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {user && (
        <GoalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onGoalCreated={handleGoalCreated}
          user={user}
        />
      )}
    </div>
  );
};

export default GoalList;
