import Link from "next/link";
import { ArrowRight, Send, Globe, Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-text-primary/10 bg-bg-primary transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
          
          <div className="col-span-1 md:col-span-2 space-y-8">
            <Link href="/" className="text-xl font-light tracking-widest uppercase text-text-primary">
              Keyframe<span className="font-bold">Gallery</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed opacity-60 text-text-primary">
              Лабораторія механічної точності та естетичної досконалості. 
              Ми створюємо інструменти для тих, хто цінує тактильну природу цифрової роботи.
            </p>
            <div className="flex gap-6">
              <Globe size={18} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity text-text-primary" />
              <Send size={18} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity text-text-primary" />
              <Cpu size={18} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity text-text-primary" />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 text-text-primary">Навігація</h4>
            <ul className="space-y-4 text-xs tracking-widest uppercase text-text-primary">
              <li><Link href="/shop" className="opacity-60 hover:opacity-100 transition-opacity">Товари</Link></li>
              <li><Link href="/about" className="opacity-60 hover:opacity-100 transition-opacity">Філософія</Link></li>
              <li><Link href="/" className="opacity-60 hover:opacity-100 transition-opacity">Архів</Link></li>
              <li><Link href="/" className="opacity-60 hover:opacity-100 transition-opacity">Підтримка</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 text-text-primary">Журнал</h4>
            <p className="text-[10px] leading-relaxed opacity-60 uppercase tracking-wider text-text-primary">
              Отримуйте оновлення про нові релізи та технічні огляди.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="ЕЛЕКТРОННА ПОШТА"
                className="w-full bg-transparent border-b border-text-primary/30 py-2 text-[10px] tracking-widest focus:outline-none focus:border-text-primary transition-colors text-text-primary placeholder:opacity-40"
              />
              <button className="absolute right-0 bottom-2 opacity-40 hover:opacity-100 transition-opacity">
                <ArrowRight size={16} className="text-text-primary" />
              </button>
            </div>
          </div>

        </div>

        <div className="mt-24 pt-8 border-t border-text-primary/10 flex flex-col md:flex-row justify-between gap-4 text-[8px] uppercase tracking-[0.4em] opacity-40 text-text-primary">
          <p>© 2026 Keyframe Gallery. Усі права захищено.</p>
          <div className="flex gap-8">
            <span className="cursor-pointer hover:opacity-100 transition-opacity">Політика конфіденційності</span>
            <span className="cursor-pointer hover:opacity-100 transition-opacity">Умови надання послуг</span>
          </div>
        </div>
      </div>
    </footer>
  );
}