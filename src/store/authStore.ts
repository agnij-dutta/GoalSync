import { create } from 'zustand';
import { authService, LoginCredentials, RegisterData } from '../services/auth.service';
import { AuthError, ValidationError, NetworkError } from '../utils/errors';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setToken: (token: string) => Promise<void>;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof ValidationError) {
    return Object.values(error.fields || {}).join(', ');
  }
  if (error instanceof AuthError) {
    return 'Invalid email or password';
  }
  if (error instanceof NetworkError) {
    return 'Unable to connect to server. Please try again.';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  
  login: async (credentials) => {
    try {
      set({ loading: true, error: null });
      const user = await authService.login(credentials);
      set({ user, isAuthenticated: true });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  
  register: async (data: RegisterData) => {
    try {
      set({ loading: true, error: null });
      const response = await authService.register(data);
      set({ user: response.user, isAuthenticated: true });
      localStorage.setItem('token', response.token);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false, error: null });
  },
  
  clearError: () => set({ error: null }),
  
  setToken: async (token) => {
    try {
      set({ loading: true, error: null });
      localStorage.setItem('token', token);
      
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const user = await response.json();
      set({ user, isAuthenticated: true, error: null });
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      set({ 
        error: 'Failed to load user profile. Please try logging in again.',
        isAuthenticated: false,
        user: null 
      });
      localStorage.removeItem('token');
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;

