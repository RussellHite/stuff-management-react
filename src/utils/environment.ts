import Constants from 'expo-constants';

export type Environment = 'development' | 'production';

/**
 * Get the current environment
 */
export const getCurrentEnvironment = (): Environment => {
  // Check Expo config first
  if (Constants.expoConfig?.extra?.environment?.current === 'production') {
    return 'production';
  }
  
  // Check environment variables
  const env = process.env.EXPO_PUBLIC_ENV || 'development';
  return env === 'production' ? 'production' : 'development';
};

/**
 * Check if we're in development mode
 */
export const isDevelopment = (): boolean => {
  return getCurrentEnvironment() === 'development';
};

/**
 * Check if we're in production mode
 */
export const isProduction = (): boolean => {
  return getCurrentEnvironment() === 'production';
};

/**
 * Get environment-specific configuration
 */
export const getEnvironmentConfig = () => {
  const environment = getCurrentEnvironment();
  
  return {
    environment,
    isDevelopment: environment === 'development',
    isProduction: environment === 'production',
    showEnvironmentIndicator: environment !== 'production',
  };
};

/**
 * Validate Supabase environment configuration
 */
export const validateSupabaseConfig = (): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const environment = getCurrentEnvironment();

  // Check required environment variables
  const requiredVars = [
    'EXPO_PUBLIC_SUPABASE_URL',
    'EXPO_PUBLIC_SUPABASE_ANON_KEY',
  ];

  // Check production-specific vars if in production
  if (environment === 'production') {
    const prodUrl = process.env.EXPO_PUBLIC_SUPABASE_URL_PROD;
    const prodKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY_PROD;
    
    if (!prodUrl && !process.env.EXPO_PUBLIC_SUPABASE_URL) {
      errors.push('Production Supabase URL is required');
    }
    
    if (!prodKey && !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
      errors.push('Production Supabase anon key is required');
    }

    if (prodUrl === process.env.EXPO_PUBLIC_SUPABASE_URL) {
      warnings.push('Production and development Supabase URLs are the same');
    }
  }

  // Check if required variables are present
  requiredVars.forEach((varName) => {
    const value = process.env[varName];
    if (!value) {
      errors.push(`Missing required environment variable: ${varName}`);
    } else if (value.includes('your_') || value.includes('_here')) {
      errors.push(`Environment variable ${varName} appears to be a placeholder`);
    }
  });

  // Check URL format
  const supabaseUrl = environment === 'production' 
    ? process.env.EXPO_PUBLIC_SUPABASE_URL_PROD || process.env.EXPO_PUBLIC_SUPABASE_URL
    : process.env.EXPO_PUBLIC_SUPABASE_URL;

  if (supabaseUrl) {
    try {
      const url = new URL(supabaseUrl);
      if (!url.hostname.includes('supabase')) {
        warnings.push('Supabase URL does not appear to be a valid Supabase endpoint');
      }
      if (url.protocol !== 'https:') {
        errors.push('Supabase URL must use HTTPS');
      }
    } catch {
      errors.push('Supabase URL is not a valid URL');
    }
  }

  // Check auth redirect URL
  const authRedirectUrl = process.env.EXPO_PUBLIC_SUPABASE_AUTH_REDIRECT_URL;
  if (authRedirectUrl && !authRedirectUrl.startsWith('exp://') && !authRedirectUrl.startsWith('https://')) {
    warnings.push('Auth redirect URL should start with exp:// for Expo or https:// for web');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Get debug information about the current environment
 */
export const getEnvironmentDebugInfo = () => {
  const environment = getCurrentEnvironment();
  const supabaseValidation = validateSupabaseConfig();
  
  return {
    environment,
    expoConfig: Constants.expoConfig?.extra,
    environmentVariables: {
      EXPO_PUBLIC_ENV: process.env.EXPO_PUBLIC_ENV,
      EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL ? '[SET]' : '[NOT SET]',
      EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ? '[SET]' : '[NOT SET]',
      EXPO_PUBLIC_SUPABASE_URL_PROD: process.env.EXPO_PUBLIC_SUPABASE_URL_PROD ? '[SET]' : '[NOT SET]',
      EXPO_PUBLIC_SUPABASE_ANON_KEY_PROD: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY_PROD ? '[SET]' : '[NOT SET]',
    },
    supabaseValidation,
    constants: {
      platform: Constants.platform,
      appOwnership: Constants.appOwnership,
      debugMode: __DEV__,
    },
  };
};

/**
 * Environment-specific app name for easy identification
 */
export const getAppDisplayName = (): string => {
  const environment = getCurrentEnvironment();
  const baseName = Constants.expoConfig?.name || 'Stuff Happens';
  
  if (environment === 'development') {
    return `${baseName} [DEV]`;
  }
  
  return baseName;
};