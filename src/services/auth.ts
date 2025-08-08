import { supabase } from './supabase';
import { User as SupabaseUser, AuthError, Session } from '@supabase/supabase-js';
import { User } from '../types';

/**
 * Supabase Authentication Service
 * Handles all authentication operations with proper error handling
 */
export class AuthService {
  /**
   * Convert Supabase user to our User type
   */
  private mapSupabaseUser(supabaseUser: SupabaseUser, session?: Session): User {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata?.full_name || 
            supabaseUser.user_metadata?.name || 
            supabaseUser.email?.split('@')[0] || 
            'User',
      avatar: supabaseUser.user_metadata?.avatar_url || 
              supabaseUser.user_metadata?.picture ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${supabaseUser.id}`,
      createdAt: new Date(supabaseUser.created_at),
    };
  }

  /**
   * Format auth errors into user-friendly messages
   */
  private formatAuthError(error: AuthError): string {
    switch (error.message) {
      case 'Invalid login credentials':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'Email not confirmed':
        return 'Please check your email and click the confirmation link before signing in.';
      case 'User already registered':
        return 'An account with this email already exists. Try signing in instead.';
      case 'Signup requires a valid password':
        return 'Password must be at least 6 characters long.';
      case 'Unable to validate email address: invalid format':
        return 'Please enter a valid email address.';
      case 'Password should be at least 6 characters':
        return 'Password must be at least 6 characters long.';
      case 'Email rate limit exceeded':
        return 'Too many emails sent. Please wait a few minutes before trying again.';
      default:
        return error.message || 'An unexpected error occurred. Please try again.';
    }
  }

  /**
   * Sign up with email and password
   */
  async signUp(email: string, password: string, fullName?: string): Promise<{
    user: User | null;
    session: Session | null;
    emailSent: boolean;
  }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: fullName ? { full_name: fullName.trim() } : undefined,
        },
      });

      if (error) {
        throw new Error(this.formatAuthError(error));
      }

      const user = data.user ? this.mapSupabaseUser(data.user, data.session) : null;

      return {
        user,
        session: data.session,
        emailSent: !data.session, // If no session, email confirmation is required
      };
    } catch (error) {
      throw error instanceof Error ? error : new Error('Sign up failed');
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<{
    user: User;
    session: Session;
  }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        throw new Error(this.formatAuthError(error));
      }

      if (!data.user || !data.session) {
        throw new Error('Sign in failed - no user data received');
      }

      const user = this.mapSupabaseUser(data.user, data.session);

      return {
        user,
        session: data.session,
      };
    } catch (error) {
      throw error instanceof Error ? error : new Error('Sign in failed');
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(this.formatAuthError(error));
      }
    } catch (error) {
      throw error instanceof Error ? error : new Error('Sign out failed');
    }
  }

  /**
   * Send password reset email
   */
  async resetPassword(email: string): Promise<void> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        {
          redirectTo: process.env.EXPO_PUBLIC_SUPABASE_AUTH_REDIRECT_URL,
        }
      );

      if (error) {
        throw new Error(this.formatAuthError(error));
      }
    } catch (error) {
      throw error instanceof Error ? error : new Error('Password reset failed');
    }
  }

  /**
   * Update user password
   */
  async updatePassword(newPassword: string): Promise<void> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw new Error(this.formatAuthError(error));
      }
    } catch (error) {
      throw error instanceof Error ? error : new Error('Password update failed');
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: {
    fullName?: string;
    avatarUrl?: string;
  }): Promise<User> {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: updates.fullName,
          avatar_url: updates.avatarUrl,
        },
      });

      if (error) {
        throw new Error(this.formatAuthError(error));
      }

      if (!data.user) {
        throw new Error('Profile update failed - no user data received');
      }

      return this.mapSupabaseUser(data.user);
    } catch (error) {
      throw error instanceof Error ? error : new Error('Profile update failed');
    }
  }

  /**
   * Get current session
   */
  async getCurrentSession(): Promise<{
    user: User | null;
    session: Session | null;
  }> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        throw new Error(this.formatAuthError(error));
      }

      const user = session?.user ? this.mapSupabaseUser(session.user, session) : null;

      return {
        user,
        session,
      };
    } catch (error) {
      console.warn('Failed to get current session:', error);
      return { user: null, session: null };
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    const { user } = await this.getCurrentSession();
    return user;
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (user: User | null, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user ? this.mapSupabaseUser(session.user, session) : null;
      callback(user, session);
    });
  }

  /**
   * Resend email confirmation
   */
  async resendConfirmation(email: string): Promise<void> {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim().toLowerCase(),
      });

      if (error) {
        throw new Error(this.formatAuthError(error));
      }
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to resend confirmation email');
    }
  }

  /**
   * Check if email is available (not already registered)
   */
  async isEmailAvailable(email: string): Promise<boolean> {
    try {
      // Attempt to sign in with a dummy password to check if email exists
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: 'dummy-password-for-email-check',
      });

      // If we get "Invalid login credentials", the email exists
      // If we get "Email not confirmed", the email exists but isn't confirmed
      // If we get other errors, we assume the email doesn't exist
      if (error?.message === 'Invalid login credentials' || 
          error?.message === 'Email not confirmed') {
        return false; // Email is taken
      }

      return true; // Email is available
    } catch (error) {
      return true; // Assume available on error
    }
  }
}

// Export singleton instance
export const authService = new AuthService();