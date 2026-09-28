import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SAREES_DATA } from '../data/sarees';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { WipeText } from './WipeText';

const TABS = ['All Arrivals', 'Bridal Sarees', 'Banarasi Sarees', 'Silk Sarees', 'Organza Sarees'];

export const NewArrivalsGrid: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState('All Arrivals');

  const filteredProducts = SAREES_DATA.filter((item) => {
    if (activeTab === 'All Arrivals') return true;
    return item.category === activeTab;
  }).slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-[#FAF7F0] relative">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
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

        {/* Category Pill Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-3 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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

        {/* 6-Column Responsive Product Grid: 6 cards on large desktop, 4 on laptop, 2-3 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-4 xl:gap-3.5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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
