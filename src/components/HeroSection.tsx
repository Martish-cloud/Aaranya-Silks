import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'Bridal Couture 2026',
    title: 'Elegance Woven in Every Thread',
    subtitle: 'Discover timeless sarees crafted for unforgettable moments. Handspun pure Mulberry silk graced with certified real gold zari.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90',
    primaryActionCategory: 'Bridal Sarees',
    badge: 'The Mayurakshi Bridal Edit'
  },
  {
    id: 2,
    tag: 'Varanasi Masterpieces',
    title: 'The Poetry of Kadhwa Weaving',
    subtitle: 'Painstakingly crafted over 140 artisan hours on wooden pit looms, creating pure Katan brocades fit for royal courts.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=90',
    primaryActionCategory: 'Banarasi Sarees',
    badge: 'Varanasi Heritage Series'
  },
  {
    id: 3,
    tag: 'Contemporary Evening Soiree',
    title: 'Luminous Sheer Organza & Tissue',
    subtitle: 'Gossamer-light translucent textures kissed with antique foil florals and liquid metallic luster.',
    image: 'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=2000&q=90',
    primaryActionCategory: 'Silk Sarees',
    badge: 'Cocktail & Evening Drapes'
  }
];

export const HeroSection: React.FC = () => {
  const { navigateTo } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#1C1A19] -mt-20 pt-20">
      {/* Background Slides with Ken Burns / Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt="Aaranya Silks Luxury Saree Campaign"
            className="w-full h-full object-cover object-top filter brightness-[0.78]"
          />
          {/* Subtle multi-layer gradient overlays for luxury editorial depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A19] via-transparent to-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Gold Border Line Overlay */}
      <div className="absolute inset-x-8 top-28 bottom-12 border border-[#C8A96B]/20 pointer-events-none hidden md:block rounded-3xl" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full py-16 md:py-24">
        <div className="max-w-2xl text-left">
          {/* Brand Tag / Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#651C32]/80 backdrop-blur-md border border-[#C8A96B]/50 text-[#C8A96B] mb-5 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase">
              AARANYA SILKS • {slide.tag}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            key={`title-${slide.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#FAF7F0] leading-[1.08] tracking-tight mb-6"
          >
            {slide.title}
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            key={`sub-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-[#FAF7F0]/85 font-sans font-light leading-relaxed max-w-xl mb-9"
          >
            {slide.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <button
              onClick={() => navigateTo('catalog', undefined, slide.primaryActionCategory)}
              className="group flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#8B1E3F] hover:bg-[#651C32] text-[#FAF7F0] font-sans font-medium text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 shadow-xl border border-[#C8A96B]/40 hover:border-[#C8A96B] hover:shadow-2xl hover:translate-y-[-1px]"
            >
              <span>Explore the Collection</span>
              <ArrowRight className="w-4 h-4 text-[#C8A96B] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('story')}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-[#FAF7F0] font-sans font-medium text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 border border-white/25 hover:border-white/50"
            >
              Discover Our Story
            </button>
          </motion.div>

          {/* Luxury Proof Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-12 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 text-[#FAF7F0]/90"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C8A96B] shrink-0" />
              <div className="text-left">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#FAF7F0]">Pure Handloom</p>
                <p className="text-[9px] text-[#FAF7F0]/60 hidden sm:block">100% Silk Mark Certified</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C8A96B] shrink-0" />
              <div className="text-left">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#FAF7F0]">Certified Zari</p>
                <p className="text-[9px] text-[#FAF7F0]/60 hidden sm:block">Real Gold & Silver Tested</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#C8A96B] shrink-0" />
              <div className="text-left">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#FAF7F0]">Artisan Fairtrade</p>
                <p className="text-[9px] text-[#FAF7F0]/60 hidden sm:block">Direct Weaver Guilds</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute right-6 sm:right-10 bottom-8 z-20 flex items-center gap-3">
        <div className="flex items-center gap-1.5 mr-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === i ? 'w-8 bg-[#C8A96B]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-[#FAF7F0] border border-white/20 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-[#FAF7F0] border border-white/20 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
