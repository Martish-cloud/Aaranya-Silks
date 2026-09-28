import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Compass, ChevronLeft, ChevronRight, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatters';
import { WipeText } from './WipeText';

import rosePinkImg from '../assets/studio/rose-pink.png';
import suhaniCrimsonImg from '../assets/studio/suhani-crimson-red.png';
import swarnaGoldImg from '../assets/studio/swarna-liquid-gold.png';

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
    image: rosePinkImg,
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
    image: suhaniCrimsonImg,
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
    image: swarnaGoldImg,
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

  // 3D Luxury Lookbook Page-Flip Animation Variants
  const pageVariants: Variants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 45 : -45,
      opacity: 0,
      scale: 0.96,
      transformOrigin: dir > 0 ? 'left center' : 'right center'
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeInOut'
      }
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -45 : 45,
      opacity: 0,
      scale: 0.96,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
      transition: {
        duration: 0.55,
        ease: 'easeInOut'
      }
    })
  };

  return (
    <section
      id="autumn-winter-2026"
      className="py-20 md:py-28 bg-[#FAF7F0] relative overflow-hidden border-t border-[#C8A96B]/20"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with WipeText */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-16 text-left">
          {/* Left Title Area */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#8B1E3F] mb-3">
              <Compass className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>SEASON FORECAST LOOKBOOK</span>
            </div>
            <WipeText
              as="h2"
              direction="left-to-right"
              duration={0.85}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#1C1A19] leading-[1.08] tracking-tight"
            >
              Autumn—Winter 2026
            </WipeText>
          </div>

          {/* Center Editorial Subtitle */}
          <div className="lg:col-span-4">
            <p className="text-xs sm:text-sm text-[#1C1A19]/75 font-sans font-light leading-relaxed">
              Three readings on how the house is draping the season — an interactive lookbook turning experience from the atelier.
            </p>
          </div>

          {/* Right Page Controls & Counter */}
          <div className="lg:col-span-2 flex items-center justify-start lg:justify-end gap-3">
            <button
              onClick={handlePrevPage}
              className="p-2.5 sm:p-3 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all shadow-sm"
              aria-label="Previous lookbook page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-[#1C1A19]/80 font-bold tracking-widest">
              {currentPage.pageNum} / 03
            </span>
            <button
              onClick={handleNextPage}
              className="p-2.5 sm:p-3 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all shadow-sm"
              aria-label="Next lookbook page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D Book Lookbook Spread Container */}
        <div
          className="relative w-full max-w-5xl mx-auto rounded-3xl bg-[#F6F1E5] p-3 sm:p-6 md:p-8 border border-[#C8A96B]/30 shadow-2xl shadow-[#651C32]/5 overflow-hidden"
          style={{ perspective: '1600px' }}
        >
          {/* Book Spine Center Lighting Accent */}
          <div className="hidden md:block absolute left-1/2 inset-y-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/10 via-white/15 to-black/10 pointer-events-none z-20" />

          {/* Gold page edging line */}
          <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent via-[#C8A96B]/40 to-transparent pointer-events-none" />

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentPage.id}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center rounded-2xl bg-white p-5 sm:p-8 lg:p-10 border border-[#C8A96B]/20 shadow-md text-left relative overflow-hidden"
            >
              {/* Left Column: Saree Visual Showcase */}
              <div className="md:col-span-6 relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF7F0] border border-[#C8A96B]/25 shadow-xl group">
                <img
                  src={currentPage.image}
                  alt={currentPage.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

                {/* Saree Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#E5B842] text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-white/20">
                    <Sparkles className="w-3 h-3 text-[#E5B842]" />
                    <span>{currentPage.palette}</span>
                  </span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 inset-x-4 text-white z-10">
                  <span className="text-[10px] font-mono text-[#E5B842] tracking-widest block uppercase mb-0.5">
                    Plate {currentPage.pageNum} • Autumn—Winter Edit
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-light text-white leading-tight">
                    {currentPage.headline}
                  </h4>
                </div>
              </div>

              {/* Right Column: Editorial Text & Lookbook Story */}
              <div className="md:col-span-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#8B1E3F]">
                      LOOKBOOK ENTRY
                    </span>
                    <span className="text-xs font-mono text-[#1C1A19]/50 tracking-wider">
                      Page {currentPage.pageNum} of 03
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#1C1A19] leading-snug mb-3">
                    {currentPage.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1C1A19]/75 font-sans font-light leading-relaxed mb-6">
                    {currentPage.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="space-y-2.5 pt-4 border-t border-[#C8A96B]/25 mb-6">
                    <span className="text-[10px] uppercase tracking-wider text-[#1C1A19]/60 font-bold block mb-1">
                      Atelier Specifications
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#C8A96B]/20">
                        <span className="text-[#8B1E3F] text-[10px] uppercase font-bold block">Fabric</span>
                        <span className="font-serif text-[#1C1A19] font-medium truncate block">{currentPage.fabric}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#C8A96B]/20">
                        <span className="text-[#8B1E3F] text-[10px] uppercase font-bold block">Zari & Weave</span>
                        <span className="font-serif text-[#1C1A19] font-medium truncate block">{currentPage.zari}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentPage.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] sm:text-[11px] font-sans px-3 py-1 rounded-full bg-[#F2EBDD] text-[#651C32] font-medium border border-[#C8A96B]/30"
                      >
                        • {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & CTA Action Group */}
                <div className="pt-4 border-t border-[#C8A96B]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-[#1C1A19]/60 uppercase tracking-wider block">Privilege Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-[#651C32]">
                        {formatINR(currentPage.price)}
                      </span>
                      <span className="text-xs text-[#1C1A19]/50 line-through">
                        {formatINR(currentPage.originalPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => navigateTo('catalog', undefined, currentPage.categoryTarget)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-xl transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#E5B842]" />
                      <span>Discover Saree</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

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
