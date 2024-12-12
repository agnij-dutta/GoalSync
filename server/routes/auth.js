import express from 'express';
import passport from 'passport';
import { register, login, getProfile, handleGitHubCallback } from '../controllers/auth.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// GitHub OAuth routes - only enable if credentials exist

router.get('/github', (res, req, next) => {
  console.log('GitHub auth route hit');
  passport.authenticate('github', { scope: ['user:email'] })(res, req, next);
});

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  handleGitHubCallback
);


// Regular authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getProfile);

export default router;