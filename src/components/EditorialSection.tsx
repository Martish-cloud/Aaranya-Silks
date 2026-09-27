import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatters';
import { WipeText } from './WipeText';
import { resolveOptImage } from '../data/outfits';

const CURVED_ITEMS = [
  {
    id: 'saree-ruhani',
    name: 'Ruhani Temple Silk',
    category: 'Kanjivaram Silk',
    price: 38500,
    image: resolveOptImage('Sarees Section/Bridal Sarees 1.webp'),
    slug: 'mayurakshi-kanjivaram-bridal-silk-saree'
  },
  {
    id: 'saree-saanjh',
    name: 'Saanjh Maroon Banarasi',
    category: 'Banarasi Brocade',
    price: 36200,
    image: resolveOptImage('Sarees Section/Banarasi Sarees.webp'),
    slug: 'varanasi-noor-kadhwa-banarasi-brocade'
  },
  {
    id: 'saree-leela',
    name: 'Leela Courtyard Silk',
    category: 'Tissue Silk',
    price: 42000,
    image: resolveOptImage('Sarees Section/Sultana Bronze Rust Tissue Katan Saree 1.webp'),
    slug: 'swarna-hansa-pure-tissue-silk-saree'
  },
  {
    id: 'saree-tara',
    name: 'Tara Peacock Paithani',
    category: 'Pure Organza',
    price: 24500,
    image: resolveOptImage('Sarees Section/Organza Sarees 2.webp'),
    slug: 'chandrika-midnight-flora-pure-organza-saree'
  },
  {
    id: 'saree-aaranya-emerald',
    name: 'Aaranya Emerald Kanjivaram',
    category: 'Kanjivaram Silk',
    price: 52000,
    image: resolveOptImage('Sarees Section/Kanjivaram Sarees 1.webp'),
    slug: 'rajkumari-emerald-temple-kanjivaram'
  }
];

export const EditorialSection: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeIndex, setActiveIndex] = useState(2);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CURVED_ITEMS.length) % CURVED_ITEMS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CURVED_ITEMS.length);
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF7F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
          <div className="text-left">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-[#8B1E3F] block mb-2">
              THE AARANYA SIGNATURES
            </span>
            <div className="flex items-baseline gap-2 flex-wrap">
              <WipeText as="h2" direction="left-to-right" duration={0.85} className="font-serif text-4xl sm:text-6xl font-light text-[#1C1A19] tracking-tight">
                Woven to Be
              </WipeText>
              <WipeText as="span" direction="bottom-to-top" duration={0.85} delay={0.12} className="font-script text-5xl sm:text-7xl text-[#C8A96B] leading-none">
                Remembered
              </WipeText>
            </div>
          </div>

          <button
            onClick={() => navigateTo('catalog')}
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#651C32] hover:text-[#8B1E3F] mt-4 sm:mt-0"
          >
            <span>Explore The Edit</span>
            <ArrowRight className="w-4 h-4 text-[#C8A96B] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3D Cylindrical Curved Arc Carousel matching Frame 6 */}
        <div className="relative py-8 overflow-hidden">
          {/* Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#FAF7F0]/90 hover:bg-[#651C32] text-[#1C1A19] hover:text-white shadow-xl border border-[#C8A96B]/40 transition-all duration-300"
            aria-label="Previous saree"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#FAF7F0]/90 hover:bg-[#651C32] text-[#1C1A19] hover:text-white shadow-xl border border-[#C8A96B]/40 transition-all duration-300"
            aria-label="Next saree"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Curved Arc Perspective Stage */}
          <div className="relative flex items-center justify-center min-h-[440px] sm:min-h-[500px]">
            {CURVED_ITEMS.map((item, idx) => {
              // Calculate offset relative to activeIndex
              let offset = idx - activeIndex;
              if (offset < -CURVED_ITEMS.length / 2) offset += CURVED_ITEMS.length;
              if (offset > CURVED_ITEMS.length / 2) offset -= CURVED_ITEMS.length;

              const isVisible = Math.abs(offset) <= 2;
              if (!isVisible) return null;

              // 3D curve positioning
              const translateX = offset * 220; // horizontal spread
              const rotateY = offset * -18;    // cylindrical rotation angle
              const translateZ = -Math.abs(offset) * 120; // push background elements into z-space
              const scale = 1 - Math.abs(offset) * 0.12;
              const opacity = 1 - Math.abs(offset) * 0.25;
              const zIndex = 20 - Math.abs(offset);

              return (
                <motion.div
                  key={item.id}
                  animate={{
                    x: translateX,
                    rotateY: rotateY,
                    z: translateZ,
                    scale: scale,
                    opacity: opacity
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ zIndex }}
                  onClick={() => {
                    if (offset === 0) {
                      navigateTo('product', item.slug);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  className="absolute cursor-pointer w-60 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/40 bg-[#1C1A19] select-none"
                >
                  {/* Saree Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />

                  {/* Glassmorphism Dark Gradient Overlay at Bottom */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 text-left text-white">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C8A96B] block">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-white line-clamp-1 mb-1">
                      {item.name}
                    </h4>
                    <p className="font-serif text-sm font-semibold text-[#E5B842]">
                      {formatINR(item.price)}
                    </p>
                  </div>

                  {offset === 0 && (
                    <div className="absolute top-3 right-3 p-1.5 rounded-full bg-[#E5B842] text-[#1C1A19] shadow">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {CURVED_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-8 bg-[#651C32]' : 'w-2 bg-[#C8A96B]/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
