"use client";

import { useCart } from "../../store/useCart";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, addItem, removeItem, clearItem, totalPrice } = useCart();

  const router = useRouter();
  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
          />

          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-bg-primary h-full shadow-2xl flex flex-col text-text-primary"
          >
            <div className="p-6 border-b border-text-primary/5 flex justify-between items-center">
              <h2 className="text-xl font-light uppercase tracking-widest">Кошик</h2>
              <button onClick={onClose} className="p-2 hover:bg-text-primary/5 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <p className="text-center opacity-40 mt-20 italic">Галерея порожня...</p>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="flex gap-4 items-center"
                  >
                    <div className="relative h-20 w-20 bg-text-primary/5 rounded">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <p className="text-xs opacity-50">{item.price} грн</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => removeItem(item.id)} className="opacity-40 hover:opacity-100 p-1">
                          <Minus size={14} />
                        </button>
                        <span className="text-xs w-4 text-center">{item.quantity}</span>
                        <button onClick={() => addItem(item)} className="opacity-40 hover:opacity-100 p-1">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => clearItem(item.id)} 
                      className="text-red-500/50 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-text-primary/5 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs uppercase opacity-40">Загальна вартість</span>
                  <span className="text-xl font-light">{totalPrice()} грн</span>
                </div>
                <button onClick={handleCheckout} className="w-full py-4 bg-text-primary text-bg-primary uppercase tracking-[0.3em] text-[10px] font-bold hover:opacity-90 transition-all">
                  Оформити замовлення
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}