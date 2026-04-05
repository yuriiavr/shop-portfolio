"use client";

import { useState, use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Truck, Zap, Star, ArrowRight } from "lucide-react";
import { useCart } from "../../store/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "../../lib/products";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const addItem = useCart((state) => state.addItem);

  const product = PRODUCTS.find((p) => p.id === Number(id)) || PRODUCTS[0];
  const tabs = product.tabs;

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({
    Plate: "Aluminum",
    Switch: "Linear",
    Material: "PBT",
    Qty: "70 шт",
  });

  const currentPrice = useMemo(() => {
    let extra = 0;
    if (product.category === "Клавіатури") {
      if (selectedOptions.Plate === "Brass") extra += 800;
      if (selectedOptions.Plate === "FR4") extra += 400;
      if (selectedOptions.Switch === "Silent") extra += 300;
    }
    if (product.category === "Перемикачі") {
      if (selectedOptions.Qty === "110 шт") extra += 600;
      if (selectedOptions.Qty === "35 шт") extra -= 400;
    }
    return product.price + extra;
  }, [product.price, selectedOptions, product.category]);

  const handleAddToCart = () => {
    const specs = product.category === "Клавіатури" 
      ? `${selectedOptions.Plate}, ${selectedOptions.Switch}` 
      : product.category === "Кейкапи" 
      ? selectedOptions.Material 
      : selectedOptions.Qty;

    addItem({
      id: product.id,
      title: `${product.title} (${specs})`,
      price: currentPrice,
      image: product.image,
    });
  };

  const renderSelectors = () => {
    if (product.category === "Клавіатури") {
      return (
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Матеріал плейта</label>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Aluminum", "Brass", "FR4"].map((plate) => (
                <button
                  key={plate}
                  onClick={() => setSelectedOptions(prev => ({ ...prev, Plate: plate }))}
                  className={`px-8 py-4 text-[10px] uppercase tracking-[0.2em] border transition-all duration-500 ${
                    selectedOptions.Plate === plate
                      ? "border-text-primary bg-text-primary text-bg-primary font-bold"
                      : "border-text-primary/10 hover:border-text-primary/40 opacity-60"
                  }`}
                >
                  {plate}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Перемикачі</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Linear", "Tactile", "Silent"].map((sw) => (
                <button
                  key={sw}
                  onClick={() => setSelectedOptions(prev => ({ ...prev, Switch: sw }))}
                  className={`p-5 text-left border transition-all duration-500 ${
                    selectedOptions.Switch === sw ? "border-text-primary bg-text-primary/5 ring-1 ring-text-primary" : "border-text-primary/10"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-widest">{sw}</p>
                  <p className="text-[9px] uppercase opacity-30 mt-1">Factory Lubed</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (product.category === "Кейкапи") {
      return (
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Матеріал</label>
          <div className="flex gap-3">
            {["PBT", "ABS", "Polycarb"].map((mat) => (
              <button
                key={mat}
                onClick={() => setSelectedOptions(prev => ({ ...prev, Material: mat }))}
                className={`px-8 py-4 text-[10px] uppercase tracking-[0.2em] border transition-all ${
                  selectedOptions.Material === mat ? "border-text-primary bg-text-primary text-bg-primary" : "border-text-primary/10"
                }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (product.category === "Перемикачі") {
      return (
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Кількість у пачці</label>
          <div className="flex gap-3">
            {["35 шт", "70 шт", "110 шт"].map((qty) => (
              <button
                key={qty}
                onClick={() => setSelectedOptions(prev => ({ ...prev, Qty: qty }))}
                className={`px-8 py-4 text-[10px] uppercase tracking-[0.2em] border transition-all ${
                  selectedOptions.Qty === qty ? "border-text-primary bg-text-primary text-bg-primary" : "border-text-primary/10"
                }`}
              >
                {qty}
              </button>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto text-text-primary">
      <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] opacity-40 mb-12">
        <Link href="/" className="hover:opacity-100 transition-opacity">Головна</Link>
        <ChevronRight size={10} />
        <Link href="/shop" className="hover:opacity-100 transition-opacity">Магазин</Link>
        <ChevronRight size={10} />
        <Link 
          href={`/shop?category=${encodeURIComponent(product.category)}`} 
          className="hover:opacity-100 transition-opacity"
        >
          {product.category}
        </Link>
        <ChevronRight size={10} />
        <span className="text-text-primary opacity-100 font-bold italic">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-square bg-text-primary/5 flex items-center justify-center relative overflow-hidden border border-text-primary/5"
            >
              <Image 
                src={activeImage} 
                alt={product.title} 
                fill 
                priority 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-12" 
              />
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setActiveImage(img)} 
                className={`aspect-square bg-text-primary/5 cursor-pointer relative border transition-all overflow-hidden ${
                  activeImage === img ? "border-text-primary" : "border-text-primary/5"
                }`}
              >
                <Image 
                  src={img} 
                  alt="Gallery" 
                  fill 
                  sizes="200px" 
                  className={`object-cover transition-opacity duration-500 ${
                    activeImage === img ? "opacity-100" : "opacity-40 hover:opacity-100"
                  }`} 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} fill="currentColor" />)}
              </div>
              <span className="text-[10px] uppercase tracking-widest opacity-30">48 Відгуків</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-6xl font-light tracking-tighter leading-none uppercase italic">
                {product.title}
              </h1>
              <p className="text-3xl font-light opacity-60">{currentPrice.toLocaleString()} грн</p>
            </div>
            <p className="max-w-md text-sm leading-relaxed opacity-50 font-light">{product.description}</p>
          </div>

          {renderSelectors()}

          <div className="space-y-4">
            <button onClick={handleAddToCart} className="group w-full py-8 bg-text-primary text-bg-primary uppercase tracking-[0.5em] text-[10px] font-bold hover:opacity-90 transition-all active:scale-[0.99]">
              <span className="flex items-center justify-center gap-4">Додати до кошика <ArrowRight size={14} /></span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 py-10 border-y border-text-primary/5">
            {[
              { icon: <Truck size={16} strokeWidth={1} />, label: "Express Shipping" },
              { icon: <ShieldCheck size={16} strokeWidth={1} />, label: "2 Year Warranty" },
              { icon: <Zap size={16} strokeWidth={1} />, label: "Hand Lubed" }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3 opacity-40">
                <div className="w-10 h-10 rounded-full border border-text-primary/10 flex items-center justify-center">{f.icon}</div>
                <span className="text-[8px] uppercase tracking-[0.2em]">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-40 border-t border-text-primary/5 pt-20">
        <div className="flex gap-16 mb-16 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-6 text-[11px] uppercase tracking-[0.4em] font-bold transition-all ${activeTab === tab.id ? "opacity-100" : "opacity-20"}`}
            >
              {tab.label}
              {activeTab === tab.id && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-text-primary" />}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-8"
          >
            {Object.entries(tabs.find(t => t.id === activeTab)?.content || {}).map(([key, val]) => (
              <div key={key} className="flex justify-between items-baseline border-b border-text-primary/5 pb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-30 font-bold">{key}</span>
                <span className="text-base font-light italic">{val}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}