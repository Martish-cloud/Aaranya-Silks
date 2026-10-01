import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SAREES_DATA } from '../data/sarees';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { WipeText } from './WipeText';
import { useAutoScrollRail } from '../utils/useAutoScrollRail';

const TABS = ['All Arrivals', 'Bridal Sarees', 'Banarasi Sarees', 'Silk Sarees', 'Organza Sarees'];

export const NewArrivalsGrid: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState('All Arrivals');
  const [isHovered, setIsHovered] = useState(false);

  // Smooth, continuous right-to-left auto-sliding with moderately increased elegant speed (65px/s)
  const { railRef, markUserInteraction } = useAutoScrollRail({
    direction: 'right-to-left',
    speed: 65,
    isHovered,
  });

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case 'Bridal Sarees': {
        const list = SAREES_DATA.filter(
          (item) =>
            item.category === 'Bridal Sarees' ||
            item.category === 'Kanjivaram Sarees' ||
            item.occasions.includes('Bridal') ||
            item.name.toLowerCase().includes('bridal')
        );
        return list.length > 0 ? list : SAREES_DATA;
      }
      case 'Banarasi Sarees': {
        const list = SAREES_DATA.filter(
          (item) =>
            item.category === 'Banarasi Sarees' ||
            item.fabric === 'Banarasi Brocade' ||
            item.name.toLowerCase().includes('banarasi')
        );
        return list.length > 0 ? list : SAREES_DATA;
      }
      case 'Silk Sarees': {
        const list = SAREES_DATA.filter(
          (item) =>
            item.category === 'Silk Sarees' ||
            item.category === 'Kanjivaram Sarees' ||
            item.fabric.includes('Silk')
        );
        return list.length > 0 ? list : SAREES_DATA;
      }
      case 'Organza Sarees': {
        const list = SAREES_DATA.filter(
          (item) =>
            item.category === 'Organza Sarees' ||
            item.fabric === 'Pure Organza' ||
            item.name.toLowerCase().includes('organza')
        );
        return list.length > 0 ? list : SAREES_DATA;
      }
      case 'All Arrivals':
      default:
        return SAREES_DATA;
    }
  }, [activeTab]);

  // Ensure enough items for seamless, continuous looping with zero blank spaces
  const baseProducts = useMemo(() => {
    let list = filteredProducts;
    if (list.length === 0) list = SAREES_DATA;
    while (list.length < 8) {
      list = [...list, ...list];
    }
    return list;
  }, [filteredProducts]);

  const DISPLAY_PRODUCTS = useMemo(() => {
    return [...baseProducts, ...baseProducts, ...baseProducts];
  }, [baseProducts]);

  const handleScroll = (direction: 'left' | 'right') => {
    markUserInteraction();
    if (railRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      railRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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
              Discover the latest expressions of timeless elegance, handwoven exclusively in certified silk for this festive and wedding season.
            </p>
          </div>

          {/* Navigation arrow controls */}
          <div className="hidden sm:flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all cursor-pointer"
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
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#651C32] text-[#FAF7F0] shadow-md border border-[#C8A96B]'
                  : 'bg-[#F2EBDD] text-[#1C1A19]/80 hover:bg-[#FAF7F0] border border-transparent hover:border-[#C8A96B]/30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Continuous Right-to-Left Auto-Moving Horizontal Product Rail (No Floating Animation) */}
        <div
          ref={railRef}
          onTouchStart={markUserInteraction}
          onTouchMove={markUserInteraction}
          onWheel={markUserInteraction}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DISPLAY_PRODUCTS.map((product, idx) => (
            <div
              key={`${product.id}-${idx}`}
              className="shrink-0 w-[240px] sm:w-[270px] md:w-[290px] xl:w-[310px] transform-gpu"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigateTo('catalog')}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#FAF7F0] hover:bg-[#651C32] text-[#651C32] hover:text-[#FAF7F0] border border-[#651C32] text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow hover:shadow-lg cursor-pointer"
          >
            <span>Explore All Sarees ({SAREES_DATA.length} Available)</span>
            <ArrowRight className="w-4 h-4 text-[#C8A96B] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
