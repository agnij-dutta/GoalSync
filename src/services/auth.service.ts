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
      
      // Set the token in the api instance
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
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
      
      // Set the token in the api instance
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { token, user };
    } catch (error) {
      console.error('Register error:', error);
      throw handleApiError(error);
    }
  },

  async getProfile() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  logout() {
    storage.clearAuth();
    delete api.defaults.headers.common['Authorization'];
  }
};