import React, { useState, useMemo, memo, useRef, useEffect } from 'react';
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
import { SAREES_DATA } from '../data/sarees';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatters';
import { WipeText } from './WipeText';
import { preloadImages } from '../utils/imagePreloader';
import userProductImage from '../assets/user-product-image.webp';

interface OutfitCardProps {
  outfit: OutfitProduct;
  onCardClick: (outfit: OutfitProduct) => void;
  onQuickView: (outfit: OutfitProduct) => void;
  onAddToCart: (outfit: OutfitProduct) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}

const OutfitCard = memo<OutfitCardProps>(({
  outfit,
  onCardClick,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

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
    <div
      className="group relative flex flex-col rounded-2xl bg-white border border-[#C8A96B]/25 shadow-sm hover:shadow-xl hover:shadow-[#651C32]/10 transition-all duration-300 overflow-hidden w-[125px] sm:w-[140px] md:w-[155px] lg:w-[170px] shrink-0 select-none text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveAngleIndex(0);
      }}
    >
      {/* 1. Main Image Container - Face Fully Visible with object-top */}
      <div
        className="relative w-full aspect-[3/4] bg-[#F2EBDD]/60 overflow-hidden cursor-pointer"
        onClick={() => onCardClick(outfit)}
      >
        <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform">
          {(outfit.gallery.length > 0 ? outfit.gallery : [outfit.image]).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${outfit.name} view ${idx + 1}`}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = userProductImage;
              }}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-in-out will-change-transform ${
                activeAngleIndex === idx ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
              }`}
            />
          ))}
        </div>

        {/* Top Badges */}
        <div className="absolute top-1 left-1 right-1 sm:top-2 sm:left-2 sm:right-2 flex items-center justify-between pointer-events-none z-10">
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full text-[8px] font-semibold tracking-wider uppercase bg-[#1C1A19]/80 backdrop-blur-md text-[#FAF7F0] border border-[#C8A96B]/30 shadow-xs">
            {outfit.category}
          </span>

          {outfit.discountBadge && (
            <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold tracking-wider uppercase bg-[#651C32] text-[#FAF7F0] shadow-xs ml-auto">
              {outfit.discountBadge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-1 right-1 sm:top-2 sm:right-2 z-20 w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer ${
            isWishlisted
              ? 'bg-[#651C32] text-white'
              : 'bg-white/85 text-[#1C1A19] hover:bg-[#651C32] hover:text-white backdrop-blur-sm'
          }`}
        >
          <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Multi-Angle Hover Indicator Dots & Static Views Count */}
        <div className="hidden sm:flex absolute bottom-1.5 left-0 right-0 justify-center items-center gap-1 z-10 pointer-events-auto">
          <div className="px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md flex items-center gap-1 border border-white/20">
            <span className="text-[7.5px] font-medium text-white/80 mr-0.5">
              {outfit.views.toLocaleString()} Views:
            </span>
            {(outfit.gallery.length > 0 ? outfit.gallery : [outfit.image]).map((_, gIdx) => (
              <button
                key={gIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveAngleIndex(gIdx);
                }}
                onMouseEnter={() => setActiveAngleIndex(gIdx)}
                aria-label={`View angle ${gIdx + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeAngleIndex === gIdx
                    ? 'w-3 bg-[#C8A96B]'
                    : 'bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick View Overlay Bar */}
        <div
          className={`hidden sm:flex absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent items-center justify-center gap-1 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(outfit);
            }}
            className="px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-white/90 hover:bg-white text-[#1C1A19] flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
          >
            <Eye className="w-2.5 h-2.5 text-[#651C32]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* 2. Product Meta Info */}
      <div className="p-2 sm:p-2.5 flex flex-col justify-between flex-1 space-y-1">
        <div>
          <div className="flex items-center justify-between text-[8.5px] sm:text-[9.5px] text-[#524B48] mb-0.5">
            <span className="font-medium truncate max-w-[80px] sm:max-w-[95px] text-[#8B1E3F]">{outfit.fabric}</span>
            <div className="flex items-center gap-0.5 text-[#C8A96B]">
              <Star className="w-2.5 h-2.5 fill-current" />
              <span className="font-bold text-[#1C1A19]">{outfit.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => onCardClick(outfit)}
            className="font-serif text-[10.5px] sm:text-xs font-semibold text-[#1C1A19] group-hover:text-[#651C32] transition-colors line-clamp-1 cursor-pointer leading-snug"
          >
            {outfit.name}
          </h3>
        </div>

        {/* Pricing & Add to Bag */}
        <div className="pt-1 border-t border-[#C8A96B]/15 flex items-center justify-between gap-1">
          <div>
            <div className="font-serif font-bold text-xs sm:text-[13px] text-[#651C32]">
              {formatINR(outfit.price)}
            </div>
            {outfit.originalPrice && (
              <div className="text-[8.5px] text-[#524B48]/60 line-through">
                {formatINR(outfit.originalPrice)}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label="Add to bag"
            className={`p-1 sm:px-2 sm:py-0.5 rounded-lg text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer shadow-xs ${
              justAdded
                ? 'bg-[#1B4D3E] text-white'
                : 'bg-[#FAF7F0] hover:bg-[#651C32] text-[#651C32] hover:text-white border border-[#651C32]/30'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-2.5 h-2.5 text-white" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-2.5 h-2.5" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

// Single Sliding Row Component with Alternating Direction & Hover Pause
interface SlidingRowProps {
  items: OutfitProduct[];
  direction: 'ltr' | 'rtl';
  rowIndex: number;
  onCardClick: (outfit: OutfitProduct) => void;
  onQuickView: (outfit: OutfitProduct) => void;
  onAddToCart: (outfit: OutfitProduct) => void;
  onToggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const SlidingRow: React.FC<SlidingRowProps> = ({
  items,
  direction,
  rowIndex,
  onCardClick,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}) => {
  const [isRowHovered, setIsRowHovered] = useState(false);

  // Stagger speeds slightly so rows slide organically at improved faster tempo
  const duration = 20 + (rowIndex % 5) * 2;

  // Build repeated array so 50% shift creates a seamless, continuous infinite loop
  const displayItems = useMemo(() => {
    // If fewer than 6 items, repeat items to reach at least 6 per half
    let base = [...items];
    while (base.length < 6) {
      base = [...base, ...items];
    }
    // Duplicate once so second half is identical to first half
    return [...base, ...base];
  }, [items]);

  return (
    <div
      className="relative overflow-hidden w-full py-1 select-none"
      onMouseEnter={() => setIsRowHovered(true)}
      onMouseLeave={() => setIsRowHovered(false)}
    >
      <div
        className="flex items-stretch gap-2 sm:gap-2.5 will-change-transform"
        style={{
          width: 'max-content',
          animation: `${direction === 'ltr' ? 'outfitSlideLTR' : 'outfitSlideRTL'} ${duration}s linear infinite`,
          animationPlayState: isRowHovered ? 'paused' : 'running',
        }}
      >
        {displayItems.map((outfit, idx) => (
          <OutfitCard
            key={`${outfit.id}-r${rowIndex}-${idx}`}
            outfit={outfit}
            onCardClick={onCardClick}
            onQuickView={onQuickView}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={isInWishlist(outfit.id)}
          />
        ))}
      </div>
    </div>
  );
};

export const OutfitGallery: React.FC = () => {
  const { openQuickView, addToCart, isInWishlist, toggleWishlist, navigateTo } = useShop();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [showAuditInfo, setShowAuditInfo] = useState(false);
  const [activeRowSet, setActiveRowSet] = useState<'set1' | 'set2' | 'all'>('set1');
  const sectionRef = useRef<HTMLElement>(null);

  // Predictive preloading for upcoming outfit images as user approaches section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const imgsToPreload = OUTFITS_DATA.slice(0, 8).map((o) => o.image).filter(Boolean);
          preloadImages(imgsToPreload);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    OUTFIT_CATEGORIES.forEach((cat) => {
      if (cat.id === 'all') {
        counts[cat.id] = OUTFITS_DATA.length;
      } else {
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

  // Distribute items evenly across strictly Rows 1–6 without creating an extra 7th row
  const rows = useMemo(() => {
    const numRows = 6;
    const result: OutfitProduct[][] = Array.from({ length: numRows }, () => []);
    filteredOutfits.forEach((item, index) => {
      result[index % numRows].push(item);
    });
    return result;
  }, [filteredOutfits]);

  // Structure 3 rows at a time in view (Set 1: Rows 1-3, Set 2: Rows 4-6, or All 6)
  const visibleRows = useMemo(() => {
    if (activeRowSet === 'set1') return rows.slice(0, 3);
    if (activeRowSet === 'set2') return rows.slice(3, 6);
    return rows.slice(0, 6);
  }, [rows, activeRowSet]);

  const rowStartIndex = activeRowSet === 'set2' ? 3 : 0;

  const handleCardClick = (outfit: OutfitProduct) => {
    const canonical = SAREES_DATA.find(
      (s) => s.slug === outfit.slug || s.id === outfit.id || s.name === outfit.name
    );
    if (canonical) {
      navigateTo('product', canonical.slug);
    } else {
      const sareeEquivalent = outfitToSaree(outfit);
      openQuickView(sareeEquivalent, sareeEquivalent.color);
    }
  };

  const handleOpenQuickView = (outfit: OutfitProduct) => {
    const sareeEquivalent = outfitToSaree(outfit);
    openQuickView(sareeEquivalent, sareeEquivalent.color);
  };

  const handleAddToCart = (outfit: OutfitProduct) => {
    const sareeEquivalent = outfitToSaree(outfit);
    addToCart(sareeEquivalent);
  };

  return (
    <section ref={sectionRef} id="outfit-gallery" className="py-16 sm:py-24 bg-[#FAF7F0] relative overflow-hidden">
      {/* Dynamic Keyframes for Alternating Infinite Sliding Animation */}
      <style>{`
        @keyframes outfitSlideLTR {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0%, 0, 0); }
        }
        @keyframes outfitSlideRTL {
          0% { transform: translate3d(0%, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .outfit-slide-row {
            animation: none !important;
          }
        }
      `}</style>

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
              <span>{OUTFITS_DATA.length} Exclusive Designs</span>
            </span>
            <span>•</span>
            <span>3 Continuous Alternating Rails in View</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setShowAuditInfo(!showAuditInfo)}
              className="text-[#651C32] hover:text-[#C8A96B] transition-colors underline flex items-center gap-1 cursor-pointer"
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
                  All 103 source images in <code className="bg-[#FAF7F0] px-1 py-0.5 rounded">src/assets/Outfits/</code> and <code className="bg-[#FAF7F0] px-1 py-0.5 rounded">Need to Add/</code> are preserved across unique designs:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  {DUPLICATE_IMAGES_AUDIT.map((audit, i) => (
                    <li key={i}>
                      <strong>{audit.category}:</strong> {audit.status}
                    </li>
                  ))}
                </ul>
                <div className="text-[11px] text-[#524B48]/70 italic">
                  Multi-angle shots are grouped into single outfits with interactive angle selectors to prevent repetitive clutter.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. Interactive Category Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#C8A96B]/20 pb-5">
          {/* Category Tabs */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar flex items-center gap-2 py-1">
            {OUTFIT_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
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
              className="bg-white text-xs text-[#1C1A19] font-medium border border-[#C8A96B]/30 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#651C32] cursor-pointer"
            >
              <option value="featured">Featured Handloom</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* 3. 3-Row View Structure Selector (3 Rows at a time in View) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 bg-[#F2EBDD]/60 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl border border-[#C8A96B]/25">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#8B1E3F] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>Viewing:</span>
            </span>
            <span className="text-xs text-[#524B48] font-medium">
              {activeRowSet === 'set1'
                ? 'Rows 1–3 • Signature Handlooms (3 Rows in View)'
                : activeRowSet === 'set2'
                ? 'Rows 4–6 • Atelier & Fusion Curations (3 Rows in View)'
                : 'All 6 Rows • Complete Gallery Archive'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveRowSet('set1')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeRowSet === 'set1'
                  ? 'bg-[#651C32] text-white shadow-sm'
                  : 'bg-white/80 text-[#524B48] hover:text-[#1C1A19] hover:bg-white border border-[#C8A96B]/20'
              }`}
            >
              Rows 1–3
            </button>
            <button
              type="button"
              onClick={() => setActiveRowSet('set2')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeRowSet === 'set2'
                  ? 'bg-[#651C32] text-white shadow-sm'
                  : 'bg-white/80 text-[#524B48] hover:text-[#1C1A19] hover:bg-white border border-[#C8A96B]/20'
              }`}
            >
              Rows 4–6
            </button>
            <button
              type="button"
              onClick={() => setActiveRowSet('all')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeRowSet === 'all'
                  ? 'bg-[#651C32] text-white shadow-sm'
                  : 'bg-white/80 text-[#524B48] hover:text-[#1C1A19] hover:bg-white border border-[#C8A96B]/20'
              }`}
            >
              All 6 Rows
            </button>
          </div>
        </div>

        {/* 4. Alternating Continuous Sliding Rails */}
        <div className="space-y-2.5 sm:space-y-3">
          {visibleRows.map((rowItems, idx) => {
            const actualRowIdx = rowStartIndex + idx;
            // Alternating direction: Row 1 LTR, Row 2 RTL, Row 3 LTR, Row 4 RTL, Row 5 LTR, Row 6 RTL
            const direction = actualRowIdx % 2 === 0 ? 'ltr' : 'rtl';

            return (
              <SlidingRow
                key={`row-${actualRowIdx}-${activeCategory}`}
                items={rowItems}
                direction={direction}
                rowIndex={actualRowIdx}
                onCardClick={handleCardClick}
                onQuickView={handleOpenQuickView}
                onAddToCart={handleAddToCart}
                onToggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist}
              />
            );
          })}
        </div>

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
                className="shrink-0 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#651C32] text-white hover:bg-[#8B1E3F] transition-colors shadow-md flex items-center gap-2 cursor-pointer"
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
