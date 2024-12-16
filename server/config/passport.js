import passport from 'passport';
import { initializeGitHubStrategy } from './github.strategy.js';
import { initializeLocalStrategy } from './local.strategy.js';
import User from '../models/User.js';

export const initializePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Initialize Local Strategy
  const localStrategy = initializeLocalStrategy();
  passport.use(localStrategy);

  // Only initialize GitHub strategy if credentials are provided
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    const githubStrategy = initializeGitHubStrategy();
    if (githubStrategy) {
      passport.use(githubStrategy);
    }
  } else {
    console.warn('GitHub OAuth credentials not found. GitHub authentication will be disabled.');
  }
};