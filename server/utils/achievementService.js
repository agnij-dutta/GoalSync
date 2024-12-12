import Achievement from '../models/Achievement.js';
import UserProfile from '../models/UserProfile.js';
import { createAchievementNotification } from './notificationService.js';

export const checkAndAwardAchievements = async (userId, context) => {
  try {
    const userProfile = await UserProfile.findOne({ userId });
    const unlockedAchievements = userProfile.achievements.map(a => a.achievement.toString());
    
    const achievements = await Achievement.find({
      _id: { $nin: unlockedAchievements }
    });

    const newAchievements = [];

    for (const achievement of achievements) {
      if (await checkAchievementCriteria(achievement, userId, context)) {
        newAchievements.push({
          achievement: achievement._id,
          unlockedAt: new Date()
        });

        await createAchievementNotification(userId, achievement);
      }
    }

    if (newAchievements.length > 0) {
      userProfile.achievements.push(...newAchievements);
      await userProfile.save();
    }

    return newAchievements;
  } catch (error) {
    console.error('Error checking achievements:', error);
    throw error;
  }
};

const checkAchievementCriteria = async (achievement, userId, context) => {
  // Implementation of specific achievement criteria checks
  switch (achievement.type) {
    case 'STREAK':
      return await checkStreakAchievement(achievement, userId);
    case 'MILESTONE':
      return await checkMilestoneAchievement(achievement, userId);
    case 'COLLABORATION':
      return await checkCollaborationAchievement(achievement, userId);
    case 'SPECIAL':
      return await checkSpecialAchievement(achievement, userId, context);
    default:
      return false;
  }
};

const checkStreakAchievement = async (achievement, userId) => {
  const userProfile = await UserProfile.findOne({ userId });
  return userProfile.stats.currentStreak >= achievement.criteria.get('requiredStreak');
};

const checkMilestoneAchievement = async (achievement, userId) => {
  // Implementation for milestone-based achievements
  return false;
};

const checkCollaborationAchievement = async (achievement, userId) => {
  // Implementation for collaboration-based achievements
  return false;
};

const checkSpecialAchievement = async (achievement, userId, context) => {
  // Implementation for special achievements
  return false;
};