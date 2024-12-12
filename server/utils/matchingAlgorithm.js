import UserProfile from '../models/UserProfile.js';
import Goal from '../models/Goal.js';

export const calculateCompatibility = async (user1Id, user2Id) => {
  const [user1Profile, user2Profile] = await Promise.all([
    UserProfile.findOne({ userId: user1Id }),
    UserProfile.findOne({ userId: user2Id })
  ]);

  const [user1Goals, user2Goals] = await Promise.all([
    Goal.find({ userId: user1Id }),
    Goal.find({ userId: user2Id })
  ]);

  // Calculate goal similarity
  const goalSimilarity = calculateGoalSimilarity(user1Goals, user2Goals);
  
  // Calculate commitment alignment
  const commitmentAlignment = Math.abs(
    user1Profile.commitmentLevel - user2Profile.commitmentLevel
  ) / 4; // Normalize to 0-1

  // Calculate personality match
  const personalityMatch = calculatePersonalityMatch(
    user1Profile.personalityType,
    user2Profile.personalityType
  );

  const overallScore = (goalSimilarity + commitmentAlignment + personalityMatch) / 3;

  return {
    goalSimilarity,
    commitmentAlignment,
    personalityMatch,
    overallScore
  };
};

const calculateGoalSimilarity = (goals1, goals2) => {
  // Implementation of goal similarity calculation
  // Based on category overlap, timeline similarity, etc.
  return 0.5; // Placeholder
};

const calculatePersonalityMatch = (type1, type2) => {
  const compatibilityMatrix = {
    ACHIEVER: { ACHIEVER: 0.7, EXPLORER: 0.5, SOCIALIZER: 0.6, COMPETITOR: 0.8 },
    EXPLORER: { ACHIEVER: 0.5, EXPLORER: 0.8, SOCIALIZER: 0.7, COMPETITOR: 0.4 },
    SOCIALIZER: { ACHIEVER: 0.6, EXPLORER: 0.7, SOCIALIZER: 0.9, COMPETITOR: 0.5 },
    COMPETITOR: { ACHIEVER: 0.8, EXPLORER: 0.4, SOCIALIZER: 0.5, COMPETITOR: 0.6 }
  };

  return compatibilityMatrix[type1][type2] || 0.5;
};