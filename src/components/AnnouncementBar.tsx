import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AnnouncementBar: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-[#4D1224] text-[#FAF7F0] border-b border-[#C8A96B]/25 py-2.5 px-4 text-xs tracking-wider relative z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between font-sans">
        {/* Left: NEW DROP */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse shrink-0" />
          <span className="font-semibold uppercase tracking-[0.2em] text-[10px] sm:text-xs text-[#FAF7F0]">
            NEW DROP
          </span>
          <span className="hidden md:inline text-white/40">|</span>
          <span className="hidden md:inline text-[11px] text-[#FAF7F0]/80 font-light">
            Muhurtham & Festive Edit 2026
          </span>
        </div>

        {/* Center: UP TO 40% OFF Golden Capsule Pill */}
        <button
          onClick={() => navigateTo('catalog')}
          className="group flex items-center gap-1.5 px-3.5 py-0.5 rounded-full bg-[#E5B842] hover:bg-[#F3CA58] text-[#1C1A19] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-sm transition-all duration-300 hover:scale-105"
        >
          <Sparkles className="w-3 h-3 text-[#1C1A19]" />
          <span>UP TO 40% OFF</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Right: FREE SHIPPING ALL OVER INDIA */}
        <div className="flex items-center gap-2">
          <span className="font-semibold uppercase tracking-[0.18em] text-[10px] sm:text-xs text-[#C8A96B]">
            FREE SHIPPING ALL OVER INDIA
          </span>
          <span className="hidden lg:inline text-white/30">•</span>
          <span className="hidden lg:inline text-[10px] text-white/70">
            INR ₹ / GLOBAL AIR
          </span>
        </div>
      </div>
    </div>
  );
};
