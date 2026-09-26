import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const FORECAST_CARDS = [
  {
    id: 1,
    title: 'The Royal Crimson Muhurtham',
    palette: 'Crimson & 24k Gold',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    categoryTarget: 'Bridal Sarees'
  },
  {
    id: 2,
    title: 'Forest Sanctuary Handlooms',
    palette: 'Teal, Emerald & Raw Silk',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=85',
    categoryTarget: 'Kanjivaram Sarees'
  },
  {
    id: 3,
    title: 'Chandelier Cocktail Sheers',
    palette: 'Liquid Metallic & Rose Net',
    image: 'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=800&q=85',
    categoryTarget: 'Party Wear Sarees'
  }
];

export const SeasonForecast: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-20 md:py-28 bg-[#FAF7F0] relative overflow-hidden border-t border-[#C8A96B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Frame 12 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-14 text-left">
          {/* Left Title Area */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#8B1E3F] mb-3">
              <Compass className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>SEASON FORECAST</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#1C1A19] leading-[1.08] tracking-tight">
              Autumn—
              <br />
              <span className="text-[#C8A96B]">Winter 2026</span>
            </h2>
          </div>

          {/* Center Editorial Subtitle */}
          <div className="lg:col-span-4">
            <p className="text-xs sm:text-sm text-[#1C1A19]/75 font-sans font-light leading-relaxed max-w-sm">
              Three readings on how the house is draping the season — chosen from the atelier floor, not a mood board.
            </p>
          </div>

          {/* Right Bordered CTA Button */}
          <div className="lg:col-span-3 flex lg:justify-end">
            <button
              onClick={() => navigateTo('catalog')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-none border border-[#1C1A19] hover:bg-[#1C1A19] hover:text-[#FAF7F0] text-xs font-semibold uppercase tracking-[0.2em] transition-all"
            >
              <span>Explore The Forecast</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Arched Frames from Frame 12 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {FORECAST_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => navigateTo('catalog', undefined, card.categoryTarget)}
              className="group cursor-pointer flex flex-col items-center text-center"
            >
              <div className="relative w-full aspect-[4/5] rounded-t-full rounded-b-2xl overflow-hidden bg-[#F2EBDD] border border-[#C8A96B]/30 shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute bottom-5 inset-x-4 text-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5B842] block mb-1">
                    {card.palette}
                  </span>
                  <h4 className="font-serif text-lg font-medium text-white">
                    {card.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
