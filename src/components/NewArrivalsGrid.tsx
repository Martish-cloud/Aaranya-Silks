import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SAREES_DATA } from '../data/sarees';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { WipeText } from './WipeText';
import type { Saree } from '../types';

const TABS = ['All Arrivals', 'Bridal Sarees', 'Banarasi Sarees', 'Silk Sarees', 'Organza Sarees'];

export const NewArrivalsGrid: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState('All Arrivals');
  const railRef = useRef<HTMLDivElement | null>(null);

  // Reset scroll position to 0 whenever the category filter changes or visitor returns to "All Arrivals"
  useEffect(() => {
    if (railRef.current) {
      railRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  const filteredProducts = useMemo(() => {
    let list: Saree[];
    switch (activeTab) {
      case 'Bridal Sarees': {
        list = SAREES_DATA.filter(
          (item) =>
            item.category === 'Bridal Sarees' ||
            item.category === 'Kanjivaram Sarees' ||
            item.occasions.includes('Bridal') ||
            item.name.toLowerCase().includes('bridal')
        );
        break;
      }
      case 'Banarasi Sarees': {
        list = SAREES_DATA.filter(
          (item) =>
            item.category === 'Banarasi Sarees' ||
            item.fabric === 'Banarasi Brocade' ||
            item.name.toLowerCase().includes('banarasi')
        );
        break;
      }
      case 'Silk Sarees': {
        list = SAREES_DATA.filter(
          (item) =>
            item.category === 'Silk Sarees' ||
            item.category === 'Kanjivaram Sarees' ||
            item.fabric.includes('Silk')
        );
        break;
      }
      case 'Organza Sarees': {
        list = SAREES_DATA.filter(
          (item) =>
            item.category === 'Organza Sarees' ||
            item.fabric === 'Pure Organza' ||
            item.name.toLowerCase().includes('organza')
        );
        break;
      }
      case 'All Arrivals':
      default:
        list = SAREES_DATA;
        break;
    }

    // Deduplicate strictly by product id to ensure every card in the rail is unique
    const seen = new Set<string>();
    return list.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [activeTab]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (railRef.current) {
      const containerWidth = railRef.current.clientWidth;
      let step = containerWidth;
      if (containerWidth < 640) {
        step = containerWidth + 12; // 2 cards visible on mobile
      } else if (containerWidth < 1024) {
        step = containerWidth + 16; // 3 cards visible on tablet
      } else {
        step = containerWidth + 20; // 4 cards visible on desktop
      }
      const scrollAmount = direction === 'left' ? -step : step;
      railRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="new-arrivals"
      className="py-20 md:py-28 bg-[#FAF7F0] relative overflow-hidden"
    >
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header - Centered Typographic Hierarchy matching Community of Grace / Styled in Aaranya Silks */}
        <div className="relative mb-10 sm:mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-2.5">
              <div className="inline-flex items-center justify-center gap-2 text-[#8B1E3F] text-xs font-semibold uppercase tracking-[0.25em]">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>Freshly Unveiled</span>
              </div>
            </div>

            <div className="my-1 sm:my-1.5">
              <WipeText
                as="h2"
                direction="bottom-to-top"
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#651C32] tracking-tight"
              >
                New Arrivals
              </WipeText>
            </div>

            <p className="text-sm sm:text-base text-[#1C1A19]/70 font-light mt-3 sm:mt-3.5 max-w-xl mx-auto leading-relaxed">
              Discover the latest expressions of timeless elegance, handwoven exclusively in certified silk for this festive and wedding season.
            </p>
          </div>

          {/* Navigation arrow controls - positioned on desktop, preserved */}
          <div className="hidden sm:flex absolute right-0 bottom-1 items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all cursor-pointer shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 rounded-full border border-[#C8A96B]/40 hover:border-[#651C32] hover:bg-[#651C32] hover:text-[#FAF7F0] text-[#1C1A19] transition-all cursor-pointer shadow-sm"
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
              onClick={() => setActiveTab(tab)}
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

        {/* Stationary Horizontal Product Rail (Manual Arrow/Touch Navigation Only) */}
        <div
          ref={railRef}
          className="flex items-stretch gap-3 sm:gap-4 lg:gap-5 overflow-x-auto no-scrollbar py-2 select-none scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              className="shrink-0 w-[calc((100%-12px)/2)] sm:w-[calc((100%-32px)/3)] lg:w-[calc((100%-60px)/4)]"
            >
              <ProductCard product={product} aspectRatio="4/5" index={idx} shadowOnly={true} />
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
