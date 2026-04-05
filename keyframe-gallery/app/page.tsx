"use client";

import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { PRODUCTS } from "./lib/products";
import { motion } from "framer-motion";

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <>
      <section className="relative min-h-screen flex items-center px-6 overflow-hidden transition-colors duration-500">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-text-primary/5 blur-[150px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative">
          <div className="space-y-8 z-10">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl lg:text-[120px] font-light tracking-tighter leading-[0.85] text-text-primary uppercase"
            >
              Keyframe.
              <br />
              <span className="opacity-40 italic">Exhibit A.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-md text-lg opacity-60 font-light leading-relaxed text-text-primary"
            >
              Мінімалістичні кастомні клавіатури, спроектовані для тактильної
              досконалості та бездоганного звучання.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <Link
                href="/shop"
                className="px-10 py-5 border border-text-primary/20 hover:bg-text-primary hover:text-bg-primary transition-all duration-500 text-[10px] uppercase tracking-[0.4em] font-bold text-text-primary inline-block"
              >
                Переглянути колекцію
              </Link>
            </motion.div>
          </div>

          <div className="relative w-full h-full flex items-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[120%] lg:w-[160%] lg:-mr-[50%] xl:-mr-[70%] transform drop-shadow-[0_50px_60px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_50px_60px_rgba(255,255,255,0.05)] rotate-[-8deg] transition-transform duration-1000 ease-out"
            >
              <img
                src="/banner.png"
                alt="Custom Keyboard"
                className="w-full h-auto object-contain pointer-events-none"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-light tracking-tighter uppercase text-text-primary">
              Наша <span className="opacity-40 italic">Колекція</span>
            </h2>
            <div className="h-1 w-12 bg-text-primary" />
          </div>

          <Link
            href="/shop"
            className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-text-primary/20 pb-1 hover:border-text-primary transition-colors text-text-primary"
          >
            Усі товари
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={`${product.price.toLocaleString()}.00 грн`}
              category={product.category}
              image={product.image}
            />
          ))}
        </div>
      </section>
    </>
  );
}