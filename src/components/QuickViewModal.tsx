import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatters';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    isInWishlist,
    toggleWishlist,
    navigateTo
  } = useShop();

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const activeColor = product.colors[selectedColorIdx] || {
    name: product.color,
    hex: '#8B1E3F',
    image: product.images[0]
  };

  const isWishlisted = isInWishlist(product.id);

  const handleColorChange = (index: number) => {
    setSelectedColorIdx(index);
    setActiveImgIdx(0);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#FAF7F0] rounded-3xl shadow-2xl overflow-hidden border border-[#C8A96B]/30 z-10 my-auto text-left"
        >
          {/* Close Button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#FAF7F0]/80 hover:bg-[#FAF7F0] text-[#1C1A19] shadow transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Gallery */}
            <div className="p-6 bg-[#F2EBDD] flex flex-col justify-between">
              {/* Main Image */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-md mb-4 border border-[#C8A96B]/20">
                <img
                  src={product.images[activeImgIdx] || activeColor.image || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#651C32] text-white text-[10px] uppercase font-bold tracking-wider shadow">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`w-14 h-18 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImgIdx === idx ? 'border-[#651C32] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Saree Info & Actions */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs text-[#8B1E3F] font-semibold uppercase tracking-wider mb-2">
                  <span>{product.category}</span>
                  <div className="flex items-center gap-1 text-[#1C1A19]">
                    <Star className="w-3.5 h-3.5 text-[#C8A96B] fill-current" />
                    <span>{product.rating.toFixed(2)} ({product.reviewCount})</span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#651C32] mb-2 leading-snug">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-serif text-2xl font-bold text-[#651C32]">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#1C1A19]/50 line-through">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                  {product.discountBadge && (
                    <span className="px-2 py-0.5 rounded bg-[#8B1E3F] text-white text-[10px] font-bold uppercase">
                      {product.discountBadge}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#1C1A19]/75 font-sans font-light leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Color swatches */}
                {product.colors.length > 0 && (
                  <div className="mb-5">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#1C1A19]/70 block mb-2">
                      Color: <strong className="text-[#651C32]">{activeColor.name}</strong>
                    </span>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c, i) => (
                        <button
                          key={c.name}
                          onClick={() => handleColorChange(i)}
                          className={`w-6 h-6 rounded-full border transition-all ${
                            selectedColorIdx === i
                              ? 'ring-2 ring-[#651C32] ring-offset-2 scale-110'
                              : 'border-black/20 opacity-80'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick specs */}
                <div className="p-3.5 rounded-xl bg-[#F2EBDD] space-y-1.5 text-xs text-[#1C1A19]/80 mb-5">
                  <p><strong>Fabric:</strong> {product.fabric}</p>
                  <p><strong>Zari:</strong> {product.zariType}</p>
                  <p><strong>Dimensions:</strong> {product.sareeLength}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2 border-t border-[#C8A96B]/25">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#C8A96B]/50 rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-[#1C1A19] hover:bg-[#FAF7F0]"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-[#1C1A19] hover:bg-[#FAF7F0]"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to bag button */}
                  <button
                    onClick={() => {
                      addToCart(product, activeColor.name, quantity);
                      closeQuickView();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#C8A96B]" />
                    <span>Add to Shopping Bag</span>
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-xl border transition-colors ${
                      isWishlisted
                        ? 'bg-[#8B1E3F] text-white border-[#8B1E3F]'
                        : 'border-[#C8A96B]/40 text-[#1C1A19] hover:bg-[#FAF7F0]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* View Full Product Page Link */}
                <button
                  onClick={() => {
                    closeQuickView();
                    navigateTo('product', product.slug);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#8B1E3F] hover:text-[#651C32] uppercase tracking-wider"
                >
                  <span>View Full Product Specifications & Care</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#1C1A19]/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8A96B]" />
                  <span>Silk Mark Authenticated • 100% Heirloom Assurance</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
