import { create } from 'zustand';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (id: number) => void; // Зменшує на 1 або видаляє
  clearItem: (id: number) => void;  // Видаляє повністю (Trash icon)
  updateQuantity: (id: number, quantity: number) => void; // Додаємо для кнопок +/-
  totalPrice: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { items: [...state.items, { ...product, quantity: 1 }] };
  }),

  removeItem: (id) => set((state) => {
    const existingItem = state.items.find(item => item.id === id);
    if (existingItem && existingItem.quantity > 1) {
      return {
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    }
    return { items: state.items.filter(item => item.id !== id) };
  }),

  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, quantity } : item
    ),
  })),

  clearItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id),
  })),

  totalPrice: () => get().items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
}));