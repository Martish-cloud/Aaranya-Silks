import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, CheckCircle, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/sarees';
import { WipeText } from './WipeText';

import radhikaImg from '../assets/Need to Update/Words of Adornment/Radhika S. Rao.avif';
import devikaImg from '../assets/Need to Update/Words of Adornment/Devika Singhania.avif';
import sunitiImg from '../assets/Need to Update/Words of Adornment/Suniti Mehra.avif';
import meenakshiImg from '../assets/Need to Update/Words of Adornment/Meenakshi Iyer.avif';

const AUTHOR_PHOTOS: Record<string, string> = {
  'Radhika S. Rao': radhikaImg,
  'Devika Singhania': devikaImg,
  'Suniti Mehra': sunitiImg,
  'Meenakshi Iyer': meenakshiImg,
};

export const ReviewsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const markUserInteraction = () => {
    setIsUserInteracting(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 4000);
  };

  // Continuous, slow, smooth horizontal auto-sliding moving from left to right
  useEffect(() => {
    const rail = scrollRef.current;
    if (!rail) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    // Start in the middle so left-to-right scrolling can immediately happen
    if (rail.scrollLeft === 0 && rail.scrollWidth > 0) {
      rail.scrollLeft = rail.scrollWidth / 2;
    }

    let animationFrameId: number;
    const speed = 0.65; // slow, smooth left-to-right velocity

    const scrollLoop = () => {
      if (!isHovered && !isUserInteracting && rail) {
        rail.scrollLeft -= speed; // moves cards from left to right
        const halfWidth = rail.scrollWidth / 2;
        if (rail.scrollLeft <= 0) {
          rail.scrollLeft += halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    };
  }, [isHovered, isUserInteracting]);

  const scroll = (direction: 'left' | 'right') => {
    markUserInteraction();
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.7 : clientWidth * 0.7;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  const DISPLAY_REVIEWS = [...CUSTOMER_REVIEWS, ...CUSTOMER_REVIEWS];

  return (
    <section
      id="words-of-adornment"
      className="py-20 md:py-28 bg-[#FAF7F0] relative overflow-hidden border-t border-[#C8A96B]/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 text-left">
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
              className="p-3 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Continuous Left-to-Right Auto-Moving Floating Carousel Strip */}
        <div
          ref={scrollRef}
          onTouchStart={markUserInteraction}
          onScroll={markUserInteraction}
          className="flex items-stretch gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DISPLAY_REVIEWS.map((rev, idx) => {
            const authorPhoto = AUTHOR_PHOTOS[rev.author];

            return (
              <motion.div
                key={`${rev.id}-${idx}`}
                animate={{
                  y: [0, -6, 0]
                }}
                transition={{
                  duration: 3.8 + (idx % 4) * 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: (idx % 4) * 0.3
                }}
                className="flex-shrink-0 w-80 sm:w-96 p-7 rounded-3xl bg-[#F2EBDD] border border-[#C8A96B]/30 flex flex-col justify-between text-left shadow-sm hover:shadow-xl transition-all relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Quote className="w-8 h-8 text-[#C8A96B]/40" />
                    {/* Star rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#C8A96B] fill-current" />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-serif text-lg font-semibold text-[#651C32] mb-2 leading-snug">
                    "{rev.title}"
                  </h4>

                  <p className="text-xs sm:text-sm text-[#1C1A19]/80 font-sans font-light leading-relaxed mb-6">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C8A96B]/25">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {authorPhoto && (
                        <img
                          src={authorPhoto}
                          alt={rev.author}
                          className="w-11 h-11 rounded-full object-cover border-2 border-[#C8A96B]/60 shadow-sm shrink-0"
                          loading="lazy"
                        />
                      )}
                      <div>
                        <span className="font-serif font-bold text-sm text-[#1C1A19] block">
                          {rev.author}
                        </span>
                        <p className="text-[11px] text-[#1C1A19]/60 font-light">
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
                  <p className="text-[10px] text-[#8B1E3F] tracking-wide mt-2 truncate">
                    Purchased: {rev.sareePurchased}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
