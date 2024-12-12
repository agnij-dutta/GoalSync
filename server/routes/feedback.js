import express from 'express';
import { auth } from '../middleware/auth.js';
import Feedback from '../models/Feedback.js';
import Pod from '../models/Pod.js';
import { createNotification } from '../utils/notificationService.js';

const router = express.Router();

// Submit feedback
router.post('/', auth, async (req, res) => {
  try {
    const { podId, memberId, rating, comment, isAnonymous } = req.body;

    // Verify pod membership
    const pod = await Pod.findOne({
      _id: podId,
      members: { $all: [req.user.userId, memberId] }
    });

    if (!pod) {
      return res.status(404).json({ message: 'Pod not found or unauthorized' });
    }

    const feedback = new Feedback({
      podId,
      fromUser: req.user.userId,
      toUser: memberId,
      rating,
      comment,
      isAnonymous
    });

    await feedback.save();

    // Create notification for feedback recipient
    await createNotification({
      userId: memberId,
      title: 'New Feedback Received',
      message: `You've received new feedback in ${pod.name}`,
      type: 'FEEDBACK',
      metadata: { podId, feedbackId: feedback._id }
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get feedback for a user
router.get('/received', auth, async (req, res) => {
  try {
    const feedback = await Feedback.find({ toUser: req.user.userId })
      .populate('fromUser', 'name')
      .populate('podId', 'name')
      .sort('-createdAt');

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;