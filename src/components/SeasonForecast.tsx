import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Compass, ChevronLeft, ChevronRight, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatters';
import { WipeText } from './WipeText';
import { preloadImage } from '../utils/imagePreloader';

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
    id: 2,
    pageNum: '02',
    name: 'Suhani Crimson Zari Saree',
    headline: 'SUHANI CRIMSON ZARI',
    slug: 'suhani-crimson-zari-saree',
    palette: 'Crimson Red & 24k Tested Gold',
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

export const SeasonForecast: React.FC = () => {
  const { navigateTo } = useShop();
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const currentPage = AUTUMN_WINTER_PAGES[currentPageIdx];

  const handlePrevPage = () => {
    setDirection(-1);
    setCurrentPageIdx((prev) => (prev === 0 ? AUTUMN_WINTER_PAGES.length - 1 : prev - 1));
  };

  const handleNextPage = () => {
    setDirection(1);
    setCurrentPageIdx((prev) => (prev === AUTUMN_WINTER_PAGES.length - 1 ? 0 : prev + 1));
  };

  // Predictive preloading: preload next and previous lookbook images
  React.useEffect(() => {
    const nextIdx = (currentPageIdx + 1) % AUTUMN_WINTER_PAGES.length;
    const prevIdx = (currentPageIdx - 1 + AUTUMN_WINTER_PAGES.length) % AUTUMN_WINTER_PAGES.length;
    preloadImage(AUTUMN_WINTER_PAGES[nextIdx].image);
    preloadImage(AUTUMN_WINTER_PAGES[prevIdx].image);
  }, [currentPageIdx]);

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

  // 3D Luxury Lookbook Image-Only Page-Flip Animation Variants
  const imageVariants: Variants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
      transformOrigin: dir > 0 ? 'left center' : 'right center'
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeInOut'
      }
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.95,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
      transition: {
        duration: 0.45,
        ease: 'easeInOut'
      }
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
            <div className="md:col-span-6 relative" style={{ perspective: '1200px' }}>
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

              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentPage.id}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative aspect-[3/4] sm:aspect-[4/5] max-h-[380px] sm:max-h-[430px] rounded-2xl overflow-hidden bg-[#FAF7F0] border border-[#C8A96B]/25 shadow-xl group mx-auto"
                >
                  <img
                    src={currentPage.image}
                    alt={currentPage.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

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

            {/* Right Column: Editorial Text & Lookbook Story (Stable, No 3D Rotation) */}
            <div className="md:col-span-6 md:pl-5 lg:pl-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
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
                onClick={() => {
                  setDirection(idx > currentPageIdx ? 1 : -1);
                  setCurrentPageIdx(idx);
                }}
                className={`transition-all duration-300 rounded-full ${
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
