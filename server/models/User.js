import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: function() {
      return !this.githubId; // Email only required if not using GitHub
    },
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: function() {
      return !this.githubId; // Password only required if not using GitHub
    }
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true
  },
  avatar: String,
  goals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal',
  }],
  pods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pod',
  }],
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);