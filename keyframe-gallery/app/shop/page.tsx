"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "../lib/products";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";

const CATEGORIES = ["Усі", "Клавіатури", "Перемикачі", "Кейкапи", "Аксесуари"];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState("Усі");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    if (categoryFromUrl && CATEGORIES.includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory !== "Усі") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);

    return result;
  }, [activeCategory, sortBy]);

  return (
    <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto">
      <header className="mb-20 space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-light tracking-tighter uppercase text-text-primary">
            Список <span className="opacity-40 italic">Товарів</span>
          </h1>
          <p className="max-w-md text-xs uppercase tracking-widest opacity-40 leading-relaxed">
            Кураторська добірка високопродуктивних пристроїв введення та компонентів.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-y border-text-primary/5 py-8">
          <div className="flex flex-wrap gap-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative pb-2 ${
                  activeCategory === cat ? "text-text-primary" : "opacity-20 hover:opacity-100"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div layoutId="shopUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-text-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 opacity-40">
              <SlidersHorizontal size={14} />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[10px] uppercase tracking-widest font-bold outline-none cursor-pointer"
              >
                <option value="featured">За рейтингом</option>
                <option value="price-low">Ціна: від дешевих</option>
                <option value="price-high">Ціна: від дорогих</option>
              </select>
            </div>
            <span className="text-[10px] opacity-20 uppercase tracking-widest">
              Результатів: {filteredProducts.length}
            </span>
          </div>
        </div>
      </header>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              <ProductCard 
                id={product.id}
                title={product.title}
                price={`${product.price.toFixed(2)} грн`}
                category={product.category}
                image={product.image}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="py-40 text-center space-y-4">
          <p className="text-[10px] uppercase tracking-[0.5em] opacity-20">У цій категорії нічого не знайдено</p>
          <button 
            onClick={() => setActiveCategory("Усі")}
            className="text-[10px] uppercase tracking-widest border-b border-text-primary/20 pb-1"
          >
            Скинути фільтри
          </button>
        </div>
      )}
    </div>
  );
}