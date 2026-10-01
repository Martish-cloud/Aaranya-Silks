import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Pause, Play, ArrowRight, Expand } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { WipeText } from './WipeText';

import photo1 from '../assets/Photo Gallery/1.jfif';
import photo2 from '../assets/Photo Gallery/2.jpg';
import photo3 from '../assets/Photo Gallery/3.jpeg';
import photo4 from '../assets/Photo Gallery/4.jfif';
import photo5 from '../assets/Photo Gallery/5.avif';
import photo6 from '../assets/Photo Gallery/6.jfif';
import photo7 from '../assets/Photo Gallery/7.jpg';
import photo8 from '../assets/Photo Gallery/8.jpg';
import photo9 from '../assets/Photo Gallery/9.jfif';

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
  description: string;
  zari: string;
  hue: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: photo1,
    title: 'Mayurakshi Royal Temple Brocade',
    category: 'Bridal Kanjivaram',
    description: 'Bespoke handloom drape with double-warp Korvai border, electroplated 24k gold zari, and sacred peacock medallions.',
    zari: '24k Tested Gold Zari',
    hue: 'Royal Crimson & Gold',
  },
  {
    id: 2,
    src: photo2,
    title: 'Kalyani Grand Temple Weave',
    category: 'Sacred Heirloom',
    description: 'Centuries-old Rudraksha bootis and deep vermillion temple border woven on ancient vintage wooden pit-looms.',
    zari: 'Antique Gold Zari',
    hue: 'Deep Vermilion & Saffron',
  },
  {
    id: 3,
    src: photo3,
    title: 'Suhani Crimson Trousseau Heirloom',
    category: 'Bridal Trousseau',
    description: 'Designed exclusively for the royal Indian bride, featuring dense floral kadhwa motifs and heavy pallu.',
    zari: 'Pure Silver & Gold Zari',
    hue: 'Crimson Scarlet',
  },
  {
    id: 4,
    src: photo4,
    title: 'Chandrakala Moonlit Tissue Saree',
    category: 'Metallic Silk Tissue',
    description: 'Liquid shimmering tissue silk with opulent zari sheen, crafted for red carpet celebrations and royal soirees.',
    zari: 'Liquid Champagne Gold',
    hue: 'Moonlit Gold Tissue',
  },
  {
    id: 5,
    src: photo5,
    title: 'Ananya Vintage Kadwa Brocade',
    category: 'Banarasi Heritage',
    description: 'Artisanal pit-loom kadwa weave with zero floating threads on reverse, embodying sacred Varanasi artistry.',
    zari: 'Hand-Twisted Zari',
    hue: 'Imperial Emerald & Gold',
  },
  {
    id: 6,
    src: photo6,
    title: 'Padmavathi Regal Katan Drape',
    category: 'Heritage Katan Silk',
    description: 'Pure 3-ply Mulberry silk warp and weft highlighted with delicate meenakari accents and paisley motifs.',
    zari: 'Tested 24k Zari',
    hue: 'Royal Ruby Maroon',
  },
  {
    id: 7,
    src: photo7,
    title: 'Vaidehi Auspicious Temple Saree',
    category: 'Festive Handloom',
    description: 'Woven with high-luster champagne zari chevron ripples, auspicious turmeric borders, and rich fall finish.',
    zari: 'Electroplated Gold',
    hue: 'Auspicious Amber Gold',
  },
  {
    id: 8,
    src: photo8,
    title: 'Meenakshi Divine Sangeet Saree',
    category: 'Haute Couture Silk',
    description: 'Sculptural elegance with heavy contrast pallu, intricately crafted for joyous Sangeet and wedding gala nights.',
    zari: 'Rose Gold & Copper Zari',
    hue: 'Magenta & Antique Copper',
  },
  {
    id: 9,
    src: photo9,
    title: 'Rukmini Imperial Celebration Saree',
    category: 'Masterpiece Silk',
    description: 'A tribute to multi-generational handloom mastery, certified Silk Mark authenticated pure silk drape.',
    zari: 'Pure 24k Gold Zari',
    hue: 'Deep Royal Wine & Gold',
  },
];

export const SignatureCollections: React.FC = () => {
  const { navigateTo } = useShop();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);

  const activePhoto = GALLERY_ITEMS[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  }, []);

  // Monitor section visibility so slideshow timer only runs when user is looking at this section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-slideshow timer (5 seconds) - only runs when gallery is active in viewport
  useEffect(() => {
    if (isPaused || lightboxOpen || !isInView) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, lightboxOpen, isInView, handleNext]);

  // Smooth scroll active thumbnail horizontally within its container ONLY (never affects window/page scrolling)
  useEffect(() => {
    const container = thumbnailStripRef.current;
    if (container) {
      const activeThumb = container.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        const thumbLeft = activeThumb.offsetLeft;
        const thumbWidth = activeThumb.offsetWidth;
        const containerWidth = container.clientWidth;
        const targetScroll = thumbLeft - containerWidth / 2 + thumbWidth / 2;
        container.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex]);

  // Keyboard navigation (only active when section is in view or lightbox is open)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (!isInView && !lightboxOpen) return;

      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape' && lightboxOpen) setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, lightboxOpen, isInView]);

  // Mouse tilt effect calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsPaused(false);
  };

  return (
    <section
      ref={sectionRef}
      id="photo-gallery"
      className="py-20 md:py-32 bg-[#0F0A09] text-[#FAF7F0] relative overflow-hidden select-none"
    >
      {/* Dynamic Layered Ambient Glow reflecting the currently selected photo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhoto.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={activePhoto.src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover filter blur-[90px] scale-125 opacity-30 transform-gpu"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A09] via-transparent to-[#0F0A09]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0F0A09_85%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F0]/5 border border-[#C8A96B]/30 text-[#C8A96B] text-xs font-semibold uppercase tracking-[0.25em] mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>Haute Couture Lookbook</span>
          </div>

          <WipeText
            as="h2"
            direction="bottom-to-top"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#FAF7F0] tracking-tight leading-tight"
          >
            The Photo Gallery
          </WipeText>

          <p className="text-xs sm:text-sm md:text-base text-[#FAF7F0]/70 font-light mt-3 max-w-xl mx-auto leading-relaxed">
            Nine iconic editorial portraits capturing the pure silk radiance, heritage weaves, and imperial bridal heirlooms of Aaranya Silks.
          </p>
        </div>

        {/* Main Editorial Presentation Frame */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main 9:10 Aspect Ratio Showcase Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left/Center Column: Strict 9:10 Main Image with 3D Tilt */}
            <div className="lg:col-span-7 flex justify-center">
              <div
                onMouseMove={handleMouseMove}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[450px] aspect-[9/10] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-[#C8A96B]/40 group bg-[#1A1412]"
              >
                {/* Secondary Layered Blurred Aura strictly matching this photo */}
                <img
                  src={activePhoto.src}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-20 scale-110 pointer-events-none"
                />

                {/* Primary High-Resolution Image (Strict 9:10, Head & Model Fully Visible, Zero Unwanted Cropping) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhoto.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={activePhoto.src}
                      alt={activePhoto.title}
                      className="w-full h-full object-cover object-top select-none transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="eager"
                    />

                    {/* Subtle Gradient Veil for Text Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Floating Counter Pill */}
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C8A96B]/40 text-[11px] font-mono tracking-widest text-[#C8A96B] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] animate-pulse" />
                      <span>
                        0{currentIndex + 1} / 0{GALLERY_ITEMS.length}
                      </span>
                    </div>

                    {/* Top Right Expand / Lightbox Trigger */}
                    <button
                      onClick={() => setLightboxOpen(true)}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#C8A96B] hover:text-[#C8A96B] text-white/80 transition-all opacity-0 group-hover:opacity-100"
                      aria-label="View fullscreen photo"
                    >
                      <Expand className="w-4 h-4" />
                    </button>

                    {/* Bottom Caption Pill over Image */}
                    <div className="absolute bottom-5 inset-x-5 text-left pointer-events-none">
                      <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C8A96B] block mb-1">
                        {activePhoto.category}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-light text-white leading-tight drop-shadow-md">
                        {activePhoto.title}
                      </h3>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Editorial Craftsmanship & Controls */}
            <div className="lg:col-span-5 text-left space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhoto.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.45 }}
                  className="space-y-5"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E3F]/30 border border-[#8B1E3F] text-[#FAF7F0] text-xs font-medium tracking-wide">
                    <span>{activePhoto.hue}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#FAF7F0] leading-snug">
                    {activePhoto.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#FAF7F0]/80 font-light leading-relaxed">
                    {activePhoto.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-[#C8A96B]/25">
                      <span className="text-[10px] uppercase text-[#C8A96B] tracking-wider block mb-1">
                        Zari Purity
                      </span>
                      <span className="text-xs sm:text-sm font-serif font-medium text-white">
                        {activePhoto.zari}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-[#C8A96B]/25">
                      <span className="text-[10px] uppercase text-[#C8A96B] tracking-wider block mb-1">
                        Aspect Ratio
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-white">
                        9:10 Editorial
                      </span>
                    </div>
                  </div>

                  {/* Actions & Catalog Navigation */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => navigateTo('catalog', undefined, 'Silk Sarees')}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#8B1E3F] hover:bg-[#651C32] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-xl border border-[#C8A96B]/50 hover:border-[#C8A96B]"
                    >
                      <span>Explore Saree Collection</span>
                      <ArrowRight className="w-4 h-4 text-[#C8A96B]" />
                    </button>

                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="p-3 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/20 text-[#FAF7F0]/80 hover:text-white transition-all"
                      aria-label={isPaused ? 'Resume auto-slideshow' : 'Pause auto-slideshow'}
                      title={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
                    >
                      {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Slide Controls */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-white/[0.05] hover:bg-[#8B1E3F] border border-[#C8A96B]/40 hover:border-[#C8A96B] text-white transition-all shadow-md group"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-white/[0.05] hover:bg-[#8B1E3F] border border-[#C8A96B]/40 hover:border-[#C8A96B] text-white transition-all shadow-md group"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Progress bar across 9 slides */}
                <div className="flex-1 h-1 bg-white/15 rounded-full overflow-hidden ml-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#8B1E3F] to-[#C8A96B]"
                    initial={false}
                    animate={{ width: `${((currentIndex + 1) / GALLERY_ITEMS.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Carousel Strip (Strict 9:10 Aspect, All 9 Photos) */}
          <div className="mt-14 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C8A96B]">
                Curated Gallery Thumbnails
              </span>
              <span className="text-xs text-white/50 font-mono">
                {currentIndex + 1} of {GALLERY_ITEMS.length}
              </span>
            </div>

            <div
              ref={thumbnailStripRef}
              className="flex items-center gap-3.5 overflow-x-auto no-scrollbar pb-3 pt-1 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {GALLERY_ITEMS.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative flex-shrink-0 w-16 sm:w-20 md:w-24 aspect-[9/10] rounded-xl overflow-hidden transition-all duration-300 transform ${
                      isActive
                        ? 'ring-2 ring-[#C8A96B] scale-105 shadow-xl opacity-100 border border-[#C8A96B]'
                        : 'border border-white/20 opacity-50 hover:opacity-90 hover:scale-100 hover:border-[#C8A96B]/60'
                    }`}
                    aria-label={`View photo ${idx + 1}: ${item.title}`}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div
                      className={`absolute inset-0 transition-opacity ${
                        isActive ? 'bg-[#8B1E3F]/20' : 'bg-black/30'
                      }`}
                    />
                    <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold text-white bg-black/60 px-1 rounded">
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm"
              aria-label="Close fullscreen view"
            >
              ✕
            </button>

            <div
              className="relative max-h-[90vh] aspect-[9/10] rounded-2xl overflow-hidden shadow-2xl border border-[#C8A96B]/40"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="w-full h-full object-contain bg-black"
              />
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-black/70 backdrop-blur-md text-center">
                <p className="font-serif text-lg text-white font-light">{activePhoto.title}</p>
                <p className="text-xs text-[#C8A96B] font-mono mt-1">{activePhoto.category} • {activePhoto.zari}</p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-[#8B1E3F] text-white"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-[#8B1E3F] text-white"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
