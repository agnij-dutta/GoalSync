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
  
  register: async (data) => {
    try {
      set({ loading: true, error: null });
      const user = await authService.register(data);
      set({ user, isAuthenticated: true });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  
  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false, error: null });
  },
  
  clearError: () => set({ error: null }),
}));

export default useAuthStore;