import React from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
  'Pure zari, tested and certified',
  'New festive edit',
  'Made-to-drape blouse stitching',
  'Easy 7-day returns',
  'Handwoven silk',
  'Free shipping all over India',
  'Silk Mark authenticated',
  'Bespoke heirloom keepsake box'
];

export const MarqueeTicker: React.FC = () => {
  return (
    <div className="bg-[#5B152B] text-[#FAF7F0] py-3 overflow-hidden border-y border-[#C8A96B]/25 relative z-20">
      <div className="flex w-max">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 32, repeat: Infinity }}
          className="flex items-center gap-10 whitespace-nowrap text-xs md:text-sm font-sans font-light tracking-wider uppercase"
        >
          {/* Double items for seamless infinite loop */}
          {[...ITEMS, ...ITEMS].map((text, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <span className="text-[#FAF7F0]/90 hover:text-[#E5B842] transition-colors">
                {text}
              </span>
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C8A96B] shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
