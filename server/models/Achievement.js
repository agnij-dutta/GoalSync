import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['STREAK', 'MILESTONE', 'COLLABORATION', 'SPECIAL'],
    required: true
  },
  criteria: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  rarity: {
    type: String,
    enum: ['COMMON', 'RARE', 'EPIC', 'LEGENDARY'],
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Achievement', achievementSchema);