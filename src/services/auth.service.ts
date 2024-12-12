import api from './api';
import { storage } from '../utils/storage';
import { handleApiError, AuthError } from '../utils/errors';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      if (!token || !user) {
        throw new AuthError('Invalid server response');
      }

      storage.setToken(token);
      storage.setUser(user);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw handleApiError(error);
    }
  },

  async register(data: RegisterData) {
    try {
      const response = await api.post('/auth/register', data);
      const { token, user } = response.data;
      
      if (!token || !user) {
        throw new AuthError('Invalid server response');
      }

      storage.setToken(token);
      storage.setUser(user);
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw handleApiError(error);
    }
  },

  async getProfile() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw handleApiError(error);
    }
  },

  logout() {
    storage.clearAuth();
  },
};