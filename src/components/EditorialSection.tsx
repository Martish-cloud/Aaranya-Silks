import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { EDITORIAL_COLLECTIONS } from '../data/sarees';
import { useShop } from '../context/ShopContext';

export const EditorialSection: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-20 md:py-32 bg-[#F2EBDD] relative overflow-hidden">
      {/* Decorative luxury watermark */}
      <div className="absolute top-10 right-4 pointer-events-none select-none text-[120px] md:text-[200px] font-serif font-bold text-[#651C32]/[0.03] leading-none whitespace-nowrap">
        AARANYA
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 text-[#8B1E3F] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>Editorial Campaigns</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#651C32] tracking-tight leading-[1.15] mb-5">
            Woven to Be Remembered
          </h2>

          <p className="text-base sm:text-lg text-[#1C1A19]/75 font-sans font-light leading-relaxed">
            Every saree tells a story of tradition, artistry, and timeless beauty. Curated narratives woven on the sacred looms of India.
          </p>
          <div className="w-16 h-0.5 bg-[#C8A96B] mx-auto mt-6" />
        </div>

        {/* Editorial Layout: Alternating Large & Offset Cards */}
        <div className="space-y-16 md:space-y-28">
          {EDITORIAL_COLLECTIONS.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-8 md:gap-14 lg:gap-20`}
              >
                {/* Visual Image Column */}
                <div className="w-full lg:w-3/5 group">
                  <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden aspect-[16/10] sm:aspect-[16/10] shadow-xl border border-[#C8A96B]/30 bg-[#FAF7F0]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                    {/* Badge */}
                    <div className="absolute top-5 left-5">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#FAF7F0]/90 backdrop-blur-md text-[#651C32] text-xs font-semibold uppercase tracking-wider shadow">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editorial Narrative Column */}
                <div className="w-full lg:w-2/5 text-left space-y-4">
                  <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B1E3F]">
                    {item.subtitle}
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#651C32] leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#1C1A19]/75 font-sans font-light leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-3">
                    <button
                      onClick={() => navigateTo('catalog', undefined, item.linkCategory)}
                      className="group/btn inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#651C32] hover:text-[#8B1E3F] transition-colors py-2 border-b-2 border-[#C8A96B] hover:border-[#651C32]"
                    >
                      <span>Explore Collection</span>
                      <ArrowUpRight className="w-4 h-4 text-[#C8A96B] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
