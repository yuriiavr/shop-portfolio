"use client";

import { useCart } from "../store/useCart";
import Link from "next/link";
import { ArrowLeft, Lock, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart();
  const subtotal = getTotalPrice();
  const shipping = 90;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto">
      <Link 
        href="/cart" 
        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity mb-12"
      >
        <ArrowLeft size={14} />
        Назад до вибору
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-16">
          <div className="space-y-4">
            <h1 className="text-4xl font-light tracking-tighter uppercase italic text-text-primary">
              Деталі <span className="not-italic font-bold">Доставки</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Крок 1 із 2: Логістика</p>
          </div>

          <form className="space-y-12">
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold">Ім’я</label>
                  <input type="text" className="w-full bg-transparent border-b border-text-primary/10 py-3 text-sm focus:outline-none focus:border-text-primary transition-colors text-text-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold">Прізвище</label>
                  <input type="text" className="w-full bg-transparent border-b border-text-primary/10 py-3 text-sm focus:outline-none focus:border-text-primary transition-colors text-text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold">Електронна пошта</label>
                <input type="email" className="w-full bg-transparent border-b border-text-primary/10 py-3 text-sm focus:outline-none focus:border-text-primary transition-colors text-text-primary" />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold">Країна</label>
                  <div className="relative">
                    <input type="text" placeholder="Україна" className="w-full bg-transparent border-b border-text-primary/10 py-3 text-sm focus:outline-none focus:border-text-primary transition-colors text-text-primary" />
                    <Globe size={12} className="absolute right-0 top-4 opacity-20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold">Місто</label>
                  <input type="text" className="w-full bg-transparent border-b border-text-primary/10 py-3 text-sm focus:outline-none focus:border-text-primary transition-colors text-text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold">Адреса (Вулиця, будинок)</label>
                <input type="text" className="w-full bg-transparent border-b border-text-primary/10 py-3 text-sm focus:outline-none focus:border-text-primary transition-colors text-text-primary" />
              </div>
            </div>

            <button 
              type="button"
              className="w-full py-6 bg-text-primary text-bg-primary uppercase tracking-[0.5em] text-[10px] font-bold hover:opacity-90 transition-all flex items-center justify-center gap-4"
            >
              Продовжити до оплати
            </button>
          </form>

          <div className="flex items-center gap-4 opacity-20">
            <Lock size={12} />
            <span className="text-[8px] uppercase tracking-[0.3em]">Наскрізне шифрування транзакції</span>
          </div>
        </div>

        <div className="lg:sticky lg:top-32 h-fit space-y-12 bg-text-primary/[0.02] border border-text-primary/5 p-12">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">Огляд замовлення</h2>
          
          <div className="space-y-8">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 bg-text-primary/5 border border-text-primary/5">
                    <img src={item.image} alt={item.title} className="object-contain p-2" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-primary">{item.title}</p>
                    <p className="text-[9px] opacity-40 uppercase tracking-tighter">К-сть: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-sm font-light">{(item.price * item.quantity).toFixed(2)} грн</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-8 border-t border-text-primary/10">
            <div className="flex justify-between text-[10px] uppercase tracking-widest opacity-40">
              <span>Вартість товарів</span>
              <span>{subtotal.toFixed(2)} грн</span>
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest opacity-40">
              <span>Доставка</span>
              <span>{shipping.toFixed(2)} грн</span>
            </div>
            <div className="flex justify-between pt-4 text-xl font-bold text-text-primary">
              <span className="text-[10px] uppercase tracking-[0.4em]">Разом до сплати</span>
              <span>{total.toFixed(2)} грн</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}