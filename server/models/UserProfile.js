import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalityType: {
    type: String,
    enum: ['ACHIEVER', 'EXPLORER', 'SOCIALIZER', 'COMPETITOR'],
  },
  commitmentLevel: {
    type: Number,
    min: 1,
    max: 5
  },
  timezone: String,
  achievements: [{
    achievement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Achievement'
    },
    unlockedAt: Date
  }],
  stats: {
    transparencyScore: {
      type: Number,
      default: 0
    },
    commitmentRating: {
      type: Number,
      default: 0
    },
    progressConsistency: {
      type: Number,
      default: 0
    },
    peerEndorsements: {
      type: Number,
      default: 0
    }
  },
  preferences: {
    notificationFrequency: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      default: 'MEDIUM'
    },
    anonymousFeedback: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('UserProfile', userProfileSchema);