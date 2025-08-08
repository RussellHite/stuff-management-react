import 'react-native-url-polyfill/auto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Database, SupabaseConfig, ConnectionHealth } from '../types/supabase';

/**
 * Environment-aware Supabase configuration
 * Switches between development and production Supabase projects
 * based on the build environment
 */
class SupabaseService {
  private client: SupabaseClient<Database> | null = null;
  private config: SupabaseConfig | null = null;
  private connectionHealth: ConnectionHealth = {
    isConnected: false,
    lastChecked: new Date(),
  };

  /**
   * Get the current environment
   */
  private getCurrentEnvironment(): 'development' | 'production' {
    // Check if we're in production build
    if (Constants.expoConfig?.extra?.environment?.current === 'production') {
      return 'production';
    }
    
    // Check environment variables
    const env = process.env.EXPO_PUBLIC_ENV || 'development';
    return env === 'production' ? 'production' : 'development';
  }

  /**
   * Get environment-specific Supabase configuration
   */
  private getConfig(): SupabaseConfig {
    if (this.config) {
      return this.config;
    }

    const environment = this.getCurrentEnvironment();
    let url: string;
    let anonKey: string;

    if (environment === 'production') {
      // Production configuration
      url = process.env.EXPO_PUBLIC_SUPABASE_URL_PROD || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
      anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY_PROD || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
    } else {
      // Development configuration (includes preview deployments)
      url = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
      anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
    }

    // Validate configuration
    if (!url || !anonKey) {
      throw new Error(
        `Supabase configuration missing for ${environment} environment. ` +
        'Please check your environment variables.'
      );
    }

    this.config = {
      url,
      anonKey,
      authRedirectUrl: process.env.EXPO_PUBLIC_SUPABASE_AUTH_REDIRECT_URL || 'exp://localhost:19000/auth/callback',
      realtimeEnabled: process.env.EXPO_PUBLIC_SUPABASE_REALTIME_ENABLED === 'true',
    };

    return this.config;
  }

  /**
   * Initialize Supabase client with environment-aware configuration
   */
  private initializeClient(): SupabaseClient<Database> {
    if (this.client) {
      return this.client;
    }

    const config = this.getConfig();

    this.client = createClient<Database>(config.url, config.anonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
      realtime: {
        channels: config.realtimeEnabled ? undefined : [],
      },
      global: {
        fetch: (url, options = {}) => {
          // Add retry logic for network failures
          return fetch(url, {
            ...options,
            // Timeout after 10 seconds
            signal: AbortSignal.timeout(10000),
          }).catch((error) => {
            console.warn('Supabase request failed:', error);
            throw error;
          });
        },
      },
    });

    // Set up connection monitoring
    this.startConnectionMonitoring();

    return this.client;
  }

  /**
   * Get the Supabase client instance
   */
  public getClient(): SupabaseClient<Database> {
    return this.initializeClient();
  }

  /**
   * Check connection health
   */
  public async checkConnectionHealth(): Promise<ConnectionHealth> {
    const startTime = Date.now();
    
    try {
      const client = this.getClient();
      
      // Simple ping to test connection
      const { error } = await client
        .from('profiles')
        .select('id')
        .limit(1)
        .single();

      const latency = Date.now() - startTime;

      this.connectionHealth = {
        isConnected: !error,
        lastChecked: new Date(),
        latency,
        error: error?.message,
      };
    } catch (error) {
      const latency = Date.now() - startTime;
      
      this.connectionHealth = {
        isConnected: false,
        lastChecked: new Date(),
        latency,
        error: error instanceof Error ? error.message : 'Unknown connection error',
      };
    }

    return this.connectionHealth;
  }

  /**
   * Start periodic connection monitoring
   */
  private startConnectionMonitoring(): void {
    // Check connection every 30 seconds when app is active
    setInterval(() => {
      this.checkConnectionHealth().catch((error) => {
        console.warn('Connection health check failed:', error);
      });
    }, 30000);
  }

  /**
   * Get current connection status
   */
  public getConnectionHealth(): ConnectionHealth {
    return this.connectionHealth;
  }

  /**
   * Get current environment information
   */
  public getEnvironmentInfo() {
    return {
      environment: this.getCurrentEnvironment(),
      config: this.config,
      connectionHealth: this.connectionHealth,
    };
  }

  /**
   * Test connection with retry logic
   */
  public async testConnection(retries: number = 3): Promise<boolean> {
    for (let i = 0; i < retries; i++) {
      try {
        const health = await this.checkConnectionHealth();
        if (health.isConnected) {
          return true;
        }
      } catch (error) {
        console.warn(`Connection test attempt ${i + 1} failed:`, error);
      }

      // Wait before retry (exponential backoff)
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }

    return false;
  }

  /**
   * Reset client (useful for environment switching)
   */
  public resetClient(): void {
    this.client = null;
    this.config = null;
    this.connectionHealth = {
      isConnected: false,
      lastChecked: new Date(),
    };
  }
}

// Export singleton instance
export const supabaseService = new SupabaseService();

// Export client getter for direct use
export const supabase = supabaseService.getClient();

// Export convenience methods
export const {
  checkConnectionHealth,
  getConnectionHealth,
  getEnvironmentInfo,
  testConnection,
  resetClient,
} = supabaseService;