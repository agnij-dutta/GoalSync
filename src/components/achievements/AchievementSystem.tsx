import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, Target } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  unlockedAt?: Date;
}

const achievements: Achievement[] = [
  {
    id: '1',
    name: 'First Goal Created',
    description: 'Created your first goal',
    icon: 'Target',
    rarity: 'COMMON'
  },
  {
    id: '2',
    name: 'Streak Master',
    description: 'Maintained a 7-day streak',
    icon: 'Award',
    rarity: 'RARE'
  },
  {
    id: '3',
    name: 'Pod Leader',
    description: 'Successfully led a pod to achieve their goals',
    icon: 'Trophy',
    rarity: 'EPIC'
  }
];

const rarityColors = {
  COMMON: 'bg-gray-100 text-gray-800',
  RARE: 'bg-blue-100 text-blue-800',
  EPIC: 'bg-purple-100 text-purple-800',
  LEGENDARY: 'bg-yellow-100 text-yellow-800'
};

const AchievementSystem = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target />;
      case 'Award':
        return <Award />;
      case 'Trophy':
        return <Trophy />;
      default:
        return <Star />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Achievements</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden rounded-lg shadow-md p-6 ${
              achievement.unlockedAt ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${rarityColors[achievement.rarity]}`}>
                  {getIcon(achievement.icon)}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
              </div>
            </div>
            
            {achievement.unlockedAt && (
              <div className="mt-4 text-sm text-gray-500">
                Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
              </div>
            )}
            
            <div className="absolute top-2 right-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                rarityColors[achievement.rarity]
              }`}>
                {achievement.rarity}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementSystem;