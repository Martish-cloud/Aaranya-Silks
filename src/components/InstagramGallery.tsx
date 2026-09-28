import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { useAutoScrollRail } from '../utils/useAutoScrollRail';
import { WipeText } from './WipeText';

import abImg1 from '../assets/AB/Image 1.png';
import abImg2 from '../assets/AB/Image 2.png';
import abImg3 from '../assets/AB/Image 3.webp';
import abImg4 from '../assets/AB/Image 4.png';
import abImg5 from '../assets/AB/Image 5.jpg';

const STYLED_POSTS = [
  {
    id: 'ab-1',
    image: abImg1,
    tag: '#AaranyaBride',
    caption: 'Moments of quiet grace before the vows are spoken.',
  },
  {
    id: 'ab-2',
    image: abImg2,
    tag: '#VaranasiHeritage',
    caption: 'Woven poetry in pure Katan silk and gold zari.',
  },
  {
    id: 'ab-3',
    image: abImg3,
    tag: '#TissueSilkElegance',
    caption: 'Catching the golden hour in our Swarna Hansa tissue drape.',
  },
  {
    id: 'ab-4',
    image: abImg4,
    tag: '#ContemporaryFlora',
    caption: 'Translucent organza hand-detailed with botanical scalloping.',
  },
  {
    id: 'ab-5',
    image: abImg5,
    tag: '#FestiveSplendor',
    caption: 'Radiant magenta and rich chevron brocade for unforgettable celebrations.',
  },
];

export const InstagramGallery: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Slow, continuous horizontal auto-sliding moving from LEFT TO RIGHT with instant viewport re-triggering
  const { railRef, markUserInteraction } = useAutoScrollRail({
    direction: 'left-to-right',
    speed: 38,
    isHovered,
  });

  const DISPLAY_POSTS = [...STYLED_POSTS, ...STYLED_POSTS, ...STYLED_POSTS];

  return (
    <section
      id="styled-in-aaranya"
      className="py-20 md:py-28 bg-[#FAF7F0] relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[#8B1E3F] text-xs font-semibold uppercase tracking-[0.25em] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>Community of Grace</span>
          </div>

          <WipeText
            as="h2"
            direction="left-to-right"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#651C32] tracking-tight"
          >
            Styled in Aaranya Silks
          </WipeText>

          <p className="text-sm sm:text-base text-[#1C1A19]/70 font-light mt-2">
            Moments of celebration, heritage, and quiet grandeur captured by our cherished patrons.
          </p>
        </div>

        {/* Continuous Left-to-Right Auto-Moving Floating Gallery Strip */}
        <div
          ref={railRef}
          onTouchStart={markUserInteraction}
          onTouchMove={markUserInteraction}
          onWheel={markUserInteraction}
          className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-5 px-1 mb-12 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DISPLAY_POSTS.map((post, idx) => (
            <motion.div
              key={`${post.id}-${idx}`}
              animate={{
                y: [0, -6, 0]
              }}
              transition={{
                duration: 4.2 + (idx % 3) * 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: (idx % 3) * 0.4
              }}
              className="group relative shrink-0 w-[190px] sm:w-[230px] md:w-[250px] aspect-[3/4] rounded-2xl overflow-hidden bg-[#F2EBDD] cursor-pointer shadow-sm hover:shadow-2xl transition-all"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white text-left">
                <div className="flex justify-end">
                  <svg className="w-4 h-4 fill-current text-[#C8A96B]" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-[10px] text-[#C8A96B] font-semibold mb-1">
                    <Heart className="w-3 h-3 fill-current text-[#C8A96B]" />
                    <span>{post.tag}</span>
                  </div>
                  <p className="text-[11px] font-sans font-light leading-snug line-clamp-2 text-white/90">
                    {post.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Follow CTA */}
        <div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#FAF7F0] hover:bg-[#651C32] text-[#651C32] hover:text-[#FAF7F0] border border-[#651C32] text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4 fill-current text-[#C8A96B]" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Follow Our Journey @aaranyasilks</span>
          </a>
        </div>
      </div>
    </section>
  );
};
