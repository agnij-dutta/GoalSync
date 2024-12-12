import Notification from '../models/Notification.js';
import { io } from '../index.js';

export const createNotification = async ({
  userId,
  title,
  message,
  type,
  metadata = {}
}) => {
  try {
    const notification = new Notification({
      userId,
      title,
      message,
      type,
      metadata
    });

    await notification.save();

    // Emit the notification to the specific user
    io.to(`user:${userId}`).emit('notification', notification);

    return notification;
  } catch (error) {
    console.error('Failed to create notification:', error);
    throw error;
  }
};

export const createAchievementNotification = async (userId, achievement) => {
  return createNotification({
    userId,
    title: 'New Achievement Unlocked!',
    message: `Congratulations! You've earned the "${achievement.name}" achievement.`,
    type: 'ACHIEVEMENT',
    metadata: { achievementId: achievement._id }
  });
};

export const createMilestoneNotification = async (userId, milestone) => {
  return createNotification({
    userId,
    title: 'Milestone Completed',
    message: `You've completed the milestone: ${milestone.title}`,
    type: 'MILESTONE',
    metadata: { milestoneId: milestone._id }
  });
};

export const createPodNotification = async (userId, pod, action) => {
  return createNotification({
    userId,
    title: 'Pod Update',
    message: `${action} in pod "${pod.name}"`,
    type: 'POD',
    metadata: { podId: pod._id, action }
  });
};