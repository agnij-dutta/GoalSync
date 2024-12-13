import express from 'express';
import { auth } from '../middleware/auth.js';
import Progress from '../models/Progress.js'; 

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const progressData = await Progress.findOne({ userId: req.user.userId });
    res.json(progressData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 