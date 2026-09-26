import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/sarees';
import { useShop } from '../context/ShopContext';

export const CategoryStrip: React.FC = () => {
  const { navigateTo } = useShop();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F0] relative overflow-hidden border-b border-[#C8A96B]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-2 text-[#8B1E3F] text-xs font-semibold uppercase tracking-[0.25em] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>Curated Collections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#651C32] tracking-tight">
              Shop by Saree Category
            </h2>
            <p className="text-sm md:text-base text-[#1C1A19]/70 font-light mt-2 max-w-xl">
              Explore timeless silhouettes, from majestic bridal Kanjivarams to whisper-light organza drapes.
            </p>
          </div>

          {/* Desktop Arrow Controls */}
          <div className="hidden md:flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all duration-300"
              aria-label="Scroll left categories"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all duration-300"
              aria-label="Scroll right categories"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Category Strip */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {CATEGORIES_DATA.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              onClick={() => navigateTo('catalog', undefined, cat.name)}
              className="group cursor-pointer flex-shrink-0 w-44 sm:w-52 md:w-60 flex flex-col items-center text-center"
            >
              {/* Rounded Portrait Frame */}
              <div className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden mb-4 bg-[#F2EBDD] border border-[#C8A96B]/25 group-hover:border-[#C8A96B] transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1.5">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Highlight Tag */}
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#FAF7F0]/90 backdrop-blur-md text-[10px] uppercase font-semibold tracking-wider text-[#651C32]">
                    {cat.highlight}
                  </span>
                </div>
              </div>

              {/* Category Title & Count */}
              <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1C1A19] group-hover:text-[#651C32] transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-[#1C1A19]/60 font-light mt-0.5">
                {cat.itemCount} Designs
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
