// 160-frame chronological sequence for Aaranya Silks Hero Animation
// High-performance responsive WebP delivery with desktop & mobile variants
export const TOTAL_HERO_FRAMES = 160;

export const HERO_FRAMES_DESKTOP: string[] = Array.from({ length: TOTAL_HERO_FRAMES }, (_, i) => {
  const padded = String(i + 1).padStart(3, '0');
  return `/hero-frames/desktop/frame_${padded}.webp`;
});

export const HERO_FRAMES_MOBILE: string[] = Array.from({ length: TOTAL_HERO_FRAMES }, (_, i) => {
  const padded = String(i + 1).padStart(3, '0');
  return `/hero-frames/mobile/frame_${padded}.webp`;
});

export const HERO_POSTER_DESKTOP = '/hero-frames/poster_desktop.webp';
export const HERO_POSTER_MOBILE = '/hero-frames/poster_mobile.webp';

export function getHeroFrameUrl(index: number, isMobile: boolean): string {
  const safeIdx = Math.max(0, Math.min(TOTAL_HERO_FRAMES - 1, index));
  return isMobile ? HERO_FRAMES_MOBILE[safeIdx] : HERO_FRAMES_DESKTOP[safeIdx];
}

export function getHeroPosterUrl(isMobile: boolean): string {
  return isMobile ? HERO_POSTER_MOBILE : HERO_POSTER_DESKTOP;
}

// Backwards-compatibility export
export const HERO_FRAMES: string[] = HERO_FRAMES_DESKTOP;
