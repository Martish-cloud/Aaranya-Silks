import React, { useState } from 'react';
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
    productName: 'Royal Kanjivaram Bridal Drape',
    tag: '#AaranyaBride',
    caption: 'Moments of quiet grace and golden purity before the vows are spoken.',
  },
  {
    id: 'ab-2',
    image: abImg2,
    productName: 'Varanasi Katan Brocade',
    tag: '#VaranasiHeritage',
    caption: 'Woven poetry in pure Katan silk and authentic gold kadhwa zari.',
  },
  {
    id: 'ab-3',
    image: abImg3,
    productName: 'Swarna Hansa Tissue Drape',
    tag: '#TissueSilkElegance',
    caption: 'Catching the radiant golden hour in liquid gold tissue silk sheen.',
  },
  {
    id: 'ab-4',
    image: abImg4,
    productName: 'Chandrika Organza Drape',
    tag: '#ContemporaryFlora',
    caption: 'Translucent organza hand-detailed with scalloped floral resham.',
  },
  {
    id: 'ab-5',
    image: abImg5,
    productName: 'Tarangini Rani Pink Festive Saree',
    tag: '#FestiveSplendor',
    caption: 'Radiant fuchsia and rich chevron brocade for grand family celebrations.',
  },
];

export const InstagramGallery: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Smooth, continuous horizontal auto-sliding moving from left to right with no floating
  const { railRef, markUserInteraction } = useAutoScrollRail({
    direction: 'left-to-right',
    speed: 48,
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
            Moments of celebration, heritage, and quiet grandeur captured by our cherished patrons across India and abroad.
          </p>
        </div>

        {/* Continuous Left-to-Right Auto-Moving Horizontal Strip (No Floating, Increased Card Size, Fully Visible Info) */}
        <div
          ref={railRef}
          onTouchStart={markUserInteraction}
          onTouchMove={markUserInteraction}
          onWheel={markUserInteraction}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-3 px-1 mb-12 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DISPLAY_POSTS.map((post, idx) => (
            <div
              key={`${post.id}-${idx}`}
              className="group relative shrink-0 w-[240px] sm:w-[270px] md:w-[300px] lg:w-[320px] rounded-3xl overflow-hidden bg-white border border-[#C8A96B]/30 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Container with Face Always Visible */}
              <div className="relative w-full aspect-[4/5] bg-[#F2EBDD] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.productName}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />

                {/* Always-visible top tag badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1A19]/80 backdrop-blur-md text-[#FAF7F0] border border-[#C8A96B]/30 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                    <Heart className="w-3 h-3 text-[#C8A96B] fill-current" />
                    <span>{post.tag}</span>
                  </span>
                </div>
              </div>

              {/* Always-Visible Product Info Card (No Hover Needed) */}
              <div className="p-4 sm:p-5 text-left bg-white border-t border-[#C8A96B]/20 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-[#651C32] mb-1 leading-snug">
                    {post.productName}
                  </h3>
                  <p className="text-xs sm:text-[13px] font-sans font-light leading-relaxed text-[#1C1A19]/80 line-clamp-2">
                    {post.caption}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#C8A96B]/15 flex items-center justify-between text-[11px] text-[#C8A96B] font-semibold tracking-wider uppercase">
                  <span>Aaranya Silks Atelier</span>
                  <span className="text-[#651C32] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    View Look →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Follow CTA */}
        <div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-[#651C32] text-[#651C32] hover:text-white border border-[#651C32] text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] transition-all duration-300 shadow hover:shadow-lg cursor-pointer"
          >
            <span>Follow @AaranyaSilks on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};
