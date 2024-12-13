import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weeklyProgress: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  achievements: [{
    achievement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Achievement'
    },
    unlockedAt: {
      type: Date,
      default: Date.now
    }
  }],
  milestoneCompletions: [{
    title: String,
    completedAt: Date
  }]
}, {
  timestamps: true
});

export default mongoose.model('Progress', progressSchema); 