import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
export const STORAGE_KEYS = {
  USER: '@stuff_happens/user',
  STUFF: '@stuff_happens/stuff',
  SETTINGS: '@stuff_happens/settings',
} as const;

// Generic storage functions
export const storage = {
  // Get data from storage
  async get<T>(key: string): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${key} from storage:`, error);
      return null;
    }
  },

  // Set data in storage
  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} in storage:`, error);
    }
  },

  // Remove data from storage
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
    }
  },

  // Clear all storage
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  // Get all keys
  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  },
};

// Zustand persistence middleware helper
export const createPersistConfig = <T>(key: string) => ({
  name: key,
  storage: {
    getItem: async (name: string): Promise<string | null> => {
      const value = await storage.get<T>(name);
      return value ? JSON.stringify(value) : null;
    },
    setItem: async (name: string, value: string): Promise<void> => {
      const parsedValue = JSON.parse(value);
      await storage.set<T>(name, parsedValue);
    },
    removeItem: async (name: string): Promise<void> => {
      await storage.remove(name);
    },
  },
});
