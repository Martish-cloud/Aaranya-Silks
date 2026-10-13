import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';

export const GlobalWatermark: React.FC = () => {
  const { activePage } = useShop();
  const watermarkRef = useRef<HTMLDivElement>(null);
  const [isDarkBg, setIsDarkBg] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    const checkBackground = () => {
      if (!watermarkRef.current) return;
      const rect = watermarkRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // document.elementFromPoint skips pointer-events: none elements
      // to hit the actual rendered element underneath
      const el = document.elementFromPoint(x, y);
      if (!el) return;

      let curr: HTMLElement | null = el as HTMLElement;
      while (curr && curr !== document.body && curr !== document.documentElement) {
        const style = window.getComputedStyle(curr);
        const bg = style.backgroundColor;

        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (match) {
            const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
            if (alpha > 0.15) {
              const r = parseInt(match[1], 10);
              const g = parseInt(match[2], 10);
              const b = parseInt(match[3], 10);
              // Relative luminance formula: standard Rec. 601
              const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
              const dark = luminance < 135;
              setIsDarkBg((prev) => (prev !== dark ? dark : prev));
              return;
            }
          }
        }
        curr = curr.parentElement;
      }

      // Default page background is #FAF7F0 (light)
      setIsDarkBg(false);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkBackground();
          ticking = false;
        });
        ticking = true;
      }
    };

    checkBackground();
    const timer = setTimeout(checkBackground, 120);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [activePage]);

  // On mobile (< 640px) on ProductDetailPage, float cleanly above the fixed mobile sticky buy bar
  const isProductPage = activePage === 'product';

  return (
    <div
      ref={watermarkRef}
      className={`fixed right-4 sm:right-6 z-40 pointer-events-none select-none transition-colors duration-300 ${
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
      <span
        className={`text-[10px] sm:text-[11.5px] font-sans tracking-wide leading-none inline-block transition-colors duration-200 ${
          isDarkBg ? 'text-white' : 'text-black'
        }`}
        style={{
          color: isDarkBg ? '#FFFFFF' : '#000000',
          textShadow: isDarkBg
            ? '0 1px 3px rgba(0, 0, 0, 0.85), 0 0 1px rgba(0, 0, 0, 0.9)'
            : '0 1px 3px rgba(255, 255, 255, 0.9), 0 0 1px rgba(255, 255, 255, 0.95)',
        }}
      >
        <span className="font-normal tracking-wide opacity-90">Made by</span>{' '}
        <span className="font-bold tracking-[0.16em]">ZYNOVA</span>
      </span>
    </div>
  );
};

export default GlobalWatermark;
