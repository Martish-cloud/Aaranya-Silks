import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Compass, ChevronLeft, ChevronRight, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatters';
import { WipeText } from './WipeText';

import wowImg1 from '../assets/Wow/Image (1).webp';
import wowImg2 from '../assets/Wow/Image (4).webp';
import wowImg3 from '../assets/Wow/Image (5).webp';

interface SareePage {
  id: number;
  pageNum: string;
  name: string;
  headline: string;
  slug: string;
  palette: string;
  fabric: string;
  zari: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  highlights: string[];
  categoryTarget: string;
}

const AUTUMN_WINTER_PAGES: SareePage[] = [
  {
    id: 1,
    pageNum: '01',
    name: 'Suhani Crimson Zari Saree',
    headline: 'SUHANI CRIMSON ZARI',
    slug: 'suhani-crimson-zari-saree',
    palette: 'Crimson & 24k Tested Gold',
    fabric: 'Heritage Korvai Pure Katan Silk',
    zari: 'Certified 24-Karat Tested Gold Zari',
    price: 26500,
    originalPrice: 31500,
    image: wowImg2,
    description:
      'Auspicious vermillion bridal heirloom woven with certified 24-karat tested gold zari on sacred pit looms. Features centuries-old Korvai interlock motifs for timeless royalty.',
    highlights: ['Certified Pure Gold Zari', 'Dual-Artisan Korvai Interlock', 'Heirloom Trousseau Archival Box'],
    categoryTarget: 'Bridal Sarees'
  },
  {
    id: 2,
    pageNum: '02',
    name: 'Rosé Net Embroidered Saree',
    headline: 'ROSÉ NET EMBROIDERED',
    slug: 'rose-net-embroidered-saree',
    palette: 'Blush Rose & Warm Cream',
    fabric: 'Pure Silk Net & Micro-Resham',
    zari: 'Subtle Champagne Gold Badla Work',
    price: 21600,
    originalPrice: 25900,
    image: wowImg1,
    description:
      'A gossamer-light translucent net sheer adorned with hand-placed micro-sequin florals, scalloped pearl edgings, and an ethereal liquid drape crafted for gala evenings.',
    highlights: ['Micro-Resham Threadwork', 'Handcrafted Scallop Borders', 'Featherweight Evening Drape'],
    categoryTarget: 'Party Wear Sarees'
  },
  {
    id: 3,
    pageNum: '03',
    name: 'Swarna Hansa Metallic Tissue',
    headline: 'SWARNA HANSA TISSUE',
    slug: 'swarna-hansa-metallic-tissue',
    palette: 'Liquid Champagne & Antique Bronze',
    fabric: 'Pure Metallic Tissue Filament Silk',
    zari: 'High-Luster Zero-Twist Molten Zari',
    price: 24800,
    originalPrice: 29500,
    image: wowImg3,
    description:
      'Iridescent high-luster metallic tissue spun with zero-twist zari threads. Radiates a molten gold glow under evening chandeliers with matching heavy woven brocade blouse.',
    highlights: ['Liquid Molten Gold Luster', 'Zero Reverse Thread Floats', 'Heavy Brocade Blouse Piece'],
    categoryTarget: 'Silk Sarees'
  }
];

// Permanent in-memory cache for lookbook images to prevent re-downloads and GC de-allocation
const lookbookImageCache = new Map<string, HTMLImageElement>();

function preloadLookbookImage(src: string): void {
  if (!src || lookbookImageCache.has(src)) return;
  const img = new Image();
  img.src = src;
  img.decoding = 'async';
  lookbookImageCache.set(src, img);
  if (typeof img.decode === 'function') {
    img.decode().catch(() => {});
  }
}

// Prime cache immediately at module load time for instantaneous navigation
AUTUMN_WINTER_PAGES.forEach((page) => preloadLookbookImage(page.image));

export const SeasonForecast: React.FC = () => {
  const { navigateTo } = useShop();
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentPage = AUTUMN_WINTER_PAGES[currentPageIdx];

  const startAnimationLock = () => {
    isAnimatingRef.current = true;
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    // Safety fallback timeout to ensure animation lock never gets stuck
    animTimeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
    }, 550);
  };

  const handleAnimationComplete = () => {
    isAnimatingRef.current = false;
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
  };

  const handlePrevPage = () => {
    if (isAnimatingRef.current) return;
    startAnimationLock();
    setDirection(-1);
    setCurrentPageIdx((prev) => (prev === 0 ? AUTUMN_WINTER_PAGES.length - 1 : prev - 1));
  };

  const handleNextPage = () => {
    if (isAnimatingRef.current) return;
    startAnimationLock();
    setDirection(1);
    setCurrentPageIdx((prev) => (prev === AUTUMN_WINTER_PAGES.length - 1 ? 0 : prev + 1));
  };

  const handleGoToPage = (idx: number) => {
    if (isAnimatingRef.current || idx === currentPageIdx) return;
    startAnimationLock();
    setDirection(idx > currentPageIdx ? 1 : -1);
    setCurrentPageIdx(idx);
  };

  // Preload adjacent images whenever page changes
  React.useEffect(() => {
    const nextIdx = (currentPageIdx + 1) % AUTUMN_WINTER_PAGES.length;
    const prevIdx = (currentPageIdx - 1 + AUTUMN_WINTER_PAGES.length) % AUTUMN_WINTER_PAGES.length;
    preloadLookbookImage(AUTUMN_WINTER_PAGES[nextIdx].image);
    preloadLookbookImage(AUTUMN_WINTER_PAGES[prevIdx].image);
  }, [currentPageIdx]);

  // Clean up any pending animation lock timeout on unmount
  React.useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 40) {
      handlePrevPage();
    } else if (delta < -40) {
      handleNextPage();
    }
    touchStartX.current = null;
  };

  // 3D Realistic Fashion Lookbook Page-Turn Variants
  const pageTurnVariants: Variants = {
    enter: (dir: number) => ({
      // When NEXT (dir > 0): incoming page is underneath at zIndex 10
      // When PREVIOUS (dir < 0): incoming page turns in from left at zIndex 20
      zIndex: dir > 0 ? 10 : 20,
      transformOrigin: 'left center',
      rotateY: dir > 0 ? 0 : -85,
      opacity: dir > 0 ? 1 : 0.6,
      scale: dir > 0 ? 0.98 : 1,
    }),
    center: {
      zIndex: 15,
      transformOrigin: 'left center',
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.33, 1, 0.68, 1],
      }
    },
    exit: (dir: number) => ({
      // When NEXT (dir > 0): outgoing page is on top at zIndex 20, turning leftwards
      // When PREVIOUS (dir < 0): outgoing page is underneath at zIndex 10
      zIndex: dir > 0 ? 20 : 10,
      transformOrigin: 'left center',
      rotateY: dir > 0 ? -85 : 0,
      opacity: dir > 0 ? 0 : 0.85,
      scale: dir > 0 ? 0.98 : 0.98,
      transition: {
        duration: 0.45,
        ease: [0.33, 1, 0.68, 1],
      }
    })
  };

  // Subtle Dynamic Lighting Shadow for realistic paper curvature during turn
  const pageShadowVariants: Variants = {
    enter: (dir: number) => ({
      opacity: dir > 0 ? 0.35 : 0.45,
    }),
    center: {
      opacity: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    },
    exit: (dir: number) => ({
      opacity: dir > 0 ? 0.5 : 0.2,
      transition: { duration: 0.45, ease: 'easeIn' }
    })
  };

  return (
    <section
      id="autumn-winter-2026"
      className="py-10 sm:py-14 bg-[#FAF7F0] relative overflow-hidden border-t border-[#C8A96B]/20"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with WipeText */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end mb-6 sm:mb-8 text-left">
          {/* Left Title Area */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#8B1E3F] mb-2">
              <Compass className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>SEASON FORECAST LOOKBOOK</span>
            </div>
            <WipeText
              as="h2"
              direction="left-to-right"
              duration={0.85}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1A19] leading-[1.1] tracking-tight"
            >
              Autumn—Winter 2026
            </WipeText>
          </div>

          {/* Center Editorial Subtitle */}
          <div className="lg:col-span-4">
            <p className="text-xs sm:text-[13px] text-[#1C1A19]/75 font-sans font-light leading-relaxed">
              Three readings on how the house is draping the season — an interactive lookbook turning experience from the atelier.
            </p>
          </div>

          {/* Right Page Controls & Counter */}
          <div className="lg:col-span-2 flex items-center justify-start lg:justify-end gap-2.5">
            <button
              onClick={handlePrevPage}
              className="p-2 sm:p-2.5 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all shadow-sm"
              aria-label="Previous lookbook page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-[#1C1A19]/80 font-bold tracking-widest">
              {currentPage.pageNum} / 03
            </span>
            <button
              onClick={handleNextPage}
              className="p-2 sm:p-2.5 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all shadow-sm"
              aria-label="Next lookbook page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D Book Lookbook Spread Container */}
        <div
          className="relative w-full max-w-4xl lg:max-w-[980px] mx-auto rounded-3xl bg-[#F6F1E5] p-3 sm:p-5 md:p-6 border border-[#C8A96B]/30 shadow-xl shadow-[#651C32]/5 overflow-hidden"
        >
          {/* Book Spine Center Lighting Accent */}
          <div className="hidden md:block absolute left-1/2 inset-y-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/10 via-white/15 to-black/10 pointer-events-none z-20" />

          {/* Gold page edging line */}
          <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent via-[#C8A96B]/40 to-transparent pointer-events-none" />

          {/* Stable Outer Grid Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-8 items-center rounded-2xl bg-white p-4 sm:p-6 lg:p-7 border border-[#C8A96B]/20 shadow-md text-left relative overflow-hidden">
            {/* Left Column: Saree Visual Showcase with Image-Only 3D Page Flip */}
            <div className="md:col-span-6 relative flex justify-center items-center">
              {/* Rock-Solid Fixed Dimension Stage (Zero Vertical Jumps, Stable 3D Perspective) */}
              <div
                className="relative w-full aspect-[3/4] sm:aspect-[4/5] max-h-[380px] sm:max-h-[430px] rounded-2xl overflow-hidden bg-[#FAF7F0] border border-[#C8A96B]/25 shadow-xl group mx-auto"
                style={{ perspective: '1400px' }}
              >
                {/* Image-Side Navigation: Previous Arrow Control */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevPage();
                  }}
                  aria-label="Previous lookbook image"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-[#651C32] text-white hover:text-[#FAF7F0] backdrop-blur-md border border-[#C8A96B]/50 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Image-Side Navigation: Next Arrow Control */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextPage();
                  }}
                  aria-label="Next lookbook image"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-[#651C32] text-white hover:text-[#FAF7F0] backdrop-blur-md border border-[#C8A96B]/50 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <AnimatePresence custom={direction} initial={false}>
                  <motion.div
                    key={currentPage.id}
                    custom={direction}
                    variants={pageTurnVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    onAnimationComplete={handleAnimationComplete}
                    style={{
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                    className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl bg-[#FAF7F0]"
                  >
                    <img
                      src={currentPage.image}
                      alt={currentPage.name}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

                    {/* Realistic 3D Paper Curvature Lighting Shadow */}
                    <motion.div
                      custom={direction}
                      variants={pageShadowVariants}
                      className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent pointer-events-none"
                    />

                    {/* Saree Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#E5B842] text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-white/20">
                        <Sparkles className="w-3 h-3 text-[#E5B842]" />
                        <span>{currentPage.palette}</span>
                      </span>
                    </div>

                    {/* Bottom Overlay Label */}
                    <div className="absolute bottom-3 inset-x-3 text-white z-10">
                      <span className="text-[10px] font-mono text-[#E5B842] tracking-widest block uppercase mb-0.5">
                        Plate {currentPage.pageNum} • Autumn—Winter Edit
                      </span>
                      <h4 className="font-serif text-lg sm:text-xl font-light text-white leading-tight">
                        {currentPage.headline}
                      </h4>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Editorial Text & Lookbook Story (Stable, No 3D Rotation) */}
            <div className="md:col-span-6 md:pl-5 lg:pl-7 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage.id}
                  initial={{ opacity: 0, x: direction > 0 ? 12 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -12 : 12 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="flex flex-col justify-between space-y-3.5 max-w-[420px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9.5px] sm:text-[11px] uppercase font-bold tracking-[0.22em] text-[#8B1E3F]">
                        LOOKBOOK ENTRY
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono text-[#1C1A19]/50 tracking-wider">
                        Page {currentPage.pageNum} of 03
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-light text-[#1C1A19] leading-snug mb-1.5">
                      {currentPage.name}
                    </h3>

                    <p className="text-[11.5px] sm:text-xs text-[#1C1A19]/75 font-sans font-light leading-relaxed mb-3.5">
                      {currentPage.description}
                    </p>

                    {/* Highlights Grid */}
                    <div className="space-y-1.5 pt-2.5 border-t border-[#C8A96B]/25 mb-3.5">
                      <span className="text-[9.5px] uppercase tracking-wider text-[#1C1A19]/60 font-bold block mb-1">
                        Atelier Specifications
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF7F0] border border-[#C8A96B]/20">
                          <span className="text-[#8B1E3F] text-[9.5px] uppercase font-bold block">Fabric</span>
                          <span className="font-serif text-[11px] sm:text-xs text-[#1C1A19] font-medium truncate block">{currentPage.fabric}</span>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF7F0] border border-[#C8A96B]/20">
                          <span className="text-[#8B1E3F] text-[9.5px] uppercase font-bold block">Zari & Weave</span>
                          <span className="font-serif text-[11px] sm:text-xs text-[#1C1A19] font-medium truncate block">{currentPage.zari}</span>
                        </div>
                      </div>
                    </div>

                    {/* Highlights Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {currentPage.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[9.5px] sm:text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-[#F2EBDD] text-[#651C32] font-medium border border-[#C8A96B]/30"
                        >
                          • {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA Action Group */}
                  <div className="pt-2.5 border-t border-[#C8A96B]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[9.5px] text-[#1C1A19]/60 uppercase tracking-wider block">Privilege Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-[#651C32]">
                          {formatINR(currentPage.price)}
                        </span>
                        <span className="text-[11px] sm:text-xs text-[#1C1A19]/50 line-through">
                          {formatINR(currentPage.originalPrice)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateTo('catalog', undefined, currentPage.categoryTarget)}
                        className="inline-flex items-center gap-1.5 px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-xl transition-all cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#E5B842]" />
                        <span>Discover Saree</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Page Indicators Dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {AUTUMN_WINTER_PAGES.map((page, idx) => (
              <button
                key={page.id}
                onClick={() => handleGoToPage(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentPageIdx === idx
                    ? 'w-6 h-2 bg-[#651C32]'
                    : 'w-2 h-2 bg-[#C8A96B]/50 hover:bg-[#C8A96B]'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
