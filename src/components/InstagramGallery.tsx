import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { WipeText } from './WipeText';

import aaranyaBrideImg from '../assets/Shop All Sarees/Mayurakshi Kanjivaram Bridal Silk Saree/Mayurakshi Kanjivaram Bridal Silk Saree (Crimson Red).webp';
import abImg2 from '../assets/AB/Image 2.webp';
import abImg4 from '../assets/AB/Image 4.webp';
import abImg5 from '../assets/AB/Image 5.webp';
import swarnaHansaFolderImg from '../assets/Shop All Sarees/Swarna Hansa Pure Tissue Silk Saree/SWARNA HANSA (Champagne Gold).webp';

const STYLED_POSTS = [
  {
    id: 'ab-1',
    image: aaranyaBrideImg,
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
    id: 'ab-5',
    image: abImg5,
    productName: 'Tarangini Rani Pink Festive Saree',
    tag: '#FestiveSplendor',
    caption: 'Radiant fuchsia and rich chevron brocade for grand family celebrations.',
  },
  {
    id: 'ab-4',
    image: abImg4,
    productName: 'Chandrika Organza Drape',
    tag: '#ContemporaryFlora',
    caption: 'Translucent organza hand-detailed with scalloped floral resham.',
  },
  {
    id: 'ab-3',
    image: swarnaHansaFolderImg,
    productName: 'Swarna Hansa Tissue Drape',
    tag: '#TissueSilkElegance',
    caption: 'Catching the radiant golden hour in liquid gold tissue silk sheen.',
  },
];

// Replicate posts to provide smooth, infinite sliding in both directions
const REPEAT_COUNT = 5;
const DISPLAY_POSTS = Array.from({ length: REPEAT_COUNT }, () => STYLED_POSTS).flat();
const N = STYLED_POSTS.length; // 5 items

export const InstagramGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(N * 2); // Start at middle batch (index 10)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Math.min(window.innerWidth - 32, 1216);
    }
    return 1200;
  });

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  // Responsive calculations:
  // Desktop (>= 1024px): EXACTLY 4 complete cards visible
  // Tablet (>= 768px): 3 cards visible
  // Small tablet / large mobile (>= 520px): 2 cards visible
  // Mobile (< 520px): 1 card visible
  const getVisibleCards = (width: number) => {
    if (width >= 1024) return 4;
    if (width >= 768) return 3;
    if (width >= 520) return 2;
    return 1;
  };

  const getGap = (width: number) => {
    if (width >= 1024) return 20;
    if (width >= 640) return 16;
    return 12;
  };

  const visibleCards = getVisibleCards(containerWidth);
  const gap = getGap(containerWidth);

  // Card width fits exactly into container width with no fractional overflow or partial 5th card
  const cardWidth = Math.max(0, (containerWidth - (visibleCards - 1) * gap) / visibleCards);
  const stepWidth = cardWidth + gap;

  // Track container width dynamically with ResizeObserver
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const updateDimensions = () => {
      if (viewportRef.current) {
        setContainerWidth(viewportRef.current.clientWidth);
      }
    };

    updateDimensions();

    const ro = new ResizeObserver(() => {
      updateDimensions();
    });
    ro.observe(el);

    const handleWindowResize = () => {
      setIsTransitioning(false);
      updateDimensions();
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // Re-enable CSS transition after silent normalization jump
  useEffect(() => {
    if (!isTransitioning) {
      const id1 = requestAnimationFrame(() => {
        const id2 = requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
        return () => cancelAnimationFrame(id2);
      });
      return () => cancelAnimationFrame(id1);
    }
  }, [isTransitioning]);

  // Slide forward smoothly by 1 product position
  const slideNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);

    // Fallback release if onTransitionEnd does not fire (e.g. background tab)
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 700);
  }, []);

  // Slide backward smoothly by 1 product position
  const slidePrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 700);
  }, []);

  // Navigate directly to a specific product (shortest circular step)
  const goToProduct = (targetIndex: number) => {
    if (isAnimatingRef.current) return;
    const currentProduct = ((currentIndex % N) + N) % N;
    let diff = targetIndex - currentProduct;
    if (diff > N / 2) diff -= N;
    else if (diff < -N / 2) diff += N;
    if (diff === 0) return;

    isAnimatingRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + diff);

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 700);
  };

  // Seamless infinite loop normalization at the end of each slide transition
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== trackRef.current || e.propertyName !== 'transform') return;
    isAnimatingRef.current = false;

    // Keep currentIndex strictly normalized within the middle batch [N * 2, N * 3 - 1] (indices 10 to 14)
    if (currentIndex >= N * 3 || currentIndex < N * 2) {
      const normalizedIndex = N * 2 + (((currentIndex % N) + N) % N);
      setIsTransitioning(false);
      setCurrentIndex(normalizedIndex);
    }
  };

  // Observe viewport intersection to prevent offscreen CPU/animation usage
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Automatic sliding at a dynamic, luxury pace (~2.6s interval, pausing on hover/touch or offscreen)
  useEffect(() => {
    if (isPaused || !isInView) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      slideNext();
    }, 2600);

    return () => clearInterval(interval);
  }, [isPaused, isInView, slideNext]);

  // Touch & Swipe handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartXRef.current === null) return;
    const deltaX = touchDeltaXRef.current;
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;

    if (deltaX < -45) {
      slideNext();
    } else if (deltaX > 45) {
      slidePrev();
    }
  };

  const activeProductIndex = ((currentIndex % N) + N) % N;

  return (
    <section
      id="styled-in-aaranya"
      className="py-20 md:py-28 bg-[#FAF7F0] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header - Centered Typographic Hierarchy matching Patron Testimonials */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-14 text-center">
          <div className="inline-flex items-center justify-center gap-2 text-[#8B1E3F] text-xs font-semibold uppercase tracking-[0.25em] mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>Community of Grace</span>
          </div>

          <div className="my-1 sm:my-1.5">
            <WipeText
              as="h2"
              direction="bottom-to-top"
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight font-light text-[#651C32] tracking-tight"
            >
              Styled in Aaranya Silks
            </WipeText>
          </div>

          <p className="text-sm sm:text-base text-[#1C1A19]/70 font-light mt-3 sm:mt-3.5 max-w-xl mx-auto leading-relaxed">
            Moments of celebration, heritage, and quiet grandeur captured by our cherished patrons across India and abroad.
          </p>
        </div>

        {/* Sliding Carousel Frame with Side Navigation Arrows */}
        <div className="relative group/carousel mb-8">
          {/* Previous Arrow Button (Desktop / Tablet) */}
          <button
            onClick={slidePrev}
            aria-label="Previous product slide"
            className="hidden sm:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-[#C8A96B]/50 hover:border-[#651C32] hover:bg-[#651C32] text-[#651C32] hover:text-white transition-all duration-300 shadow-lg items-center justify-center cursor-pointer opacity-85 group-hover/carousel:opacity-100 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Carousel Viewport (Strict bounds, 4 cards visible at desktop with 0 clipping or 5th card overflow) */}
          <div
            ref={viewportRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full overflow-hidden py-2 px-0.5"
          >
            {/* Smoothly Translating Carousel Track */}
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              style={{
                gap: `${gap}px`,
                transform: `translate3d(-${currentIndex * stepWidth}px, 0, 0)`,
                transition: isTransitioning
                  ? 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)'
                  : 'none',
              }}
              className="flex items-stretch select-none will-change-transform"
            >
              {DISPLAY_POSTS.map((post, idx) => (
                <div
                  key={`${post.id}-${idx}`}
                  style={{ width: `${cardWidth}px`, flexShrink: 0 }}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#C8A96B]/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Container with Face Always Visible */}
                  <div className="relative w-full aspect-[4/5] bg-[#F2EBDD] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.productName}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Always-visible top tag badge */}
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1C1A19]/80 backdrop-blur-md text-[#FAF7F0] border border-[#C8A96B]/30 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                        <Heart className="w-3 h-3 text-[#C8A96B] fill-current" />
                        <span>{post.tag}</span>
                      </span>
                    </div>
                  </div>

                  {/* Always-Visible Product Info Card */}
                  <div className="p-3.5 sm:p-4 text-left bg-white border-t border-[#C8A96B]/20 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif text-sm sm:text-base font-semibold text-[#651C32] mb-1 leading-snug line-clamp-1">
                        {post.productName}
                      </h3>
                      <p className="text-xs font-sans font-light leading-relaxed text-[#1C1A19]/80 line-clamp-2">
                        {post.caption}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#C8A96B]/15 flex items-center justify-between text-[10px] sm:text-[11px] text-[#C8A96B] font-semibold tracking-wider uppercase">
                      <span>Aaranya Silks Atelier</span>
                      <span className="text-[#651C32] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-medium">
                        View Look →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow Button (Desktop / Tablet) */}
          <button
            onClick={slideNext}
            aria-label="Next product slide"
            className="hidden sm:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-[#C8A96B]/50 hover:border-[#651C32] hover:bg-[#651C32] text-[#651C32] hover:text-white transition-all duration-300 shadow-lg items-center justify-center cursor-pointer opacity-85 group-hover/carousel:opacity-100 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Pagination Dots & Mobile Navigation Controls */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {/* Mobile Previous Button */}
          <button
            onClick={slidePrev}
            aria-label="Previous slide"
            className="sm:hidden p-2 rounded-full border border-[#C8A96B]/40 text-[#651C32] active:bg-[#651C32] active:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {STYLED_POSTS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => goToProduct(dotIdx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeProductIndex === dotIdx
                    ? 'w-7 bg-[#651C32]'
                    : 'w-2 bg-[#C8A96B]/40 hover:bg-[#C8A96B]'
                }`}
                aria-label={`Go to product ${dotIdx + 1}`}
              />
            ))}
          </div>

          {/* Mobile Next Button */}
          <button
            onClick={slideNext}
            aria-label="Next slide"
            className="sm:hidden p-2 rounded-full border border-[#C8A96B]/40 text-[#651C32] active:bg-[#651C32] active:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Follow CTA (Preserved intact) */}
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
