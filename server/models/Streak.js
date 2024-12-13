import mongoose from 'mongoose';

const streakSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  bestStreak: {
    type: Number,
    default: 0
  },
  lastActiveDate: {
    type: Date,
    default: Date.now
  },
  milestonesAchieved: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Milestone' // Assuming you have a Milestone model
  }]
}, {
  timestamps: true
});

export default mongoose.model('Streak', streakSchema);
