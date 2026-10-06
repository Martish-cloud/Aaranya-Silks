import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, Sparkles, RotateCcw } from 'lucide-react';
import { SAREES_DATA, CATEGORIES_DATA } from '../data/sarees';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatters';

const FABRICS = [
  'Pure Katan Silk',
  'Kanjivaram Silk',
  'Banarasi Brocade',
  'Pure Organza',
  'Chanderi Silk',
  'Tussar Georgette',
  'Tissue Silk'
];

const OCCASIONS = [
  'Bridal',
  'Wedding Guest',
  'Festive',
  'Reception',
  'Cocktail',
  'Puja & Rituals'
];

const COLORS = [
  { name: 'Crimson Red', hex: '#8B1E3F' },
  { name: 'Wine Plum', hex: '#651C32' },
  { name: 'Champagne Gold', hex: '#C8A96B' },
  { name: 'Warm Ivory', hex: '#FAF7F0' },
  { name: 'Emerald Green', hex: '#1B4D3E' },
  { name: 'Rani Pink', hex: '#A52B50' },
  { name: 'Midnight Blue', hex: '#1C2841' },
  { name: 'Charcoal Black', hex: '#1C1A19' }
];

export const CatalogPage: React.FC = () => {
  const { currentCategoryFilter, setCurrentCategoryFilter } = useShop();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(28000);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Toggle helpers
  const toggleFabric = (fabric: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleOccasion = (occ: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
  };

  const resetFilters = () => {
    setCurrentCategoryFilter(null);
    setSelectedFabrics([]);
    setSelectedColors([]);
    setSelectedOccasions([]);
    setMaxPrice(28000);
  };

  // Filter & Sort Logic
  const filteredSarees = useMemo(() => {
    return SAREES_DATA.filter((saree) => {
      // Category filter
      if (currentCategoryFilter && saree.category !== currentCategoryFilter) {
        return false;
      }
      // Fabric filter
      if (selectedFabrics.length > 0 && !selectedFabrics.includes(saree.fabric)) {
        return false;
      }
      // Color filter
      if (selectedColors.length > 0) {
        const matchesColor = selectedColors.some(
          (c) => saree.color.toLowerCase().includes(c.toLowerCase()) ||
                 saree.colors.some((sc) => sc.name.toLowerCase().includes(c.toLowerCase()))
        );
        if (!matchesColor) return false;
      }
      // Occasion filter
      if (selectedOccasions.length > 0) {
        const matchesOccasion = selectedOccasions.some((occ) =>
          saree.occasions.includes(occ as any)
        );
        if (!matchesOccasion) return false;
      }
      // Price filter
      if (saree.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.badge === 'New Arrival' ? 1 : 0) - (a.badge === 'New Arrival' ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [currentCategoryFilter, selectedFabrics, selectedColors, selectedOccasions, maxPrice, sortBy]);

  const activeFiltersCount =
    (currentCategoryFilter ? 1 : 0) +
    selectedFabrics.length +
    selectedColors.length +
    selectedOccasions.length +
    (maxPrice < 28000 ? 1 : 0);

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl 2xl:max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[#8B1E3F] text-xs font-semibold uppercase tracking-[0.25em] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>Complete Catalogue</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#651C32] tracking-tight mb-3">
            {currentCategoryFilter || 'Shop All Sarees'}
          </h1>

          <p className="text-sm sm:text-base text-[#1C1A19]/70 font-light max-w-xl mx-auto">
            Explore authentic handlooms, pure mulberry silks, and certified gold zari weaves designed for timeless Indian ceremonies.
          </p>
        </div>

        {/* Category Horizontal Quick Filter Strip */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          <button
            onClick={() => setCurrentCategoryFilter(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
              currentCategoryFilter === null
                ? 'bg-[#651C32] text-white shadow-sm'
                : 'bg-[#F2EBDD] text-[#1C1A19]/70 hover:bg-[#FAF7F0]'
            }`}
          >
            All Collections
          </button>
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCurrentCategoryFilter(cat.name)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
                currentCategoryFilter === cat.name
                  ? 'bg-[#651C32] text-white shadow-sm'
                  : 'bg-[#F2EBDD] text-[#1C1A19]/70 hover:bg-[#FAF7F0]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Control Bar: Count, Mobile Filter Trigger, Sort Select */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#C8A96B]/20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F2EBDD] text-[#651C32] text-xs font-semibold uppercase tracking-wider"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            <span className="text-xs text-[#1C1A19]/70 font-light">
              Showing <strong>{filteredSarees.length}</strong> creations
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#1C1A19]/60 hidden sm:inline">Sort By:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-[#F2EBDD] border border-[#C8A96B]/30 text-xs font-semibold text-[#651C32] focus:outline-none focus:border-[#651C32] cursor-pointer"
              >
                <option value="featured">Featured Collections</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Patron Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#651C32] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filter Pill Tags */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 text-left">
            <span className="text-xs text-[#1C1A19]/60">Active Filters:</span>
            {currentCategoryFilter && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#651C32] text-white text-xs">
                <span>{currentCategoryFilter}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setCurrentCategoryFilter(null)} />
              </span>
            )}
            {selectedFabrics.map((f) => (
              <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1E3F] text-white text-xs">
                <span>{f}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleFabric(f)} />
              </span>
            ))}
            {selectedColors.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8A96B] text-[#1C1A19] font-medium text-xs">
                <span>{c}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleColor(c)} />
              </span>
            ))}
            {selectedOccasions.map((o) => (
              <span key={o} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1A19] text-white text-xs">
                <span>{o}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleOccasion(o)} />
              </span>
            ))}
            <button
              onClick={resetFilters}
              className="text-xs text-[#8B1E3F] hover:underline font-semibold flex items-center gap-1 ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Main Grid & Desktop Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 bg-[#F2EBDD] p-6 rounded-3xl border border-[#C8A96B]/25 text-left space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#C8A96B]/25">
              <h3 className="font-serif text-lg font-bold text-[#651C32]">Refine Sarees</h3>
              {activeFiltersCount > 0 && (
                <button onClick={resetFilters} className="text-xs text-[#8B1E3F] hover:underline">
                  Clear All
                </button>
              )}
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-[#1C1A19]/80 uppercase tracking-wider">Max Price</span>
                <span className="text-[#651C32] font-bold">{formatINR(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="28000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#651C32] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#1C1A19]/50 mt-1">
                <span>₹2,000</span>
                <span>₹28,000</span>
              </div>
            </div>

            {/* Fabric */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8B1E3F]">
                Silk Fabric & Weave
              </h4>
              <div className="space-y-1.5 text-xs text-[#1C1A19]/80">
                {FABRICS.map((fabric) => (
                  <label key={fabric} className="flex items-center gap-2 cursor-pointer hover:text-[#651C32]">
                    <input
                      type="checkbox"
                      checked={selectedFabrics.includes(fabric)}
                      onChange={() => toggleFabric(fabric)}
                      className="accent-[#651C32] rounded"
                    />
                    <span>{fabric}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8B1E3F]">
                Color Palette
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#1C1A19]/80">
                {COLORS.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => toggleColor(col.name)}
                    className={`flex items-center gap-1.5 p-1.5 rounded-lg border transition-all text-left ${
                      selectedColors.includes(col.name)
                        ? 'border-[#651C32] bg-[#FAF7F0] font-semibold text-[#651C32]'
                        : 'border-transparent hover:bg-[#FAF7F0]'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: col.hex }} />
                    <span className="truncate text-[11px]">{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8B1E3F]">
                Occasion
              </h4>
              <div className="space-y-1.5 text-xs text-[#1C1A19]/80">
                {OCCASIONS.map((occ) => (
                  <label key={occ} className="flex items-center gap-2 cursor-pointer hover:text-[#651C32]">
                    <input
                      type="checkbox"
                      checked={selectedOccasions.includes(occ)}
                      onChange={() => toggleOccasion(occ)}
                      className="accent-[#651C32] rounded"
                    />
                    <span>{occ}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid Area (9 cols on lg) */}
          <div className="lg:col-span-9">
            {filteredSarees.length === 0 ? (
              <div className="text-center py-20 p-8 rounded-3xl bg-[#F2EBDD] border border-[#C8A96B]/25">
                <Sparkles className="w-10 h-10 text-[#C8A96B] mx-auto mb-3" />
                <h3 className="font-serif text-2xl font-light text-[#651C32]">
                  No sarees match these filters
                </h3>
                <p className="text-xs text-[#1C1A19]/70 mt-1 max-w-sm mx-auto">
                  Try adjusting your price range or selected color shades to discover more handlooms.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#651C32] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#8B1E3F]"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
                {filteredSarees.map((saree, idx) => (
                  <ProductCard
                    key={saree.id}
                    product={saree}
                    index={idx}
                    priority={idx < 4}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-[#FAF7F0] rounded-t-3xl z-50 p-6 shadow-2xl overflow-y-auto text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#C8A96B]/25 mb-5">
                  <h3 className="font-serif text-xl font-bold text-[#651C32]">Filter Sarees</h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                    <X className="w-5 h-5 text-[#1C1A19]" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Price */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider block mb-2">
                      Max Price: {formatINR(maxPrice)}
                    </span>
                    <input
                      type="range"
                      min="2000"
                      max="28000"
                      step="500"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[#651C32]"
                    />
                  </div>

                  {/* Fabrics */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#8B1E3F] block mb-2">
                      Fabrics
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {FABRICS.map((fabric) => (
                        <label key={fabric} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedFabrics.includes(fabric)}
                            onChange={() => toggleFabric(fabric)}
                            className="accent-[#651C32]"
                          />
                          <span>{fabric}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#8B1E3F] block mb-2">
                      Colors
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {COLORS.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => toggleColor(col.name)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs ${
                            selectedColors.includes(col.name)
                              ? 'border-[#651C32] bg-[#FAF7F0] text-[#651C32] font-semibold'
                              : 'border-black/20'
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: col.hex }} />
                          <span>{col.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#C8A96B]/25 mt-6 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-3 rounded-full bg-[#F2EBDD] text-[#1C1A19] text-xs font-semibold uppercase tracking-wider"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 rounded-full bg-[#651C32] text-white text-xs font-semibold uppercase tracking-wider shadow"
                >
                  Apply Filters ({filteredSarees.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
