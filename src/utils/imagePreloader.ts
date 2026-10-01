// Aaranya Silks - Intelligent Predictive Image Preloading & Decoding Utility
// Optimized for luxury editorial performance without network congestion

const preloadedSet = new Set<string>();

/**
 * Preload and decode a single image URL into browser cache without blocking UI.
 */
export function preloadImage(src: string): Promise<void> {
  if (!src || preloadedSet.has(src)) {
    return Promise.resolve();
  }
  preloadedSet.add(src);

  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    if (typeof img.decode === 'function') {
      img.decode().then(resolve).catch(() => resolve());
    } else {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    }
  });
}

/**
 * Preload multiple image URLs sequentially or in micro-batches to avoid network congestion.
 */
export function preloadImages(srcs: string[]): void {
  if (!srcs || srcs.length === 0) return;
  const uniqueSrcs = srcs.filter((s) => s && !preloadedSet.has(s));
  if (uniqueSrcs.length === 0) return;

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      uniqueSrcs.forEach((src) => {
        preloadImage(src);
      });
    }, { timeout: 1500 });
  } else {
    setTimeout(() => {
      uniqueSrcs.forEach((src) => {
        preloadImage(src);
      });
    }, 100);
  }
}
