"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cpu, Music, Ruler } from "lucide-react";

const PHILOSOPHY = [
  {
    icon: <Ruler size={20} strokeWidth={1} />,
    title: "Прецизійна інженерія",
    text: "Кожен корпус виточується з цільних блоків алюмінію 6063 з допуском 0.05 мм."
  },
  {
    icon: <Music size={20} strokeWidth={1} />,
    title: "Акустична досконалість",
    text: "Ми ставимося до акустики як до інструменту. Внутрішні об'єми налаштовані для глибокого, насиченого резонансу."
  },
  {
    icon: <Cpu size={20} strokeWidth={1} />,
    title: "Сучасна інфраструктура",
    text: "Open-source прошивка, висока частота опитування та безперебійне підключення до кількох пристроїв."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h1 className="text-7xl md:text-9xl font-light tracking-tighter leading-[0.8] text-text-primary uppercase">
              Більше ніж <br />
              <span className="italic opacity-40">Клавіши.</span>
            </h1>
            <p className="max-w-md text-lg font-light leading-relaxed opacity-60 text-text-primary">
              Майстерня Keyframe Gallery була заснована в Києві з єдиною пристрастю: подолати прірву між промисловим мистецтвом та функціональними інструментами.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="relative aspect-[4/3] bg-text-primary/5 border border-text-primary/10 overflow-hidden group"
          >
            <div className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-[0.4em] opacity-40 text-text-primary">
              Integrity — v2.04
            </div>

            <Image 
              src="/banner.png" 
              alt="Естетика інженерії" 
              fill 
              priority 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-8 transform transition-all duration-1000 ease-out grayscale hover:grayscale-0 scale-100 hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-bg-primary/10 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
          </motion.div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
          {PHILOSOPHY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-10 border border-text-primary/5 bg-text-primary/[0.02] space-y-6 group hover:bg-text-primary/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-text-primary/10 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all">
                {item.icon}
              </div>
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">{item.title}</h3>
              <p className="text-sm leading-relaxed opacity-40 font-light group-hover:opacity-60 transition-opacity">
                {item.text}
              </p>
            </motion.div>
          ))}
        </section>

        <section className="border-t border-text-primary/10 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <h2 className="text-3xl font-light tracking-tighter uppercase italic opacity-40">
              Наш <br /> Маніфест
            </h2>
            <div className="space-y-12">
              <p className="text-3xl md:text-4xl font-light leading-tight tracking-tight text-text-primary">
                «Ми не створюємо клавіатури. Ми створюємо тактильний досвід, що визначає ритм вашого цифрового життя».
              </p>
              <div className="flex gap-20">
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-30 mb-2">Локація</p>
                  <p className="text-sm font-bold uppercase tracking-wider">Київ, Україна</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-30 mb-2">Засновано</p>
                  <p className="text-sm font-bold uppercase tracking-wider">2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}