import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SettingsStore, AppSettings } from '../types';
import { STORAGE_KEYS, createPersistConfig } from '../utils/storage';

// Default settings
const defaultSettings: AppSettings = {
  darkMode: false,
  notifications: true,
  offlineMode: false,
  autoSync: true,
  language: 'en',
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      // Initial state
      ...defaultSettings,

      // Actions
      updateSetting: (key, value) => {
        set({ [key]: value });
      },

      resetSettings: () => {
        set(defaultSettings);
      },
    }),
    createPersistConfig<SettingsStore>(STORAGE_KEYS.SETTINGS)
  )
);