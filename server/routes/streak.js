import express from 'express';
import { auth } from '../middleware/auth.js';
import Streak from '../models/Streak.js'; 

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const streakData = await Streak.findOne({ userId: req.user.userId });
    res.json(streakData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 