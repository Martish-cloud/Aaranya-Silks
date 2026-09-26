import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const ACCORDION_ITEMS = [
  {
    id: 1,
    number: '01',
    title: 'The Royal Muhurtham Edit',
    offer: 'Flat 20% Privilege on Certified Bridal Kanjivarams',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    categoryTarget: 'Bridal Sarees'
  },
  {
    id: 2,
    number: '02',
    title: 'Varanasi Kadhwa Brocades',
    offer: 'Complimentary Pure Silk Blouse Tailoring',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    categoryTarget: 'Banarasi Sarees'
  },
  {
    id: 3,
    number: '03',
    title: 'Whisper Sheer Organza',
    offer: 'Special Debut Privilege with code AARANYA10',
    image: 'https://images.unsplash.com/photo-1617627143644-84524458f262?auto=format&fit=crop&w=1200&q=85',
    categoryTarget: 'Organza Sarees'
  },
  {
    id: 4,
    number: '04',
    title: 'Festive Radiant Colorways',
    offer: 'Free Insured Express Air Delivery Across India',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85',
    categoryTarget: 'Festive Sarees'
  },
  {
    id: 5,
    number: '05',
    title: 'Liquid Champagne Tissue',
    offer: 'Archival Cedar & Muslin Keepsake Box Included',
    image: 'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=1200&q=85',
    categoryTarget: 'Party Wear Sarees'
  },
  {
    id: 6,
    number: '06',
    title: 'Temple Border Heritage',
    offer: 'Direct Artisan Guild Certified Handlooms',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
    categoryTarget: 'Silk Sarees'
  }
];

export const WorthYourAttention: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeId, setActiveId] = useState<number>(3); // Default expanded card 03

  return (
    <section className="py-20 md:py-28 bg-[#FAF7F0] relative overflow-hidden border-t border-[#C8A96B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Frame 16 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 text-left">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-[#8B1E3F] block mb-2">
              CURRENT OFFERS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1A19] tracking-tight">
              Worth your attention
            </h2>
          </div>

          <button
            onClick={() => navigateTo('catalog')}
            className="text-xs font-semibold uppercase tracking-wider text-[#651C32] hover:text-[#8B1E3F] transition-colors mt-3 sm:mt-0"
          >
            View all offers →
          </button>
        </div>

        {/* Expanding Vertical Slices Accordion matching Frame 16 */}
        <div className="flex items-stretch gap-2 sm:gap-3 h-[420px] sm:h-[480px] w-full overflow-hidden select-none">
          {ACCORDION_ITEMS.map((item) => {
            const isExpanded = activeId === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setActiveId(item.id)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out border border-[#C8A96B]/30 ${
                  isExpanded ? 'flex-[4] sm:flex-[5] shadow-2xl' : 'flex-[1] shadow-sm hover:flex-[1.2]'
                }`}
              >
                {/* Background Image: vibrant when expanded, grayscale/dim when collapsed */}
                <img
                  src={item.image}
                  alt={item.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    isExpanded ? 'filter brightness-90 contrast-105 scale-105' : 'filter grayscale contrast-125 brightness-50'
                  }`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Collapsed State View */}
                {!isExpanded && (
                  <div className="absolute inset-0 flex flex-col justify-between items-center p-3 text-white/80">
                    <span className="font-mono text-xs font-bold text-[#E5B842]">
                      {item.number}
                    </span>

                    {/* Rotated text reading CURRENT OFFER */}
                    <div className="writing-vertical-rl rotate-180 text-[10px] tracking-[0.25em] uppercase font-semibold text-white/60">
                      CURRENT OFFER
                    </div>

                    <div className="w-1.5 h-1.5 rounded-full bg-[#E5B842]" />
                  </div>
                )}

                {/* Expanded State View */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 text-left text-white"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-[#E5B842] px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md">
                        {item.number} / 06
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1E3F] text-xs font-semibold uppercase tracking-wider text-white shadow">
                        <Sparkles className="w-3 h-3 text-[#E5B842]" />
                        <span>Exclusive Privilege</span>
                      </span>
                    </div>

                    <div className="space-y-3 max-w-md">
                      <h3 className="font-serif text-2xl sm:text-4xl font-light text-white leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed">
                        {item.offer}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateTo('catalog', undefined, item.categoryTarget);
                        }}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E5B842] hover:bg-[#F3CA58] text-[#1C1A19] text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 mt-2"
                      >
                        <span>Explore Offer</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
