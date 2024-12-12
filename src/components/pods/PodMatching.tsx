import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Check, X } from 'lucide-react';
import axios from 'axios';

interface MatchedUser {
  _id: string;
  name: string;
  compatibility: {
    goalSimilarity: number;
    commitmentAlignment: number;
    personalityMatch: number;
    overallScore: number;
  };
}

const PodMatching = () => {
  const [matchedUsers, setMatchedUsers] = useState<MatchedUser[]>([]);
  const [loading, setLoading] = useState(false);

  const findMatches = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/pods/matches', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMatchedUsers(response.data);
    } catch (error) {
      console.error('Error finding matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMatchResponse = async (userId: string, accept: boolean) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/pods/matches/${userId}/respond`, 
        { accept },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setMatchedUsers(matchedUsers.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error responding to match:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Find Your Pod Members</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={findMatches}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          <Users className="h-5 w-5 mr-2" />
          {loading ? 'Finding Matches...' : 'Find Matches'}
        </motion.button>
      </div>

      <div className="space-y-6">
        {matchedUsers.map((user) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                <div className="mt-2 space-y-2">
                  <CompatibilityBar
                    label="Goal Similarity"
                    value={user.compatibility.goalSimilarity}
                  />
                  <CompatibilityBar
                    label="Commitment Alignment"
                    value={user.compatibility.commitmentAlignment}
                  />
                  <CompatibilityBar
                    label="Personality Match"
                    value={user.compatibility.personalityMatch}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleMatchResponse(user._id, true)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                >
                  <Check className="h-6 w-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleMatchResponse(user._id, false)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CompatibilityBar = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium text-gray-900">{Math.round(value * 100)}%</span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full">
      <div
        className="h-2 bg-blue-600 rounded-full"
        style={{ width: `${value * 100}%` }}
      />
    </div>
  </div>
);

export default PodMatching;