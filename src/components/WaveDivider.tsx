import React from 'react';

interface WaveDividerProps {
  fromColor?: string;
  toColor?: string;
  invert?: boolean;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  fromColor = '#FAF7F0',
  toColor = '#1C1A19',
  invert = false
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none relative z-10 ${invert ? 'rotate-180' : ''}`}
      style={{ backgroundColor: fromColor }}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-12 sm:h-16 md:h-24 block"
        preserveAspectRatio="none"
      >
        {/* Secondary wave accent */}
        <path
          d="M0,40 C320,110 520,10 820,65 C1120,120 1340,30 1440,55 L1440,120 L0,120 Z"
          fill="#8B1E3F"
          opacity="0.35"
        />
        {/* Tertiary gold accent line */}
        <path
          d="M0,50 C360,115 560,25 860,75 C1160,125 1320,40 1440,65 L1440,120 L0,120 Z"
          fill="#C8A96B"
          opacity="0.25"
        />
        {/* Primary base wave */}
        <path
          d="M0,60 C380,120 600,30 900,85 C1200,135 1380,50 1440,75 L1440,120 L0,120 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
};
