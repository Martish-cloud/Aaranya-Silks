import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import {
  TOTAL_HERO_FRAMES,
  getHeroFrameUrl,
  getHeroPosterUrl
} from '../data/heroFrames';

// Maximum decoded frames retained in memory at any time to bound RAM footprint
const MAX_CACHE_SIZE = 24;
// Maximum concurrent image fetch/decode tasks
const MAX_CONCURRENT_DOWNLOADS = 3;

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

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Image cache and LRU tracking: index -> HTMLImageElement
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const accessOrderRef = useRef<number[]>([]);
  const inFlightRef = useRef<Map<number, Promise<HTMLImageElement | null>>>(new Map());
  const activeDownloadsCountRef = useRef(0);
  const downloadQueueRef = useRef<number[]>([]);

  const isVisibleRef = useRef(true);
  const rafIdRef = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const scrollDirectionRef = useRef<'down' | 'up'>('down');

  // Cached layout metrics to eliminate forced layout reflow during scroll
  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const metricsRef = useRef({ top: 0, height: 0, scrollable: 1 });

  // Listen for reduced motion preference changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Update canvas sizing with DPR cap (2.0 max for optimal balance of sharpness and memory)
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

  // Section metrics cache - measured only on mount & resize
  const updateMetrics = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const top = rect.top + scrollTop;
    const height = container.offsetHeight;
    const scrollable = Math.max(1, height - window.innerHeight);

    metricsRef.current = { top, height, scrollable };
    setIsMobile(window.innerWidth < 768);
    updateCanvasDimensions();
  }, [updateCanvasDimensions]);

  // Evict frames when cache exceeds memory budget
  const evictOldFrames = useCallback((pivotFrame: number) => {
    const cache = imagesRef.current;
    if (cache.size <= MAX_CACHE_SIZE) return;

    // Sort cached keys by distance from the current target frame
    const entries = Array.from(cache.keys()).map((idx) => ({
      idx,
      dist: Math.abs(idx - pivotFrame)
    }));

    entries.sort((a, b) => b.dist - a.dist);

    while (cache.size > MAX_CACHE_SIZE && entries.length > 0) {
      const farthest = entries.shift();
      if (farthest && farthest.dist > 8) {
        cache.delete(farthest.idx);
        accessOrderRef.current = accessOrderRef.current.filter((k) => k !== farthest.idx);
      } else {
        break;
      }
    }
  }, []);

  // Draw image on canvas preserving aspect ratio (object-fit: cover)
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'medium';

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

  const processQueueRef = useRef<() => void>(() => {});

  // Queue-managed frame preloader with concurrency limiter
  const processDownloadQueue = useCallback(() => {
    while (
      activeDownloadsCountRef.current < MAX_CONCURRENT_DOWNLOADS &&
      downloadQueueRef.current.length > 0
    ) {
      const nextIndex = downloadQueueRef.current.shift()!;
      if (imagesRef.current.has(nextIndex) || inFlightRef.current.has(nextIndex)) {
        continue;
      }

      activeDownloadsCountRef.current++;
      const url = getHeroFrameUrl(nextIndex, isMobile);

      const promise = new Promise<HTMLImageElement | null>((resolve) => {
        const img = new Image();
        img.src = url;

        const onDone = () => {
          activeDownloadsCountRef.current--;
          inFlightRef.current.delete(nextIndex);
          imagesRef.current.set(nextIndex, img);
          evictOldFrames(targetFrameRef.current);

          // If target is waiting for this exact frame, render immediately
          const activeIndex = Math.min(
            TOTAL_HERO_FRAMES - 1,
            Math.max(0, Math.round(currentFrameRef.current))
          );
          if (activeIndex === nextIndex) {
            drawFrame(img);
            lastDrawnFrameRef.current = nextIndex;
          }

          processQueueRef.current();
          resolve(img);
        };

        const onError = () => {
          activeDownloadsCountRef.current--;
          inFlightRef.current.delete(nextIndex);
          processQueueRef.current();
          resolve(null);
        };

        if (typeof img.decode === 'function') {
          img.decode().then(onDone).catch(onDone);
        } else {
          img.onload = onDone;
          img.onerror = onError;
        }
      });

      inFlightRef.current.set(nextIndex, promise);
    }
  }, [drawFrame, evictOldFrames, isMobile]);

  useEffect(() => {
    processQueueRef.current = processDownloadQueue;
  }, [processDownloadQueue]);

  // Request preloading of a specific frame index
  const requestFrame = useCallback(
    (index: number, highPriority = false): Promise<HTMLImageElement | null> => {
      const safeIndex = Math.max(0, Math.min(TOTAL_HERO_FRAMES - 1, index));

      if (imagesRef.current.has(safeIndex)) {
        return Promise.resolve(imagesRef.current.get(safeIndex)!);
      }
      if (inFlightRef.current.has(safeIndex)) {
        return inFlightRef.current.get(safeIndex)!;
      }

      if (highPriority) {
        downloadQueueRef.current.unshift(safeIndex);
      } else {
        if (!downloadQueueRef.current.includes(safeIndex)) {
          downloadQueueRef.current.push(safeIndex);
        }
      }

      processDownloadQueue();
      return inFlightRef.current.get(safeIndex) || Promise.resolve(null);
    },
    [processDownloadQueue]
  );

  // Directional sliding preload window around current frame
  const scheduleWindowPreload = useCallback(
    (centerIdx: number) => {
      const dir = scrollDirectionRef.current;
      const forwardCount = dir === 'down' ? 8 : 4;
      const backwardCount = dir === 'down' ? 3 : 6;

      const start = Math.max(0, centerIdx - backwardCount);
      const end = Math.min(TOTAL_HERO_FRAMES - 1, centerIdx + forwardCount);

      // Prioritize immediate next frames in scroll direction
      if (dir === 'down') {
        for (let i = centerIdx; i <= end; i++) requestFrame(i);
        for (let i = centerIdx - 1; i >= start; i--) requestFrame(i);
      } else {
        for (let i = centerIdx; i >= start; i--) requestFrame(i);
        for (let i = centerIdx + 1; i <= end; i++) requestFrame(i);
      }
    },
    [requestFrame]
  );

  // Initial mount: load initial poster / frame 0
  useEffect(() => {
    let isCancelled = false;
    updateMetrics();

    requestFrame(0, true).then((firstImg) => {
      if (!isCancelled && firstImg) {
        updateCanvasDimensions();
        drawFrame(firstImg);
        lastDrawnFrameRef.current = 0;
      }
    });

    // Warm up first 6 frames during idle time
    const initialWarmup = () => {
      if (isCancelled) return;
      for (let i = 1; i <= Math.min(6, TOTAL_HERO_FRAMES - 1); i++) {
        requestFrame(i, false);
      }
    };

    if ('requestIdleCallback' in window) {
      const handle = (window as Window).requestIdleCallback(initialWarmup, { timeout: 1000 });
      return () => {
        isCancelled = true;
        (window as Window).cancelIdleCallback(handle);
      };
    } else {
      const timer = setTimeout(initialWarmup, 120);
      return () => {
        isCancelled = true;
        clearTimeout(timer);
      };
    }
  }, [drawFrame, requestFrame, updateCanvasDimensions, updateMetrics]);

  // RAF render loop with cinematic damping and snap convergence
  const startRenderLoop = useCallback(() => {
    if (rafIdRef.current !== null) return;

    const renderLoop = () => {
      if (!isVisibleRef.current) {
        rafIdRef.current = null;
        return;
      }

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const delta = target - current;

      if (Math.abs(delta) > 0.01) {
        // Dynamic damping: high responsiveness during rapid scroll, silky smooth during gentle scroll
        const lerpFactor = Math.abs(delta) > 10 ? 0.95 : Math.abs(delta) > 4 ? 0.75 : 0.55;
        currentFrameRef.current += delta * lerpFactor;

        // Snap when close to target or at sequence bounds to prevent lag or stuck frames
        if (
          Math.abs(target - currentFrameRef.current) < 0.2 ||
          (target === TOTAL_HERO_FRAMES - 1 && delta < 2.5) ||
          (target === 0 && delta > -2.5)
        ) {
          currentFrameRef.current = target;
        }

        const frameIndex = Math.min(
          TOTAL_HERO_FRAMES - 1,
          Math.max(0, Math.round(currentFrameRef.current))
        );

        if (frameIndex !== lastDrawnFrameRef.current) {
          let imgToDraw = imagesRef.current.get(frameIndex);

          if (!imgToDraw) {
            // Find nearest available cached frame to prevent any blank visual gap
            for (let offset = 1; offset < 16; offset++) {
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
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);
  }, [drawFrame]);

  // Viewport intersection observer to shut down RAF when hero is offscreen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !rafIdRef.current) {
          startRenderLoop();
        }
      },
      { threshold: 0.01, rootMargin: '200px 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [startRenderLoop]);

  // Passive, non-blocking scroll mapping with zero layout reads
  useEffect(() => {
    if (isReducedMotion) return;

    updateMetrics();
    startRenderLoop();

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const { top, scrollable } = metricsRef.current;

      // Track scroll direction for predictive window preloading
      scrollDirectionRef.current = scrollY >= lastScrollYRef.current ? 'down' : 'up';
      lastScrollYRef.current = scrollY;

      // Pinned distance progression calculation using cached metrics
      const rawProgress = Math.max(0, Math.min(1, (scrollY - top) / scrollable));

      // Map sequence from 0.0 to 0.80. Remaining 20% is dedicated pinned dwell buffer on frame 160.
      const ANIMATION_END_THRESHOLD = 0.80;
      const animProgress = Math.min(1, rawProgress / ANIMATION_END_THRESHOLD);
      const targetFrame = Math.min(
        TOTAL_HERO_FRAMES - 1,
        Math.floor(animProgress * (TOTAL_HERO_FRAMES - 1) + 0.5)
      );

      if (targetFrame !== targetFrameRef.current) {
        targetFrameRef.current = targetFrame;
        scheduleWindowPreload(targetFrame);
      }

      // Resume render loop if stopped
      if (!rafIdRef.current && isVisibleRef.current) {
        startRenderLoop();
      }
    };

    const handleResize = () => {
      updateMetrics();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isReducedMotion, scheduleWindowPreload, startRenderLoop, updateMetrics]);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className={`relative w-full ${
        isReducedMotion ? 'min-h-[85vh]' : 'h-[350vh]'
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
          src={getHeroPosterUrl(isMobile)}
          alt="Aaranya Silks Luxury Saree Boutique"
          className="absolute inset-0 w-full h-full object-cover -z-1 pointer-events-none"
          loading="eager"
          fetchPriority="high"
        />

        {/* Clean Subtle Bottom Transition Fade */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1C1A19]/80 via-[#1C1A19]/25 to-transparent pointer-events-none z-1" />

        {/* Decorative Gold Frame Border */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] sm:w-[calc(100%-3rem)] max-w-6xl lg:max-w-7xl top-24 bottom-12 border border-[#C8A96B]/20 pointer-events-none rounded-3xl hidden md:block z-2" />

        {/* 1. Top-Left Hero Heading Label */}
        <div className="absolute left-6 sm:left-10 lg:left-14 top-26 sm:top-28 z-20 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#651C32]/85 backdrop-blur-md border border-[#C8A96B]/50 text-[#C8A96B] shadow-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5B842]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#FAF7F0]">
              AARANYA SILKS • HAUTE COUTURE 2026
            </span>
          </motion.div>

          {/* Mobile-Only CTA Layout */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-start gap-3 mt-4 mb-4 md:hidden"
          >
            <button
              onClick={() => navigateTo('catalog')}
              className="group flex items-center gap-3 px-6 py-3 rounded-full bg-[#8B1E3F] hover:bg-[#651C32] text-[#FAF7F0] font-sans font-semibold text-xs tracking-[0.16em] uppercase transition-all duration-300 shadow-2xl border border-[#C8A96B]/50 hover:border-[#E5B842] cursor-pointer"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4 text-[#E5B842] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('story')}
              className="px-5 py-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-[#FAF7F0] font-sans font-medium text-xs tracking-[0.16em] uppercase transition-all duration-300 border border-[#C8A96B]/40 cursor-pointer shadow-lg"
            >
              Discover Our Story
            </button>
          </motion.div>
        </div>

        {/* 2. Desktop Independent CTA Overlays: Balanced Around Central Green-Saree Model */}
        {/* CTA 1: Explore The Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block absolute left-[37.5%] bottom-[12%] lg:bottom-[13%] -translate-x-1/2 z-20 pointer-events-auto"
        >
          <button
            onClick={() => navigateTo('catalog')}
            className="group flex items-center gap-2.5 px-5 lg:px-6 py-3 lg:py-3.5 rounded-full bg-[#8B1E3F] hover:bg-[#651C32] text-[#FAF7F0] font-sans font-semibold text-xs lg:text-[13px] tracking-[0.14em] uppercase transition-all duration-300 shadow-2xl border border-[#C8A96B]/50 hover:border-[#E5B842] hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4 text-[#E5B842] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* CTA 2: Discover Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="hidden md:block absolute left-[69.5%] bottom-[12%] lg:bottom-[13%] -translate-x-1/2 z-20 pointer-events-auto"
        >
          <button
            onClick={() => navigateTo('story')}
            className="px-5 lg:px-6 py-3 lg:py-3.5 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md text-[#FAF7F0] font-sans font-medium text-xs lg:text-[13px] tracking-[0.14em] uppercase transition-all duration-300 border border-[#C8A96B]/50 hover:border-[#E5B842] cursor-pointer shadow-xl whitespace-nowrap hover:scale-105"
          >
            Discover Our Story
          </button>
        </motion.div>

        {/* 3. Bottom-Left Area: Certification Badges & Preserved Six Weavers Statement */}
        <div className="absolute left-6 sm:left-10 lg:left-14 bottom-14 sm:bottom-16 z-20 pointer-events-auto flex flex-col items-start gap-2 sm:gap-2.5 max-w-sm sm:max-w-md lg:max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="inline-flex items-center gap-3 sm:gap-4 text-xs text-[#FAF7F0]/90 bg-black/45 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#C8A96B]/35 shadow-lg"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5B842]" />
              <span className="font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
                Silk Mark Certified
              </span>
            </div>
            <div className="w-px h-3.5 bg-[#C8A96B]/40" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5B842]" />
              <span className="font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
                Tested Real Zari
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full pt-2 sm:pt-2.5 border-t border-[#C8A96B]/20 text-left"
          >
            <p className="font-serif italic text-sm sm:text-base lg:text-lg text-[#E5B842] tracking-wide leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              &ldquo;Six weavers, one thread &mdash; months of patient hands&rdquo;
            </p>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#FAF7F0]/85 font-sans mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Handcrafted in Varanasi &amp; Kanchipuram
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
