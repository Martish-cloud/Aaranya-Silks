import { Sparkles, Heart, ArrowRight, Award, Compass, Feather } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const StoryPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#1C1A19]/60 mb-8 text-left">
          <button onClick={() => navigateTo('home')} className="hover:text-[#651C32]">Home</button>
          <span>/</span>
          <span className="text-[#651C32] font-medium">Our Story & Heritage</span>
        </div>

        {/* Editorial Story Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 text-[#8B1E3F] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>The Maison Heritage</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#651C32] tracking-tight leading-[1.1] mb-5">
            The Soul of Indian Silk
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-[#8B1E3F] mb-6">
            "Aaranya Silks was founded on a singular conviction: that a true Indian saree is not merely attire, but living heritage passed down like a cherished prayer."
          </p>

          <div className="w-20 h-0.5 bg-[#C8A96B] mx-auto" />
        </div>

        {/* Visual Story Split: Act I */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 text-left">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-[#C8A96B]/30 bg-[#F2EBDD]">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
                alt="Master Weavers of Varanasi"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-5 rounded-2xl bg-[#651C32] text-white shadow-xl max-w-xs hidden sm:block border border-[#C8A96B]/40">
              <p className="font-serif text-2xl font-bold text-[#C8A96B]">5 Generations</p>
              <p className="text-xs text-white/80 font-light mt-1">
                Preserving pit loom kadhwa weaving without mechanized shortcut floats.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B1E3F]">
              Act I • The Looms of Varanasi & Kanchipuram
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#651C32] leading-tight">
              Honoring Generational Mastery
            </h2>

            <p className="text-sm sm:text-base text-[#1C1A19]/80 font-sans font-light leading-relaxed">
              Every morning in the sanctified weaving villages of Kanchipuram and Varanasi, master artisans sit before wooden pit looms strung with thousand-spool silk warps. For over a century, their hands have memorized the intricate rhythm of traditional Korvai interlocking and Kadhwa floral carving.
            </p>

            <p className="text-sm sm:text-base text-[#1C1A19]/80 font-sans font-light leading-relaxed">
              While mass industrial textile factories print thousands of identical synthetic garments per hour, Aaranya Silks chooses the slower, sacred path. A single Aaranya bridal saree demands between 120 and 220 uninterrupted hours of artisan devotion.
            </p>
          </div>
        </div>

        {/* Visual Story Split: Act II */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 text-left">
          <div className="lg:col-span-6 lg:order-2 relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-[#C8A96B]/30 bg-[#F2EBDD]">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                alt="Pure Gold Zari Testing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 p-5 rounded-2xl bg-[#F2EBDD] text-[#1C1A19] shadow-xl max-w-xs hidden sm:block border border-[#C8A96B]/40">
              <p className="font-serif text-2xl font-bold text-[#651C32]">0.6% Pure Gold</p>
              <p className="text-xs text-[#1C1A19]/70 font-light mt-1">
                Electroplated certified silver zari that never tarnishes or turns copper.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1 space-y-5">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B1E3F]">
              Act II • The Purity of Real Zari
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#651C32] leading-tight">
              Gold Woven to Endure Generations
            </h2>

            <p className="text-sm sm:text-base text-[#1C1A19]/80 font-sans font-light leading-relaxed">
              Zari is the imperial soul of a luxury Indian saree. At Aaranya Silks, we refuse imitation plastic or copper metallics. Our certified zari begins as 98.5% pure silver drawn into microscopic gossamer threads, then electroplated in a 24-karat gold bath.
            </p>

            <p className="text-sm sm:text-base text-[#1C1A19]/80 font-sans font-light leading-relaxed">
              When an Aaranya bride folds her Muhurtham saree into its cedar and muslin trousseau, she is storing an investment that will glow just as radiantly when draped by her daughter and granddaughter decades from now.
            </p>
          </div>
        </div>

        {/* The 4 Tenets */}
        <div className="bg-[#F2EBDD] rounded-3xl p-8 sm:p-14 border border-[#C8A96B]/30 mb-20 text-center">
          <div className="max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8B1E3F] block mb-2">
              Our Uncompromising Standards
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#651C32]">
              The Four Aaranya Commitments
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#C8A96B]/20 space-y-2">
              <Award className="w-6 h-6 text-[#8B1E3F]" />
              <h4 className="font-serif text-lg font-bold text-[#651C32]">Silk Mark Certified</h4>
              <p className="text-xs text-[#1C1A19]/70 leading-relaxed">
                Every meter of silk is laboratory-tested for 100% natural Mulberry, Tussar, or Katan fiber purity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#C8A96B]/20 space-y-2">
              <Heart className="w-6 h-6 text-[#8B1E3F]" />
              <h4 className="font-serif text-lg font-bold text-[#651C32]">Artisan Direct Equity</h4>
              <p className="text-xs text-[#1C1A19]/70 leading-relaxed">
                Direct partnerships ensure weavers receive fair living wages and generational healthcare support.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#C8A96B]/20 space-y-2">
              <Compass className="w-6 h-6 text-[#8B1E3F]" />
              <h4 className="font-serif text-lg font-bold text-[#651C32]">Authentic GI Origins</h4>
              <p className="text-xs text-[#1C1A19]/70 leading-relaxed">
                Geographical Indication tags protecting the unique heritage of Varanasi, Kanchipuram, and Chanderi.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#C8A96B]/20 space-y-2">
              <Feather className="w-6 h-6 text-[#8B1E3F]" />
              <h4 className="font-serif text-lg font-bold text-[#651C32]">Archival Preservation</h4>
              <p className="text-xs text-[#1C1A19]/70 leading-relaxed">
                Complimentary unbleached muslin wrap and heirloom cedar box included with every saree purchase.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center py-10">
          <button
            onClick={() => navigateTo('catalog')}
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-2xl"
          >
            <span>Explore The Heirloom Collections</span>
            <ArrowRight className="w-4 h-4 text-[#C8A96B]" />
          </button>
        </div>
      </div>
    </div>
  );
};
