import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const REELS = [
  { id: 1, title: 'Muhurtham Kanjivaram Draping', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=85', duration: '0:45' },
  { id: 2, title: 'Banarasi Brocade Pleat Styling', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=85', duration: '0:38' },
  { id: 3, title: 'Tissue Silk Golden Hour Flow', image: 'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=600&q=85', duration: '0:52' },
  { id: 4, title: 'Whisper Organza Pallu Toss', image: 'https://images.unsplash.com/photo-1617627143644-84524458f262?auto=format&fit=crop&w=600&q=85', duration: '0:34' }
];

const LOOKBOOK_PAGES = [
  {
    id: 1,
    title: 'The Temple Royalties',
    subtitle: 'Kanjivaram Korvai Anthology',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    categoryTarget: 'Kanjivaram Sarees'
  },
  {
    id: 2,
    title: 'Mughal Courtyard Whispers',
    subtitle: 'Banarasi Kadhwa Brocades',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
    categoryTarget: 'Banarasi Sarees'
  },
  {
    id: 3,
    title: 'Evening Chandelier Glamour',
    subtitle: 'Tissue Silk & Organza Sheers',
    image: 'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=800&q=85',
    categoryTarget: 'Party Wear Sarees'
  }
];

export const LatestTrendsLookbook: React.FC = () => {
  const { navigateTo } = useShop();
  const [currentPage, setCurrentPage] = useState(1); // 1-indexed

  const activeLook = LOOKBOOK_PAGES[currentPage - 1];

  return (
    <section className="py-20 md:py-32 bg-[#FAF7F0] relative overflow-hidden border-t border-[#C8A96B]/20 text-[#1C1A19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video Reels Preview Strip from Frame 18 */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6 text-left">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#8B1E3F]">
                ATELIER REELS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1C1A19]">
                Draped in Motion
              </h3>
            </div>
            <span className="text-xs text-[#1C1A19]/60 font-mono">
              02 / 05 REELS
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {REELS.map((reel) => (
              <div
                key={reel.id}
                onClick={() => navigateTo('catalog')}
                className="group relative aspect-[9/14] rounded-2xl overflow-hidden bg-black cursor-pointer shadow-md hover:shadow-2xl transition-all"
              >
                <img
                  src={reel.image}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E5B842] text-white group-hover:text-[#1C1A19] transition-all shadow-lg">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-3 inset-x-3 text-left">
                  <p className="text-xs font-serif font-bold text-white line-clamp-1">
                    {reel.title}
                  </p>
                  <span className="text-[10px] text-white/70 font-mono mt-0.5 block">
                    {reel.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LATEST TRENDS Lookbook Section matching Frames 18, 1210, 1255 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
          {/* Left Column: 3D Block Extruded Headline & Story (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#8B1E3F] block mb-2">
                EDITORIAL CURATION
              </span>

              {/* Massive 3D Block-Extruded Typography matching Frame 1210 */}
              <h2
                className="font-sans font-black text-5xl sm:text-7xl tracking-tighter leading-[0.9] text-[#1C1A19] uppercase select-none"
                style={{
                  textShadow: '3px 3px 0px #C8A96B, 6px 6px 0px #651C32, 9px 9px 15px rgba(0,0,0,0.2)'
                }}
              >
                LATEST
                <br />
                TRENDS
              </h2>
            </div>

            {/* Pill Button from Frame 1210 */}
            <div>
              <button
                onClick={() => navigateTo('catalog')}
                className="px-7 py-2.5 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md hover:shadow-xl"
              >
                Discover Now
              </button>
            </div>

            {/* Stories Behind The Drape */}
            <div className="space-y-2 pt-2 border-t border-[#C8A96B]/25">
              <h4 className="font-serif text-lg font-bold text-[#651C32]">
                Stories Behind The Drape
              </h4>
              <p className="text-xs text-[#1C1A19]/75 font-sans font-light leading-relaxed max-w-sm">
                Every saree carries a story woven into its silk, inspired by the loom, shaped by the hands that finish its border.
              </p>
            </div>
          </div>

          {/* Center Column: 3D Hardcover Lookbook Album (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* 3D Book Frame */}
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white group cursor-pointer">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLook.id}
                  initial={{ opacity: 0, rotateY: 15 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -15 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => navigateTo('catalog', undefined, activeLook.categoryTarget)}
                  className="w-full h-full relative"
                >
                  <img
                    src={activeLook.image}
                    alt={activeLook.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Book spine lighting accent */}
                  <div className="absolute left-0 inset-y-0 w-4 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none" />

                  <div className="absolute bottom-6 inset-x-6 text-white text-left">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5B842] block mb-1">
                      {activeLook.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl font-light text-white leading-tight">
                      {activeLook.title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Controls < 2 / 3 > matching Frame 1255 */}
            <div className="flex items-center gap-4 mt-5 text-xs font-mono text-[#1C1A19]/80">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-black/15 hover:bg-[#F2EBDD] disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>{currentPage} / {LOOKBOOK_PAGES.length}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(LOOKBOOK_PAGES.length, p + 1))}
                disabled={currentPage === LOOKBOOK_PAGES.length}
                className="p-2 rounded-full border border-black/15 hover:bg-[#F2EBDD] disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Explore The Range breakdown matching Frame 1255 (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-xl font-light text-[#651C32] border-b border-[#C8A96B]/25 pb-2">
              Explore The Range
            </h4>

            <div className="space-y-3 text-xs">
              <div
                onClick={() => navigateTo('catalog', undefined, 'Kanjivaram Sarees')}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F2EBDD] cursor-pointer transition-colors"
              >
                <span className="font-serif font-semibold text-sm text-[#1C1A19]">Kanjivaram</span>
                <span className="text-[#1C1A19]/50">7 Sarees</span>
              </div>

              <div
                onClick={() => navigateTo('catalog', undefined, 'Banarasi Sarees')}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F2EBDD] cursor-pointer transition-colors"
              >
                <span className="font-serif font-semibold text-sm text-[#1C1A19]">Banarasi</span>
                <span className="text-[#1C1A19]/50">5 Sarees</span>
              </div>

              <div
                onClick={() => navigateTo('catalog', undefined, 'Bridal Sarees')}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F2EBDD] cursor-pointer transition-colors"
              >
                <span className="font-serif font-semibold text-sm text-[#1C1A19]">Bridal</span>
                <span className="text-[#1C1A19]/50">4 Sarees</span>
              </div>

              <div
                onClick={() => navigateTo('catalog', undefined, 'Festive Sarees')}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F2EBDD] cursor-pointer transition-colors"
              >
                <span className="font-serif font-semibold text-sm text-[#1C1A19]">Festive</span>
                <span className="text-[#1C1A19]/50">6 Sarees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
