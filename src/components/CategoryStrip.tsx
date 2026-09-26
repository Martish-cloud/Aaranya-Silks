import React from 'react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';

const MOODS = [
  {
    id: 'mood-wedding',
    title: 'WEDDING EDIT',
    categoryTarget: 'Bridal Sarees',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    colorAccent: 'Crimson & Pure Gold'
  },
  {
    id: 'mood-kanchipuram',
    title: 'KANCHIPURAM ICONS',
    categoryTarget: 'Kanjivaram Sarees',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=85',
    colorAccent: 'Temple Korvai Silks'
  },
  {
    id: 'mood-banarasi',
    title: 'BANARASI HEIRLOOMS',
    categoryTarget: 'Banarasi Sarees',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
    colorAccent: 'Kadhwa Brocade Jaal'
  },
  {
    id: 'mood-festive',
    title: 'FESTIVE RADIANCE',
    categoryTarget: 'Festive Sarees',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=85',
    colorAccent: 'Rani Pink & Zari'
  },
  {
    id: 'mood-raw',
    title: 'RAW SIGNATURES',
    categoryTarget: 'Silk Sarees',
    image: 'https://images.unsplash.com/photo-1610030469857-e1793540ebf8?auto=format&fit=crop&w=800&q=85',
    colorAccent: 'Ivory & Tussar Textures'
  },
  {
    id: 'mood-regal',
    title: 'REGAL GLAM',
    categoryTarget: 'Party Wear Sarees',
    image: 'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=800&q=85',
    colorAccent: 'Champagne Tissue Sheen'
  }
];

export const CategoryStrip: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: SIX MOODS. */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#C8A96B]/25 pb-6">
          <div className="flex items-baseline gap-3">
            <h2 className="font-sans font-black text-3xl sm:text-5xl tracking-tight text-[#1C1A19]">
              SIX MOODS.
            </h2>
            <span className="font-script text-2xl sm:text-4xl text-[#C8A96B]">
              Timeless Drapes
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#1C1A19]/70 font-light mt-3 md:mt-0 text-left md:text-right max-w-sm">
            Choose sarees crafted for every celebration — every story, every woven version of you.
          </p>
        </div>

        {/* 6 Arched Window Cards Strip matching Reference Video Frame 4 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {MOODS.map((mood, idx) => (
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => navigateTo('catalog', undefined, mood.categoryTarget)}
              className="group cursor-pointer flex flex-col items-center text-center"
            >
              {/* Arched Window Top Frame: rounded-t-full */}
              <div className="relative w-full aspect-[9/16] rounded-t-full rounded-b-2xl overflow-hidden bg-[#F2EBDD] border border-[#C8A96B]/30 group-hover:border-[#651C32] shadow-md group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <img
                  src={mood.image}
                  alt={mood.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Ambient Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Subtitle / Accent Tag */}
                <div className="absolute bottom-3 inset-x-2 text-center">
                  <span className="text-[9px] uppercase tracking-wider text-[#FAF7F0]/90 font-light block">
                    {mood.colorAccent}
                  </span>
                </div>
              </div>

              {/* Title below the arched window */}
              <h3 className="font-serif font-bold text-xs sm:text-sm uppercase tracking-[0.16em] text-[#1C1A19] group-hover:text-[#651C32] transition-colors mt-3">
                {mood.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
