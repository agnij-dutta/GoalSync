// Local storage utilities
export const StorageKeys = {
  TOKEN: 'auth_token',
  USER: 'user_data',
} as const;

export const storage = {
  setToken: (token: string) => {
    localStorage.setItem(StorageKeys.TOKEN, token);
  },
  
  getToken: () => {
    return localStorage.getItem(StorageKeys.TOKEN);
  },
  
  removeToken: () => {
    localStorage.removeItem(StorageKeys.TOKEN);
  },
  
  setUser: (user: any) => {
    localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
  },
  
  getUser: () => {
    const user = localStorage.getItem(StorageKeys.USER);
    return user ? JSON.parse(user) : null;
  },
  
  removeUser: () => {
    localStorage.removeItem(StorageKeys.USER);
  },
  
  clearAuth: () => {
    storage.removeToken();
    storage.removeUser();
  },
};