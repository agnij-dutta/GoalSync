import mongoose from 'mongoose';

const podMatchSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  compatibility: {
    goalSimilarity: Number,
    commitmentAlignment: Number,
    personalityMatch: Number,
    overallScore: Number
  },
  status: {
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
    default: 'PENDING'
  },
  expiresAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('PodMatch', podMatchSchema);