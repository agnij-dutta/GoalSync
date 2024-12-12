import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  backgroundImage: String,
  suggestedMilestones: [{
    title: String,
    description: String,
    estimatedDuration: Number // in days
  }]
}, {
  timestamps: true
});

export default mongoose.model('Category', categorySchema);