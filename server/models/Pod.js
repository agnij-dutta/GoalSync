import mongoose from 'mongoose';

const podSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  goals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal',
  }],
  maxMembers: {
    type: Number,
    default: 5,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Pod', podSchema);