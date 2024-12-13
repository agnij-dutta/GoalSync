import express from 'express';
import { auth } from '../middleware/auth.js';
import Pod from '../models/Pod.js';
import User from '../models/User.js';

const router = express.Router();

// Get all pods
router.get('/', auth, async (req, res) => {
  try {
    const pods = await Pod.find().populate('members', 'name email');
    res.json(pods);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new pod
router.post('/', auth, async (req, res) => {
  try {
    const { name, category, maxMembers } = req.body;
    
    const pod = new Pod({
      name,
      category,
      maxMembers,
      members: [req.user.userId],
    });

    await pod.save();
    
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { pods: pod._id },
    });

    res.status(201).json(pod);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Join a pod
router.post('/:id/join', auth, async (req, res) => {
  try {
    const pod = await Pod.findById(req.params.id);
    
    if (!pod) {
      return res.status(404).json({ message: 'Pod not found' });
    }

    if (pod.members.length >= pod.maxMembers) {
      return res.status(400).json({ message: 'Pod is full' });
    }

    if (pod.members.includes(req.user.userId)) {
      return res.status(400).json({ message: 'Already a member' });
    }

    pod.members.push(req.user.userId);
    await pod.save();

    await User.findByIdAndUpdate(req.user.userId, {
      $push: { pods: pod._id },
    });

    res.json(pod);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/matches', auth, async (req, res) => {
  try {
    const matches = await Pod.findMatches(req.user.userId);
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;