import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const MESSAGES = [
  'Discover the New Aaranya Silks Collection — Pure Handwoven Heritage',
  'Explore Timeless Indian Sarees Handcrafted with Certified Zari',
  'Celebrate Every Occasion in Elegance — Complimentary Bespoke Gift Packaging',
  'The Bridal Edit 2026: Heirloom Kanjivarams & Banarasi Brocades Now Unveiled'
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % MESSAGES.length);
  };

  return (
    <div className="bg-[#4D1224] text-[#FAF7F0] border-b border-[#C8A96B]/25 py-2 px-4 text-xs md:text-sm tracking-wider font-light relative z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={handlePrev}
          aria-label="Previous message" 
          className="text-[#C8A96B] hover:text-white transition-colors p-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 text-center h-5 relative flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-2 px-2 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              <Sparkles className="w-3 h-3 text-[#C8A96B] shrink-0" />
              <span className="font-serif italic text-[#C8A96B] hidden sm:inline">Aaranya Silks</span>
              <span className="text-[#FAF7F0]/90 font-sans text-[11px] sm:text-xs">
                {MESSAGES[index]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <button 
          onClick={handleNext}
          aria-label="Next message" 
          className="text-[#C8A96B] hover:text-white transition-colors p-1"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
