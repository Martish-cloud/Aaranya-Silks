import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles, Truck, User, Package } from 'lucide-react';
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
    activePage,
    openDeliveryChecker,
    setIsAuthOpen,
    user,
    logout,
    setIsOrderHistoryOpen,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Accessibility: Handle clicking outside and pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCollectionsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCollectionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsCollectionsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsCollectionsOpen(false);
    }, 200);
  };

  const handleToggleClick = () => {
    setIsCollectionsOpen(prev => !prev);
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full transition-colors duration-300 bg-black border-b border-[#C8A96B]/25 py-3 shadow-md"
      >
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between gap-1.5 sm:gap-3 lg:gap-4">
            {/* Left: Mobile Menu Toggle & Mobile Search (Visible on tablets and mobile) */}
            <div className="flex items-center gap-1 sm:gap-2 lg:hidden shrink-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-full transition-colors cursor-pointer text-white hover:text-[#C8A96B] hover:bg-white/10"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full transition-colors cursor-pointer text-white hover:text-[#C8A96B] hover:bg-white/10"
                aria-label="Search sarees"
              >
                <Search className="w-5 h-5 text-[#C8A96B]" />
              </button>
            </div>

            {/* Brand Logo (Preserved intact) */}
            <div className="flex-1 lg:flex-none flex items-center justify-center lg:justify-start shrink-0">
              <button
                onClick={() => navigateTo('home')}
                className="group flex flex-col items-center lg:items-start text-center focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Subtle luxury lotus / loom emblem */}
                  <svg 
                    viewBox="0 0 40 40" 
                    className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:rotate-12 shrink-0 text-[#C8A96B]"
                    fill="currentColor"
                  >
                    <path d="M20 2C20.5 8 23 13 28 17C23 18 20 23 20 30C20 23 17 18 12 17C17 13 19.5 8 20 2Z" fill="currentColor" opacity="0.9" />
                    <circle cx="20" cy="34" r="2" fill="#C8A96B" />
                    <circle cx="6" cy="20" r="1.5" fill="#C8A96B" />
                    <circle cx="34" cy="20" r="1.5" fill="#C8A96B" />
                  </svg>
                  
                  <span
                    className="font-serif tracking-[0.16em] sm:tracking-[0.2em] text-base sm:text-lg lg:text-xl xl:text-2xl font-bold uppercase transition-colors duration-300 whitespace-nowrap text-white"
                  >
                    Aaranya Silks
                  </span>
                </div>
                <span
                  className="text-[8px] sm:text-[9px] uppercase tracking-[0.24em] mt-0.5 font-sans font-light hidden sm:block whitespace-nowrap text-[#C8A96B]"
                >
                  Elegance Woven in Every Thread
                </span>
              </button>
            </div>

            {/* Center: Intelligent Responsive Desktop Navigation Bar */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-3.5 shrink-0">
              {/* Primary Direct Link: New Arrivals */}
              <button
                onClick={() => navigateTo('catalog')}
                className="text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.1em] xl:tracking-[0.14em] font-medium transition-colors hover:text-[#C8A96B] py-1.5 px-1.5 xl:px-2 whitespace-nowrap cursor-pointer text-white"
              >
                New Arrivals
              </button>

              {/* Shop All Sarees */}
              <button
                onClick={() => navigateTo('catalog')}
                className="text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.1em] xl:tracking-[0.14em] font-medium transition-colors hover:text-[#C8A96B] py-1.5 px-1.5 xl:px-2 whitespace-nowrap cursor-pointer text-white"
              >
                Shop All Sarees
              </button>

              {/* Interactive Collections & Menu Button */}
              <div 
                ref={dropdownRef}
                className="relative shrink-0"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={handleToggleClick}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggleClick();
                    }
                  }}
                  aria-expanded={isCollectionsOpen}
                  aria-haspopup="true"
                  aria-label="Collections menu"
                  className={`group/col-btn relative px-2.5 xl:px-3 py-1.5 rounded-full border text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.1em] xl:tracking-[0.14em] font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer select-none overflow-hidden shrink-0 ${
                    isCollectionsOpen
                      ? 'border-[#C8A96B] bg-[#C8A96B]/25 text-white shadow-[0_0_18px_rgba(200,169,107,0.35)]'
                      : 'border-white/20 bg-white/[0.06] text-white hover:border-[#C8A96B] hover:bg-[#C8A96B]/15 hover:shadow-[0_0_16px_rgba(200,169,107,0.25)]'
                  }`}
                >
                  {/* Subtle shimmer sweep highlight on hover */}
                  <span
                    className="absolute inset-0 -translate-x-full group-hover/col-btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-[#C8A96B]/35 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Sparkle Icon with graceful rotation & shimmer */}
                  <Sparkles
                    className={`w-3.5 h-3.5 transition-all duration-300 shrink-0 ${
                      isCollectionsOpen
                        ? 'text-[#C8A96B] scale-110 rotate-12 opacity-100'
                        : 'text-[#C8A96B]/80 group-hover/col-btn:text-[#E5B842] group-hover/col-btn:scale-115 group-hover/col-btn:rotate-12 group-hover/col-btn:opacity-100'
                    }`}
                  />

                  <span className="relative z-10 whitespace-nowrap">Collections</span>

                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 shrink-0 ${
                      isCollectionsOpen ? 'rotate-180 text-[#C8A96B]' : 'opacity-70 group-hover/col-btn:opacity-100'
                    }`}
                  />
                </button>

                {/* Dropdown Panel with Smooth Luxury Entrance Animation */}
                <AnimatePresence>
                  {isCollectionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px] sm:w-[420px] max-w-[calc(100vw-2rem)] bg-[#FAF7F0] border border-[#C8A96B]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-4 sm:p-5 z-50 text-left backdrop-blur-md"
                    >
                      {/* Dropdown Header */}
                      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#C8A96B]/25">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8B1E3F]">
                          Curated Collections
                        </span>
                        <span className="text-[10px] text-[#C8A96B] font-medium tracking-wide">
                          Aaranya Silks Atelier
                        </span>
                      </div>

                      {/* Primary Navigation Cards */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Shop All Sarees Banner */}
                        <button
                          onClick={() => {
                            setIsCollectionsOpen(false);
                            navigateTo('catalog');
                          }}
                          className="col-span-2 group/item flex items-center justify-between p-2.5 rounded-xl bg-[#651C32] text-white hover:bg-[#8B1E3F] transition-all shadow-sm cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#E5B842]" />
                            <span className="font-serif text-xs sm:text-sm font-medium tracking-wider uppercase">
                              Shop All Sarees
                            </span>
                          </div>
                          <span className="text-[10px] text-[#FAF7F0]/80 group-hover/item:translate-x-0.5 transition-transform">
                            Full Catalog →
                          </span>
                        </button>

                        {/* Silk Sarees */}
                        <button
                          onClick={() => {
                            setIsCollectionsOpen(false);
                            navigateTo('catalog', undefined, 'Silk Sarees');
                          }}
                          className="group/item flex flex-col items-start p-2.5 rounded-xl bg-white hover:bg-[#F2EBDD] border border-[#C8A96B]/20 transition-all text-left cursor-pointer"
                        >
                          <span className="font-serif text-xs sm:text-sm font-semibold text-[#651C32] group-hover/item:text-[#8B1E3F]">
                            Silk Sarees
                          </span>
                          <span className="text-[10px] text-[#1C1A19]/60 mt-0.5">
                            Pure mulberry drapes
                          </span>
                        </button>

                        {/* Banarasi Sarees */}
                        <button
                          onClick={() => {
                            setIsCollectionsOpen(false);
                            navigateTo('catalog', undefined, 'Banarasi Sarees');
                          }}
                          className="group/item flex flex-col items-start p-2.5 rounded-xl bg-white hover:bg-[#F2EBDD] border border-[#C8A96B]/20 transition-all text-left cursor-pointer"
                        >
                          <span className="font-serif text-xs sm:text-sm font-semibold text-[#651C32] group-hover/item:text-[#8B1E3F]">
                            Banarasi Sarees
                          </span>
                          <span className="text-[10px] text-[#1C1A19]/60 mt-0.5">
                            Kadhwa & brocade gold
                          </span>
                        </button>

                        {/* Bridal Edit */}
                        <button
                          onClick={() => {
                            setIsCollectionsOpen(false);
                            navigateTo('catalog', undefined, 'Bridal Sarees');
                          }}
                          className="group/item flex flex-col items-start p-2.5 rounded-xl bg-white hover:bg-[#F2EBDD] border border-[#C8A96B]/20 transition-all text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5 w-full justify-between">
                            <span className="font-serif text-xs sm:text-sm font-semibold text-[#651C32] group-hover/item:text-[#8B1E3F]">
                              Bridal Edit
                            </span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#8B1E3F]/15 text-[#8B1E3F] font-semibold">
                              Heirloom
                            </span>
                          </div>
                          <span className="text-[10px] text-[#1C1A19]/60 mt-0.5">
                            Muhurtham trousseau
                          </span>
                        </button>

                        {/* Outfit Gallery */}
                        <button
                          onClick={() => {
                            setIsCollectionsOpen(false);
                            if (activePage !== 'home') {
                              navigateTo('home');
                              setTimeout(() => {
                                document.getElementById('outfit-gallery')?.scrollIntoView({ behavior: 'smooth' });
                              }, 100);
                            } else {
                              document.getElementById('outfit-gallery')?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="group/item flex flex-col items-start p-2.5 rounded-xl bg-white hover:bg-[#F2EBDD] border border-[#C8A96B]/20 transition-all text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5 w-full justify-between">
                            <span className="font-serif text-xs sm:text-sm font-semibold text-[#651C32] group-hover/item:text-[#8B1E3F]">
                              Outfit Gallery
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] animate-pulse" />
                          </div>
                          <span className="text-[10px] text-[#1C1A19]/60 mt-0.5">
                            38 Curated looks
                          </span>
                        </button>
                      </div>

                      {/* Heritage Weave Highlights */}
                      <div className="mt-3 pt-3 border-t border-[#C8A96B]/20">
                        <span className="text-[10px] uppercase tracking-wider text-[#C8A96B] font-bold block mb-2">
                          Heritage Weaves
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {CATEGORIES_DATA.slice(0, 6).map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setIsCollectionsOpen(false);
                                navigateTo('catalog', undefined, cat.name);
                              }}
                              className="text-[11px] px-2.5 py-1 rounded-lg bg-white/80 hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19]/80 border border-[#C8A96B]/25 transition-colors font-medium cursor-pointer"
                            >
                              {cat.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Legacy Link */}
                      <div className="mt-3 pt-2.5 border-t border-[#C8A96B]/20 flex items-center justify-between text-xs">
                        <button
                          onClick={() => {
                            setIsCollectionsOpen(false);
                            navigateTo('story');
                          }}
                          className="text-[#651C32] hover:text-[#8B1E3F] font-serif font-semibold tracking-wide hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <span>Our Story & Craft Legacy</span>
                          <span>→</span>
                        </button>
                        <span className="text-[10px] text-[#C8A96B] font-mono tracking-wider">
                          EST. 2026
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bridal Edit: Visible on xl and up (1280px+) */}
              <button
                onClick={() => navigateTo('catalog', undefined, 'Bridal Sarees')}
                className="hidden xl:inline-block text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.1em] xl:tracking-[0.14em] font-medium transition-colors hover:text-[#C8A96B] py-1.5 px-1.5 xl:px-2 whitespace-nowrap cursor-pointer text-white"
              >
                Bridal Edit
              </button>

              {/* Outfit Gallery: Visible on xl and up */}
              <button
                onClick={() => {
                  if (activePage !== 'home') {
                    navigateTo('home');
                    setTimeout(() => {
                      document.getElementById('outfit-gallery')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    document.getElementById('outfit-gallery')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="hidden xl:inline-flex items-center gap-1.5 text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.1em] xl:tracking-[0.14em] font-medium transition-colors hover:text-[#C8A96B] py-1.5 px-1.5 xl:px-2 whitespace-nowrap cursor-pointer text-white"
              >
                <span>Outfit Gallery</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] animate-pulse" />
              </button>

              {/* Our Story: Visible on 2xl screens (1400px+) */}
              <button
                onClick={() => navigateTo('story')}
                className="hidden 2xl:inline-block text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.1em] xl:tracking-[0.14em] font-medium transition-colors hover:text-[#C8A96B] py-1.5 px-1.5 xl:px-2 whitespace-nowrap cursor-pointer text-white"
              >
                Our Story
              </button>
            </nav>

            {/* Right: Actions (Delivery, Search, Account, Wishlist, Shopping Bag) */}
            <div className="flex items-center gap-1 sm:gap-1.5 xl:gap-2 shrink-0">
              {/* Delivery Availability Button */}
              <button
                onClick={() => openDeliveryChecker()}
                className="flex items-center gap-1 px-1.5 sm:px-2 py-1.5 rounded-full transition-colors cursor-pointer text-xs uppercase tracking-wider font-medium shrink-0 text-white hover:text-[#C8A96B]"
                aria-label="Check Delivery Availability"
                title="Check Delivery Availability"
              >
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#C8A96B]" />
                <span className="text-[10px] xl:text-[11px] font-sans font-medium whitespace-nowrap hidden xl:inline text-white">
                  Delivery
                </span>
              </button>

              {/* Desktop Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center gap-1 px-1.5 sm:px-2 py-1.5 rounded-full transition-colors cursor-pointer shrink-0 text-white hover:text-[#C8A96B]"
                aria-label="Search catalog"
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#C8A96B]" />
                <span className="text-[10px] xl:text-[11px] uppercase tracking-wider font-medium whitespace-nowrap hidden 2xl:inline text-white">
                  Search
                </span>
              </button>

              {/* Patron Account / Orders Button */}
              <button
                onClick={() => {
                  if (user) {
                    setIsOrderHistoryOpen(true);
                  } else {
                    setIsAuthOpen(true);
                  }
                }}
                className="flex items-center gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-full transition-colors cursor-pointer text-xs uppercase tracking-wider font-medium shrink-0 text-white hover:text-[#C8A96B]"
                aria-label={user ? 'Patron Orders' : 'Sign In'}
                title={user ? `Signed in as ${user.name}` : 'Patron Account & Orders'}
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#C8A96B]" />
                <span className="text-[10px] xl:text-[11px] font-medium whitespace-nowrap shrink-0 hidden sm:inline-block text-white">
                  {user ? user.name.split(' ')[0] : 'Sign In'}
                </span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer shrink-0 text-white hover:text-[#C8A96B]"
                aria-label={`Wishlist with ${wishlist.length} items`}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#8B1E3F] text-white text-[9px] sm:text-[10px] flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#651C32] text-white hover:bg-[#8B1E3F] transition-all duration-300 shadow-md border border-[#C8A96B]/40 hover:border-[#C8A96B] shrink-0 cursor-pointer"
                aria-label={`Shopping bag with ${cartTotalCount} items`}
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C8A96B] shrink-0" />
                <span className="text-xs font-semibold tracking-wide text-white">
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
                <div className="p-5 sm:p-6 border-b border-[#C8A96B]/25 flex items-center justify-between">
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
                    className="p-2 rounded-full hover:bg-black/5 text-[#1C1A19] cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-5 sm:p-6 space-y-3.5 text-left">
                  {/* New Arrivals */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('catalog');
                    }}
                    className="w-full text-left font-serif text-base sm:text-lg text-[#1C1A19] hover:text-[#651C32] font-semibold py-1.5 border-b border-black/5 flex items-center justify-between cursor-pointer"
                  >
                    <span>New Arrivals</span>
                    <span className="text-[10px] px-2 py-0.5 bg-[#8B1E3F] text-white rounded-full">New</span>
                  </button>

                  {/* Shop All Sarees */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('catalog');
                    }}
                    className="w-full text-left font-serif text-base sm:text-lg text-[#1C1A19] hover:text-[#651C32] font-semibold py-1.5 border-b border-black/5 cursor-pointer"
                  >
                    Shop All Sarees
                  </button>

                  {/* Silk Sarees */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('catalog', undefined, 'Silk Sarees');
                    }}
                    className="w-full text-left font-serif text-base sm:text-lg text-[#1C1A19] hover:text-[#651C32] font-semibold py-1.5 border-b border-black/5 flex items-center justify-between cursor-pointer"
                  >
                    <span>Silk Sarees</span>
                    <span className="text-[10px] text-[#C8A96B] font-sans uppercase tracking-wider">Pure Silk</span>
                  </button>

                  {/* Banarasi Sarees */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('catalog', undefined, 'Banarasi Sarees');
                    }}
                    className="w-full text-left font-serif text-base sm:text-lg text-[#1C1A19] hover:text-[#651C32] font-semibold py-1.5 border-b border-black/5 flex items-center justify-between cursor-pointer"
                  >
                    <span>Banarasi Sarees</span>
                    <span className="text-[10px] text-[#C8A96B] font-sans uppercase tracking-wider">Kadhwa Zari</span>
                  </button>

                  {/* Bridal Edit */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('catalog', undefined, 'Bridal Sarees');
                    }}
                    className="w-full text-left font-serif text-base sm:text-lg text-[#1C1A19] hover:text-[#651C32] font-semibold py-1.5 border-b border-black/5 flex items-center justify-between cursor-pointer"
                  >
                    <span>Bridal Edit</span>
                    <span className="text-[10px] px-2 py-0.5 bg-[#651C32] text-white rounded-full">Heirloom</span>
                  </button>

                  {/* Outfit Gallery */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (activePage !== 'home') {
                        navigateTo('home');
                        setTimeout(() => {
                          document.getElementById('outfit-gallery')?.scrollIntoView({ behavior: 'smooth' });
                        }, 150);
                      } else {
                        document.getElementById('outfit-gallery')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full text-left font-serif text-base sm:text-lg text-[#1C1A19] hover:text-[#651C32] font-semibold py-1.5 border-b border-black/5 flex items-center justify-between cursor-pointer"
                  >
                    <span>Outfit Gallery</span>
                    <span className="text-[10px] px-2 py-0.5 bg-[#8B1E3F] text-white rounded-full">38 Looks</span>
                  </button>

                  {/* Saree Categories Grid */}
                  <div className="pt-2">
                    <p className="text-[11px] uppercase tracking-widest text-[#C8A96B] font-bold mb-2">
                      Saree Weaves & Collections
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES_DATA.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            navigateTo('catalog', undefined, cat.name);
                          }}
                          className="text-left text-xs text-[#1C1A19]/80 hover:text-[#651C32] p-2 bg-[#F2EBDD] rounded-lg transition-colors font-medium cursor-pointer"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Check Delivery Availability */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openDeliveryChecker();
                    }}
                    className="w-full text-left font-serif text-base text-[#1C1A19] hover:text-[#651C32] font-semibold py-2 border-b border-black/5 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#8B1E3F]" />
                      <span>Check Delivery Availability</span>
                    </span>
                    <span className="text-[10px] text-[#C8A96B] font-mono">Pincode Check</span>
                  </button>

                  {/* My Orders & Tracking */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsOrderHistoryOpen(true);
                    }}
                    className="w-full text-left font-serif text-base text-[#1C1A19] hover:text-[#651C32] font-semibold py-2 border-b border-black/5 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#8B1E3F]" />
                      <span>My Orders & Tracking</span>
                    </span>
                    <span className="text-[10px] text-[#8B1E3F] font-semibold">Active Orders</span>
                  </button>

                  {/* Your Shopping Bag */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="w-full text-left font-serif text-base text-[#1C1A19] hover:text-[#651C32] font-semibold py-2 border-b border-black/5 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#8B1E3F]" />
                      <span>Your Shopping Bag</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#651C32] text-white font-semibold">
                      {cartTotalCount} items
                    </span>
                  </button>

                  {/* Patron Account Access */}
                  <div className="pt-2">
                    {user ? (
                      <div className="p-3 rounded-xl bg-white border border-[#C8A96B]/30 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-[#651C32]">{user.name}</p>
                          <p className="text-[10px] text-[#1C1A19]/60">{user.email || user.phone}</p>
                        </div>
                        <button
                          onClick={() => {
                            logout();
                            setMobileMenuOpen(false);
                          }}
                          className="text-[11px] text-[#8B1E3F] hover:underline font-semibold"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setIsAuthOpen(true);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-[#C8A96B]/40 text-[#651C32] text-xs font-semibold uppercase tracking-wider shadow-2xs hover:bg-[#FAF7F0] cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>Patron Sign In / OTP Access</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="p-5 sm:p-6 bg-[#F2EBDD] border-t border-[#C8A96B]/25">
                <p className="text-xs text-[#1C1A19]/70 mb-3 text-center">
                  Need personalized bridal styling assistance?
                </p>
                <a
                  href="tel:+919876543210"
                  className="block text-center w-full py-2.5 bg-[#651C32] text-white font-medium text-xs tracking-wider uppercase rounded-xl shadow hover:bg-[#8B1E3F] transition-colors cursor-pointer"
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
