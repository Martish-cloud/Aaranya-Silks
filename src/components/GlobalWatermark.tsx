import React from 'react';
import { useShop } from '../context/ShopContext';

export const GlobalWatermark: React.FC = () => {
  const { activePage } = useShop();

  // On mobile (< 640px) on ProductDetailPage, float cleanly above the fixed mobile sticky buy bar (~64px height)
  const isProductPage = activePage === 'product';

  return (
    <div
      className={`fixed right-4 sm:right-5 z-35 pointer-events-none select-none transition-[bottom] duration-300 ${
        isProductPage ? 'bottom-[76px] sm:bottom-5' : 'bottom-3.5 sm:bottom-5'
      }`}
      style={{
        zIndex: 35,
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        paddingRight: 'env(safe-area-inset-right, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <span
        className="text-[10px] sm:text-[11.5px] font-sans tracking-wide leading-none inline-block"
        style={{
          color: 'rgba(28, 26, 25, 0.72)',
          textShadow:
            '0 0 3px rgba(255, 255, 255, 0.95), 0 0 6px rgba(255, 255, 255, 0.8), 0 1px 2px rgba(0, 0, 0, 0.25)',
        }}
      >
        <span className="font-normal tracking-wide opacity-90">Made by</span>{' '}
        <span className="font-bold tracking-[0.16em]">ZYNOVA</span>
      </span>
    </div>
  );
};

export default GlobalWatermark;
