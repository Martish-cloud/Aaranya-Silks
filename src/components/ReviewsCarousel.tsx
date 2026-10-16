import React, { useEffect } from 'react';
import { Sparkles, Star, CheckCircle, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/sarees';
import { WipeText } from './WipeText';

import radhikaImg from '../assets/Need to Update/Words of Adornment/Radhika S. Rao.webp';
import devikaImg from '../assets/Need to Update/Words of Adornment/Devika Singhania.webp';
import sunitiImg from '../assets/Need to Update/Words of Adornment/Suniti Mehra.webp';
import meenakshiImg from '../assets/Need to Update/Words of Adornment/Meenakshi Iyer.webp';

import { useAutoScrollRail } from '../utils/useAutoScrollRail';

const AUTHOR_PHOTOS: Record<string, string> = {
  'Radhika S. Rao': radhikaImg,
  'Devika Singhania': devikaImg,
  'Suniti Mehra': sunitiImg,
  'Meenakshi Iyer': meenakshiImg,
};

export const ReviewsCarousel: React.FC = () => {
  // Continuous, slow, smooth horizontal auto-sliding moving from left to right without hover pausing
  const { railRef, markUserInteraction } = useAutoScrollRail({
    direction: 'left-to-right',
    speed: 36,
    isHovered: false,
    pauseOnInteractionDuration: 2000,
  });

  const scroll = (direction: 'left' | 'right') => {
    markUserInteraction();
    if (railRef.current) {
      const firstCard = railRef.current.firstElementChild as HTMLElement | null;
      const step = firstCard ? firstCard.offsetWidth + 20 : 320;
      const offset = direction === 'left' ? -step : step;
      railRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Center-focused dynamic scale and fade calculation
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number;
    let isRunning = true;

    const updateFocalEffects = () => {
      if (!isRunning || !rail) return;
      const rect = rail.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const halfWidth = rect.width / 2;

      if (halfWidth > 0) {
        const children = rail.children;
        const count = children.length;
        for (let i = 0; i < count; i++) {
          const item = children[i] as HTMLElement;
          const cardRect = item.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const dist = Math.abs(cardCenterX - centerX);
          const norm = Math.min(1, dist / halfWidth);

          // Center card scale: ~1.0. Near center: ~0.95. Outer: ~0.90
          const scale = 1.0 - 0.10 * Math.pow(norm, 1.2);
          // Center card opacity: 1.0. Near center: ~0.88. Outer: ~0.68
          const opacity = 1.0 - 0.32 * Math.pow(norm, 1.3);

          item.style.setProperty('--focal-scale', scale.toFixed(3));
          item.style.setProperty('--focal-opacity', opacity.toFixed(3));
        }
      }

      rafId = requestAnimationFrame(updateFocalEffects);
    };

    rafId = requestAnimationFrame(updateFocalEffects);
    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
    };
  }, [railRef]);

  const DISPLAY_REVIEWS = [
    ...CUSTOMER_REVIEWS,
    ...CUSTOMER_REVIEWS,
    ...CUSTOMER_REVIEWS,
    ...CUSTOMER_REVIEWS,
  ];

  return (
    <section
      id="words-of-adornment"
      className="py-14 sm:py-16 md:py-24 bg-[#FAF7F0] relative overflow-hidden border-t border-[#C8A96B]/20"
    >
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 text-left">
          <div>
            <div className="flex items-center gap-2 text-[#8B1E3F] text-xs font-semibold uppercase tracking-[0.25em] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>Patron Testimonials</span>
            </div>
            <WipeText
              as="h2"
              direction="bottom-to-top"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#651C32] tracking-tight"
            >
              Words of Adornment
            </WipeText>
            <p className="text-sm md:text-base text-[#1C1A19]/70 font-light mt-2 max-w-lg">
              Read authentic experiences from brides, families, and connoisseurs adorned in Aaranya Silks.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Usable Viewport: Widen boundaries to eliminate excessive empty space */}
      <div className="w-full max-w-[1480px] 2xl:max-w-[1620px] mx-auto px-2 sm:px-4 lg:px-6 relative">
        {/* Subtle Edge Vignettes to feather card entry and exit smoothly */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAF7F0] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAF7F0] to-transparent pointer-events-none z-10" />

        {/* Continuous Left-to-Right Auto-Moving Carousel Strip with Center-Focused Zoom & Fade */}
        <div
          ref={railRef}
          onTouchStart={markUserInteraction}
          onTouchMove={markUserInteraction}
          onWheel={markUserInteraction}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-3 px-2 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DISPLAY_REVIEWS.map((rev, idx) => {
            const authorPhoto = AUTHOR_PHOTOS[rev.author];

            return (
              /* Outer wrapper receiving center-focused focal scale & opacity */
              <div
                key={`${rev.id}-${idx}`}
                className="flex-shrink-0 transition-transform duration-200 transform-gpu py-2"
                style={{
                  transform: 'scale(var(--focal-scale, 1))',
                  opacity: 'var(--focal-opacity, 1)',
                }}
              >
                {/* Card Container with Independent Traveling Maroon Light Border */}
                <div
                  className="w-[260px] sm:w-[290px] md:w-[310px] lg:w-[325px] xl:w-[335px] h-full rounded-2xl sm:rounded-3xl p-[1.5px] relative overflow-hidden flex flex-col justify-between text-left shadow-sm hover:shadow-xl transition-shadow duration-300 transform-gpu cursor-pointer"
                  style={{
                    boxShadow: '0 4px 18px -3px rgba(101,28,50,0.08), 0 2px 6px -2px rgba(101,28,50,0.05)',
                  }}
                >
                  {/* Base subtle border ring */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-[#C8A96B]/25 pointer-events-none z-0" />

                  {/* Independent Traveling Maroon & Gold Light Beam around outer perimeter */}
                  <div
                    className="absolute -inset-[130%] pointer-events-none motion-safe:animate-[spin_6.5s_linear_infinite] z-0"
                    style={{
                      animationDelay: `${(idx % 4) * -1.6}s`,
                      background:
                        'conic-gradient(from 0deg, transparent 0deg, transparent 310deg, rgba(101,28,50,0.2) 325deg, rgba(139,30,63,0.9) 346deg, rgba(200,169,107,0.8) 355deg, rgba(139,30,63,0.9) 358deg, transparent 360deg)',
                    }}
                  />

                  {/* Inner stationary card: completely stationary content layer */}
                  <div className="relative z-10 w-full h-full p-4.5 sm:p-5 rounded-[calc(1rem-1.5px)] sm:rounded-[calc(1.5rem-1.5px)] bg-[#F2EBDD] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                        <Quote className="w-6 h-6 sm:w-7 sm:h-7 text-[#C8A96B]/40" />
                        {/* Star rating */}
                        <div className="flex items-center gap-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C8A96B] fill-current" />
                          ))}
                        </div>
                      </div>

                      <h4 className="font-serif text-[15px] sm:text-base font-semibold text-[#651C32] mb-1.5 sm:mb-2 leading-snug">
                        "{rev.title}"
                      </h4>

                      <p className="text-xs sm:text-[13px] text-[#1C1A19]/80 font-sans font-light leading-relaxed mb-3.5 sm:mb-4">
                        {rev.comment}
                      </p>
                    </div>

                    <div className="pt-3 sm:pt-3.5 border-t border-[#C8A96B]/25">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          {authorPhoto && (
                            <img
                              src={authorPhoto}
                              alt={rev.author}
                              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover object-top border-2 border-[#C8A96B]/60 shadow-sm shrink-0"
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                          <div>
                            <span className="font-serif font-bold text-[13px] sm:text-sm text-[#1C1A19] block leading-tight">
                              {rev.author}
                            </span>
                            <p className="text-[11px] text-[#1C1A19]/60 font-light mt-0.5">
                              {rev.location} • <span className="italic text-[#651C32]">{rev.occasion}</span>
                            </p>
                          </div>
                        </div>

                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-[#8B1E3F] font-semibold uppercase tracking-wider shrink-0">
                            <CheckCircle className="w-3 h-3 text-[#C8A96B]" />
                            <span className="hidden sm:inline">Verified</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#8B1E3F] tracking-wide mt-1.5 sm:mt-2 truncate">
                        Purchased: {rev.sareePurchased}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
