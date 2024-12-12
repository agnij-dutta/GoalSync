import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Target, Star } from 'lucide-react';

interface BadgeProps {
  type: 'achievement' | 'milestone' | 'streak';
  title: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
}

const BadgeIcon = {
  achievement: Award,
  milestone: Target,
  streak: Trophy
};

const rarityColors = {
  common: 'bg-gray-100 text-gray-800',
  rare: 'bg-blue-100 text-blue-800',
  epic: 'bg-purple-100 text-purple-800',
  legendary: 'bg-yellow-100 text-yellow-800'
};

const AchievementBadge: React.FC<BadgeProps> = ({
  type,
  title,
  description,
  rarity,
  unlocked
}) => {
  const Icon = BadgeIcon[type] || Star;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative p-4 rounded-lg ${
        unlocked ? 'bg-white' : 'bg-gray-50 opacity-60'
      } shadow-md`}
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-full ${rarityColors[rarity]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="absolute top-2 right-2">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            rarityColors[rarity]
          }`}
        >
          {rarity}
        </span>
      </div>
    </motion.div>
  );
};

export default AchievementBadge;