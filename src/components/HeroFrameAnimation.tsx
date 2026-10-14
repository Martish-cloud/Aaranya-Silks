import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { WipeText } from './WipeText';
import { HERO_FRAMES } from '../data/heroFrames';

const TOTAL_FRAMES = 160;

export const HeroFrameAnimation: React.FC = () => {
  const { navigateTo } = useShop();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // In-memory cache of HTMLImageElements & in-flight promises
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingMapRef = useRef<Map<number, Promise<HTMLImageElement>>>(new Map());
  const rafIdRef = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);
  const lastActualFrameDrawnRef = useRef<number>(-1);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const containerMetricsRef = useRef({ top: 0, height: 0, scrollable: 0 });

  // Listen for reduced motion preference changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Cache canvas dimensions to eliminate layout thrashing during scroll
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    canvasSizeRef.current = { width: displayWidth, height: displayHeight, dpr };

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }
  }, []);

  // Draw image on canvas preserving aspect ratio (object-fit: cover) with high-quality smoothing
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Enable high-quality image smoothing for pristine 4K rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let { width: displayWidth, height: displayHeight, dpr } = canvasSizeRef.current;
    if (displayWidth === 0 || displayHeight === 0) {
      updateCanvasDimensions();
      displayWidth = canvasSizeRef.current.width;
      displayHeight = canvasSizeRef.current.height;
      dpr = canvasSizeRef.current.dpr;
      if (displayWidth === 0 || displayHeight === 0) return;
    }

    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;
    if (!imgW || !imgH) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Calculate aspect ratio cover fit
    const imgAspect = imgW / imgH;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth = displayWidth;
    let drawHeight = displayHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawHeight = displayWidth / imgAspect;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      drawWidth = displayHeight * imgAspect;
      offsetX = (displayWidth - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, [updateCanvasDimensions]);

  // Preload frame helper with asynchronous off-thread decoding & instant frame replacement
  const preloadImage = useCallback(
    (index: number): Promise<HTMLImageElement> => {
      if (imagesRef.current.has(index)) {
        return Promise.resolve(imagesRef.current.get(index)!);
      }
      if (loadingMapRef.current.has(index)) {
        return loadingMapRef.current.get(index)!;
      }

      const promise = new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = HERO_FRAMES[index];
        img.onload = () => {
          if ('decode' in img) {
            img
              .decode()
              .catch(() => {})
              .finally(() => {
                imagesRef.current.set(index, img);
                loadingMapRef.current.delete(index);

                // If currently visible target frame was waiting for this exact image, immediately redraw sharp version!
                const activeIndex = Math.min(
                  TOTAL_FRAMES - 1,
                  Math.max(0, Math.round(currentFrameRef.current))
                );
                if (activeIndex === index && lastActualFrameDrawnRef.current !== index) {
                  drawFrame(img);
                  lastActualFrameDrawnRef.current = index;
                  lastDrawnFrameRef.current = index;
                }

                resolve(img);
              });
          } else {
            imagesRef.current.set(index, img);
            loadingMapRef.current.delete(index);

            const activeIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.max(0, Math.round(currentFrameRef.current))
            );
            if (activeIndex === index && lastActualFrameDrawnRef.current !== index) {
              drawFrame(img);
              lastActualFrameDrawnRef.current = index;
              lastDrawnFrameRef.current = index;
            }

            resolve(img);
          }
        };
        img.onerror = () => {
          loadingMapRef.current.delete(index);
          const fallback = imagesRef.current.get(0) || img;
          resolve(fallback);
        };
      });

      loadingMapRef.current.set(index, promise);
      return promise;
    },
    [drawFrame]
  );

  // Priority preloading around current target frame
  const priorityPreloadWindow = useCallback(
    (centerIdx: number) => {
      const start = Math.max(0, centerIdx - 4);
      const end = Math.min(TOTAL_FRAMES - 1, centerIdx + 16);
      for (let i = start; i <= end; i++) {
        preloadImage(i);
      }
    },
    [preloadImage]
  );

  // Progressive preloading strategy
  useEffect(() => {
    let isCancelled = false;

    updateCanvasDimensions();

    // 1. Immediately load frame 0 and display it
    preloadImage(0).then((firstImg) => {
      if (!isCancelled) {
        updateCanvasDimensions();
        drawFrame(firstImg);
        lastDrawnFrameRef.current = 0;
        lastActualFrameDrawnRef.current = 0;
      }
    });

    // 2. Preload initial batch (1-35) right away
    for (let i = 1; i <= Math.min(35, TOTAL_FRAMES - 1); i++) {
      preloadImage(i);
    }

    // 3. Staged background preloader for remaining frames in fast idle chunks
    let currentChunk = 36;
    const chunkSize = 20;

    const loadNextChunk = () => {
      if (isCancelled || currentChunk >= TOTAL_FRAMES) return;
      const end = Math.min(currentChunk + chunkSize, TOTAL_FRAMES);
      for (let i = currentChunk; i < end; i++) {
        preloadImage(i);
      }
      currentChunk = end;
      if (currentChunk < TOTAL_FRAMES) {
        setTimeout(loadNextChunk, 50);
      }
    };

    const timer = setTimeout(loadNextChunk, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [preloadImage, drawFrame, updateCanvasDimensions]);

  // Section metrics calculation on resize
  const updateMetrics = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const containerTop = rect.top + scrollTop;
    const containerHeight = container.offsetHeight;
    const scrollable = Math.max(1, containerHeight - window.innerHeight);

    containerMetricsRef.current = {
      top: containerTop,
      height: containerHeight,
      scrollable,
    };
    updateCanvasDimensions();
  }, [updateCanvasDimensions]);

  // Scroll mapping & smooth interpolated render loop
  useEffect(() => {
    if (isReducedMotion) return;

    updateMetrics();

    let isLoopRunning = true;

    // Fluid RAF render loop with cinematic damping
    const renderLoop = () => {
      if (!isLoopRunning) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const delta = target - current;

      if (Math.abs(delta) > 0.04) {
        currentFrameRef.current += delta * 0.45;
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentFrameRef.current))
        );

        if (
          frameIndex !== lastDrawnFrameRef.current ||
          (imagesRef.current.has(frameIndex) && lastActualFrameDrawnRef.current !== frameIndex)
        ) {
          let imgToDraw = imagesRef.current.get(frameIndex);
          let isExactMatch = true;

          if (!imgToDraw) {
            isExactMatch = false;
            for (let offset = 1; offset < 25; offset++) {
              if (imagesRef.current.has(frameIndex - offset)) {
                imgToDraw = imagesRef.current.get(frameIndex - offset);
                break;
              }
              if (imagesRef.current.has(frameIndex + offset)) {
                imgToDraw = imagesRef.current.get(frameIndex + offset);
                break;
              }
            }
          }

          if (imgToDraw) {
            drawFrame(imgToDraw);
            lastDrawnFrameRef.current = frameIndex;
            if (isExactMatch) {
              lastActualFrameDrawnRef.current = frameIndex;
            }
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    const handleScroll = () => {
      const { top, scrollable } = containerMetricsRef.current;
      if (scrollable <= 0) return;

      const scrollY = window.scrollY;
      const progress = Math.max(0, Math.min(1, (scrollY - top) / scrollable));
      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.round(progress * (TOTAL_FRAMES - 1))
      );

      if (targetFrame !== targetFrameRef.current) {
        targetFrameRef.current = targetFrame;
        priorityPreloadWindow(targetFrame);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateMetrics, { passive: true });

    return () => {
      isLoopRunning = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateMetrics);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame, isReducedMotion, priorityPreloadWindow, updateMetrics]);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className={`relative w-full ${
        isReducedMotion ? 'min-h-[85vh]' : 'h-[320vh]'
      } bg-[#1C1A19]`}
    >
      {/* Sticky 100vh Viewport: Pins during the 320vh scroll then releases naturally */}
      <div
        className={`${
          isReducedMotion ? 'relative min-h-[85vh]' : 'sticky top-0 h-screen'
        } w-full overflow-hidden flex flex-col justify-between bg-[#1C1A19]`}
      >
        {/* Background Canvas: 160 Cinematic Frame Sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Fallback initial poster image positioned behind canvas */}
        <img
          src={HERO_FRAMES[0]}
          alt="Aaranya Silks Luxury Saree Boutique"
          className="absolute inset-0 w-full h-full object-cover -z-1 pointer-events-none"
          loading="eager"
          fetchPriority="high"
        />

        {/* Ambient Boutique Showroom Overlays - Tailored for 4K Luxury Clarity & Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 via-45% to-transparent pointer-events-none z-1" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#1C1A19]/90 via-[#1C1A19]/35 to-transparent pointer-events-none z-1" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-1" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#E5B842]/10 blur-[140px] pointer-events-none z-1" />

        {/* Decorative Gold Frame Border */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-5xl lg:max-w-6xl top-24 bottom-12 border border-[#C8A96B]/20 pointer-events-none rounded-3xl hidden md:block z-2" />

        {/* Main Hero Foreground Content */}
        <div className="relative z-10 max-w-5xl lg:max-w-6xl mx-auto px-5 sm:pl-7 sm:pr-8 lg:pl-8 lg:pr-10 w-full py-16 md:py-24 flex flex-col justify-between h-full max-h-[88vh]">
          {/* Upper Left Text Block with Localized Dark Gradient Overlay */}
          <div className="relative max-w-2xl text-left pt-6 sm:pt-10">
            {/* Localized subtle dark gradient overlay behind text area for enhanced legibility */}
            <div
              className="absolute -inset-y-6 sm:-inset-y-8 -left-5 sm:-left-7 lg:-left-8 -right-8 sm:-right-14 md:-right-20 pointer-events-none -z-10 bg-[radial-gradient(ellipse_120%_100%_at_20%_45%,_rgba(10,8,7,0.78)_0%,_rgba(10,8,7,0.5)_50%,_rgba(10,8,7,0.15)_75%,_transparent_100%)]"
              aria-hidden="true"
            />

            {/* Brand Tag Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#651C32]/85 backdrop-blur-md border border-[#C8A96B]/50 text-[#C8A96B] mb-5 shadow-xl"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5B842]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#FAF7F0]">
                AARANYA SILKS • HAUTE COUTURE 2026
              </span>
            </motion.div>

            {/* Main Editorial Headline with Cinematic Wipe-In Animation */}
            <div className="mb-4 sm:mb-5">
              <WipeText
                as="h1"
                direction="left-to-right"
                duration={0.95}
                className="font-serif text-3xl sm:text-5xl lg:text-7xl font-light text-[#FAF7F0] leading-[1.08] tracking-tight drop-shadow-lg"
              >
                Elegance Woven in Every Thread
              </WipeText>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-[#FAF7F0]/90 font-sans font-light leading-relaxed max-w-xl mb-6 sm:mb-8 drop-shadow-md"
            >
              Discover timeless sarees crafted for unforgettable moments. Handspun pure Mulberry silk graced with certified real gold zari.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <button
                onClick={() => navigateTo('catalog')}
                className="group flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#8B1E3F] hover:bg-[#651C32] text-[#FAF7F0] font-sans font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 shadow-xl border border-[#C8A96B]/50 hover:border-[#E5B842] hover:scale-105 cursor-pointer"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 text-[#E5B842] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('story')}
                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-[#FAF7F0] font-sans font-medium text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 border border-white/25 hover:border-white/50 cursor-pointer shadow-lg"
              >
                Discover Our Story
              </button>
            </motion.div>
          </div>

          {/* Bottom Floating Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="pt-6 sm:pt-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6 border-t border-[#C8A96B]/20"
          >
            {/* Poetic quote from reference */}
            <div className="text-left">
              <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-[#E5B842] tracking-wide leading-tight drop-shadow-md">
                &ldquo;Six weavers, one thread &mdash; months of patient hands&rdquo;
              </p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#FAF7F0]/70 font-sans mt-1">
                Handcrafted in Varanasi &amp; Kanchipuram
              </p>
            </div>

            {/* Quick Badges: Silk Mark Certified & Tested Real Zari (Frame counter removed) */}
            <div className="flex items-center gap-4 sm:gap-6 text-xs text-[#FAF7F0]/90">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5B842]" />
                <span className="font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
                  Silk Mark Certified
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5B842]" />
                <span className="font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
                  Tested Real Zari
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
