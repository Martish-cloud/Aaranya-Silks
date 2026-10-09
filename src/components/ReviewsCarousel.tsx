import React from 'react';
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

  const DISPLAY_REVIEWS = [
    ...CUSTOMER_REVIEWS,
    ...CUSTOMER_REVIEWS,
    ...CUSTOMER_REVIEWS,
    ...CUSTOMER_REVIEWS,
  ];

  return (
    <section
      id="words-of-adornment"
      className="py-16 md:py-24 bg-[#FAF7F0] relative overflow-hidden border-t border-[#C8A96B]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 text-left">
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

        {/* Continuous Left-to-Right Auto-Moving Carousel Strip (Continuous, Independent of Hover) */}
        <div
          ref={railRef}
          onTouchStart={markUserInteraction}
          onTouchMove={markUserInteraction}
          onWheel={markUserInteraction}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DISPLAY_REVIEWS.map((rev, idx) => {
            const authorPhoto = AUTHOR_PHOTOS[rev.author];

            return (
              <div
                key={`${rev.id}-${idx}`}
                className="flex-shrink-0 w-[250px] sm:w-[285px] md:w-[300px] lg:w-[310px] xl:w-[315px] p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#F2EBDD] border border-[#C8A96B]/30 flex flex-col justify-between text-left shadow-sm hover:shadow-xl transition-all duration-300 relative"
              >
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
            );
          })}
        </div>
      </div>
    </section>
  );
};
