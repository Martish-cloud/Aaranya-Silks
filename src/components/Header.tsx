import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA } from '../data/sarees';

export const Header: React.FC = () => {
  const {
    cartTotalCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    navigateTo,
    activePage
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkHero = activePage === 'home' && !isScrolled;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF7F0]/95 backdrop-blur-md shadow-sm border-b border-[#C8A96B]/20 py-3'
            : 'bg-transparent py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu Toggle & Desktop Quick Links */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`p-2 rounded-full transition-colors ${
                  isDarkHero ? 'text-[#FAF7F0] hover:bg-white/10' : 'text-[#1C1A19] hover:bg-black/5'
                }`}
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-colors ${
                  isDarkHero ? 'text-[#FAF7F0] hover:bg-white/10' : 'text-[#1C1A19] hover:bg-black/5'
                }`}
                aria-label="Search sarees"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Brand Logo */}
            <div className="flex-1 lg:flex-none flex items-center justify-center lg:justify-start">
              <button
                onClick={() => navigateTo('home')}
                className="group flex flex-col items-center lg:items-start text-center focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  {/* Subtle luxury lotus / loom emblem */}
                  <svg 
                    viewBox="0 0 40 40" 
                    className={`w-6 h-6 transition-transform duration-500 group-hover:rotate-12 ${
                      isDarkHero ? 'text-[#C8A96B]' : 'text-[#651C32]'
                    }`}
                    fill="currentColor"
                  >
                    <path d="M20 2C20.5 8 23 13 28 17C23 18 20 23 20 30C20 23 17 18 12 17C17 13 19.5 8 20 2Z" fill="currentColor" opacity="0.9" />
                    <circle cx="20" cy="34" r="2" fill="#C8A96B" />
                    <circle cx="6" cy="20" r="1.5" fill="#C8A96B" />
                    <circle cx="34" cy="20" r="1.5" fill="#C8A96B" />
                  </svg>
                  
                  <span
                    className={`font-serif tracking-[0.22em] text-lg sm:text-2xl font-bold uppercase transition-colors duration-300 ${
                      isDarkHero ? 'text-[#FAF7F0]' : 'text-[#651C32]'
                    }`}
                  >
                    Aaranya Silks
                  </span>
                </div>
                <span
                  className={`text-[9px] uppercase tracking-[0.35em] mt-0.5 font-sans font-light hidden sm:block ${
                    isDarkHero ? 'text-[#C8A96B]' : 'text-[#8B1E3F]'
                  }`}
                >
                  Elegance Woven in Every Thread
                </span>
              </button>
            </div>

            {/* Center: Desktop Navigation Bar */}
            <nav className="hidden lg:flex items-center space-x-7">
              <button
                onClick={() => navigateTo('catalog', undefined, undefined)}
                className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors hover:text-[#C8A96B] py-2 ${
                  isDarkHero ? 'text-[#FAF7F0]' : 'text-[#1C1A19]'
                }`}
              >
                New Arrivals
              </button>

              <button
                onClick={() => navigateTo('catalog', undefined, undefined)}
                className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors hover:text-[#C8A96B] py-2 ${
                  isDarkHero ? 'text-[#FAF7F0]' : 'text-[#1C1A19]'
                }`}
              >
                Shop All Sarees
              </button>

              {/* Collections Mega Menu Trigger */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('categories')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  onClick={() => navigateTo('catalog')}
                  className={`flex items-center gap-1 text-xs uppercase tracking-[0.16em] font-medium transition-colors hover:text-[#C8A96B] py-2 ${
                    isDarkHero ? 'text-[#FAF7F0]' : 'text-[#1C1A19]'
                  }`}
                >
                  <span>Collections</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                <AnimatePresence>
                  {activeMegaMenu === 'categories' && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-[#FAF7F0] shadow-2xl rounded-2xl border border-[#C8A96B]/30 p-6 grid grid-cols-4 gap-4 z-50 text-left"
                    >
                      {CATEGORIES_DATA.slice(0, 8).map((cat) => (
                        <div
                          key={cat.id}
                          onClick={() => {
                            setActiveMegaMenu(null);
                            navigateTo('catalog', undefined, cat.name);
                          }}
                          className="group/item cursor-pointer p-2 rounded-xl hover:bg-[#F2EBDD] transition-colors"
                        >
                          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-2 bg-[#E4D8C3] relative">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          </div>
                          <h4 className="font-serif font-semibold text-sm text-[#651C32] group-hover/item:text-[#8B1E3F]">
                            {cat.name}
                          </h4>
                          <p className="text-[11px] text-[#1C1A19]/60 line-clamp-1">
                            {cat.highlight}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => navigateTo('catalog', undefined, 'Silk Sarees')}
                className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors hover:text-[#C8A96B] py-2 ${
                  isDarkHero ? 'text-[#FAF7F0]' : 'text-[#1C1A19]'
                }`}
              >
                Silk Sarees
              </button>

              <button
                onClick={() => navigateTo('catalog', undefined, 'Banarasi Sarees')}
                className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors hover:text-[#C8A96B] py-2 ${
                  isDarkHero ? 'text-[#FAF7F0]' : 'text-[#1C1A19]'
                }`}
              >
                Banarasi Sarees
              </button>

              <button
                onClick={() => navigateTo('catalog', undefined, 'Bridal Sarees')}
                className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors hover:text-[#C8A96B] py-2 ${
                  isDarkHero ? 'text-[#FAF7F0]' : 'text-[#1C1A19]'
                }`}
              >
                Bridal Edit
              </button>

              <button
                onClick={() => navigateTo('story')}
                className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors hover:text-[#C8A96B] py-2 ${
                  isDarkHero ? 'text-[#FAF7F0]' : 'text-[#1C1A19]'
                }`}
              >
                Our Story
              </button>
            </nav>

            {/* Right: Actions (Search, Wishlist, Shopping Bag) */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`hidden lg:flex items-center gap-1.5 p-2 rounded-full transition-colors ${
                  isDarkHero ? 'text-[#FAF7F0] hover:text-[#C8A96B]' : 'text-[#1C1A19] hover:text-[#651C32]'
                }`}
                aria-label="Search catalog"
              >
                <Search className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-light">Search</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className={`relative p-2 rounded-full transition-colors ${
                  isDarkHero ? 'text-[#FAF7F0] hover:text-[#C8A96B]' : 'text-[#1C1A19] hover:text-[#651C32]'
                }`}
                aria-label={`Wishlist with ${wishlist.length} items`}
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#8B1E3F] text-white text-[10px] flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#651C32] text-[#FAF7F0] hover:bg-[#8B1E3F] transition-all duration-300 shadow-md border border-[#C8A96B]/30 hover:border-[#C8A96B]"
                aria-label={`Shopping bag with ${cartTotalCount} items`}
              >
                <ShoppingBag className="w-4 h-4 text-[#C8A96B]" />
                <span className="text-xs font-semibold tracking-wide">
                  {cartTotalCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-[#FAF7F0] z-50 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="p-6 border-b border-[#C8A96B]/25 flex items-center justify-between">
                  <div className="text-left">
                    <span className="font-serif tracking-[0.2em] text-xl font-bold uppercase text-[#651C32]">
                      Aaranya Silks
                    </span>
                    <p className="text-[10px] text-[#8B1E3F] tracking-widest uppercase">
                      Pure Indian Luxury
                    </p>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-black/5 text-[#1C1A19]"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-4 text-left">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('catalog');
                    }}
                    className="w-full text-left font-serif text-lg text-[#1C1A19] hover:text-[#651C32] font-semibold py-1.5 border-b border-black/5 flex items-center justify-between"
                  >
                    <span>New Arrivals</span>
                    <span className="text-[10px] px-2 py-0.5 bg-[#8B1E3F] text-white rounded-full">New</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('catalog');
                    }}
                    className="w-full text-left font-serif text-lg text-[#1C1A19] hover:text-[#651C32] font-semibold py-1.5 border-b border-black/5"
                  >
                    Shop All Sarees
                  </button>

                  <div className="pt-2">
                    <p className="text-[11px] uppercase tracking-widest text-[#C8A96B] font-bold mb-2">
                      Saree Categories
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES_DATA.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            navigateTo('catalog', undefined, cat.name);
                          }}
                          className="text-left text-xs text-[#1C1A19]/80 hover:text-[#651C32] p-2 bg-[#F2EBDD] rounded-lg transition-colors font-medium"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('story');
                    }}
                    className="w-full text-left font-serif text-lg text-[#1C1A19] hover:text-[#651C32] font-semibold py-2 border-b border-black/5"
                  >
                    Our Story & Heritage
                  </button>
                </div>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="p-6 bg-[#F2EBDD] border-t border-[#C8A96B]/25">
                <p className="text-xs text-[#1C1A19]/70 mb-3 text-center">
                  Need personalized bridal styling assistance?
                </p>
                <a
                  href="tel:+919876543210"
                  className="block text-center w-full py-2.5 bg-[#651C32] text-white font-medium text-xs tracking-wider uppercase rounded-xl shadow hover:bg-[#8B1E3F] transition-colors"
                >
                  Speak with a Saree Stylist
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
