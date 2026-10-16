import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'aaranya_curtain_intro_shown';

export const CurtainIntro: React.FC = () => {
  const [shouldRender, setShouldRender] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem(STORAGE_KEY) !== 'true';
    } catch {
      return false;
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    if (!shouldRender) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch {}
      setShouldRender(false);
      return;
    }

    // Auto-part the curtains after initial regal presentation
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 850);

    // Complete reveal and remove from DOM after 2.4s
    const cleanupTimer = setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch {}
      setIsRemoved(true);
    }, 2400);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(cleanupTimer);
    };
  }, [shouldRender]);

  const handleManualOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch {}
      setIsRemoved(true);
    }, 1200);
  };

  if (!shouldRender || isRemoved) return null;

  return (
    <AnimatePresence>
      {!isRemoved && (
        <div
          id="bridal-curtain-intro"
          className="fixed inset-0 z-[100] overflow-hidden bg-[#0D0907] pointer-events-auto select-none"
          style={{ perspective: '1400px' }}
          onClick={handleManualOpen}
          role="dialog"
          aria-label="Aaranya Silks Bridal Couture Boutique Reveal"
        >
          {/* Skip Control */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleManualOpen();
            }}
            className="absolute top-5 right-5 sm:top-7 sm:right-8 z-30 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-[#E5B842] border border-[#C8A96B]/40 hover:border-[#E5B842] text-xs font-serif uppercase tracking-[0.2em] transition-all duration-300 shadow-xl cursor-pointer"
          >
            <span>Skip To Boutique</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Left Saree Curtain Panel */}
          <motion.div
            initial={{ x: '0%', rotateY: 0, scaleX: 1 }}
            animate={
              isOpen
                ? {
                    x: '-105%',
                    rotateY: -26,
                    scaleX: 0.82,
                    transition: { duration: 1.35, ease: [0.65, 0, 0.25, 1] }
                  }
                : { x: '0%', rotateY: 0, scaleX: 1 }
            }
            className="absolute top-0 bottom-0 left-0 w-[51%] origin-left overflow-hidden shadow-[25px_0_60px_rgba(0,0,0,0.85)] z-10"
            style={{
              background:
                'linear-gradient(135deg, #4A0E1A 0%, #651C32 30%, #8B1E3F 65%, #521323 100%)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Rich Silk Drape Pleat Folds Simulation */}
            <div
              className="absolute inset-0 pointer-events-none opacity-45"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(0,0,0,0.48) 0px, rgba(255,255,255,0.08) 25px, rgba(0,0,0,0.52) 55px, rgba(0,0,0,0.2) 80px, rgba(255,255,255,0.06) 110px)'
              }}
            />

            {/* Subtle Royal Damask Jacquard Motif Watermark */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, rgba(200,169,107,0.4) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Heavy Gold Zari Korvai Right Border on Left Panel */}
            <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-[#E5B842] via-[#C8A96B] to-[#996515] border-l border-[#FAF7F0]/30 shadow-2xl flex flex-col justify-around items-center py-4">
              <div className="w-full h-full opacity-60 bg-[repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_0,transparent_6px)]" />
            </div>

            {/* Golden Fringe / Hem Trim Highlight */}
            <div className="absolute top-0 bottom-0 right-8 sm:right-12 w-2 bg-gradient-to-l from-[#FAF7F0]/40 to-transparent" />
          </motion.div>

          {/* Right Saree Curtain Panel */}
          <motion.div
            initial={{ x: '0%', rotateY: 0, scaleX: 1 }}
            animate={
              isOpen
                ? {
                    x: '105%',
                    rotateY: 26,
                    scaleX: 0.82,
                    transition: { duration: 1.35, ease: [0.65, 0, 0.25, 1] }
                  }
                : { x: '0%', rotateY: 0, scaleX: 1 }
            }
            className="absolute top-0 bottom-0 right-0 w-[51%] origin-right overflow-hidden shadow-[-25px_0_60px_rgba(0,0,0,0.85)] z-10"
            style={{
              background:
                'linear-gradient(225deg, #4A0E1A 0%, #651C32 30%, #8B1E3F 65%, #521323 100%)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Rich Silk Drape Pleat Folds Simulation */}
            <div
              className="absolute inset-0 pointer-events-none opacity-45"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(0,0,0,0.48) 0px, rgba(255,255,255,0.08) 25px, rgba(0,0,0,0.52) 55px, rgba(0,0,0,0.2) 80px, rgba(255,255,255,0.06) 110px)'
              }}
            />

            {/* Subtle Royal Damask Jacquard Motif Watermark */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, rgba(200,169,107,0.4) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Heavy Gold Zari Korvai Left Border on Right Panel */}
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-[#E5B842] via-[#C8A96B] to-[#996515] border-r border-[#FAF7F0]/30 shadow-2xl flex flex-col justify-around items-center py-4">
              <div className="w-full h-full opacity-60 bg-[repeating-linear-gradient(-45deg,#000_0,#000_2px,transparent_0,transparent_6px)]" />
            </div>

            {/* Golden Fringe / Hem Trim Highlight */}
            <div className="absolute top-0 bottom-0 left-8 sm:left-12 w-2 bg-gradient-to-r from-[#FAF7F0]/40 to-transparent" />
          </motion.div>

          {/* Top Bridal Arch Toran / Valance */}
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={
              isOpen
                ? {
                    y: '-100%',
                    opacity: 0,
                    transition: { duration: 1.1, ease: 'easeInOut' }
                  }
                : { y: 0, opacity: 1 }
            }
            className="absolute top-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-b from-[#3D0B16] via-[#651C32] to-transparent z-20 pointer-events-none flex items-start justify-center pt-2"
          >
            <div className="w-full max-w-4xl h-1.5 bg-gradient-to-r from-transparent via-[#E5B842] to-transparent shadow-[0_0_15px_#E5B842]" />
          </motion.div>

          {/* Center Medallion Seal: Aaranya Silks Royal Bridal Crest */}
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={
              isOpen
                ? {
                    scale: 1.25,
                    opacity: 0,
                    transition: { duration: 0.65, ease: 'easeOut' }
                  }
                : { scale: 1, opacity: 1 }
            }
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-none"
          >
            <div className="relative p-8 sm:p-10 rounded-full bg-[#1C1A19]/90 backdrop-blur-xl border-2 border-[#E5B842] shadow-[0_0_60px_rgba(200,169,107,0.4)] flex flex-col items-center justify-center text-center max-w-[280px] sm:max-w-[340px]">
              {/* Outer Golden Aura Ring */}
              <div className="absolute -inset-2.5 rounded-full border border-[#C8A96B]/30 animate-pulse pointer-events-none" />

              <Sparkles className="w-6 h-6 text-[#E5B842] mb-2 animate-spin-slow" />

              <h2 className="font-serif text-xl sm:text-2xl font-light text-[#FAF7F0] tracking-[0.25em] uppercase mb-1 drop-shadow">
                Aaranya Silks
              </h2>

              <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#E5B842] to-transparent my-1.5" />

              <p className="text-[10px] sm:text-[11px] font-sans font-medium text-[#C8A96B] tracking-[0.3em] uppercase">
                Bridal Couture • 2026
              </p>

              <div className="mt-4 px-3 py-1 rounded-full bg-[#651C32]/80 border border-[#C8A96B]/40 text-[9px] uppercase tracking-[0.2em] text-[#FAF7F0]/90">
                Opening Atelier
              </div>
            </div>
          </motion.div>

          {/* Bottom Ambient Glow */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black via-transparent to-transparent z-15 pointer-events-none" />
        </div>
      )}
    </AnimatePresence>
  );
};
