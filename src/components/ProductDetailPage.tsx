import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkles,
  ArrowRight,
  Share2
} from 'lucide-react';
import type { Saree } from '../types';
import { useShop } from '../context/ShopContext';
import { SAREES_DATA } from '../data/sarees';
import { formatINR } from '../utils/formatters';
import { ProductCard } from './ProductCard';
import userProductImage from '../assets/user-product-image.png';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { addToCart, isInWishlist, toggleWishlist, setIsCheckoutOpen, showToast, navigateTo } = useShop();

  const product: Saree = SAREES_DATA.find((s) => s.slug === slug) || SAREES_DATA[0];

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    care: false,
    shipping: false,
    styling: false
  });

  const activeColor = product.colors[selectedColorIdx] || {
    name: product.color,
    hex: '#8B1E3F',
    image: product.images[0]
  };

  const isWishlisted = isInWishlist(product.id);

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.trim().length === 6 && /^\d+$/.test(pincodeInput.trim())) {
      setPincodeStatus(`Available for express delivery to ${pincodeInput} in 2-3 business days.`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian pincode.');
    }
  };

  const handleBuyNow = () => {
    addToCart(product, activeColor.name, quantity);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.tagline,
        url: window.location.href
      }).catch(() => {});
    } else {
      showToast('Link copied to clipboard!', 'info');
    }
  };

  // Related Sarees in same category
  const relatedSarees = SAREES_DATA.filter(
    (s) => s.id !== product.id && (s.category === product.category || s.fabric === product.fabric)
  ).slice(0, 4);

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#1C1A19]/60 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
          <button onClick={() => navigateTo('home')} className="hover:text-[#651C32]">Home</button>
          <span>/</span>
          <button onClick={() => navigateTo('catalog')} className="hover:text-[#651C32]">Sarees</button>
          <span>/</span>
          <button onClick={() => navigateTo('catalog', undefined, product.category)} className="hover:text-[#651C32]">{product.category}</button>
          <span>/</span>
          <span className="text-[#651C32] font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-24">
          {/* Left Column: Visual Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image Stage */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-[#F2EBDD] border border-[#C8A96B]/30 shadow-xl group">
              <motion.img
                key={activeImgIdx + activeColor.name}
                initial={{ opacity: 0.8, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={product.images[activeImgIdx] || activeColor.image || product.images[0]}
                alt={product.name}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = userProductImage;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="px-3.5 py-1.5 rounded-full bg-[#651C32] text-white text-[11px] uppercase font-bold tracking-wider shadow-lg">
                    {product.badge}
                  </span>
                )}
                {product.discountBadge && (
                  <span className="px-3 py-1 rounded-full bg-[#8B1E3F] text-white text-[10px] uppercase font-bold tracking-wider shadow">
                    {product.discountBadge}
                  </span>
                )}
              </div>

              {/* Wishlist floating toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-lg transition-transform ${
                  isWishlisted ? 'bg-[#8B1E3F] text-white scale-110' : 'bg-white/80 text-[#1C1A19] hover:bg-white hover:text-[#8B1E3F]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Gallery Thumbnail Strip */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`w-20 h-28 rounded-xl overflow-hidden shrink-0 border-2 transition-all shadow-sm ${
                    activeImgIdx === idx
                      ? 'border-[#651C32] ring-2 ring-[#C8A96B] scale-105'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = userProductImage;
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Authenticity Banner */}
            <div className="p-4 rounded-2xl bg-[#F2EBDD] border border-[#C8A96B]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#8B1E3F]" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-[#651C32]">Government Silk Mark Certified</p>
                  <p className="text-[11px] text-[#1C1A19]/60">100% pure Mulberry silk warp & weft guaranteed with hallmark code.</p>
                </div>
              </div>
              <button onClick={handleShare} className="p-2 rounded-full hover:bg-white/50 text-[#1C1A19]/70" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Saree Details & Ordering (5 cols) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#8B1E3F] font-semibold uppercase tracking-[0.2em] mb-2">
                <span>{product.category}</span>
                <div className="flex items-center gap-1 text-[#1C1A19]">
                  <Star className="w-4 h-4 text-[#C8A96B] fill-current" />
                  <span className="font-bold">{product.rating.toFixed(2)}</span>
                  <span className="text-[#1C1A19]/50">({product.reviewCount} verified reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-light text-[#651C32] leading-tight mb-2">
                {product.name}
              </h1>

              <p className="text-xs text-[#8B1E3F] font-serif italic mb-4">
                "{product.tagline}"
              </p>

              {/* Pricing Display */}
              <div className="flex items-baseline gap-3 pt-2 pb-4 border-y border-[#C8A96B]/20">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#651C32]">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#1C1A19]/50 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-[#1C1A19]/60 font-light ml-auto">
                  Inclusive of all taxes & insurance
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#1C1A19]/80 font-sans font-light leading-relaxed">
              {product.description}
            </p>

            {/* Interactive Color Selection */}
            {product.colors.length > 0 && (
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-[#1C1A19]/70 uppercase tracking-wider">
                    Selected Shade: <strong className="text-[#651C32]">{activeColor.name}</strong>
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">Ready in Atelier</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColorIdx(i);
                        setActiveImgIdx(0);
                      }}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        selectedColorIdx === i
                          ? 'border-[#651C32] bg-[#FAF7F0] ring-2 ring-[#651C32] text-[#651C32]'
                          : 'border-black/15 bg-white text-[#1C1A19]/80 hover:border-[#651C32]'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action CTAs */}
            <div className="space-y-3 pt-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#C8A96B]/50 rounded-xl bg-white overflow-hidden shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-3 text-sm text-[#1C1A19] hover:bg-[#FAF7F0] font-semibold"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-[#1C1A19]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-3 text-sm text-[#1C1A19] hover:bg-[#FAF7F0] font-semibold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={() => addToCart(product, activeColor.name, quantity)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#FAF7F0] hover:bg-[#651C32] text-[#651C32] hover:text-white border-2 border-[#651C32] text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 shadow hover:shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] transition-all shadow-xl hover:shadow-2xl"
              >
                <Sparkles className="w-4 h-4 text-[#C8A96B]" />
                <span>Buy Now with Express Delivery</span>
              </button>
            </div>

            {/* Pincode Estimator */}
            <div className="p-4 rounded-2xl bg-[#F2EBDD] border border-[#C8A96B]/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#651C32]">
                <MapPin className="w-4 h-4 text-[#8B1E3F]" />
                <span>Estimate Express Doorstep Delivery</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#C8A96B]/30 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#651C32] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#8B1E3F] transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-xs text-[#8B1E3F] font-medium pt-1">
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* Informational Accordions */}
            <div className="border-t border-[#C8A96B]/25 divide-y divide-[#C8A96B]/20 pt-2">
              {/* Product Specifications */}
              <div>
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full py-3.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#651C32]"
                >
                  <span>Weave & Product Specifications</span>
                  {openAccordions.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.details && (
                  <div className="pb-4 text-xs text-[#1C1A19]/80 space-y-2 font-light">
                    <p><strong>Fabric:</strong> {product.fabric}</p>
                    <p><strong>Weave Technique:</strong> {product.weaveDetail}</p>
                    <p><strong>Zari Composition:</strong> {product.zariType}</p>
                    <p><strong>Pallu Details:</strong> {product.palluDetail}</p>
                    <p><strong>Saree Length:</strong> {product.sareeLength}</p>
                    <p><strong>Blouse Piece:</strong> {product.blouseDetails}</p>
                    <p><strong>Occasion Suitability:</strong> {product.occasions.join(', ')}</p>
                  </div>
                )}
              </div>

              {/* Fabric & Care Instructions */}
              <div>
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-3.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#651C32]"
                >
                  <span>Fabric Care & Preservation Guide</span>
                  {openAccordions.care ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.care && (
                  <div className="pb-4 text-xs text-[#1C1A19]/80 space-y-1.5 font-light">
                    {product.careInstructions.map((inst, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B1E3F] shrink-0 mt-0.5" />
                        <span>{inst}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div>
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-3.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#651C32]"
                >
                  <span>Complimentary Finishing & Delivery</span>
                  {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.shipping && (
                  <div className="pb-4 text-xs text-[#1C1A19]/80 space-y-2 font-light">
                    <p>• Complimentary Fall and Pico / edging stitching included with all sarees.</p>
                    <p>• Hand-knotted pure silk tassels attached to the pallu hem.</p>
                    <p>• Insured express air dispatch within 24 to 48 hours.</p>
                    <p>• Complimentary archival keepsake box with unbleached cotton muslin bag.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Sarees Section */}
        {relatedSarees.length > 0 && (
          <div className="pt-16 border-t border-[#C8A96B]/25 text-left">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B1E3F] block mb-1">
                  Handpicked Harmony
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#651C32]">
                  You May Also Admire
                </h3>
              </div>
              <button
                onClick={() => navigateTo('catalog')}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#651C32] hover:text-[#8B1E3F]"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedSarees.map((saree) => (
                <ProductCard key={saree.id} product={saree} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
