import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';

export const initializeGitHubStrategy = () => {
  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    console.warn('GitHub OAuth credentials not found. GitHub authentication will be disabled.');
    return null;
  }
  console.log('Initializing GitHub strategy with client ID:', process.env.GITHUB_CLIENT_ID);

  return new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.FRONTEND_URL}/api/auth/github/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });

      if (!user) {
        user = await User.create({
          githubId: profile.id,
          name: profile.displayName || profile.username,
          email: profile.emails?.[0]?.value,
          avatar: profile.photos?.[0]?.value
        });
      }

      return done(null, user);
    } catch (error) {
      console.error('Error in GitHub strategy:', error);
      return done(error, null);
    }
  });
};