import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
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
  const { addToCart, isInWishlist, toggleWishlist, setIsCheckoutOpen, showToast, navigateTo, selectedVariantColor } = useShop();

  const product: Saree = SAREES_DATA.find((s) => s.slug === slug) || SAREES_DATA[0];

  const [selectedColorIdx, setSelectedColorIdx] = useState(() => {
    if (selectedVariantColor) {
      const idx = product.colors.findIndex(
        (c) => c.name.toLowerCase() === selectedVariantColor.toLowerCase()
      );
      if (idx >= 0) return idx;
    }
    return 0;
  });

  const [activeImg, setActiveImg] = useState<string | null>(() => {
    if (selectedVariantColor) {
      const col = product.colors.find(
        (c) => c.name.toLowerCase() === selectedVariantColor.toLowerCase()
      );
      if (col?.image) return col.image;
    }
    return product.colors[0]?.image || product.images[0];
  });

  useEffect(() => {
    let colIdx = 0;
    if (selectedVariantColor) {
      const idx = product.colors.findIndex(
        (c) => c.name.toLowerCase() === selectedVariantColor.toLowerCase()
      );
      if (idx >= 0) colIdx = idx;
    }
    setSelectedColorIdx(colIdx);
    const chosenColor = product.colors[colIdx];
    setActiveImg(chosenColor?.image || product.images[0]);
    setActiveImgIdx(0);
  }, [slug, selectedVariantColor, product]);

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Tab or accordion for secondary specs
  const [activeTab, setActiveTab] = useState<'specs' | 'care' | 'shipping'>('specs');

  const activeColor = product.colors[selectedColorIdx] || {
    name: product.color,
    hex: '#8B1E3F',
    image: product.images[0]
  };

  const isWishlisted = isInWishlist(product.id);

  const handleColorSelect = (index: number) => {
    setSelectedColorIdx(index);
    const colorObj = product.colors[index];
    if (colorObj?.image) {
      setActiveImg(colorObj.image);
      const imgIdx = product.images.indexOf(colorObj.image);
      if (imgIdx >= 0) {
        setActiveImgIdx(imgIdx);
      }
    }
  };

  const handleThumbnailSelect = (img: string, idx: number) => {
    setActiveImgIdx(idx);
    setActiveImg(img);
    const colorIdx = product.colors.findIndex((c) => c.image === img);
    if (colorIdx >= 0) {
      setSelectedColorIdx(colorIdx);
    }
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.trim().length === 6 && /^\d+$/.test(pincodeInput.trim())) {
      setPincodeStatus(`Express delivery available to ${pincodeInput} in 2-3 business days.`);
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

  const displayedImage = activeImg || activeColor.image || product.images[activeImgIdx] || product.images[0];

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-4 lg:py-6 pb-24 lg:pb-12">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Compact Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#1C1A19]/60 mb-4 overflow-x-auto no-scrollbar whitespace-nowrap">
          <button onClick={() => navigateTo('home')} className="hover:text-[#651C32] transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigateTo('catalog')} className="hover:text-[#651C32] transition-colors">Sarees</button>
          <span>/</span>
          <button onClick={() => navigateTo('catalog', undefined, product.category)} className="hover:text-[#651C32] transition-colors">{product.category}</button>
          <span>/</span>
          <span className="text-[#651C32] font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </div>

        {/* Main One-Screen Side-by-Side Product Container */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-7 border border-[#C8A96B]/25 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Compact Viewport-Friendly Image Gallery (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-3">
              {/* Main Image Stage - Compact Sizing with Face Fully Visible */}
              <div className="relative w-full max-h-[440px] sm:max-h-[480px] aspect-[9/10] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-[#F2EBDD] border border-[#C8A96B]/30 shadow-md group mx-auto">
                <motion.img
                  key={displayedImage}
                  initial={{ opacity: 0.85, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={displayedImage}
                  alt={product.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = userProductImage;
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none z-10">
                  {product.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#651C32] text-white text-[10px] uppercase font-bold tracking-wider shadow">
                      {product.badge}
                    </span>
                  )}
                  {product.discountBadge && (
                    <span className="px-2 py-0.5 rounded-full bg-[#8B1E3F] text-white text-[9px] uppercase font-bold tracking-wider shadow">
                      {product.discountBadge}
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md shadow-md transition-transform ${
                    isWishlisted ? 'bg-[#8B1E3F] text-white scale-105' : 'bg-white/80 text-[#1C1A19] hover:bg-white hover:text-[#8B1E3F]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Compact Thumbnail Strip */}
              <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleThumbnailSelect(img, idx)}
                    className={`w-14 h-16 sm:w-16 sm:h-18 rounded-lg overflow-hidden shrink-0 border-2 transition-all shadow-xs ${
                      displayedImage === img || (activeImgIdx === idx && !activeImg)
                        ? 'border-[#651C32] ring-2 ring-[#C8A96B] scale-105 opacity-100'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = userProductImage;
                      }}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>

              {/* Authenticity Certificate Single-Line Strip */}
              <div className="py-2 px-3 rounded-xl bg-[#FAF7F0] border border-[#C8A96B]/20 flex items-center justify-between text-xs text-[#1C1A19]/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B1E3F] shrink-0" />
                  <span className="text-[11px] font-medium text-[#651C32]">Government Silk Mark Certified • 100% Pure Mulberry Silk</span>
                </div>
                <button onClick={handleShare} className="p-1 hover:text-[#651C32] text-[#1C1A19]/60 transition-colors" aria-label="Share">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Compact Product Information & Controls (7 cols) */}
            <div className="lg:col-span-7 text-left flex flex-col justify-between space-y-3.5">
              
              {/* Category, Rating & Title */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#8B1E3F] font-semibold uppercase tracking-wider mb-1">
                  <span>{product.category}</span>
                  <div className="flex items-center gap-1 text-[#1C1A19]">
                    <Star className="w-3.5 h-3.5 text-[#C8A96B] fill-current" />
                    <span className="font-bold text-xs">{product.rating.toFixed(2)}</span>
                    <span className="text-[#1C1A19]/50 text-[11px]">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#651C32] leading-tight">
                  {product.name}
                </h1>
                
                <p className="text-xs text-[#8B1E3F] font-serif italic mt-0.5 line-clamp-1">
                  "{product.tagline}"
                </p>
              </div>

              {/* Pricing Display */}
              <div className="flex items-baseline gap-3 py-2 border-y border-[#C8A96B]/20">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#651C32]">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs sm:text-sm text-[#1C1A19]/50 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {product.discountBadge && (
                  <span className="px-2 py-0.5 rounded-full bg-[#8B1E3F]/10 text-[#8B1E3F] text-[10px] font-bold">
                    {product.discountBadge}
                  </span>
                )}
                <span className="text-[10px] sm:text-[11px] text-[#1C1A19]/60 font-light ml-auto">
                  Inclusive of all taxes & insurance
                </span>
              </div>

              {/* Color Selection with Live Image Sync */}
              {product.colors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-[#1C1A19]/70 uppercase tracking-wider text-[11px]">
                      Selected Shade: <strong className="text-[#651C32]">{activeColor.name}</strong>
                    </span>
                    <span className="text-[10px] text-emerald-700 font-medium">Ready in Atelier</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.colors.map((c, i) => (
                      <button
                        key={c.name}
                        onClick={() => handleColorSelect(i)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                          selectedColorIdx === i
                            ? 'border-[#651C32] bg-[#FAF7F0] ring-1 ring-[#651C32] text-[#651C32] shadow-xs'
                            : 'border-black/15 bg-white text-[#1C1A19]/80 hover:border-[#651C32]'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: c.hex }} />
                        <span className="text-[11px]">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Compact Description */}
              <p className="text-xs text-[#1C1A19]/75 font-sans font-light leading-relaxed line-clamp-2">
                {product.description}
              </p>

              {/* Key Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#FAF7F0] border border-[#C8A96B]/20 text-[11px]">
                <div>
                  <span className="text-[#1C1A19]/50 block text-[9px] uppercase font-semibold">Fabric</span>
                  <span className="font-medium text-[#651C32] truncate block">{product.fabric}</span>
                </div>
                <div>
                  <span className="text-[#1C1A19]/50 block text-[9px] uppercase font-semibold">Zari</span>
                  <span className="font-medium text-[#1C1A19] truncate block">{product.zariType || 'Pure Gold Zari'}</span>
                </div>
                <div>
                  <span className="text-[#1C1A19]/50 block text-[9px] uppercase font-semibold">Dimensions</span>
                  <span className="font-medium text-[#1C1A19] truncate block">{product.sareeLength || '5.5m + 0.85m Blouse'}</span>
                </div>
              </div>

              {/* Quantity Selector, Add to Bag & Buy Now Buttons */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2.5">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-[#C8A96B]/40 rounded-xl bg-white overflow-hidden shrink-0 h-10">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-2.5 text-xs text-[#1C1A19] hover:bg-[#FAF7F0] font-semibold transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-[#1C1A19]">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-2.5 text-xs text-[#1C1A19] hover:bg-[#FAF7F0] font-semibold transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={() => addToCart(product, activeColor.name, quantity)}
                    className="flex-1 flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-[#FAF7F0] hover:bg-[#651C32] text-[#651C32] hover:text-white border border-[#651C32] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>

                  {/* Buy Now Button */}
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>

              {/* Compact Inline Pincode Checker */}
              <form onSubmit={handleCheckPincode} className="flex items-center gap-2 pt-0.5">
                <div className="relative flex-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8B1E3F] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value)}
                    placeholder="Enter 6-digit Pincode"
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-[#C8A96B]/30 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#FAF7F0] hover:bg-[#651C32] text-[#651C32] hover:text-white border border-[#651C32]/40 rounded-lg text-xs font-semibold transition-colors shrink-0"
                >
                  Verify
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-[11px] text-[#8B1E3F] font-medium pl-1">
                  {pincodeStatus}
                </p>
              )}

              {/* Secondary Details Compact Tabs */}
              <div className="pt-2 border-t border-[#C8A96B]/20">
                <div className="flex items-center gap-4 text-xs border-b border-[#C8A96B]/15 pb-1">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-1 font-semibold text-[11px] transition-colors relative ${
                      activeTab === 'specs' ? 'text-[#651C32]' : 'text-[#1C1A19]/60 hover:text-[#1C1A19]'
                    }`}
                  >
                    Specifications
                    {activeTab === 'specs' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#651C32]" />}
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-1 font-semibold text-[11px] transition-colors relative ${
                      activeTab === 'care' ? 'text-[#651C32]' : 'text-[#1C1A19]/60 hover:text-[#1C1A19]'
                    }`}
                  >
                    Care Guide
                    {activeTab === 'care' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#651C32]" />}
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-1 font-semibold text-[11px] transition-colors relative ${
                      activeTab === 'shipping' ? 'text-[#651C32]' : 'text-[#1C1A19]/60 hover:text-[#1C1A19]'
                    }`}
                  >
                    Delivery & Packaging
                    {activeTab === 'shipping' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#651C32]" />}
                  </button>
                </div>

                <div className="pt-2 text-[11px] text-[#1C1A19]/80 font-light leading-relaxed min-h-[50px]">
                  {activeTab === 'specs' && (
                    <div className="space-y-1">
                      <p><strong>Weave:</strong> {product.weaveDetail}</p>
                      <p><strong>Pallu:</strong> {product.palluDetail}</p>
                      <p><strong>Blouse:</strong> {product.blouseDetails}</p>
                    </div>
                  )}
                  {activeTab === 'care' && (
                    <ul className="list-disc pl-4 space-y-0.5">
                      {product.careInstructions.map((inst, i) => (
                        <li key={i}>{inst}</li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'shipping' && (
                    <p>
                      • Complimentary Fall & Pico stitching included. Hand-knotted tassels attached. Express air transit in 24-48 hrs with luxury archival keepsake box.
                    </p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Related Sarees Section */}
        {relatedSarees.length > 0 && (
          <div className="pt-10 border-t border-[#C8A96B]/25 text-left">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B1E3F] block mb-0.5">
                  Handpicked Harmony
                </span>
                <h3 className="font-serif text-2xl font-light text-[#651C32]">
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

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedSarees.map((saree) => (
                <ProductCard key={saree.id} product={saree} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Purchase Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#C8A96B]/30 p-3 sm:hidden flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] text-[#1C1A19]/60 block leading-none">Total Price</span>
          <span className="font-serif text-lg font-bold text-[#651C32]">
            {formatINR(product.price)}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={() => addToCart(product, activeColor.name, quantity)}
            className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-[#FAF7F0] text-[#651C32] border border-[#651C32] text-xs font-semibold uppercase tracking-wider"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-1 py-2.5 px-4 rounded-xl bg-[#651C32] text-white text-xs font-semibold uppercase tracking-wider shadow"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
