import { create } from 'zustand';
import { CartItem, Filter, Product } from '../types';

interface Store {
  
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  filters: Filter;
  setFilters: (filters: Partial<Filter>) => void;
  resetFilters: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  
}

const initialFilters: Filter = {
  category: [],
  priceRange: [0, 1000],
  rating: null,
};

export const useStore = create<Store>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  cart: [],
  addToCart: (product, quantity = 1, size, color) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => 
          item.id === product.id && 
          item.selectedSize === size && 
          item.selectedColor === color
      );

      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item === existingItem
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity, selectedSize: size, selectedColor: color }],
      };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),
  filters: initialFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: initialFilters }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  isCartOpen: false,
  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  selectedCategory: 'all',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));