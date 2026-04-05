"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../store/useCart";
import { Trash2, Plus, Minus, ArrowLeft, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function CartPage() {
  const { items, clearItem, updateQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 90;
  const total = subtotal + shipping;

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-8 px-6 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-light tracking-tighter uppercase opacity-20">Ваша галерея порожня</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold italic">Відкриття чекають на вас у колекції</p>
        </div>
        <Link 
          href="/shop" 
          className="px-12 py-5 border border-text-primary text-text-primary uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-text-primary hover:text-bg-primary transition-all duration-500"
        >
          Повернутися до колекції
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-20 border-b border-text-primary/5 pb-8">
        <h1 className="text-5xl font-light tracking-tighter uppercase text-text-primary italic">
          Ваш <span className="not-italic font-bold">Вибір</span>
        </h1>
        <Link href="/shop" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">
          <ArrowLeft size={14} />
          Назад до перегляду
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-start">
        <div className="lg:col-span-2 space-y-12">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={`${item.id}-${item.title}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col sm:flex-row gap-8 items-center border-b border-text-primary/5 pb-12 group"
              >
                <div className="relative w-40 aspect-square bg-text-primary/5 p-4 border border-text-primary/5 overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>

                <div className="flex-1 space-y-4 text-center sm:text-left">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold tracking-tight text-text-primary uppercase leading-tight">{item.title}</h3>
                    <p className="text-[10px] uppercase tracking-widest opacity-40 italic">Серійний ID: {item.id}00254</p>
                  </div>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-6">
                    <div className="flex items-center border border-text-primary/10">
                      <button 
                        onClick={() => updateQuantity(item.id, item.title, Math.max(1, item.quantity - 1))}
                        className="p-2 hover:bg-text-primary/5 transition-colors opacity-40 hover:opacity-100"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.title, item.quantity + 1)}
                        className="p-2 hover:bg-text-primary/5 transition-colors opacity-40 hover:opacity-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => clearItem(item.id, item.title)}
                      className="text-text-primary/30 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-light text-text-primary">{(item.price * item.quantity).toLocaleString()} грн</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="bg-text-primary/[0.02] border border-text-primary/5 p-10 space-y-10 sticky top-32">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">Підсумок</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="opacity-40 uppercase tracking-widest text-[10px]">Вартість товарів</span>
              <span className="font-light italic">{subtotal.toLocaleString()} грн</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-40 uppercase tracking-widest text-[10px]">Доставка</span>
              <span className="font-light italic">{shipping.toLocaleString()} грн</span>
            </div>
            <div className="pt-4 border-t border-text-primary/10 flex justify-between">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Загальна сума</span>
              <span className="text-2xl font-bold">{total.toLocaleString()} грн</span>
            </div>
          </div>

          <div className="space-y-4">
            <Link 
              href="/checkout"
              className="w-full py-6 bg-text-primary text-bg-primary uppercase tracking-[0.5em] text-[10px] font-bold hover:opacity-90 transition-all flex items-center justify-center gap-4"
            >
              <CreditCard size={14} />
              Перейти до оформлення
            </Link>
            <p className="text-[8px] uppercase tracking-[0.3em] opacity-20 text-center leading-relaxed">
              Податки та митні збори розраховуються<br/>на фінальному етапі логістики.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}