import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ArrowRight, Box } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatters';
import { WipeText } from './WipeText';
import { preloadImages } from '../utils/imagePreloader';
import roseWarmCream from '../assets/studio/rose-warm-cream.webp';
import roseRosePink from '../assets/studio/rose-pink.webp';
import roseDeepWine from '../assets/studio/rose-deep-wine.webp';

import suhaniCrimsonRed from '../assets/studio/suhani-crimson-red.webp';
import suhaniPlumBurgundy from '../assets/studio/suhani-plum-burgundy.webp';
import suhaniChampagneGold from '../assets/studio/suhani-champagne-gold.webp';

import swarnaLiquidGold from '../assets/studio/swarna-liquid-gold.webp';
import swarnaWarmIvory from '../assets/studio/swarna-warm-ivory.webp';
import swarnaEmerald from '../assets/studio/swarna-emerald.webp';

const STUDIO_LOOKS = [
  {
    id: 'look-1',
    name: 'Rosé Net Embroidered Saree',
    headline: 'ROSÉ NET EMBROIDERED',
    price: 21600,
    originalPrice: 25900,
    rating: 4.8,
    reviews: 128,
    thumbnail: roseRosePink,
    defaultColorIdx: 1,
    colors: [
      { name: 'Warm Cream', hex: '#FAF7F0', image: roseWarmCream },
      { name: 'Rose Pink', hex: '#E8987E', image: roseRosePink },
      { name: 'Deep Wine', hex: '#651C32', image: roseDeepWine }
    ]
  },
  {
    id: 'look-2',
    name: 'Suhani Crimson Zari Saree',
    headline: 'SUHANI CRIMSON ZARI',
    price: 26500,
    originalPrice: 31500,
    rating: 4.9,
    reviews: 184,
    thumbnail: suhaniCrimsonRed,
    defaultColorIdx: 0,
    colors: [
      { name: 'Crimson Red', hex: '#8B1E3F', image: suhaniCrimsonRed },
      { name: 'Plum Burgundy', hex: '#651C32', image: suhaniPlumBurgundy },
      { name: 'Champagne Gold', hex: '#C8A96B', image: suhaniChampagneGold }
    ]
  },
  {
    id: 'look-3',
    name: 'Swarna Hansa Metallic Tissue',
    headline: 'SWARNA HANSA TISSUE',
    price: 24800,
    originalPrice: 29500,
    rating: 4.95,
    reviews: 96,
    thumbnail: swarnaLiquidGold,
    defaultColorIdx: 0,
    colors: [
      { name: 'Liquid Gold', hex: '#C8A96B', image: swarnaLiquidGold },
      { name: 'Warm Ivory', hex: '#FAF7F0', image: swarnaWarmIvory },
      { name: 'Emerald', hex: '#1B4D3E', image: swarnaEmerald }
    ]
  }
];

const BLOUSE_SIZES = ['S', 'M', 'L', 'XL', '2XL'];

export const ChangeLookStudio: React.FC = () => {
  const { addToCart, navigateTo, showToast } = useShop();

  const [activeLookIdx, setActiveLookIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColorIdx, setSelectedColorIdx] = useState(1);
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const look = STUDIO_LOOKS[activeLookIdx];
  const activeColor = look.colors[selectedColorIdx] || look.colors[0];
  const currentImage = activeColor.image;

  React.useEffect(() => {
    if (look?.colors) {
      preloadImages(look.colors.map((c) => c.image));
    }
    const nextLook = STUDIO_LOOKS[(activeLookIdx + 1) % STUDIO_LOOKS.length];
    if (nextLook?.thumbnail) {
      preloadImages([nextLook.thumbnail]);
    }
  }, [activeLookIdx, look]);

  const handleAddToCart = () => {
    // Construct saree-like object
    const dummySaree = {
      id: `studio-${look.id}`,
      name: look.name,
      slug: 'chandrika-midnight-flora-pure-organza-saree',
      tagline: 'Featured in Atelier Change Look Studio',
      category: 'Designer Sarees' as const,
      fabric: 'Pure Organza' as const,
      color: activeColor.name,
      colors: look.colors.map((c) => ({ name: c.name, hex: c.hex, image: c.image })),
      price: look.price,
      rating: look.rating,
      reviewCount: look.reviews,
      images: look.colors.map((c) => c.image),
      description: 'Exclusive runway draping edit crafted for high-fashion celebrations.',
      weaveDetail: 'Pure silk sheer weave with badla embroidery.',
      zariType: 'Antique Silver & Gold Zari',
      palluDetail: 'Hand-knotted tassels',
      blouseIncluded: true,
      blouseDetails: `Bespoke stitched padded blouse (${selectedSize}) included.`,
      sareeLength: '5.5m',
      careInstructions: ['Dry clean only.'],
      occasions: ['Cocktail' as const, 'Reception' as const],
      inStock: true
    };
    addToCart(dummySaree, activeColor.name, qty);
  };

  return (
    <section className="py-20 md:py-32 bg-[#FAF7F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Change Look script & 3 Thumbnails (2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-left space-y-4">
            {/* Handwritten cursive script with arrow matching Frame 14 */}
            <div className="relative mb-2">
              <span className="font-script text-3xl sm:text-4xl text-[#651C32] block">
                Change look
              </span>
              <svg className="w-12 h-6 text-[#C8A96B] ml-2 -mt-1" viewBox="0 0 50 25" fill="none">
                <path d="M5 5 C 20 20, 35 15, 45 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M40 5 L45 8 L40 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* 3 Clickable Thumbnails */}
            <div className="flex flex-row lg:flex-col gap-3">
              {STUDIO_LOOKS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveLookIdx(idx);
                    setSelectedColorIdx(item.defaultColorIdx ?? 0);
                  }}
                  className={`w-16 h-22 sm:w-20 sm:h-28 rounded-xl overflow-hidden border-2 transition-all shadow-md ${
                    activeLookIdx === idx
                      ? 'border-[#651C32] ring-2 ring-[#E5B842] scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          {/* Center Column: Full-Length Model in Saree (5 cols on lg) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-[#F2EBDD] border border-[#C8A96B]/30 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${look.id}-${selectedColorIdx}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  src={currentImage}
                  alt={`${look.name} - ${activeColor.name}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>

              {/* Ambient bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40" />

              {/* Handwritten script badge at bottom matching Frame 14: New Drop 2026 */}
              <div className="absolute bottom-5 left-5">
                <span className="font-script text-2xl sm:text-3xl text-[#E5B842] drop-shadow-md">
                  New Drop 2026
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Saree Specifications & Asymmetric Capsule Button (5 cols on lg) */}
          <div className="lg:col-span-5 text-left space-y-5">
            {/* Top link & ratings */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigateTo('catalog')}
                className="text-xs font-semibold uppercase tracking-wider text-[#8B1E3F] hover:text-[#651C32] transition-colors"
              >
                Shop all sarees →
              </button>
              <div className="flex items-center gap-1 text-xs">
                <div className="flex text-[#E5B842]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[#1C1A19] ml-1">{look.rating}</span>
                <span className="text-[#1C1A19]/50">({look.reviews} Reviews)</span>
              </div>
            </div>

            {/* Saree Name & Price */}
            <div>
              <WipeText as="h3" direction="left-to-right" duration={0.8} className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1A19] mb-1">
                {look.headline}
              </WipeText>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#651C32]">
                  {formatINR(look.price)}
                </span>
                <span className="text-sm text-[#1C1A19]/50 line-through">
                  {formatINR(look.originalPrice)}
                </span>
              </div>
            </div>

            {/* Select Blouse Size matching Frame 14 */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1C1A19]/70 mb-2">
                <span>SELECT BLOUSE SIZE</span>
                <span className="text-[10px] text-[#8B1E3F] lowercase font-normal underline cursor-pointer">
                  size guide
                </span>
              </div>
              <div className="flex items-center gap-2">
                {BLOUSE_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-[#1C1A19] text-white shadow-md'
                        : 'bg-white border border-black/15 text-[#1C1A19]/80 hover:bg-[#FAF7F0]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Colour Swatches matching Frame 14 */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1C1A19]/70 block mb-2">
                SELECT COLOUR: <strong className="text-[#651C32]">{activeColor.name}</strong>
              </span>
              <div className="flex items-center gap-2.5">
                {look.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorIdx(i)}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      selectedColorIdx === i
                        ? 'border-[#651C32] ring-2 ring-[#E5B842] scale-110'
                        : 'border-black/20 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={`Select ${c.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1C1A19]/70">
                Quantity:
              </span>
              <div className="flex items-center border border-[#C8A96B]/50 rounded-lg bg-white overflow-hidden">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1.5 hover:bg-[#FAF7F0] text-xs font-bold">-</button>
                <span className="px-3 text-xs font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1.5 hover:bg-[#FAF7F0] text-xs font-bold">+</button>
              </div>
            </div>

            {/* Asymmetrical Rounded Burgundy Capsule Button matching Frame 14 */}
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="group flex-1 flex items-center justify-between px-8 py-4 rounded-l-full rounded-r-2xl bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-2xl hover:scale-102"
              >
                <span>ADD TO CART</span>
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 text-[#E5B842]" />
                </div>
              </button>

              {/* Floating Action Circle Icons from Frame 14 */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3.5 rounded-full border transition-colors shadow-md ${
                    isWishlisted ? 'bg-[#8B1E3F] text-white border-[#8B1E3F]' : 'bg-white border-black/15 text-[#1C1A19] hover:bg-[#FAF7F0]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={() => showToast('3D Interactive Fabric Inspection Ready', 'info')}
                  className="p-3.5 rounded-full bg-white border border-black/15 text-[#1C1A19] hover:bg-[#FAF7F0] shadow-md transition-colors"
                  aria-label="3D View"
                >
                  <Box className="w-4 h-4 text-[#C8A96B]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
