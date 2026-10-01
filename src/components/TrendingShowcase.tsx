import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, Eye, ArrowRight, Star } from 'lucide-react';
import { SAREES_DATA } from '../data/sarees';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatters';

export const TrendingShowcase: React.FC = () => {
  const { addToCart, openQuickView, navigateTo } = useShop();

  // Featured trending hero saree
  const featured = SAREES_DATA.find((s) => s.id === 'aaranya-01') || SAREES_DATA[0];
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const activeColor = featured.colors[selectedColorIdx] || featured.colors[0];

  // Complementary / related looks
  const relatedSarees = SAREES_DATA.filter((s) => s.id !== featured.id && s.trending).slice(0, 3);

  return (
    <section className="py-20 md:py-32 bg-[#FAF7F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 text-[#8B1E3F] text-xs font-semibold uppercase tracking-[0.25em] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>Editorial Spotlight</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#651C32] tracking-tight">
              Trending Now
            </h2>
            <p className="text-sm md:text-base text-[#1C1A19]/70 font-light mt-2 max-w-lg">
              The season's most coveted drape, styled with timeless poise and artisanal depth.
            </p>
          </div>

          <button
            onClick={() => navigateTo('catalog')}
            className="group hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#651C32] hover:text-[#8B1E3F] transition-colors"
          >
            <span>View Full Lookbook</span>
            <ArrowRight className="w-4 h-4 text-[#C8A96B] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Magazine-style Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Featured Hero Look (7 cols) */}
          <div className="lg:col-span-7 bg-[#F2EBDD] rounded-3xl p-6 sm:p-8 border border-[#C8A96B]/30 shadow-lg">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-[#FAF7F0] shadow-inner group">
              <img
                src={activeColor.image || featured.images[0]}
                alt={featured.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[#651C32] text-white text-[11px] font-semibold uppercase tracking-wider shadow">
                  Editorial Cover
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FAF7F0]/90 text-[#1C1A19] text-[11px] font-semibold uppercase tracking-wider shadow">
                  {featured.category}
                </span>
              </div>

              {/* Hotspot Floating Marker */}
              <div className="absolute bottom-6 right-6 p-3 rounded-2xl bg-[#FAF7F0]/90 backdrop-blur-md shadow-xl border border-[#C8A96B]/40 max-w-xs text-left hidden sm:block">
                <p className="text-[10px] text-[#8B1E3F] uppercase tracking-wider font-bold">
                  Handloom Note
                </p>
                <p className="text-xs text-[#1C1A19] font-serif italic mt-0.5">
                  "Interlocked Korvai border with 24k gold-dipped silver zari"
                </p>
              </div>
            </div>

            {/* Featured Product Details */}
            <div className="text-left space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#651C32]">
                  {featured.name}
                </h3>
                <div className="flex items-center gap-1.5 bg-[#FAF7F0] px-2.5 py-1 rounded-full border border-[#C8A96B]/30">
                  <Star className="w-3.5 h-3.5 text-[#C8A96B] fill-current" />
                  <span className="text-xs font-semibold text-[#1C1A19]">
                    {featured.rating.toFixed(2)} ({featured.reviewCount} patrons)
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#1C1A19]/75 font-sans font-light leading-relaxed">
                {featured.description}
              </p>

              {/* Color Selector */}
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#1C1A19]/70 block mb-2">
                  Select Shade: <span className="text-[#651C32]">{activeColor.name}</span>
                </span>
                <div className="flex items-center gap-2.5">
                  {featured.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColorIdx(i)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        selectedColorIdx === i
                          ? 'border-[#651C32] bg-[#FAF7F0] shadow text-[#651C32]'
                          : 'border-black/10 bg-transparent text-[#1C1A19]/70 hover:border-[#651C32]'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="pt-4 border-t border-[#C8A96B]/25 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#1C1A19]/50 block">Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#651C32]">
                      {formatINR(featured.price)}
                    </span>
                    {featured.originalPrice && (
                      <span className="text-sm text-[#1C1A19]/45 line-through">
                        {formatINR(featured.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openQuickView(featured, featured.color)}
                    className="p-3 rounded-xl bg-[#FAF7F0] hover:bg-[#FAF7F0]/80 border border-[#C8A96B]/40 text-[#1C1A19] transition-colors"
                    aria-label="Quick View"
                  >
                    <Eye className="w-4 h-4 text-[#651C32]" />
                  </button>

                  <button
                    onClick={() => addToCart(featured, activeColor.name, 1)}
                    className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] transition-all shadow-md hover:shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#C8A96B]" />
                    <span>Shop This Look</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Trending Looks Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B1E3F] mb-4">
              Complementary Runway Edits
            </h4>

            {relatedSarees.map((saree) => (
              <motion.div
                key={saree.id}
                whileHover={{ y: -3 }}
                onClick={() => navigateTo('product', saree.slug)}
                className="group cursor-pointer flex items-center gap-4 p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#C8A96B]/25 hover:border-[#651C32] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="w-24 h-32 rounded-xl overflow-hidden bg-[#F2EBDD] shrink-0 relative">
                  <img
                    src={saree.images[0]}
                    alt={saree.name}
                    className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-[#8B1E3F] tracking-wider block">
                    {saree.category}
                  </span>
                  <h5 className="font-serif text-base font-medium text-[#1C1A19] group-hover:text-[#651C32] transition-colors truncate">
                    {saree.name}
                  </h5>
                  <p className="text-xs text-[#1C1A19]/60 font-light truncate mt-0.5">
                    {saree.fabric}
                  </p>
                  <p className="font-serif text-base font-bold text-[#651C32] mt-2">
                    {formatINR(saree.price)}
                  </p>
                </div>

                <div className="p-2 rounded-full bg-[#F2EBDD] group-hover:bg-[#651C32] group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4 text-[#C8A96B] group-hover:text-white" />
                </div>
              </motion.div>
            ))}

            {/* Stylist Note Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#651C32] to-[#8B1E3F] text-[#FAF7F0] shadow-xl mt-6">
              <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8A96B] mb-2">
                Aaranya Stylist Consultation
              </p>
              <h5 className="font-serif text-xl font-light mb-2">
                Looking for customized bridal matching?
              </h5>
              <p className="text-xs text-[#FAF7F0]/80 font-light leading-relaxed mb-4">
                Our in-house master draper and textile consultant can guide you on matching jewelry, petticoat silk blends, and authentic blouse embroidery patterns.
              </p>
              <button
                onClick={() => navigateTo('story')}
                className="px-4 py-2 rounded-lg bg-[#FAF7F0] text-[#651C32] text-xs font-semibold uppercase tracking-wider hover:bg-[#C8A96B] hover:text-[#1C1A19] transition-colors"
              >
                Learn About Our Atelier
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
