import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number, title: string) => void;
  clearItem: (id: number, title: string) => void;
  updateQuantity: (id: number, title: string, quantity: number) => void;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => set((state) => {
        const existingItem = state.items.find(
          (item) => item.id === product.id && item.title === product.title
        );
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === product.id && item.title === product.title
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),

      removeItem: (id, title) => set((state) => {
        const existingItem = state.items.find(
          (item) => item.id === id && item.title === title
        );
        if (existingItem && existingItem.quantity > 1) {
          return {
            items: state.items.map((item) =>
              item.id === id && item.title === title
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          };
        }
        return { 
          items: state.items.filter((item) => !(item.id === id && item.title === title)) 
        };
      }),

      updateQuantity: (id, title, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id && item.title === title ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      })),

      clearItem: (id, title) => set((state) => ({
        items: state.items.filter((item) => !(item.id === id && item.title === title)),
      })),

      getTotalPrice: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'keyframe-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);