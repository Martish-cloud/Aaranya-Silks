import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#1C1A19] -mt-20 pt-20">
      {/* Background Luxury Virtual Showroom Composition */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2200&q=90"
          alt="Aaranya Silks Luxury Saree Boutique"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
        />

        {/* Ambient lighting overlays mimicking the boutique showroom in the reference video */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A19] via-transparent to-black/60" />
        
        {/* Warm golden light glow from ceiling like boutique chandeliers */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#E5B842]/15 blur-[140px] pointer-events-none" />
      </div>

      {/* Decorative Gold Frame Border */}
      <div className="absolute inset-x-6 sm:inset-x-12 top-24 bottom-12 border border-[#C8A96B]/20 pointer-events-none rounded-3xl hidden md:block" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full py-16 md:py-24 flex flex-col justify-between min-h-[75vh]">
        {/* Upper Center / Left Section */}
        <div className="max-w-2xl text-left pt-6">
          {/* Brand Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#651C32]/85 backdrop-blur-md border border-[#C8A96B]/50 text-[#C8A96B] mb-5 shadow-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5B842]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#FAF7F0]">
              AARANYA SILKS • HAUTE COUTURE 2026
            </span>
          </motion.div>

          {/* Main Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#FAF7F0] leading-[1.08] tracking-tight mb-5"
          >
            Elegance Woven in Every Thread
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-[#FAF7F0]/85 font-sans font-light leading-relaxed max-w-xl mb-8"
          >
            Discover timeless sarees crafted for unforgettable moments. Handspun pure Mulberry silk graced with certified real gold zari.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => navigateTo('catalog')}
              className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#8B1E3F] hover:bg-[#651C32] text-[#FAF7F0] font-sans font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 shadow-xl border border-[#C8A96B]/50 hover:border-[#E5B842] hover:scale-105"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4 text-[#E5B842] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('story')}
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-[#FAF7F0] font-sans font-medium text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 border border-white/25 hover:border-white/50"
            >
              Discover Our Story
            </button>
          </motion.div>
        </div>

        {/* Bottom Floating Bar matching Video Frame 2 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-white/15"
        >
          {/* Poetic quote from reference video */}
          <div className="text-left">
            <p className="font-serif italic text-lg sm:text-2xl text-[#E5B842] tracking-wide leading-tight">
              "Six weavers, one thread — months of patient hands"
            </p>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#FAF7F0]/60 font-sans mt-1">
              Handcrafted in Varanasi & Kanchipuram
            </p>
          </div>

          {/* Quick Badges */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs text-[#FAF7F0]/90">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E5B842]" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">Silk Mark Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#E5B842]" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">Tested Real Zari</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
