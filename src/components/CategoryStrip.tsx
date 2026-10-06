import React from 'react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { WipeText } from './WipeText';
import { resolveOptImage } from '../data/outfits';

const MOODS = [
  {
    id: 'mood-wedding',
    title: 'WEDDING EDIT',
    categoryTarget: 'Bridal Sarees',
    image: resolveOptImage('Sarees Section/Bridal Sarees 1.webp'),
    colorAccent: 'Crimson & Pure Gold'
  },
  {
    id: 'mood-kanchipuram',
    title: 'KANCHIPURAM ICONS',
    categoryTarget: 'Kanjivaram Sarees',
    image: resolveOptImage('Sarees Section/Kanjivaram Sarees 2.webp'),
    colorAccent: 'Temple Korvai Silks'
  },
  {
    id: 'mood-banarasi',
    title: 'BANARASI HEIRLOOMS',
    categoryTarget: 'Banarasi Sarees',
    image: resolveOptImage('Sarees Section/Banarasi Sarees.webp'),
    colorAccent: 'Kadhwa Brocade Jaal'
  },
  {
    id: 'mood-festive',
    title: 'FESTIVE RADIANCE',
    categoryTarget: 'Festive Sarees',
    image: resolveOptImage('Sarees Section/Festive Saree (1).webp'),
    colorAccent: 'Rani Pink & Zari'
  },
  {
    id: 'mood-raw',
    title: 'RAW SIGNATURES',
    categoryTarget: 'Silk Sarees',
    image: resolveOptImage('Sarees Section/Silk Sarees.webp'),
    colorAccent: 'Ivory & Tussar Textures'
  },
  {
    id: 'mood-regal',
    title: 'REGAL GLAM',
    categoryTarget: 'Party Wear Sarees',
    image: resolveOptImage('Sarees Section/Hot saree (1).webp'),
    colorAccent: 'Champagne Tissue Sheen'
  }
];

export const CategoryStrip: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: SIX MOODS with WipeText */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#C8A96B]/25 pb-6">
          <div className="flex items-baseline gap-3 flex-wrap">
            <WipeText as="h2" direction="left-to-right" duration={0.8} className="font-sans font-black text-3xl sm:text-5xl tracking-tight text-[#1C1A19]">
              SIX MOODS.
            </WipeText>
            <WipeText as="span" direction="bottom-to-top" duration={0.8} delay={0.1} className="font-script text-2xl sm:text-4xl text-[#C8A96B]">
              Timeless Drapes
            </WipeText>
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
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (idx % 6) * 0.07 }}
              onClick={() => navigateTo('catalog', undefined, mood.categoryTarget)}
              className="group cursor-pointer flex flex-col items-center text-center will-change-transform"
            >
              {/* Arched Window Top Frame: rounded-t-full */}
              <div
                className="relative w-full aspect-[9/16] rounded-t-full rounded-b-2xl overflow-hidden bg-[#F2EBDD] border border-[#C8A96B]/30 group-hover:border-[#651C32] shadow-md group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2"
                style={{ aspectRatio: '9 / 16' }}
              >
                <img
                  src={mood.image}
                  alt={mood.title}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
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
