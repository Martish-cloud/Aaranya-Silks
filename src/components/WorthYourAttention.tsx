import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
  Copy,
  Tag,
  Gift
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { WipeText } from './WipeText';

// Import all 10 Brand Ambassador images in optimized WebP (with original fallback references)
import ba1Webp from '../assets/outfits_optimized/Brand Ambassador/Brand Ambassador (1).webp';
import ba2Webp from '../assets/outfits_optimized/Brand Ambassador/Brand Ambassador (2).webp';
import ba3Webp from '../assets/outfits_optimized/Brand Ambassador/Brand Ambassador (3).webp';
import ba4Webp from '../assets/outfits_optimized/Brand Ambassador/Brand Ambassador (4).webp';
import ba5Webp from '../assets/outfits_optimized/Brand Ambassador/Brand Ambassador (5).webp';
import ba6Webp from '../assets/outfits_optimized/Brand Ambassador/Brand Ambassador (6).webp';
import ba7Webp from '../assets/outfits_optimized/Brand Ambassador/Brand Ambassador (7).webp';
import ba8Webp from '../assets/outfits_optimized/Brand Ambassador/Brand Ambassador (8).webp';
import ba9Webp from '../assets/outfits_optimized/Brand Ambassador/Brand Ambassador (9).webp';
import ba10Webp from '../assets/outfits_optimized/Brand Ambassador/Brand Ambassador (10).webp';

import ba1Orig from '../assets/Brand Ambassador/Brand Ambassador (1).png';
import ba2Orig from '../assets/Brand Ambassador/Brand Ambassador (2).jpeg';
import ba3Orig from '../assets/Brand Ambassador/Brand Ambassador (3).jpeg';
import ba4Orig from '../assets/Brand Ambassador/Brand Ambassador (4).jpeg';
import ba5Orig from '../assets/Brand Ambassador/Brand Ambassador (5).png';
import ba6Orig from '../assets/Brand Ambassador/Brand Ambassador (6).png';
import ba7Orig from '../assets/Brand Ambassador/Brand Ambassador (7).png';
import ba8Orig from '../assets/Brand Ambassador/Brand Ambassador (8).png';
import ba9Orig from '../assets/Brand Ambassador/Brand Ambassador (9).png';
import ba10Orig from '../assets/Brand Ambassador/Brand Ambassador (10).png';

// Theme Palette Constants
const THEME = {
  maroon: '#5B1024',
  burgundy: '#3A0B18',
  red: '#A61E2D',
  orange: '#E87532',
  champagne: '#F3D9B5',
  ivory: '#FAF5EF',
};

export interface AmbassadorOffer {
  id: number;
  number: string;
  ambassadorName: string;
  title: string;
  tagline: string;
  offer: string;
  couponCode: string;
  categoryTarget: string;
  highlight: string;
  imageWebp: string;
  imageOrig: string;
  perks: string[];
}

// 10 Brand Ambassador sequential offer mappings
export const BRAND_AMBASSADOR_OFFERS: AmbassadorOffer[] = [
  {
    id: 1,
    number: '01',
    ambassadorName: 'Ambassador 01',
    title: 'The Royal Muhurtham Edit',
    tagline: 'Certified Pure Zari Bridal Kanjivaram',
    offer: 'Flat 20% Privilege on Certified Bridal Kanjivarams',
    couponCode: 'MUHURTHAM20',
    categoryTarget: 'Bridal Sarees',
    highlight: 'Woven with tested 24k gold zari by heritage Korvai guild masters',
    imageWebp: ba1Webp,
    imageOrig: ba1Orig,
    perks: ['Certified 24k Gold Zari', 'Authentic Pit Loom Weave', 'Cedar Keepsake Archival Box']
  },
  {
    id: 2,
    number: '02',
    ambassadorName: 'Ambassador 02',
    title: 'Varanasi Kadhwa Brocades',
    tagline: 'Imperial Katan Silk Heirlooms',
    offer: 'Complimentary Pure Silk Blouse Tailoring & Hand Embroidery',
    couponCode: 'KADHWASTYLE',
    categoryTarget: 'Banarasi Sarees',
    highlight: 'Zero floating reverse threads, handwoven on sacred Varanasi riverfront looms',
    imageWebp: ba2Webp,
    imageOrig: ba2Orig,
    perks: ['Zero Reverse Floats', 'Pure 3-Ply Katan Silk', 'Bespoke Custom Blouse Fit']
  },
  {
    id: 3,
    number: '03',
    ambassadorName: 'Ambassador 03',
    title: 'Whisper Sheer Organza',
    tagline: 'Pastel Scalloped Florals & Pearl Drops',
    offer: 'Special Debut Privilege of ₹3,000 Off with Code AARANYA10',
    couponCode: 'AARANYA10',
    categoryTarget: 'Organza Sarees',
    highlight: 'Featherweight silk organza hand-finished with delicate badla and moti border scallops',
    imageWebp: ba3Webp,
    imageOrig: ba3Orig,
    perks: ['Handcrafted Badla Scallops', 'Pastel Blossom Palette', 'Featherweight Breathable Drape']
  },
  {
    id: 4,
    number: '04',
    ambassadorName: 'Ambassador 04',
    title: 'Festive Radiant Colorways',
    tagline: 'Auspicious Vermillion & Turmeric Gold',
    offer: 'Free Insured Express Air Delivery Across India & Velvet Box',
    couponCode: 'EXPRESSLUXE',
    categoryTarget: 'Festive Sarees',
    highlight: 'Tanchoi satin smooth weave with high-luster champagne chevron ripples',
    imageWebp: ba4Webp,
    imageOrig: ba4Orig,
    perks: ['Priority Insured Transit', 'Velvet Protective Sleeve', 'Matching Heavy Blouse Fabric']
  },
  {
    id: 5,
    number: '05',
    ambassadorName: 'Ambassador 05',
    title: 'Liquid Champagne Tissue',
    tagline: 'Metallic Shimmer for Gala Evenings',
    offer: 'Bespoke Cedar Keepsake Box & Muslin Wrap Included',
    couponCode: 'TISSUEGOLD',
    categoryTarget: 'Party Wear Sarees',
    highlight: 'Iridescent metallic tissue silk accented with jewel-toned meenakari motifs',
    imageWebp: ba5Webp,
    imageOrig: ba5Orig,
    perks: ['Liquid Metallic Glow', 'Jeweled Meenakari Accents', 'Complimentary Fall & Pico']
  },
  {
    id: 6,
    number: '06',
    ambassadorName: 'Ambassador 06',
    title: 'Temple Border Heritage',
    tagline: 'Centuries-Old Korvai Interlock Artistry',
    offer: 'Direct Artisan Guild Certified Handlooms with 15% Privilege',
    couponCode: 'TEMPLE15',
    categoryTarget: 'Silk Sarees',
    highlight: 'Authentic Kanchipuram temple gopuram motifs linked with ancient petni techniques',
    imageWebp: ba6Webp,
    imageOrig: ba6Orig,
    perks: ['Silk Mark Board Certified', 'Dual-Artisan Pit Loom', 'Sacred Temple Border Motifs']
  },
  {
    id: 7,
    number: '07',
    ambassadorName: 'Ambassador 07',
    title: 'Sultana Bronze Brocade',
    tagline: 'Royal Mughal Courtroom Tapestries',
    offer: 'Complimentary Styling Consultation with Senior Saree Drape Artist',
    couponCode: 'ROYALDRAPE',
    categoryTarget: 'Banarasi Sarees',
    highlight: 'Antiqued bronze zari with deep jewel-toned resham highlights for regal brides',
    imageWebp: ba7Webp,
    imageOrig: ba7Orig,
    perks: ['1-on-1 Virtual Drape Session', 'Blouse Pairing Advisory', 'Jewelry Styling Guidance']
  },
  {
    id: 8,
    number: '08',
    ambassadorName: 'Ambassador 08',
    title: 'Pastel Blossom Chanderi',
    tagline: 'Daylight Soirée & Garden Wedding Edit',
    offer: 'Complimentary Matching Pure Silk Potli Bag on Orders Over ₹25,000',
    couponCode: 'POTLIBAG',
    categoryTarget: 'Designer Sarees',
    highlight: 'Sheer translucent luster interwoven with gossamer gold buttis and zari tassels',
    imageWebp: ba8Webp,
    imageOrig: ba8Orig,
    perks: ['Hand-Beaded Silk Potli', 'Delicate Zari Tassels', 'Handwoven Gossamer Sheer']
  },
  {
    id: 9,
    number: '09',
    ambassadorName: 'Ambassador 09',
    title: 'Mayurakshi Crimson Bridal',
    tagline: 'Imperial Trousseau Signature Masterpiece',
    offer: 'Personalized Calligraphy Monogram Woven into Pallu Edge',
    couponCode: 'MONOGRAM',
    categoryTarget: 'Bridal Sarees',
    highlight: 'Three-ply Mulberry silk with sacred chakram and peacock medallions along the border',
    imageWebp: ba9Webp,
    imageOrig: ba9Orig,
    perks: ['Woven Custom Initials', 'Pure Vermillion Natural Dye', 'Lifetime Authenticity Guarantee']
  },
  {
    id: 10,
    number: '10',
    ambassadorName: 'Ambassador 10',
    title: 'The Obsidian & Silver Soirée',
    tagline: 'Midnight Drama with Liquid Silver Zari',
    offer: 'Exclusive ₹5,000 Gift Voucher for Your Next Festive Purchase',
    couponCode: 'MIDNIGHTLUXE',
    categoryTarget: 'Party Wear Sarees',
    highlight: 'Deep midnight obsidian body draped with electroplated tested sterling silver zari',
    imageWebp: ba10Webp,
    imageOrig: ba10Orig,
    perks: ['Tested Sterling Silver Zari', 'Cocktail Gala Silhouette', '₹5,000 Festive Privilege Credit']
  }
];

export const WorthYourAttention: React.FC = () => {
  const { navigateTo, showToast, applyCouponCode } = useShop();
  const [activeId, setActiveId] = useState<number>(1);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const cardStripRef = useRef<HTMLDivElement>(null);
  const cardItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeOffer = BRAND_AMBASSADOR_OFFERS.find((item) => item.id === activeId) || BRAND_AMBASSADOR_OFFERS[0];

  // Auto-scroll the active narrow card into visible view inside the rail
  useEffect(() => {
    const activeEl = cardItemRefs.current[activeId - 1];
    if (activeEl && cardStripRef.current) {
      const container = cardStripRef.current;
      const elLeft = activeEl.offsetLeft;
      const elWidth = activeEl.offsetWidth;
      const containerWidth = container.offsetWidth;
      const targetScroll = elLeft - containerWidth / 2 + elWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  }, [activeId]);

  const handlePrev = () => {
    setActiveId((prev) => (prev === 1 ? BRAND_AMBASSADOR_OFFERS.length : prev - 1));
  };

  const handleNext = () => {
    setActiveId((prev) => (prev === BRAND_AMBASSADOR_OFFERS.length ? 1 : prev + 1));
  };

  const handleScrollRail = (direction: 'left' | 'right') => {
    if (cardStripRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      cardStripRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCouponCode(code);
    showToast(`Privilege Code "${code}" copied & applied!`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleClaimOffer = (offer: AmbassadorOffer) => {
    applyCouponCode(offer.couponCode);
    showToast(`Code "${offer.couponCode}" applied to your order!`, 'success');
    navigateTo('catalog', undefined, offer.categoryTarget);
  };

  return (
    <section
      id="brand-ambassador-offers"
      className="py-20 md:py-32 relative overflow-hidden transition-colors"
      style={{ backgroundColor: THEME.ivory }}
    >
      {/* Ambient background glows using the Maroon + Red + Orange theme */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: THEME.red }}
      />
      <div
        className="absolute bottom-10 -right-48 w-96 h-96 rounded-full blur-[150px] pointer-events-none opacity-25"
        style={{ backgroundColor: THEME.orange }}
      />
      <div
        className="absolute top-10 right-1/3 w-80 h-80 rounded-full blur-[160px] pointer-events-none opacity-15"
        style={{ backgroundColor: THEME.maroon }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Section Header matching Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 text-left">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.28em] mb-3 border shadow-sm"
              style={{
                backgroundColor: `${THEME.maroon}14`,
                borderColor: `${THEME.red}40`,
                color: THEME.red
              }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: THEME.orange }} />
              <span>CURRENT OFFERS • BRAND AMBASSADOR ARCHIVE</span>
            </div>

            <WipeText
              as="h2"
              direction="left-to-right"
              duration={0.85}
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight"
            >
              <span style={{ color: THEME.burgundy }}>Worth your attention</span>
            </WipeText>

            <p className="text-xs sm:text-sm md:text-base font-light mt-2 max-w-xl text-[#1C1A19]/75">
              Explore 10 bespoke ambassador privileges — royal drapes, artisan embroideries, and complimentary trousseau tailoring.
            </p>
          </div>

          {/* Quick Controls & Link */}
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => handleScrollRail('left')}
                className="p-2.5 rounded-full border transition-all hover:scale-105 shadow-sm"
                style={{
                  borderColor: `${THEME.maroon}30`,
                  backgroundColor: '#FFFFFF',
                  color: THEME.maroon
                }}
                aria-label="Scroll cards left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollRail('right')}
                className="p-2.5 rounded-full border transition-all hover:scale-105 shadow-sm"
                style={{
                  borderColor: `${THEME.maroon}30`,
                  backgroundColor: '#FFFFFF',
                  color: THEME.maroon
                }}
                aria-label="Scroll cards right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => navigateTo('catalog')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors py-2 px-4 rounded-full border shadow-sm hover:scale-105"
              style={{
                backgroundColor: THEME.maroon,
                borderColor: THEME.orange,
                color: THEME.champagne
              }}
            >
              <span>View All 10 Offers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Main Composite Card Layout: Narrow Vertical Cards (Left) + Large Featured Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Narrow Vertical Cards Rail (7 cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Rail Header Indicator */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: THEME.maroon }}>
                  Select Ambassador Look
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#3A0B18]/10 text-[#5B1024]">
                  {activeId} of 10
                </span>
              </div>
              <span className="text-[11px] text-[#1C1A19]/60 italic hidden sm:inline">
                Click any card to preview full details
              </span>
            </div>

            {/* Horizontal Scroll Rail of Narrow Vertical Cards */}
            <div
              ref={cardStripRef}
              className="flex items-stretch gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-3 pt-1 px-1 -mx-2 sm:mx-0 sm:px-0"
              style={{ minHeight: '480px' }}
            >
              {BRAND_AMBASSADOR_OFFERS.map((item, idx) => {
                const isActive = item.id === activeId;
                const floatClass = idx % 3 === 0
                  ? 'animate-float-a'
                  : idx % 3 === 1
                    ? 'animate-float-b'
                    : 'animate-float-c';

                return (
                  <motion.div
                    key={item.id}
                    ref={(el) => { cardItemRefs.current[idx] = el; }}
                    onClick={() => setActiveId(item.id)}
                    className={`relative flex-shrink-0 w-[115px] sm:w-[130px] md:w-[140px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 select-none group border ${floatClass} ${
                      isActive
                        ? 'ring-2 shadow-2xl scale-[1.02] z-20'
                        : 'shadow-md opacity-85 hover:opacity-100 hover:-translate-y-2 z-10'
                    }`}
                    style={{
                      backgroundColor: THEME.burgundy,
                      borderColor: isActive ? THEME.orange : `${THEME.champagne}35`,
                      // @ts-expect-error custom ring color
                      '--tw-ring-color': THEME.orange,
                      boxShadow: isActive
                        ? `0 20px 35px -10px ${THEME.maroon}80, 0 0 20px ${THEME.orange}50`
                        : undefined
                    }}
                  >
                    {/* Background Ambassador Image */}
                    <picture className="absolute inset-0 w-full h-full block">
                      <source type="image/webp" srcSet={item.imageWebp} />
                      <img
                        src={item.imageOrig}
                        alt={`Aaranya Silks Brand Ambassador ${item.number} - ${item.title}`}
                        loading="lazy"
                        className={`w-full h-full object-cover object-top transition-all duration-700 ${
                          isActive
                            ? 'scale-108 filter brightness-100 contrast-105'
                            : 'filter grayscale-[35%] contrast-110 brightness-75 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-95'
                        }`}
                      />
                    </picture>

                    {/* Gradient scrim with Maroon & Burgundy depth */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background: isActive
                          ? `linear-gradient(to top, ${THEME.burgundy}EE 0%, ${THEME.maroon}66 40%, transparent 80%)`
                          : `linear-gradient(to top, ${THEME.burgundy}F2 0%, ${THEME.burgundy}88 50%, rgba(0,0,0,0.3) 100%)`
                      }}
                    />

                    {/* Card Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-3.5 z-10">
                      {/* Top: Card Number & Active Indicator */}
                      <div className="flex items-center justify-between w-full">
                        <span
                          className="font-mono text-xs font-bold px-2 py-0.5 rounded-md shadow-sm"
                          style={{
                            backgroundColor: isActive ? THEME.orange : 'rgba(0,0,0,0.5)',
                            color: isActive ? '#FFFFFF' : THEME.champagne
                          }}
                        >
                          {item.number}
                        </span>

                        {isActive ? (
                          <span
                            className="w-2.5 h-2.5 rounded-full animate-ping"
                            style={{ backgroundColor: THEME.orange }}
                          />
                        ) : (
                          <span
                            className="w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100"
                            style={{ backgroundColor: THEME.champagne }}
                          />
                        )}
                      </div>

                      {/* Middle: Rotated Label */}
                      <div className="flex-1 flex items-center justify-center my-4 pointer-events-none">
                        <span
                          className="writing-vertical-rl rotate-180 text-[10px] tracking-[0.26em] uppercase font-semibold transition-all duration-300 line-clamp-1"
                          style={{
                            color: isActive ? THEME.champagne : 'rgba(243, 217, 181, 0.7)',
                            textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                          }}
                        >
                          AMBASSADOR • {item.number}
                        </span>
                      </div>

                      {/* Bottom: Title & Highlight Bar */}
                      <div className="text-left space-y-1">
                        <p
                          className="font-serif text-[11px] font-semibold leading-tight line-clamp-2"
                          style={{ color: THEME.champagne }}
                        >
                          {item.title}
                        </p>
                        <div
                          className="h-1 rounded-full transition-all duration-500"
                          style={{
                            width: isActive ? '100%' : '30%',
                            backgroundColor: isActive ? THEME.orange : `${THEME.champagne}50`
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Dots & Controls for Carousel */}
            <div className="flex items-center justify-between pt-3 px-1">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {BRAND_AMBASSADOR_OFFERS.map((dot) => (
                  <button
                    key={dot.id}
                    onClick={() => setActiveId(dot.id)}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: dot.id === activeId ? '28px' : '8px',
                      backgroundColor: dot.id === activeId ? THEME.orange : `${THEME.maroon}35`
                    }}
                    aria-label={`Jump to Ambassador ${dot.number}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#1C1A19]/70 font-mono">
                  {activeId} / 10
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 rounded-full hover:bg-black/5 text-[#5B1024] transition-colors"
                    aria-label="Previous Ambassador"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1.5 rounded-full hover:bg-black/5 text-[#5B1024] transition-colors"
                    aria-label="Next Ambassador"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Large Featured Card (5 cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className="relative flex-1 min-h-[500px] sm:min-h-[560px] rounded-3xl overflow-hidden shadow-2xl border flex flex-col justify-between p-6 sm:p-8 text-left text-white"
              style={{
                backgroundColor: THEME.burgundy,
                borderColor: `${THEME.champagne}40`,
                boxShadow: `0 25px 50px -12px ${THEME.burgundy}90, 0 0 30px ${THEME.red}30`
              }}
            >
              {/* Animated Background Featured Image with Crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOffer.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <picture className="w-full h-full block">
                    <source type="image/webp" srcSet={activeOffer.imageWebp} />
                    <img
                      src={activeOffer.imageOrig}
                      alt={`Featured Ambassador ${activeOffer.number} - ${activeOffer.title}`}
                      className="w-full h-full object-cover object-top filter brightness-90 contrast-[1.05]"
                      // @ts-expect-error fetchpriority
                      fetchpriority="high"
                    />
                  </picture>

                  {/* Gradient Scrim - Maroon to Burgundy to transparent */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${THEME.burgundy}F8 0%, ${THEME.burgundy}D9 42%, ${THEME.maroon}55 70%, rgba(58, 11, 24, 0.3) 100%)`
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Top Row: Badges & Next/Prev Controls */}
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-xs sm:text-sm font-bold px-3 py-1 rounded-full backdrop-blur-md border shadow"
                    style={{
                      backgroundColor: `${THEME.burgundy}D0`,
                      borderColor: THEME.orange,
                      color: THEME.champagne
                    }}
                  >
                    AMBASSADOR {activeOffer.number} / 10
                  </span>

                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider shadow"
                    style={{
                      backgroundColor: THEME.red,
                      color: THEME.champagne
                    }}
                  >
                    <Sparkles className="w-3 h-3" style={{ color: THEME.orange }} />
                    <span>Royal Privilege</span>
                  </span>
                </div>

                {/* Quick Arrow Nav inside Featured Card */}
                <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                    aria-label="Previous Ambassador Card"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                    aria-label="Next Ambassador Card"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Details Content with Animated Transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${activeOffer.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 space-y-4 pt-12"
                >
                  {/* Tagline */}
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs uppercase tracking-[0.24em] font-bold"
                      style={{ color: THEME.orange }}
                    >
                      {activeOffer.tagline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-tight"
                    style={{ color: THEME.champagne }}
                  >
                    {activeOffer.title}
                  </h3>

                  {/* Offer Description Banner */}
                  <div
                    className="p-3.5 sm:p-4 rounded-2xl border backdrop-blur-md flex items-start gap-3"
                    style={{
                      backgroundColor: `${THEME.maroon}75`,
                      borderColor: `${THEME.orange}60`
                    }}
                  >
                    <Gift className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: THEME.orange }} />
                    <div>
                      <p className="text-xs sm:text-sm font-medium leading-relaxed" style={{ color: THEME.ivory }}>
                        {activeOffer.offer}
                      </p>
                      <p className="text-[11px] font-light mt-1 text-[#F3D9B5]/80">
                        {activeOffer.highlight}
                      </p>
                    </div>
                  </div>

                  {/* Perks Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    {activeOffer.perks.map((perk, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-center gap-1.5 text-[11px] text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/5"
                      >
                        <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: THEME.orange }} />
                        <span className="truncate">{perk}</span>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code Pill & Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {/* Copy Coupon Code Button */}
                    <button
                      onClick={() => handleCopyCode(activeOffer.couponCode)}
                      className="inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border border-dashed text-xs font-mono font-semibold transition-all hover:scale-102"
                      style={{
                        backgroundColor: `${THEME.burgundy}A0`,
                        borderColor: THEME.orange,
                        color: THEME.champagne
                      }}
                      title="Click to copy coupon code"
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5" style={{ color: THEME.orange }} />
                        <span>CODE: {activeOffer.couponCode}</span>
                      </div>
                      {copiedCode === activeOffer.couponCode ? (
                        <span className="text-[10px] uppercase font-bold text-emerald-400">Copied!</span>
                      ) : (
                        <Copy className="w-3 h-3 opacity-70" />
                      )}
                    </button>

                    {/* Primary Claim Privilege CTA Button */}
                    <button
                      onClick={() => handleClaimOffer(activeOffer)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: THEME.red,
                        color: '#FFFFFF',
                        border: `1px solid ${THEME.orange}80`
                      }}
                    >
                      <span>Claim Privilege & Shop</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorthYourAttention;
