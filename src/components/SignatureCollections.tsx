import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatters';
import { WipeText } from './WipeText';

const COLLECTIONS = [
  {
    id: 'bridal',
    title: 'The Bridal Collection',
    tagline: 'Imperial Heirlooms for Sacred Vows',
    categoryTarget: 'Bridal Sarees',
    description: 'Designed exclusively for the royal Indian bride. Each drape combines pure Mulberry silk, certified electroplated 24k gold zari, and ancient Korvai weaving that requires two master weavers sitting side-by-side at the wooden pit loom.',
    features: ['Tested 24k Gold & Silver Zari', 'Authentic GI-Certified Kanchipuram Weave', 'Bespoke Archival Wooden Keepsake Box'],
    heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    startingPrice: 48500,
    accentColor: '#8B1E3F'
  },
  {
    id: 'silk-heritage',
    title: 'The Silk Heritage',
    tagline: 'Centuries of Banarasi & Katan Lore',
    categoryTarget: 'Silk Sarees',
    description: 'A tribute to the holy ghats of Varanasi and Coromandel temple weavers. Dense kadhwa motifs, timeless kalga bootis, and velvety hand-feel that only vintage wooden looms can create.',
    features: ['Pure 3-Ply Katan Silk Warp & Weft', 'Zero Floating Threads on Reverse', 'Silk Mark Board Authenticated'],
    heroImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    startingPrice: 32000,
    accentColor: '#651C32'
  },
  {
    id: 'contemporary',
    title: 'The Contemporary Edit',
    tagline: 'Minimalist Drapes for Modern Connoisseurs',
    categoryTarget: 'Designer Sarees',
    description: 'Sculptural, whisper-light organza and chanderi drapes with delicate hand-embroidered scallops, pearl drops, and soft pastel palettes for daylight cocktail soirees.',
    features: ['High-Twist Silk Organza', 'Handcrafted Badla & Moti Detailing', 'Featherweight Breathable Structure'],
    heroImage: 'https://images.unsplash.com/photo-1617627143644-84524458f262?auto=format&fit=crop&w=1200&q=85',
    startingPrice: 24500,
    accentColor: '#1C2841'
  },
  {
    id: 'festive',
    title: 'The Festive Collection',
    tagline: 'Celebration Colorways & Auspicious Hues',
    categoryTarget: 'Festive Sarees',
    description: 'Saturated magenta, vermillion, and turmeric gold brocades woven with dynamic chevron ripples and peacock rondels for Diwali, Navratri, and wedding celebrations.',
    features: ['Tanchoi Satin Smooth Weave', 'High-Luster Champagne Zari', 'Includes Heavy Contrast Blouse Fabric'],
    heroImage: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85',
    startingPrice: 28000,
    accentColor: '#A52B50'
  },
  {
    id: 'evening',
    title: 'The Evening Collection',
    tagline: 'Dramatic Obsidian & Metallic Tissue Sheens',
    categoryTarget: 'Party Wear Sarees',
    description: 'Catch every glint of chandelier light. Featuring liquid gold tissue silks, obsidian meenakari accents, and contemporary jewel tones for gala evenings and red carpet moments.',
    features: ['Liquid Iridescent Tissue Sheen', 'Jewel-Toned Meenakari Accents', 'Complimentary Fall & Pico Finished'],
    heroImage: 'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=1200&q=85',
    startingPrice: 34500,
    accentColor: '#C8A96B'
  }
];

export const SignatureCollections: React.FC = () => {
  const { navigateTo } = useShop();
  const [selectedId, setSelectedId] = useState('bridal');

  const activeCollection = COLLECTIONS.find((c) => c.id === selectedId) || COLLECTIONS[0];

  return (
    <section className="py-20 md:py-32 bg-[#1C1A19] text-[#FAF7F0] relative overflow-hidden">
      {/* Background Luxury Ambient Glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-[#651C32]/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 rounded-full bg-[#C8A96B]/20 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[#C8A96B] text-xs font-semibold uppercase tracking-[0.25em] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Anthologies</span>
          </div>

          <WipeText
            as="h2"
            direction="bottom-to-top"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#FAF7F0] tracking-tight"
          >
            Signature Collections
          </WipeText>

          <p className="text-sm sm:text-base text-[#FAF7F0]/70 font-light mt-2">
            Immerse yourself in five distinct universes of Indian haute couture and handloom artistry.
          </p>
        </div>

        {/* Collection Selector Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-4 mb-12 border-b border-white/10">
          {COLLECTIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                selectedId === c.id
                  ? 'bg-[#C8A96B] text-[#1C1A19] shadow-lg scale-105'
                  : 'text-[#FAF7F0]/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Active Collection Spotlight Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCollection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white/[0.04] rounded-3xl p-6 sm:p-10 border border-[#C8A96B]/25"
          >
            {/* Visual Image Column (7 cols) */}
            <div className="lg:col-span-7 relative group">
              <div className="aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
                <img
                  src={activeCollection.heroImage}
                  alt={activeCollection.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />

                {/* Price indicator badge */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-[#C8A96B]/40">
                  <span className="text-[10px] uppercase text-[#C8A96B] tracking-wider block">
                    Starting From
                  </span>
                  <span className="font-serif text-lg font-bold text-white">
                    {formatINR(activeCollection.startingPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Content Column (5 cols) */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C8A96B] block mb-2">
                  {activeCollection.tagline}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#FAF7F0] leading-tight">
                  {activeCollection.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#FAF7F0]/80 font-light leading-relaxed">
                {activeCollection.description}
              </p>

              {/* Key Features List */}
              <div className="space-y-2.5 pt-2">
                {activeCollection.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FAF7F0]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A96B] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Action */}
              <div className="pt-4">
                <button
                  onClick={() => navigateTo('catalog', undefined, activeCollection.categoryTarget)}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#8B1E3F] hover:bg-[#651C32] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl border border-[#C8A96B]/50 hover:border-[#C8A96B]"
                >
                  <span>Explore {activeCollection.title}</span>
                  <ArrowRight className="w-4 h-4 text-[#C8A96B] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
