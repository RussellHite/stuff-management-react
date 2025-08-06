import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import { StuffStore, StuffItem, StuffCategory } from '../types';
import { STORAGE_KEYS, createPersistConfig } from '../utils/storage';

// Default categories
const defaultCategories: StuffCategory[] = [
  { id: '1', name: 'Electronics', color: '#3B82F6', icon: 'devices' },
  { id: '2', name: 'Clothing', color: '#EF4444', icon: 'checkroom' },
  { id: '3', name: 'Books', color: '#10B981', icon: 'book' },
  { id: '4', name: 'Tools', color: '#F59E0B', icon: 'build' },
  { id: '5', name: 'Kitchen', color: '#8B5CF6', icon: 'kitchen' },
  { id: '6', name: 'Other', color: '#6B7280', icon: 'category' },
];

// Sample items for demo
const sampleItems: StuffItem[] = [
  {
    id: '1',
    title: 'MacBook Pro',
    description: '16-inch M1 Pro laptop for development',
    category: 'Electronics',
    tags: ['laptop', 'work', 'apple'],
    quantity: 1,
    location: 'Home Office',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Winter Jacket',
    description: 'Warm winter coat for cold weather',
    category: 'Clothing',
    tags: ['winter', 'outerwear'],
    quantity: 1,
    location: 'Closet',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    title: 'JavaScript: The Good Parts',
    description: 'Classic programming book by Douglas Crockford',
    category: 'Books',
    tags: ['programming', 'javascript', 'reference'],
    quantity: 1,
    location: 'Bookshelf',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
];

export const useStuffStore = create<StuffStore>()(
  persist(
    immer((set, get) => ({
      // Initial state
      items: sampleItems,
      categories: defaultCategories,
      searchQuery: '',
      selectedCategory: null,

      // Actions
      addItem: (itemData) => {
        set((state) => {
          const newItem: StuffItem = {
            ...itemData,
            id: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          state.items.push(newItem);
        });
      },

      updateItem: (id, updates) => {
        set((state) => {
          const index = state.items.findIndex((item) => item.id === id);
          if (index !== -1) {
            state.items[index] = {
              ...state.items[index],
              ...updates,
              updatedAt: new Date(),
            };
          }
        });
      },

      deleteItem: (id) => {
        set((state) => {
          const index = state.items.findIndex((item) => item.id === id);
          if (index !== -1) {
            state.items.splice(index, 1);
          }
        });
      },

      addCategory: (categoryData) => {
        set((state) => {
          const newCategory: StuffCategory = {
            ...categoryData,
            id: uuidv4(),
          };
          state.categories.push(newCategory);
        });
      },

      setSearchQuery: (query) => {
        set((state) => {
          state.searchQuery = query;
        });
      },

      setSelectedCategory: (categoryId) => {
        set((state) => {
          state.selectedCategory = categoryId;
        });
      },

      clearAll: () => {
        set((state) => {
          state.items = [];
          state.searchQuery = '';
          state.selectedCategory = null;
        });
      },
    })),
    createPersistConfig<StuffStore>(STORAGE_KEYS.STUFF)
  )
);
