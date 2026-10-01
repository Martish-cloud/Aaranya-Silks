import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import type { Saree } from '../types';
import userProductImage from '../assets/user-product-image.png';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatters';

interface ProductCardProps {
  product: Saree;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    isInWishlist,
    toggleWishlist,
    addToCart,
    openQuickView,
    navigateTo
  } = useShop();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const activeColor = product.colors[selectedColorIdx] || {
    name: product.color,
    hex: '#8B1E3F',
    image: product.images[0]
  };

  const primaryImage = activeColor.image || product.images[0];
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = (e: React.MouseEvent) => {
    // Check if target is not a button or action
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      navigateTo('product', product.slug, undefined, activeColor.name);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.08 }}
      transition={{ duration: 0.45 }}
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col h-full bg-[#FAF7F0] rounded-2xl overflow-hidden border border-[#C8A96B]/20 hover:border-[#C8A96B]/60 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Product Image Stage */}
      <div className="relative w-full aspect-[3/4] bg-[#F2EBDD] overflow-hidden">
        {/* Primary Image - Consistent Source of Truth */}
        <img
          src={primaryImage}
          alt={`${product.name} - ${activeColor.name}`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = userProductImage;
          }}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full bg-[#651C32] text-[#FAF7F0] text-[10px] uppercase font-bold tracking-wider shadow-md">
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
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-2 sm:p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-md ${
            isWishlisted
              ? 'bg-[#8B1E3F] text-white scale-110'
              : 'bg-[#FAF7F0]/85 text-[#1C1A19] hover:bg-[#FAF7F0] hover:text-[#8B1E3F]'
          }`}
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Actions Floating Tray on Desktop Hover */}
        <div className="absolute bottom-2.5 inset-x-2.5 z-10 hidden sm:flex items-center gap-1.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product, activeColor.name);
            }}
            className="flex-1 flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-[#FAF7F0]/95 backdrop-blur-md text-[#1C1A19] hover:text-[#651C32] text-[10px] sm:text-xs font-semibold uppercase tracking-wider shadow-lg border border-[#C8A96B]/30 hover:border-[#651C32] transition-colors"
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C8A96B]" />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, activeColor.name, 1);
            }}
            className="flex items-center justify-center p-2 rounded-xl bg-[#651C32] hover:bg-[#8B1E3F] text-white shadow-lg transition-colors border border-[#C8A96B]/30"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C8A96B]" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4 xl:p-3 2xl:p-3.5 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#1C1A19]/60 mb-1.5">
            <span className="uppercase tracking-wider font-medium text-[11px] text-[#8B1E3F]">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-[#C8A96B] fill-current" />
              <span className="text-[11px] font-semibold text-[#1C1A19]">
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Saree Name */}
          <h3 className="font-serif text-base sm:text-lg font-medium text-[#1C1A19] group-hover:text-[#651C32] transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Fabric Specification */}
          <p className="text-xs text-[#1C1A19]/65 font-light line-clamp-1 mb-3">
            {product.fabric} • {product.zariType}
          </p>
        </div>

        {/* Pricing & Color Swatches */}
        <div>
          {/* Swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mb-3">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorIdx(i);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColorIdx === i
                      ? 'ring-2 ring-[#651C32] ring-offset-1 scale-110'
                      : 'border-black/20 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={`Select color ${c.name}`}
                />
              ))}
              <span className="text-[10px] text-[#1C1A19]/50 ml-1">
                {product.colors.length} shades
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1 border-t border-[#C8A96B]/20">
            <span className="font-serif text-lg sm:text-xl font-bold text-[#651C32]">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#1C1A19]/50 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Quick Add Button */}
        <div className="mt-3 sm:hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, activeColor.name, 1);
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#651C32] text-white text-xs font-semibold uppercase tracking-wider"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
