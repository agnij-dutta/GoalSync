import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import passport from 'passport';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id);
    const sanitizedUser = sanitizeUser(user);

    res.status(201).json({
      token,
      user: sanitizedUser
    });
  } catch (error) {
    console.error('Registration error details:', error.message);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }
      try {
        const token = generateToken(user._id);
        const sanitizedUser = sanitizeUser(user);
        console.log('User logged in successfully:', sanitizedUser);
        return res.json({
          token,
          user: sanitizedUser
        });
      } catch (error) {
        console.error('Error generating token:', error);
        return res.status(500).json({ message: 'Error during login' });
      }
    });
  })(req, res, next);
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const handleGitHubCallback = async (req, res) => {
  try {
    const token = generateToken(req.user._id);
    res.redirect(`${process.env.FRONTEND_URL}/auth-callback?token=${token}`);
  } catch (error) {
    console.error('Error during GitHub callback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const sanitizeUser = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar
  };
};
