import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SAREES_DATA } from '../data/sarees';
import { formatINR } from '../utils/formatters';
import { WipeText } from './WipeText';

import mayurakshiImg from '../assets/Need to Update/Trend of the Day/Mayurakshi Kanjivaram Bridal Silk Saree (Auspicious Emerald).png';
import varanasiImg from '../assets/Need to Update/Trend of the Day/Varanasi Noor Kadhwa Banarasi Brocade (Rani Rose) (1).webp';
import swarnaImg from '../assets/Need to Update/Trend of the Day/SWARNA HANSA (Liquid Gold).webp';
import chandrikaImg from '../assets/Need to Update/Trend of the Day/Chandrika Midnight Flora Pure Organza Saree  (Charcoal Black) 1.webp';

// Deterministic mapping by full product name to matching image and variant color
const TREND_PRODUCT_MAP: Record<string, { image: string; variantColor: string }> = {
  'Mayurakshi Kanjivaram Bridal Silk Saree': {
    image: mayurakshiImg,
    variantColor: 'Auspicious Emerald',
  },
  'Varanasi Noor Kadhwa Banarasi Brocade': {
    image: varanasiImg,
    variantColor: 'Rani Rose',
  },
  'Swarna Hansa Pure Tissue Silk Saree': {
    image: swarnaImg,
    variantColor: 'Champagne Gold',
  },
  'Chandrika Midnight Flora Pure Organza Saree': {
    image: chandrikaImg,
    variantColor: 'Charcoal Black',
  },
};

const SIZES = ['S', 'M', 'L', 'XL'];

export const TrendOfTheDay: React.FC = () => {
  const { addToCart, navigateTo } = useShop();

  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({
    'aaranya-01': 'M',
    'aaranya-02': 'S',
    'aaranya-05': 'M',
    'aaranya-07': 'L'
  });

  const trendProducts = SAREES_DATA.slice(0, 4);

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F0] text-[#1C1A19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Trend of the Day */}
        <div className="flex items-center gap-3 mb-10 text-left">
          <div className="w-1.5 h-8 bg-[#E5B842] rounded-full" />
          <div>
            <WipeText as="h2" direction="left-to-right" duration={0.8} className="font-serif text-2xl sm:text-3xl font-light text-[#1C1A19]">
              Trend of the Day
            </WipeText>
            <p className="text-xs text-[#1C1A19]/60 font-light">
              Curated daily expressions of bespoke draping with ready-to-wear blouse options.
            </p>
          </div>
        </div>

        {/* Horizontal Cards Grid with Premium Staggered Floating Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trendProducts.map((product, idx) => {
            const currentSize = selectedSizes[product.id] || 'M';
            const mapping = TREND_PRODUCT_MAP[product.name];
            const cardImg = mapping?.image || product.images[0];
            const targetColor = mapping?.variantColor || product.color;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: (idx % 4) * 0.08
                }}
                className="group flex flex-col justify-between bg-[#F2EBDD] rounded-2xl p-4 border border-[#C8A96B]/25 hover:border-[#651C32] transition-all shadow-sm hover:shadow-md text-left will-change-transform"
              >
                {/* Image Stage */}
                <div
                  onClick={() => navigateTo('product', product.slug, undefined, targetColor)}
                  className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden bg-white mb-4 cursor-pointer"
                  style={{ aspectRatio: '3 / 4' }}
                >
                  <img
                    src={cardImg}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAF7F0]/90 text-[10px] font-semibold text-[#1C1A19]">
                    <Star className="w-3 h-3 text-[#E5B842] fill-current" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div>
                    <h3
                      onClick={() => navigateTo('product', product.slug, undefined, targetColor)}
                      className="font-serif text-base font-semibold text-[#1C1A19] group-hover:text-[#651C32] transition-colors truncate cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#1C1A19]/60 truncate mt-0.5">
                      {product.fabric}
                    </p>
                  </div>

                  {/* Blouse Size Selector Chips */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#1C1A19]/60 block mb-1">
                      Blouse Size
                    </span>
                    <div className="flex items-center gap-1.5">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeSelect(product.id, size)}
                          className={`w-7 h-7 rounded-md text-[11px] font-bold transition-all ${
                            currentSize === size
                              ? 'bg-[#1C1A19] text-white shadow'
                              : 'bg-white text-[#1C1A19]/70 hover:bg-[#FAF7F0] border border-black/10'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Circular Golden Cart Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#C8A96B]/20">
                    <span className="font-serif text-lg font-bold text-[#651C32]">
                      {formatINR(product.price)}
                    </span>

                    {/* Circular Golden Cart Button from Frame 10 */}
                    <button
                      onClick={() => addToCart(product, targetColor, 1)}
                      className="w-9 h-9 rounded-full bg-[#E5B842] hover:bg-[#F3CA58] text-[#1C1A19] flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
                      aria-label="Add to bag"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#1C1A19]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Seasonal Special Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#651C32] to-[#8B1E3F] text-[#FAF7F0] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#C8A96B]/30 text-left">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-[#E5B842]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Seasonal Special Atelier Offer</span>
            </span>
            <WipeText as="h3" direction="left-to-right" duration={0.8} className="font-serif text-2xl sm:text-3xl font-light text-white">
              Complimentary Pure Silk Blouse Tailoring
            </WipeText>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              Every festive and bridal saree order includes custom padded blouse stitching tailored to your bespoke measurements.
            </p>
          </div>

          <button
            onClick={() => navigateTo('catalog')}
            className="px-8 py-3.5 rounded-full bg-[#E5B842] hover:bg-[#F3CA58] text-[#1C1A19] text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 shrink-0"
          >
            Claim With Your Saree
          </button>
        </div>
      </div>
    </section>
  );
};
