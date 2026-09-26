import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SAREES_DATA } from '../data/sarees';
import { formatINR } from '../utils/formatters';

const POPULAR_SEARCHES = [
  'Bridal Kanjivaram',
  'Red Banarasi',
  'Champagne Tissue',
  'Pure Organza Sheer',
  'Emerald Green',
  'Real Gold Zari'
];

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useShop();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredSarees = query.trim()
    ? SAREES_DATA.filter((s) => {
        const q = query.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.fabric.toLowerCase().includes(q) ||
          s.color.toLowerCase().includes(q) ||
          s.occasions.some((occ) => occ.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSelectSaree = (slug: string) => {
    setIsSearchOpen(false);
    navigateTo('product', slug);
  };

  const handleSelectKeyword = (keyword: string) => {
    setQuery(keyword);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-[#FAF7F0] rounded-3xl shadow-2xl overflow-hidden border border-[#C8A96B]/30 z-10 text-left"
        >
          {/* Top Search Input Bar */}
          <div className="p-5 sm:p-6 border-b border-[#C8A96B]/25 flex items-center gap-4 bg-[#F2EBDD]">
            <Search className="w-5 h-5 text-[#651C32]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by weave, fabric, color or occasion (e.g. Kanjivaram, Banarasi, Red, Bridal)..."
              className="flex-1 bg-transparent text-sm sm:text-base text-[#1C1A19] placeholder-[#1C1A19]/50 focus:outline-none font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#1C1A19]/50 hover:text-[#1C1A19]"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 rounded-full hover:bg-black/5 text-[#1C1A19] transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
            {/* Popular Searches Pills */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8B1E3F] mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>Popular Searches</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => handleSelectKeyword(keyword)}
                    className="px-3.5 py-1.5 rounded-full bg-[#F2EBDD] hover:bg-[#651C32] hover:text-white text-xs text-[#1C1A19]/80 font-medium transition-colors border border-[#C8A96B]/30"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            {query.trim() && (
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-[#C8A96B]/20 pb-2">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#1C1A19]/70">
                    Results ({filteredSarees.length})
                  </p>
                  {filteredSarees.length > 0 && (
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateTo('catalog');
                      }}
                      className="text-xs font-semibold text-[#8B1E3F] hover:underline"
                    >
                      View in catalog
                    </button>
                  )}
                </div>

                {filteredSarees.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="font-serif text-xl font-light text-[#651C32]">
                      No sarees matching "{query}"
                    </p>
                    <p className="text-xs text-[#1C1A19]/60 mt-1">
                      Try searching by fabric like "Katan Silk", "Organza" or occasion like "Bridal".
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredSarees.map((saree) => (
                      <div
                        key={saree.id}
                        onClick={() => handleSelectSaree(saree.slug)}
                        className="group flex items-center gap-3.5 p-3 rounded-2xl bg-[#F2EBDD]/60 hover:bg-[#F2EBDD] border border-[#C8A96B]/25 hover:border-[#651C32] transition-colors cursor-pointer"
                      >
                        <div className="w-16 h-20 rounded-xl overflow-hidden bg-white shrink-0">
                          <img
                            src={saree.images[0]}
                            alt={saree.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase font-semibold text-[#8B1E3F]">
                            {saree.category}
                          </span>
                          <h5 className="font-serif text-sm font-medium text-[#1C1A19] group-hover:text-[#651C32] truncate">
                            {saree.name}
                          </h5>
                          <p className="text-xs text-[#1C1A19]/60 truncate">{saree.fabric}</p>
                          <p className="font-serif text-sm font-bold text-[#651C32] mt-1">
                            {formatINR(saree.price)}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#C8A96B] group-hover:text-[#651C32] group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
