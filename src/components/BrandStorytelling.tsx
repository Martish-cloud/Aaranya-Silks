import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Feather, Gem, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const BrandStorytelling: React.FC = () => {
  const { navigateTo } = useShop();

  const PILLARS = [
    {
      icon: Feather,
      title: 'Pure Mulberry Silk',
      description: 'Sourced from dedicated sericulture clusters, boiled and twisted for supreme tensile strength and lustrous drape.'
    },
    {
      icon: Gem,
      title: 'Certified Real Zari',
      description: 'Silver threads electroplated with genuine 24k gold, creating an heirloom that never loses its regal brilliance.'
    },
    {
      icon: Clock,
      title: '140+ Hours of Pit Loom Weaving',
      description: 'No mechanized jacquard mass production. Master weavers guide shuttle and warp with generational intuition.'
    },
    {
      icon: ShieldCheck,
      title: 'Silk Mark Authenticated',
      description: 'Every Aaranya Silks creation carries an individual authentication seal ensuring 100% purity and ethical origin.'
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#F2EBDD] relative overflow-hidden border-t border-[#C8A96B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Primary Large Image */}
              <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-[#C8A96B]/30 bg-[#FAF7F0]">
                <img
                  src="https://images.unsplash.com/photo-1610030469857-e1793540ebf8?auto=format&fit=crop&w=1200&q=85"
                  alt="Aaranya Silks Handloom Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Offset Secondary Image */}
              <div className="absolute -bottom-8 -right-6 w-3/5 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF7F0] hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85"
                  alt="Zari Brocade Detail"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gold Quote Badge */}
              <div className="absolute top-6 left-6 p-4 rounded-2xl bg-[#651C32]/95 backdrop-blur-md text-[#FAF7F0] border border-[#C8A96B]/40 max-w-xs shadow-xl text-left">
                <p className="font-serif italic text-sm text-[#C8A96B] leading-snug">
                  "A saree is not merely six yards of fabric; it is a living tapestry of India's soul."
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#FAF7F0]/70 mt-2 font-semibold">
                  — The Aaranya Philosophy
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative (6 cols) */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div className="inline-flex items-center gap-2 text-[#8B1E3F] text-xs font-semibold uppercase tracking-[0.3em]">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>Generational Legacy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#651C32] tracking-tight leading-tight">
              The Art of Indian Elegance
            </h2>

            <p className="font-serif italic text-lg sm:text-xl text-[#8B1E3F]">
              "At Aaranya Silks, discover the beauty of sarees that bring together timeless elegance and contemporary style."
            </p>

            <p className="text-sm sm:text-base text-[#1C1A19]/75 font-sans font-light leading-relaxed">
              Rooted in the ancient weaving heartlands of Kanchipuram and Varanasi, Aaranya Silks is dedicated to preserving the sanctity of authentic Indian handlooms. We partner directly with master weaver guilds whose families have practiced the meditative rhythm of shuttle and warp for five generations.
            </p>

            <p className="text-sm sm:text-base text-[#1C1A19]/75 font-sans font-light leading-relaxed">
              Each creation undergoes an uncompromising curation process: from yarn purity testing to hand-knotted silk pallu fringes and custom archival muslin preservation packaging.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              {PILLARS.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-[#FAF7F0] border border-[#C8A96B]/25 space-y-1.5 shadow-sm">
                    <Icon className="w-5 h-5 text-[#8B1E3F]" />
                    <h4 className="font-serif text-base font-semibold text-[#651C32]">{p.title}</h4>
                    <p className="text-xs text-[#1C1A19]/70 font-light leading-relaxed">{p.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigateTo('story')}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-[#FAF7F0] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all shadow-md hover:shadow-xl"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 text-[#C8A96B] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
