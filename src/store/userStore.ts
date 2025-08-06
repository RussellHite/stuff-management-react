import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStore, User } from '../types';
import { STORAGE_KEYS, createPersistConfig } from '../utils/storage';

// Mock authentication function (replace with real auth later)
const mockAuth = async (email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email === 'demo@stuffhappens.com' && password === 'demo123') {
    return {
      id: '1',
      email,
      name: 'Demo User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
      createdAt: new Date(),
    };
  }

  throw new Error('Invalid credentials');
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const user = await mockAuth(email, password);
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateProfile: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              ...updates,
              updatedAt: new Date(),
            } as User & { updatedAt: Date },
          });
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    createPersistConfig<UserStore>(STORAGE_KEYS.USER)
  )
);
