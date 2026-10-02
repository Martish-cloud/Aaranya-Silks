import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight, Expand } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { WipeText } from './WipeText';
import { preloadImage } from '../utils/imagePreloader';

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

const cardSlideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 320 : dir < 0 ? -320 : 0,
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    zIndex: 0,
    x: dir < 0 ? 320 : -320,
    opacity: 0,
    scale: 0.92,
  }),
};

export const SignatureCollections: React.FC = () => {
  const { navigateTo } = useShop();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [entranceKey, setEntranceKey] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRectRef = useRef<DOMRect | null>(null);
  const isTransitioningRef = useRef(false);

  const activePhoto = GALLERY_ITEMS[currentIndex];

  const handleNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 380);
  }, []);

  const handlePrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 380);
  }, []);

  // Predictive preloading: Keep upcoming (next) and previous images ready in memory before transition
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % GALLERY_ITEMS.length;
    const prevIdx = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    preloadImage(GALLERY_ITEMS[nextIdx].src);
    preloadImage(GALLERY_ITEMS[prevIdx].src);
  }, [currentIndex]);

  // Viewport Intersection Observer: Immediate entrance trigger on entry, reset state on exit
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setEntranceKey((k) => k + 1);
        } else {
          setIsInView(false);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  // Mouse tilt effect calculation with cached rect to avoid forced reflow
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    cardRectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRectRef.current) {
      cardRectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const rect = cardRectRef.current;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    cardRectRef.current = null;
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      id="photo-gallery"
      className="py-16 md:py-24 bg-[#0F0A09] text-[#FAF7F0] relative overflow-hidden select-none"
    >
      {/* Full Section Background - Same Selected Image Enlarged with High Clarity & Crisp Visibility */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`section-bg-${activePhoto.id}`}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activePhoto.src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center brightness-105 contrast-105 transform-gpu"
            />
          </motion.div>
        </AnimatePresence>
        {/* Soft luxury tint overlay keeping the photo background crystal-clear and fully visible */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header with Re-triggerable Entrance Animation */}
        <motion.div
          key={`header-${entranceKey}`}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
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
        </motion.div>

        {/* Main Editorial Presentation Frame */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main 9:10 Aspect Ratio Showcase Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left/Center Column: Strict 9:10 Main Image with Synchronized Depth Background */}
            <div className="lg:col-span-7 flex justify-center overflow-hidden py-4 px-2">
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[450px] aspect-[9/10] flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activePhoto.id}
                    custom={direction}
                    variants={cardSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 280, damping: 28 },
                      opacity: { duration: 0.35, ease: 'easeInOut' },
                      scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                    }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                  >
                    {/* Background Depth Layer - Fully recognizable rear card */}
                    <div className="absolute -inset-3 sm:-inset-5 md:-inset-6 rounded-[2.5rem] overflow-hidden pointer-events-none -z-10 shadow-2xl">
                      <img
                        src={activePhoto.src}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover object-top opacity-100 transform-gpu"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Main Foreground Card with 3D Tilt */}
                    <div
                      onMouseMove={handleMouseMove}
                      style={{
                        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                        transition: 'transform 0.15s ease-out',
                      }}
                      className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#C8A96B]/40 group bg-[#1A1412]"
                    >
                      {/* Inside-Card Enlarged Depth Background Layer */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                        <img
                          src={activePhoto.src}
                          alt=""
                          aria-hidden="true"
                          className="w-full h-full object-cover object-top filter blur-2xl opacity-25 transform-gpu"
                        />
                      </div>

                      {/* Primary High-Resolution Foreground Image */}
                      <div className="absolute inset-0 w-full h-full z-10">
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
                          className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#C8A96B] hover:text-[#C8A96B] text-white/80 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
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
                      </div>
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
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-5 bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#C8A96B]/30 shadow-2xl"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E3F]/40 border border-[#8B1E3F] text-[#FAF7F0] text-xs font-medium tracking-wide">
                    <span>{activePhoto.hue}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#FAF7F0] leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                    {activePhoto.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#FAF7F0]/90 font-light leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    {activePhoto.description}
                  </p>

                  {/* Highlights Spec Card */}
                  <div className="pt-2">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.06] border border-[#C8A96B]/25">
                      <span className="text-[10px] uppercase text-[#C8A96B] tracking-wider block mb-1">
                        Zari Purity
                      </span>
                      <span className="text-xs sm:text-sm font-serif font-medium text-white">
                        {activePhoto.zari}
                      </span>
                    </div>
                  </div>

                  {/* Actions & Catalog Navigation */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => navigateTo('catalog', undefined, 'Silk Sarees')}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#8B1E3F] hover:bg-[#651C32] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-xl border border-[#C8A96B]/50 hover:border-[#C8A96B] cursor-pointer"
                    >
                      <span>Explore Saree Collection</span>
                      <ArrowRight className="w-4 h-4 text-[#C8A96B]" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Slide Controls (Only Left and Right arrows as required) */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handlePrev}
                  className="p-3.5 rounded-full bg-black/60 hover:bg-[#8B1E3F] border border-[#C8A96B]/50 hover:border-[#C8A96B] text-white transition-all shadow-xl group cursor-pointer active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#C8A96B] backdrop-blur-md"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={handleNext}
                  className="p-3.5 rounded-full bg-black/60 hover:bg-[#8B1E3F] border border-[#C8A96B]/50 hover:border-[#C8A96B] text-white transition-all shadow-xl group cursor-pointer active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#C8A96B] backdrop-blur-md"
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
