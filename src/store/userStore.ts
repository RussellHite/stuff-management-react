import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStore, User } from '../types';
import { STORAGE_KEYS, createPersistConfig } from '../utils/storage';
import { authService } from '../services/auth';
import { Session } from '@supabase/supabase-js';

// Enhanced user store interface
interface ExtendedUserStore extends UserStore {
  session: Session | null;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ emailSent: boolean }>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  initializeAuth: () => Promise<void>;
  clearSession: () => void;
}

export const useUserStore = create<ExtendedUserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      session: null,

      // Initialize auth state from Supabase
      initializeAuth: async () => {
        set({ isLoading: true });
        try {
          const { user, session } = await authService.getCurrentSession();
          set({
            user,
            session,
            isAuthenticated: !!user,
            isLoading: false,
          });

          // Set up auth state listener
          authService.onAuthStateChange((user, session) => {
            set({
              user,
              session,
              isAuthenticated: !!user,
              isLoading: false,
            });
          });
        } catch (error) {
          console.warn('Failed to initialize auth:', error);
          set({ isLoading: false });
        }
      },

      // Sign in with Supabase
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { user, session } = await authService.signIn(email, password);
          set({
            user,
            session,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // Sign up with Supabase
      signUp: async (email: string, password: string, fullName?: string) => {
        set({ isLoading: true });
        try {
          const { user, session, emailSent } = await authService.signUp(email, password, fullName);
          
          // If user is immediately available (no email confirmation), set as authenticated
          if (user && session) {
            set({
              user,
              session,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ isLoading: false });
          }

          return { emailSent };
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // Sign out
      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.signOut();
          set({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error) {
          // Even if sign out fails, clear local state
          set({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
          });
          throw error;
        }
      },

      // Update user profile
      updateProfile: async (updates: Partial<User>) => {
        const currentUser = get().user;
        if (!currentUser) {
          throw new Error('No user is currently authenticated');
        }

        set({ isLoading: true });
        try {
          const updatedUser = await authService.updateProfile({
            fullName: updates.name,
            avatarUrl: updates.avatar,
          });
          
          set({
            user: updatedUser,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // Reset password
      resetPassword: async (email: string) => {
        set({ isLoading: true });
        try {
          await authService.resetPassword(email);
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // Update password
      updatePassword: async (newPassword: string) => {
        set({ isLoading: true });
        try {
          await authService.updatePassword(newPassword);
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // Clear session (for logout without API call)
      clearSession: () => {
        set({
          user: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    createPersistConfig<ExtendedUserStore>(STORAGE_KEYS.USER)
  )
);
