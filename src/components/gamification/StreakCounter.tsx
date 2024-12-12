import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakProps {
  currentStreak: number;
  bestStreak: number;
}

const StreakCounter: React.FC<StreakProps> = ({ currentStreak, bestStreak }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Goal Streak</h3>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Flame className="h-6 w-6 text-orange-500" />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-500">
            {currentStreak}
          </div>
          <div className="text-sm text-gray-500">Current Streak</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-500">
            {bestStreak}
          </div>
          <div className="text-sm text-gray-500">Best Streak</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          Keep going! You're on fire! 🔥
        </p>
      </div>
    </div>
  );
};

export default StreakCounter;