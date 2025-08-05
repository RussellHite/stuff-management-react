import Constants from 'expo-constants';

export interface AppConfig {
  appName: string;
  appVersion: string;
  environment: 'development' | 'staging' | 'production';
  api: {
    url: string;
    timeout: number;
  };
  supabase: {
    url: string;
    anonKey: string;
  };
  analytics: {
    enabled: boolean;
    key: string;
  };
  debug: {
    enabled: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
  };
}

const getEnvVar = (key: string, defaultValue: string = ''): string => {
  return Constants.expoConfig?.extra?.[key] || process.env[key] || defaultValue;
};

export const config: AppConfig = {
  appName: getEnvVar('EXPO_PUBLIC_APP_NAME', 'Stuff Happens'),
  appVersion: getEnvVar('EXPO_PUBLIC_APP_VERSION', '1.0.0'),
  environment: getEnvVar('EXPO_PUBLIC_ENV', 'development') as AppConfig['environment'],
  
  api: {
    url: getEnvVar('EXPO_PUBLIC_API_URL', 'http://localhost:3000'),
    timeout: parseInt(getEnvVar('EXPO_PUBLIC_API_TIMEOUT', '10000'), 10),
  },
  
  supabase: {
    url: getEnvVar('EXPO_PUBLIC_SUPABASE_URL', ''),
    anonKey: getEnvVar('EXPO_PUBLIC_SUPABASE_ANON_KEY', ''),
  },
  
  analytics: {
    enabled: getEnvVar('EXPO_PUBLIC_ANALYTICS_ENABLED', 'false') === 'true',
    key: getEnvVar('EXPO_PUBLIC_ANALYTICS_KEY', ''),
  },
  
  debug: {
    enabled: getEnvVar('EXPO_PUBLIC_DEBUG_MODE', 'true') === 'true',
    logLevel: getEnvVar('EXPO_PUBLIC_LOG_LEVEL', 'info') as AppConfig['debug']['logLevel'],
  },
};

export const isDevelopment = config.environment === 'development';
export const isProduction = config.environment === 'production';
export const isStaging = config.environment === 'staging';