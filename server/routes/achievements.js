import express from 'express';
import { auth } from '../middleware/auth.js';
import Achievement from '../models/Achievement.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const achievements = await Achievement.find({ userId: req.user.userId });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 