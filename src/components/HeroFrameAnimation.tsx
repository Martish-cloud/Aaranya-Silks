import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { WipeText } from './WipeText';
import { HERO_FRAMES } from '../data/heroFrames';

export const HeroFrameAnimation: React.FC = () => {
  const { navigateTo } = useShop();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store preloaded HTMLImageElements
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  const [initialFrameLoaded, setInitialFrameLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Draw a frame to canvas with aspect-ratio cover
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find requested frame or the closest loaded frame
    let imgToDraw = imagesRef.current.get(frameIndex);
    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      // Find nearest loaded frame
      let closestDiff = Infinity;
      let closestIndex = 0;
      imagesRef.current.forEach((img, idx) => {
        if (img.complete && img.naturalWidth > 0) {
          const diff = Math.abs(idx - frameIndex);
          if (diff < closestDiff) {
            closestDiff = diff;
            closestIndex = idx;
          }
        }
      });
      imgToDraw = imagesRef.current.get(closestIndex);
    }

    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      return;
    }

    lastDrawnFrameRef.current = frameIndex;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = imgToDraw.naturalWidth;
    const ih = imgToDraw.naturalHeight;

    // Object-fit: cover calculation
    const imgRatio = iw / ih;
    const canvasRatio = cw / ch;

    let renderW = cw;
    let renderH = ch;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      renderW = cw;
      renderH = cw / imgRatio;
      offsetY = (ch - renderH) / 2;
    } else {
      // Canvas is taller than image
      renderH = ch;
      renderW = ch * imgRatio;
      offsetX = (cw - renderW) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(imgToDraw, offsetX, offsetY, renderW, renderH);
  }, []);

  // Preload frames progressively
  useEffect(() => {
    let isCancelled = false;
    const totalFrames = HERO_FRAMES.length;

    // Load first frame eagerly
    const firstImg = new Image();
    firstImg.src = HERO_FRAMES[0];
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current.set(0, firstImg);
      setInitialFrameLoaded(true);
      drawFrame(0);
    };

    // Load initial batch (frames 1..15)
    const initialBatch = 16;
    for (let i = 1; i < Math.min(initialBatch, totalFrames); i++) {
      const img = new Image();
      img.src = HERO_FRAMES[i];
      img.onload = () => {
        if (!isCancelled) imagesRef.current.set(i, img);
      };
    }

    // Progressively load remaining frames in idle / deferred chunks
    let currentIdx = initialBatch;
    const loadNextBatch = () => {
      if (isCancelled || currentIdx >= totalFrames) return;
      const batchEnd = Math.min(currentIdx + 12, totalFrames);
      for (let i = currentIdx; i < batchEnd; i++) {
        const img = new Image();
        img.src = HERO_FRAMES[i];
        img.onload = () => {
          if (!isCancelled) imagesRef.current.set(i, img);
        };
      }
      currentIdx = batchEnd;

      if (currentIdx < totalFrames) {
        if ('requestIdleCallback' in window) {
          (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadNextBatch);
        } else {
          setTimeout(loadNextBatch, 80);
        }
      }
    };

    const timer = setTimeout(loadNextBatch, 300);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [drawFrame]);

  // Resize canvas to match display size and device pixel ratio
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        drawFrame(currentFrameRef.current);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [drawFrame]);

  // Scroll listener restricted strictly to the hero container
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Pinned region total distance is (containerHeight - viewportHeight)
      const scrollableDistance = containerHeight - viewportHeight;
      if (scrollableDistance <= 0) return;

      // When containerTop <= 0, we are scrubbing into the hero
      // When -containerTop >= scrollableDistance, we reached the end of hero
      const scrollYInHero = -containerTop;
      const rawProgress = scrollYInHero / scrollableDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clampedProgress);

      const targetFrame = Math.min(
        HERO_FRAMES.length - 1,
        Math.floor(clampedProgress * (HERO_FRAMES.length - 1))
      );

      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame;
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }
        rafIdRef.current = requestAnimationFrame(() => {
          drawFrame(targetFrame);
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame]);

  return (
    <div
      ref={containerRef}
      id="hero-section"
      className="relative w-full h-[320vh] -mt-20"
      style={{ willChange: 'transform' }}
    >
      {/* Sticky 100vh Viewport: Pins during the 320vh scroll then releases naturally */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#1C1A19]">
        {/* Canvas Surface for 160 Cinematic Frames */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.72] contrast-[1.06]"
          style={{ display: initialFrameLoaded ? 'block' : 'none' }}
        />

        {/* Fallback initial poster image before first canvas render */}
        {!initialFrameLoaded && (
          <img
            src={HERO_FRAMES[0]}
            alt="Aaranya Silks Luxury Saree Boutique"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.72] contrast-[1.06]"
            loading="eager"
            fetchPriority="high"
          />
        )}

        {/* Ambient Boutique Showroom Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/75 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A19] via-transparent to-black/60 pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#E5B842]/15 blur-[140px] pointer-events-none" />

        {/* Decorative Gold Frame Border */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-5xl lg:max-w-6xl top-24 bottom-12 border border-[#C8A96B]/20 pointer-events-none rounded-3xl hidden md:block" />

        {/* Main Hero Foreground Content */}
        <div className="relative z-10 max-w-5xl lg:max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 w-full py-16 md:py-24 flex flex-col justify-between h-full max-h-[88vh]">
          {/* Upper Center / Left Section */}
          <div className="max-w-2xl text-left pt-6 sm:pt-10">
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
                className="font-serif text-3xl sm:text-5xl lg:text-7xl font-light text-[#FAF7F0] leading-[1.08] tracking-tight"
              >
                Elegance Woven in Every Thread
              </WipeText>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-[#FAF7F0]/85 font-sans font-light leading-relaxed max-w-xl mb-6 sm:mb-8"
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
                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-[#FAF7F0] font-sans font-medium text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 border border-white/25 hover:border-white/50 cursor-pointer"
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
            {/* Poetic quote from reference video */}
            <div className="text-left">
              <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-[#E5B842] tracking-wide leading-tight">
                "Six weavers, one thread — months of patient hands"
              </p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#FAF7F0]/60 font-sans mt-1">
                Handcrafted in Varanasi & Kanchipuram
              </p>
            </div>

            {/* Quick Badges & Interactive Cinematic Scrub Indicator */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-xs text-[#FAF7F0]/90">
              {/* Scroll scrub indicator pill */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-[#C8A96B]/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#E5B842] animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider font-mono text-[#FAF7F0]/80">
                  {Math.round(scrollProgress * 100)}% • 160 Cinematic Frames
                </span>
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
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
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
