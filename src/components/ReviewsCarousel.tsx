import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, CheckCircle, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/sarees';
import { WipeText } from './WipeText';

export const ReviewsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.7 : clientWidth * 0.7;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF7F0] relative overflow-hidden border-t border-[#C8A96B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
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

        {/* Carousel Strip */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {CUSTOMER_REVIEWS.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-80 sm:w-96 p-7 rounded-3xl bg-[#F2EBDD] border border-[#C8A96B]/30 flex flex-col justify-between text-left shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div>
                <Quote className="w-8 h-8 text-[#C8A96B]/40 mb-3" />

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#C8A96B] fill-current" />
                  ))}
                </div>

                <h4 className="font-serif text-lg font-semibold text-[#651C32] mb-2 leading-snug">
                  "{rev.title}"
                </h4>

                <p className="text-xs sm:text-sm text-[#1C1A19]/80 font-sans font-light leading-relaxed mb-6">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-[#C8A96B]/25">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-bold text-sm text-[#1C1A19]">
                    {rev.author}
                  </span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#8B1E3F] font-semibold uppercase tracking-wider">
                      <CheckCircle className="w-3 h-3 text-[#C8A96B]" />
                      Verified Order
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#1C1A19]/60 font-light">
                  {rev.location} • <span className="italic text-[#651C32]">{rev.occasion}</span>
                </p>
                <p className="text-[10px] text-[#8B1E3F] tracking-wide mt-1 truncate">
                  Purchased: {rev.sareePurchased}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
