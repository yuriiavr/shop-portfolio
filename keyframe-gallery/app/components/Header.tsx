"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "../store/useCart";
import CartDrawer from "./cart/CartDrawer";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Головна" },
  { href: "/shop", label: "Магазин" },
  { href: "/about", label: "Про нас" },
];

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const items = useCart((state) => state.items);
  const itemCount = items.reduce((acc, item) => acc + (item.quantity || 0), 0);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 border-b border-text-primary/5 bg-bg-primary/80 backdrop-blur-md transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="relative z-[60] text-[12px] font-light tracking-[0.3em] uppercase text-text-primary group lg:text-xl"
          >
            Keyframe
            <span className="font-bold italic opacity-40 group-hover:opacity-100 transition-opacity ml-1">
              Gallery
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary/60">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-3 relative z-[60]">

            <ThemeToggle />

            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="p-2.5 hover:bg-text-primary/5 rounded-full transition-colors text-text-primary/70 hover:text-text-primary relative"
            >
              <ShoppingCart size={18} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-text-primary text-bg-primary text-[8px] font-black h-3.5 w-3.5 flex items-center justify-center rounded-full shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 hover:bg-text-primary/5 rounded-full text-text-primary transition-colors"
            >
              {isMenuOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-bg-primary md:hidden"
          >
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-4 hover:bg-text-primary/5 rounded-full text-text-primary flex items-center gap-2 group"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Закрити</span>
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <nav className="flex flex-col justify-center h-full px-12 gap-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, ease: "circOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-5xl font-light tracking-tighter uppercase italic text-text-primary hover:pl-4 transition-all duration-500 block border-b border-text-primary/5 pb-4"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 space-y-8"
              >
                
                <div className="space-y-2">
                   <p className="text-[8px] uppercase tracking-[0.3em] opacity-30">Контакти</p>
                   <p className="text-xs tracking-widest font-light">info@keyframe.gallery</p>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}