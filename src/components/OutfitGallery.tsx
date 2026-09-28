import React, { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Eye,
  ShoppingBag,
  Sparkles,
  Layers,
  Star,
  Check,
  ChevronRight,
  Filter,
  Info
} from 'lucide-react';
import {
  OUTFITS_DATA,
  OUTFIT_CATEGORIES,
  outfitToSaree,
  DUPLICATE_IMAGES_AUDIT,
  type OutfitProduct
} from '../data/outfits';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatters';
import { WipeText } from './WipeText';
import userProductImage from '../assets/user-product-image.png';

interface OutfitCardProps {
  outfit: OutfitProduct;
  index: number;
  onQuickView: (outfit: OutfitProduct) => void;
  onAddToCart: (outfit: OutfitProduct) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}

const OutfitCard = memo<OutfitCardProps>(({
  outfit,
  index,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Assign alternating subtle float animations for gentle luxury motion
  const floatClass = index % 3 === 0
    ? 'animate-float-a'
    : index % 3 === 1
      ? 'animate-float-b'
      : 'animate-float-c';

  const currentImage = outfit.gallery[activeAngleIndex] || outfit.image;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(outfit);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(outfit.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: Math.min((index % 8) * 0.05, 0.3) }}
      className={`group relative flex flex-col rounded-2xl bg-white border border-[#C8A96B]/20 shadow-sm hover:shadow-xl hover:shadow-[#651C32]/10 transition-all duration-500 overflow-hidden ${floatClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveAngleIndex(0);
      }}
    >
      {/* 1. Main Image Container */}
      <div
        className="relative w-full aspect-[3/4] bg-[#F2EBDD]/60 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(outfit)}
      >
        <img
          src={currentImage}
          alt={outfit.name}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = userProductImage;
          }}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
        />

        {/* Top Badges */}
        <div className="absolute top-1.5 left-1.5 right-1.5 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#1C1A19]/80 backdrop-blur-md text-[#FAF7F0] border border-[#C8A96B]/30 shadow-sm">
            {outfit.category}
          </span>

          {outfit.discountBadge && (
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-[#651C32] text-[#FAF7F0] shadow-sm ml-auto">
              {outfit.discountBadge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-1.5 right-1.5 sm:top-3 sm:right-3 z-20 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
            isWishlisted
              ? 'bg-[#651C32] text-white'
              : 'bg-white/85 text-[#1C1A19] hover:bg-[#651C32] hover:text-white backdrop-blur-sm'
          }`}
        >
          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Multi-Angle Hover Indicator Dots */}
        {outfit.gallery.length > 1 && (
          <div className="hidden sm:flex absolute bottom-3 left-0 right-0 justify-center items-center gap-1.5 z-10 pointer-events-auto">
            <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md flex items-center gap-1.5 border border-white/20">
              <span className="text-[9px] font-medium text-white/80 mr-0.5">
                {outfit.gallery.length} Angles:
              </span>
              {outfit.gallery.map((_, gIdx) => (
                <button
                  key={gIdx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveAngleIndex(gIdx);
                  }}
                  onMouseEnter={() => setActiveAngleIndex(gIdx)}
                  aria-label={`View angle ${gIdx + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeAngleIndex === gIdx
                      ? 'w-4 bg-[#C8A96B]'
                      : 'bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quick View Overlay Bar */}
        <div
          className={`hidden sm:flex absolute inset-x-0 bottom-0 py-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent items-center justify-center gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(outfit);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/95 text-[#1C1A19] hover:bg-[#C8A96B] hover:text-[#1C1A19] transition-colors shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* 2. Card Content Information */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between bg-white text-left">
        <div>
          {/* Rating & Fabric line */}
          <div className="flex items-center justify-between text-xs text-[#524B48] mb-1">
            <span className="truncate max-w-[80px] sm:max-w-[140px] text-[9px] sm:text-[11px] uppercase tracking-wider font-medium text-[#C8A96B]">
              {outfit.fabric}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-[#C8A96B] text-[#C8A96B]" />
              <span className="font-semibold text-[10px] sm:text-xs text-[#1C1A19]">{outfit.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(outfit)}
            className="font-serif text-xs sm:text-sm lg:text-base text-[#1C1A19] group-hover:text-[#651C32] transition-colors line-clamp-1 cursor-pointer font-medium tracking-tight mb-1 sm:mb-2"
            title={outfit.name}
          >
            {outfit.name}
          </h3>

          {/* Price & Savings */}
          <div className="flex items-baseline gap-1 sm:gap-2 mb-2 sm:mb-3">
            <span className="font-serif font-bold text-xs sm:text-base lg:text-lg text-[#651C32]">
              {formatINR(outfit.price)}
            </span>
            {outfit.originalPrice > outfit.price && (
              <span className="hidden sm:inline-block text-[10px] sm:text-xs text-[#524B48]/60 line-through">
                {formatINR(outfit.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Action Button: Quick Add */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className={`w-full py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 border ${
            justAdded
              ? 'bg-[#1B4D3E] text-white border-[#1B4D3E]'
              : 'bg-[#FAF7F0] hover:bg-[#651C32] text-[#1C1A19] hover:text-white border-[#C8A96B]/40 hover:border-[#651C32] shadow-sm'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="truncate">Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C8A96B] group-hover:text-white transition-colors" />
              <span className="truncate">Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
});

OutfitCard.displayName = 'OutfitCard';

export const OutfitGallery: React.FC = () => {
  const { openQuickView, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [showAuditInfo, setShowAuditInfo] = useState<boolean>(false);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: OUTFITS_DATA.length };
    OUTFIT_CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = OUTFITS_DATA.filter((o) => o.categorySlug === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filter and sort items
  const filteredOutfits = useMemo(() => {
    let items = activeCategory === 'all'
      ? [...OUTFITS_DATA]
      : OUTFITS_DATA.filter((o) => o.categorySlug === activeCategory);

    if (sortBy === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [activeCategory, sortBy]);

  const handleOpenQuickView = (outfit: OutfitProduct) => {
    const sareeEquivalent = outfitToSaree(outfit);
    openQuickView(sareeEquivalent);
  };

  const handleAddToCart = (outfit: OutfitProduct) => {
    const sareeEquivalent = outfitToSaree(outfit);
    addToCart(sareeEquivalent);
  };

  return (
    <section id="outfit-gallery" className="py-16 sm:py-24 bg-[#FAF7F0] relative overflow-hidden">
      {/* Decorative background watermark */}
      <div className="absolute top-10 right-[-100px] w-96 h-96 rounded-full bg-[#C8A96B]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[-100px] w-96 h-96 rounded-full bg-[#651C32]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Header with Wipe-In Animated Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A96B]/15 border border-[#C8A96B]/30 text-[#651C32] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>All-Inclusive Atelier Archive</span>
          </div>

          <div className="mb-3">
            <WipeText
              as="h2"
              direction="left-to-right"
              duration={0.9}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1A19] font-medium tracking-tight"
            >
              The Complete Outfit Gallery
            </WipeText>
          </div>

          <div className="mb-4">
            <WipeText
              as="p"
              direction="bottom-to-top"
              duration={0.8}
              delay={0.15}
              className="font-script text-2xl sm:text-3xl text-[#C8A96B]"
            >
              From Heirloom Sarees to Contemporary Silhouettes
            </WipeText>
          </div>

          <p className="text-sm sm:text-base text-[#524B48] leading-relaxed">
            Discover every handcrafted silhouette in our wardrobe — from regal Banarasi & Kanjivaram drapes to tailored silk blouses, sculptured babycon mini-dresses, and fusion tops.
          </p>

          {/* Total assets badge */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-[#524B48]/80 font-medium">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>38 Exclusive Designs</span>
            </span>
            <span>•</span>
            <span>101 Verified Gallery Perspectives</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setShowAuditInfo(!showAuditInfo)}
              className="text-[#651C32] hover:text-[#C8A96B] transition-colors underline flex items-center gap-1"
            >
              <Info className="w-3 h-3" />
              <span>Deduplication Report</span>
            </button>
          </div>

          {/* Audit report toggle panel */}
          <AnimatePresence>
            {showAuditInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 text-left p-4 rounded-xl bg-white border border-[#C8A96B]/30 shadow-sm text-xs text-[#524B48] overflow-hidden"
              >
                <div className="font-bold text-[#1C1A19] mb-1 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#1B4D3E]" />
                  Exact Image Organization & Deduplication Audit:
                </div>
                <p className="mb-2">
                  All 103 source images in <code className="bg-[#FAF7F0] px-1 py-0.5 rounded">src/assets/Outfits/</code> are preserved. 101 distinct angles are active across 38 unique designs:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  {DUPLICATE_IMAGES_AUDIT.map((audit, i) => (
                    <li key={i}>
                      <strong>{audit.category}:</strong> {audit.status}
                    </li>
                  ))}
                </ul>
                <div className="text-[11px] text-[#524B48]/70 italic">
                  Multi-angle shots (such as Babycon A-E, Blouse A-F, Kurta A, Saree angles) are grouped into single outfits with interactive angle selectors to prevent repetitive clutter.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. Interactive Category Filter Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#C8A96B]/20 pb-5">
          {/* Category Tabs with smooth layoutId animation */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar flex items-center gap-2 py-1">
            {OUTFIT_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#FAF7F0] shadow-md'
                      : 'bg-white/80 text-[#524B48] hover:text-[#1C1A19] hover:bg-white border border-[#C8A96B]/20'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-[#651C32]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                  <span
                    className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-[#FAF7F0]' : 'bg-[#FAF7F0] text-[#524B48]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <Filter className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span className="text-xs text-[#524B48] font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white text-xs text-[#1C1A19] font-medium border border-[#C8A96B]/30 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#651C32]"
            >
              <option value="featured">Featured Handloom</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* 3. Responsive Outfit Cards Grid: Exactly 6 on Desktop, 3 on Mobile */}
        <motion.div
          layout
          className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-4 lg:gap-4.5"
        >
          <AnimatePresence mode="popLayout">
            {filteredOutfits.map((outfit, index) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                index={index}
                onQuickView={handleOpenQuickView}
                onAddToCart={handleAddToCart}
                onToggleWishlist={toggleWishlist}
                isWishlisted={isInWishlist(outfit.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 4. Bottom View Catalog CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-1 rounded-2xl bg-white border border-[#C8A96B]/30 shadow-md">
            <div className="px-8 py-6 rounded-xl bg-gradient-to-r from-[#FAF7F0] to-[#F2EBDD] flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <div className="text-left">
                <h4 className="font-serif text-xl font-semibold text-[#1C1A19]">
                  Need Custom Tailoring or Private Saree Appointments?
                </h4>
                <p className="text-xs text-[#524B48] mt-1">
                  Our Varanasi & Kanchipuram master drapers provide virtual video consultations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('consultation');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="shrink-0 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#651C32] text-white hover:bg-[#8B1E3F] transition-colors shadow-md flex items-center gap-2"
              >
                <span>Book Consultation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
