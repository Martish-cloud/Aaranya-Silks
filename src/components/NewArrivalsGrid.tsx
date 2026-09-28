import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SAREES_DATA } from '../data/sarees';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { WipeText } from './WipeText';

const TABS = ['All Arrivals', 'Bridal Sarees', 'Banarasi Sarees', 'Silk Sarees', 'Organza Sarees'];

export const NewArrivalsGrid: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState('All Arrivals');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const markUserInteraction = () => {
    setIsUserInteracting(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 4000);
  };

  const filteredProducts = SAREES_DATA.filter((item) => {
    if (activeTab === 'All Arrivals') return true;
    return item.category === activeTab;
  });

  // Ensure minimum items for continuous smooth auto-sliding loop
  const baseItems = filteredProducts.length >= 4 ? filteredProducts : SAREES_DATA.slice(0, 6);
  const DISPLAY_PRODUCTS = [...baseItems, ...baseItems];

  // Slow, continuous horizontal auto-sliding moving from left to right
  useEffect(() => {
    const rail = scrollRef.current;
    if (!rail) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    if (rail.scrollLeft === 0 && rail.scrollWidth > 0) {
      rail.scrollLeft = rail.scrollWidth / 2;
    }

    let animationFrameId: number;
    const speed = 0.65; // slow, smooth left-to-right velocity

    const scrollLoop = () => {
      if (!isHovered && !isUserInteracting && rail) {
        rail.scrollLeft -= speed; // moves cards from left to right
        const halfWidth = rail.scrollWidth / 2;
        if (rail.scrollLeft <= 0) {
          rail.scrollLeft += halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    };
  }, [isHovered, isUserInteracting, activeTab]);

  const handleScroll = (direction: 'left' | 'right') => {
    markUserInteraction();
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="new-arrivals"
      className="py-20 md:py-28 bg-[#FAF7F0] relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#8B1E3F] text-xs font-semibold uppercase tracking-[0.25em] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>Freshly Unveiled</span>
            </div>

            <WipeText
              as="h2"
              direction="bottom-to-top"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#651C32] tracking-tight"
            >
              New Arrivals
            </WipeText>

            <p className="text-sm sm:text-base text-[#1C1A19]/70 font-light mt-2">
              Discover the latest expressions of timeless elegance, woven for this festive and wedding season.
            </p>
          </div>

          {/* Navigation arrow controls */}
          <div className="hidden sm:flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-3 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                markUserInteraction();
                setActiveTab(tab);
              }}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#651C32] text-[#FAF7F0] shadow-md border border-[#C8A96B]'
                  : 'bg-[#F2EBDD] text-[#1C1A19]/80 hover:bg-[#FAF7F0] border border-transparent hover:border-[#C8A96B]/30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Continuous Left-to-Right Auto-Moving Horizontal Product Rail */}
        <div
          ref={scrollRef}
          onTouchStart={markUserInteraction}
          onScroll={markUserInteraction}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-5 px-1 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DISPLAY_PRODUCTS.map((product, idx) => (
            <motion.div
              key={`${product.id}-${idx}`}
              animate={{
                y: [0, -6, 0]
              }}
              transition={{
                duration: 3.8 + (idx % 4) * 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: (idx % 4) * 0.3
              }}
              className="shrink-0 w-[240px] sm:w-[270px] md:w-[290px] xl:w-[310px]"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigateTo('catalog')}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#FAF7F0] hover:bg-[#651C32] text-[#651C32] hover:text-[#FAF7F0] border border-[#651C32] text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow hover:shadow-lg"
          >
            <span>Explore All Sarees ({SAREES_DATA.length} Available)</span>
            <ArrowRight className="w-4 h-4 text-[#C8A96B] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
