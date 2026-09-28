import { useEffect, useRef, useState, useCallback } from 'react';

interface UseAutoScrollRailOptions {
  direction?: 'left-to-right' | 'right-to-left';
  speed?: number; // Pixels per second
  isHovered?: boolean;
  pauseOnInteractionDuration?: number; // ms to pause after user touches/scrolls
}

export function useAutoScrollRail({
  direction = 'right-to-left',
  speed = 42,
  isHovered = false,
  pauseOnInteractionDuration = 3500,
}: UseAutoScrollRailOptions = {}) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // User interaction trigger
  const markUserInteraction = useCallback(() => {
    setIsUserInteracting(true);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
      lastTimeRef.current = null;
    }, pauseOnInteractionDuration);
  }, [pauseOnInteractionDuration]);

  // Viewport detection for instant re-triggering & 0 resource waste offscreen
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          if (entry.isIntersecting) {
            lastTimeRef.current = null;
          }
        });
      },
      {
        root: null,
        rootMargin: '100px 0px 100px 0px', // Pre-trigger slightly before full entry for instant playback
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Main 60fps auto-scroll animation loop
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Explicitly enforce auto scroll-behavior to prevent browser smooth-scroll fighting
    rail.style.scrollBehavior = 'auto';

    // If left-to-right, ensure we have initial offset to scroll backwards from
    if (direction === 'left-to-right' && rail.scrollLeft <= 5 && rail.scrollWidth > rail.clientWidth) {
      rail.scrollLeft = rail.scrollWidth / 2;
    }

    if (!isInView || isHovered || isUserInteracting) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      lastTimeRef.current = null;
      return;
    }

    const step = (now: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = now;
      }
      const deltaTime = Math.min((now - lastTimeRef.current) / 1000, 0.1); // Cap delta to prevent huge jumps
      lastTimeRef.current = now;

      const halfWidth = rail.scrollWidth / 2;
      const distance = speed * deltaTime;

      if (direction === 'right-to-left') {
        rail.scrollLeft += distance;
        if (rail.scrollLeft >= halfWidth) {
          rail.scrollLeft -= halfWidth;
        }
      } else {
        rail.scrollLeft -= distance;
        if (rail.scrollLeft <= 0) {
          rail.scrollLeft += halfWidth;
        }
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isInView, isHovered, isUserInteracting, direction, speed]);

  // Clean up interaction timer on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  return {
    railRef,
    isInView,
    isUserInteracting,
    markUserInteraction,
  };
}
