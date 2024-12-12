import React from 'react';
import { motion } from 'framer-motion';
import { Target, Brain, Heart, Briefcase, GraduationCap, Wallet } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  backgroundImage: string;
}

const categories: Category[] = [
  {
    id: 'personal',
    name: 'Personal Growth',
    icon: <Target className="w-8 h-8" />,
    description: 'Focus on self-improvement and personal development',
    backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    icon: <Heart className="w-8 h-8" />,
    description: 'Achieve your health and fitness goals',
    backgroundImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'career',
    name: 'Career',
    icon: <Briefcase className="w-8 h-8" />,
    description: 'Advance your professional journey',
    backgroundImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'education',
    name: 'Education',
    icon: <GraduationCap className="w-8 h-8" />,
    description: 'Learn and grow your knowledge',
    backgroundImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'financial',
    name: 'Financial',
    icon: <Wallet className="w-8 h-8" />,
    description: 'Achieve your financial goals',
    backgroundImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

interface CategorySelectionProps {
  onSelect: (category: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {categories.map((category) => (
        <motion.div
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
          onClick={() => onSelect(category.id)}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
            style={{ backgroundImage: `url(${category.backgroundImage})` }}
          />
          <div className="relative z-10 p-6 bg-white bg-opacity-90">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {category.name}
              </h3>
            </div>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CategorySelection;