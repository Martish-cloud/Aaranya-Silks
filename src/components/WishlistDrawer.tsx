import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SAREES_DATA } from '../data/sarees';
import { formatINR } from '../utils/formatters';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    navigateTo
  } = useShop();

  const wishlistedSarees = SAREES_DATA.filter((s) => wishlist.includes(s.id));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[#FAF7F0] z-50 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#C8A96B]/25 flex items-center justify-between bg-[#F2EBDD]">
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-[#8B1E3F] fill-current" />
                <h3 className="font-serif text-xl font-bold text-[#651C32]">
                  Your Wishlist
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#8B1E3F] text-white text-[11px] font-semibold">
                  {wishlistedSarees.length}
                </span>
              </div>

              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 text-[#1C1A19] transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Saree Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-left">
              {wishlistedSarees.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F2EBDD] text-[#8B1E3F] flex items-center justify-center mx-auto">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-light text-[#651C32]">
                    No sarees saved yet
                  </h4>
                  <p className="text-xs text-[#1C1A19]/60 max-w-xs mx-auto">
                    Click the heart icon on any saree to save it for your special occasions.
                  </p>
                  <button
                    onClick={() => {
                      setIsWishlistOpen(false);
                      navigateTo('catalog');
                    }}
                    className="px-6 py-3 rounded-full bg-[#651C32] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#8B1E3F] transition-colors"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                wishlistedSarees.map((saree) => (
                  <div
                    key={saree.id}
                    className="flex gap-4 p-3.5 rounded-2xl bg-[#F2EBDD]/60 border border-[#C8A96B]/25 hover:border-[#651C32] transition-colors"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        setIsWishlistOpen(false);
                        navigateTo('product', saree.slug);
                      }}
                      className="w-20 h-28 rounded-xl overflow-hidden bg-white shrink-0 cursor-pointer border border-[#C8A96B]/20"
                    >
                      <img
                        src={saree.images[0]}
                        alt={saree.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4
                            onClick={() => {
                              setIsWishlistOpen(false);
                              navigateTo('product', saree.slug);
                            }}
                            className="font-serif text-sm font-semibold text-[#1C1A19] line-clamp-1 cursor-pointer hover:text-[#651C32]"
                          >
                            {saree.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(saree.id)}
                            className="text-[#1C1A19]/40 hover:text-rose-600 transition-colors p-1"
                            aria-label="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] text-[#8B1E3F] font-semibold uppercase tracking-wider">
                          {saree.category}
                        </p>
                        <p className="text-xs text-[#1C1A19]/60 font-light truncate">
                          {saree.fabric}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-serif text-base font-bold text-[#651C32]">
                          {formatINR(saree.price)}
                        </span>

                        <button
                          onClick={() => {
                            addToCart(saree, saree.color, 1);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow"
                        >
                          <ShoppingBag className="w-3 h-3 text-[#C8A96B]" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Actions */}
            {wishlistedSarees.length > 0 && (
              <div className="p-5 bg-[#F2EBDD] border-t border-[#C8A96B]/25 text-center">
                <button
                  onClick={() => {
                    wishlistedSarees.forEach((s) => addToCart(s, s.color, 1));
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#FAF7F0] hover:bg-[#651C32] text-[#651C32] hover:text-white border border-[#651C32] text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <span>Move All to Shopping Bag</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
