import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';

export const GlobalWatermark: React.FC = () => {
  const { activePage } = useShop();
  const [isDarkBgState, setIsDarkBgState] = useState<boolean>(true);
  const isDarkBg = activePage === 'home' ? isDarkBgState : false;

  // Use passive IntersectionObserver for dark sections on home page
  useEffect(() => {
    if (activePage !== 'home') return;

    const darkSelectors = ['#hero-section', '#bridal-collection'];
    const darkElements = darkSelectors
      .map((sel) => document.querySelector(sel))
      .filter((el): el is Element => el !== null);

    if (darkElements.length === 0) return;

    // Observe dark sections with bottom intersection
    const observer = new IntersectionObserver(
      (entries) => {
        const hasDarkInView = entries.some((e) => e.isIntersecting);
        setIsDarkBgState(hasDarkInView);
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05,
      }
    );

    darkElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activePage]);

  // On mobile (< 640px) on ProductDetailPage, float cleanly above the fixed mobile sticky buy bar
  const isProductPage = activePage === 'product';

  return (
    <div
      className={`fixed right-4 sm:right-6 z-40 pointer-events-none select-none transition-all duration-300 ${
        isProductPage ? 'bottom-[76px] sm:bottom-5' : 'bottom-4 sm:bottom-5'
      }`}
      style={{
        zIndex: 40,
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        paddingRight: 'env(safe-area-inset-right, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      aria-hidden="true"
    >
      <div
        className={`px-3 py-1 rounded-full backdrop-blur-md border transition-all duration-300 shadow-sm ${
          isDarkBg
            ? 'bg-black/50 border-[#C8A96B]/30 text-white'
            : 'bg-[#FAF7F0]/85 border-[#C8A96B]/40 text-[#1C1A19]'
        }`}
      >
        <span className="text-[10px] sm:text-[11px] font-sans tracking-wide leading-none inline-block">
          <span className="font-normal opacity-85">Made by</span>{' '}
          <span className="font-bold tracking-[0.16em] text-[#C8A96B]">ZYNOVA</span>
        </span>
      </div>
    </div>
  );
};

export default GlobalWatermark;
