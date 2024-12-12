import express from 'express';
import { auth } from '../middleware/auth.js';
import Goal from '../models/Goal.js';
import User from '../models/User.js';

const router = express.Router();

// Get all goals for a user
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.userId });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new goal
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, deadline, milestones } = req.body;
    
    const goal = new Goal({
      title,
      description,
      category,
      deadline,
      milestones,
      userId: req.user.userId,
    });

    await goal.save();
    
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { goals: goal._id },
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update goal progress
router.patch('/:id/progress', auth, async (req, res) => {
  try {
    const { progress } = req.body;
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { progress },
      { new: true }
    );
    
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update milestone status
router.patch('/:id/milestones/:milestoneId', auth, async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user.userId });
    
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    const milestone = goal.milestones.id(req.params.milestoneId);
    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    milestone.completed = req.body.completed;
    await goal.save();

    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;