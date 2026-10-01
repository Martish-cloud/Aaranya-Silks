import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SAREES_DATA } from '../data/sarees';
import { formatINR } from '../utils/formatters';
import { WipeText } from './WipeText';

import bridalImg1 from '../assets/Need to Update/The Bridal Collection/Mayurakshi Kanjivaram Bridal Silk Saree 1.jpg';
import bridalImg2 from '../assets/Need to Update/The Bridal Collection/Padmavati Scarlet Red Katan Bridal Saree 1.jpg';
import bridalImg3 from '../assets/Need to Update/The Bridal Collection/Bridal Saree 2.jfif';
import bridalImg4 from '../assets/Need to Update/The Bridal Collection/Silk Sarees 2.jpg';
import suhaniBridalImg from '../assets/Shop All Sarees/Suhani Crimson & Zari Trousseau Heirloom/Suhani Crimson & Zari Trousseau Heirloom (Crimson Red).png';

const BRIDAL_IMAGES_LIST = [bridalImg1, bridalImg2, bridalImg3, bridalImg4];
const BRIDAL_SLUG_MAP: Record<string, string> = {
  'mayurakshi-kanjivaram-bridal-silk-saree': bridalImg1,
  'padmavati-scarlet-red-katan-bridal-saree': bridalImg2,
};

export const BridalDarkSection: React.FC = () => {
  const { addToCart, openQuickView, navigateTo } = useShop();

  const bridalSarees = SAREES_DATA.filter((s) => s.category === 'Bridal Sarees').slice(0, 4);

  return (
    <section className="bg-[#1C1A19] text-[#FAF7F0] py-16 md:py-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-[#8B1E3F]/25 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Layered Double Header with WipeText */}
        <div className="relative text-left mb-12 sm:mb-16">
          {/* Ghost / Shadow duplicate text */}
          <div className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white/5 select-none absolute -top-4 left-0 pointer-events-none whitespace-nowrap">
            The Bridal Collection
          </div>
          <WipeText as="h2" direction="left-to-right" duration={0.9} className="relative z-10 font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#FAF7F0] tracking-tight">
            The Bridal Collection
          </WipeText>
          <p className="text-xs sm:text-sm text-[#FAF7F0]/70 font-light mt-2 max-w-lg">
            Certified real gold zari, Kanchipuram Korvai pit looms, and heirloom red brocades.
          </p>
        </div>

        {/* Grid: Big Scarlet Campaign Banner + 4 Framed Saree Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Big Glowing Red Bridal Campaign (5 cols) */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-gradient-to-t from-[#651C32] to-[#8B1E3F] p-8 flex flex-col justify-between shadow-2xl border border-[#C8A96B]/30 group min-h-[460px]">
            <img
              src={suhaniBridalImg}
              alt="Suhani Crimson & Zari Trousseau Heirloom"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.75] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />

            {/* Top Tag */}
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-[#C8A96B]/40 text-[#E5B842] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Wedding Trousseau 2026</span>
              </span>
            </div>

            {/* Bottom Action Area */}
            <div className="relative z-10 text-left space-y-3">
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
                View the Collection
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                Handcrafted for the bride who demands eternal sanctity and royal majesty.
              </p>
              <button
                onClick={() => navigateTo('catalog', undefined, 'Bridal Sarees')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E5B842] hover:bg-[#F3CA58] text-[#1C1A19] text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
              >
                <span>Explore Bridal Sarees</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Framed Cards with Golden Buttons (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {bridalSarees.map((saree, idx) => {
              const cardImage = BRIDAL_SLUG_MAP[saree.slug] || BRIDAL_IMAGES_LIST[idx] || saree.images[0];

              return (
                <motion.div
                  key={saree.id}
                  whileHover={{ y: -4 }}
                  className="flex flex-col justify-between bg-white/[0.06] backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-[#C8A96B] transition-all shadow-xl group text-left"
                >
                  {/* Image */}
                  <div
                    onClick={() => navigateTo('product', saree.slug)}
                    className="relative aspect-[3/4] bg-black/40 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={cardImage}
                      alt={saree.name}
                      className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-500"
                    />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#8B1E3F] text-white text-[10px] uppercase font-bold tracking-wider">
                      {saree.fabric}
                    </span>
                  </div>
                </div>

                {/* Info & Golden Add to Cart Button */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4
                      onClick={() => navigateTo('product', saree.slug)}
                      className="font-serif text-base font-semibold text-white group-hover:text-[#E5B842] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {saree.name}
                    </h4>
                    <p className="text-[11px] text-white/60 line-clamp-1 mt-0.5">
                      {saree.zariType}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="font-serif text-lg font-bold text-[#E5B842]">
                      {formatINR(saree.price)}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openQuickView(saree, saree.color)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        aria-label="Quick View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Golden Add to Cart Button */}
                      <button
                        onClick={() => addToCart(saree, saree.color, 1)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E5B842] hover:bg-[#F3CA58] text-[#1C1A19] text-[11px] font-bold uppercase tracking-wider transition-colors shadow"
                      >
                        <ShoppingBag className="w-3 h-3 text-[#1C1A19]" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};
