// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Stuff Types
export interface StuffItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  tags: string[];
  quantity: number;
  location?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StuffCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface StuffState {
  items: StuffItem[];
  categories: StuffCategory[];
  searchQuery: string;
  selectedCategory: string | null;
}

// Settings Types
export interface AppSettings {
  darkMode: boolean;
  notifications: boolean;
  offlineMode: boolean;
  autoSync: boolean;
  language: string;
}

// Store Actions
export interface UserActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

export interface StuffActions {
  addItem: (item: Omit<StuffItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateItem: (id: string, updates: Partial<StuffItem>) => void;
  deleteItem: (id: string) => void;
  addCategory: (category: Omit<StuffCategory, 'id'>) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  clearAll: () => void;
}

export interface SettingsActions {
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  resetSettings: () => void;
}

// Combined Store Types
export interface UserStore extends AuthState, UserActions {}
export interface StuffStore extends StuffState, StuffActions {}
export interface SettingsStore extends AppSettings, SettingsActions {}
