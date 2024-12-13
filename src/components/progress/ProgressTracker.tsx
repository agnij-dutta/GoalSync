import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, TrendingUp, Award, Calendar } from 'lucide-react';
import axios from 'axios';

interface ProgressData {
  weeklyProgress: number;
  streak: number;
  achievements: Array<{
    name: string;
    unlockedAt: Date;
  }>;
  milestoneCompletions: Array<{
    title: string;
    completedAt: Date;
  }>;
}

const ProgressTracker = () => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/progress', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProgressData(response.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading progress data...</div>;
  }

  if (!progressData) {
    return <div>No progress data available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Progress</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Weekly Progress Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Weekly Progress</h3>
            <LineChart className="h-6 w-6 text-blue-600" />
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {progressData.weeklyProgress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressData.weeklyProgress}%` }}
                transition={{ duration: 1 }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
              />
            </div>
          </div>
        </motion.div>

        {/* Streak Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Current Streak</h3>
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-center">
            <span className="text-4xl font-bold text-green-600">
              {progressData.streak}
            </span>
            <span className="text-gray-600 ml-2">days</span>
          </div>
        </motion.div>

        {/* Recent Achievements Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Achievements</h3>
            <Award className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="space-y-3">
            {progressData.achievements.slice(0, 3).map((achievement, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-gray-600">{achievement.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Milestones */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Milestones</h3>
        <div className="bg-white rounded-lg shadow-md">
          {progressData.milestoneCompletions.map((milestone, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="text-gray-900">{milestone.title}</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(milestone.completedAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;