import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { WipeText } from './WipeText';
import { resolveOptImage } from '../data/outfits';

// Real video assets from src/assets/Draped in Motion/
import model1Vid from '../assets/Draped in Motion/Model (1).mp4';
import model2Vid from '../assets/Draped in Motion/Model (2).mp4';
import model3Vid from '../assets/Draped in Motion/Model (3).mp4';
import model4Vid from '../assets/Draped in Motion/Model (4).mp4';

// Real extracted high-resolution poster frames from the actual videos
import model1Poster from '../assets/outfits_optimized/Draped in Motion/Model (1)_poster.webp';
import model2Poster from '../assets/outfits_optimized/Draped in Motion/Model (2)_poster.webp';
import model3Poster from '../assets/outfits_optimized/Draped in Motion/Model (3)_poster.webp';
import model4Poster from '../assets/outfits_optimized/Draped in Motion/Model (4)_poster.webp';

interface ReelItem {
  id: number;
  title: string;
  subtitle: string;
  videoUrl: string;
  posterUrl: string;
  duration: string;
  durationSec: number;
}

const REELS: ReelItem[] = [
  {
    id: 1,
    title: 'Model 1',
    subtitle: 'Muhurtham Kanjivaram Draping',
    videoUrl: model1Vid,
    posterUrl: model1Poster,
    duration: '0:08',
    durationSec: 7.8
  },
  {
    id: 2,
    title: 'Model 2',
    subtitle: 'Banarasi Brocade Pleat Styling',
    videoUrl: model2Vid,
    posterUrl: model2Poster,
    duration: '0:07',
    durationSec: 6.5
  },
  {
    id: 3,
    title: 'Model 3',
    subtitle: 'Tissue Silk Golden Hour Flow',
    videoUrl: model3Vid,
    posterUrl: model3Poster,
    duration: '0:07',
    durationSec: 6.95
  },
  {
    id: 4,
    title: 'Model 4',
    subtitle: 'Whisper Organza Pallu Toss',
    videoUrl: model4Vid,
    posterUrl: model4Poster,
    duration: '0:06',
    durationSec: 5.77
  }
];

const LOOKBOOK_PAGES = [
  {
    id: 1,
    title: 'The Temple Royalties',
    subtitle: 'Kanjivaram Korvai Anthology',
    image: resolveOptImage('Sarees Section/Kanjivaram Sarees 1.webp'),
    categoryTarget: 'Kanjivaram Sarees'
  },
  {
    id: 2,
    title: 'Mughal Courtyard Whispers',
    subtitle: 'Banarasi Kadhwa Brocades',
    image: resolveOptImage('Sarees Section/Banarasi Sarees 2.webp'),
    categoryTarget: 'Banarasi Sarees'
  },
  {
    id: 3,
    title: 'Evening Chandelier Glamour',
    subtitle: 'Tissue Silk & Organza Sheers',
    image: resolveOptImage('Sarees Section/Organza Sarees 2.webp'),
    categoryTarget: 'Party Wear Sarees'
  }
];

export const LatestTrendsLookbook: React.FC = () => {
  const { navigateTo } = useShop();
  const [currentPage, setCurrentPage] = useState(1); // 1-indexed

  // Video playback states
  const [activePlayingId, setActivePlayingId] = useState<number | null>(null);
  const activePlayingIdRef = useRef<number | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoProgress, setVideoProgress] = useState<Record<number, number>>({});
  const [modalReel, setModalReel] = useState<ReelItem | null>(null);
  const [videoErrors, setVideoErrors] = useState<Record<number, boolean>>({});

  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const activeLook = LOOKBOOK_PAGES[currentPage - 1];

  useEffect(() => {
    activePlayingIdRef.current = activePlayingId;
  }, [activePlayingId]);

  const playReel = (id: number) => {
    // Pause any other active video
    videoRefs.current.forEach((v) => {
      if (v) v.pause();
    });

    const targetVideo = videoRefs.current[id - 1];
    if (targetVideo) {
      targetVideo.currentTime = 0;
      targetVideo.muted = isMuted;
      targetVideo.play().catch(() => {
        targetVideo.muted = true;
        setIsMuted(true);
        targetVideo.play().catch(() => {});
      });
    }

    setActivePlayingId(id);
  };

  const togglePlay = (id: number) => {
    if (activePlayingId === id) {
      videoRefs.current[id - 1]?.pause();
      setActivePlayingId(null);
    } else {
      playReel(id);
    }
  };

  // Sequential autoplay (1 -> 2 -> 3 -> 4 -> 1) when video ends
  const handleVideoEnded = (id: number) => {
    const nextId = (id % REELS.length) + 1;
    playReel(nextId);
  };

  // Viewport intersection: auto-play reel 1 (muted) when section enters view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!activePlayingIdRef.current) {
              playReel(1);
            }
          } else {
            videoRefs.current.forEach((v) => v?.pause());
            setActivePlayingId(null);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isMuted]);

  const handleTimeUpdate = (id: number, e: React.SyntheticEvent<HTMLVideoElement>) => {
    const vid = e.currentTarget;
    if (vid.duration > 0) {
      const pct = (vid.currentTime / vid.duration) * 100;
      setVideoProgress((prev) => ({ ...prev, [id]: pct }));
    }
  };

  const activeCounter = activePlayingId !== null ? `0${activePlayingId}` : '01';

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-[#FAF7F0] relative overflow-hidden border-t border-[#C8A96B]/20 text-[#1C1A19]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video Reels Preview Strip - Floating Cards with Sequential Autoplay (No Horizontal Sliding) */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6 text-left">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#8B1E3F]">
                ATELIER REELS
              </span>
              <WipeText
                as="h3"
                direction="bottom-to-top"
                className="font-serif text-2xl sm:text-3xl font-light text-[#1C1A19]"
              >
                Draped in Motion
              </WipeText>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#1C1A19]/70 font-mono tracking-wider">
                {activeCounter} / 04 REELS
              </span>
            </div>
          </div>

          {/* 4 Video Cards Grid with Floating Animation */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-2">
            {REELS.map((reel, idx) => {
              const isPlaying = activePlayingId === reel.id;
              const progress = videoProgress[reel.id] || 0;
              const hasError = videoErrors[reel.id];

              return (
                <motion.div
                  key={reel.id}
                  animate={{
                    y: [0, -7, 0]
                  }}
                  transition={{
                    duration: 3.8 + (idx % 4) * 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: idx * 0.35
                  }}
                  onClick={() => setModalReel(reel)}
                  className={`group relative w-full aspect-[9/14] rounded-2xl overflow-hidden bg-black cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border select-none ${
                    isPlaying
                      ? 'border-[#E5B842] ring-2 ring-[#E5B842]/50 shadow-2xl scale-[1.01]'
                      : 'border-white/10 hover:-translate-y-1.5 hover:border-[#E5B842]/40'
                  }`}
                >
                  {/* Poster Image (shown when not playing, loading, or on video error) */}
                  <img
                    src={reel.posterUrl}
                    alt={`${reel.title} - ${reel.subtitle}`}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      isPlaying && !hasError
                        ? 'opacity-0 pointer-events-none'
                        : 'opacity-85 group-hover:opacity-95 group-hover:scale-105'
                    }`}
                  />

                  {/* Real Video Element (if no error) */}
                  {!hasError && (
                    <video
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      src={reel.videoUrl}
                      playsInline
                      muted={isMuted}
                      preload="metadata"
                      onError={() => setVideoErrors((prev) => ({ ...prev, [reel.id]: true }))}
                      onTimeUpdate={(e) => handleTimeUpdate(reel.id, e)}
                      onEnded={() => handleVideoEnded(reel.id)}
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
                        isPlaying ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
                      }`}
                    />
                  )}

                  {/* Gradient Scrim Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none z-10" />

                  {/* Top Floating Controls */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20">
                    <span className="font-mono text-[10px] font-bold text-white/80 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                      0{reel.id}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Audio Mute/Unmute Toggle */}
                      {isPlaying && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const newMuted = !isMuted;
                            setIsMuted(newMuted);
                            videoRefs.current.forEach((v) => {
                              if (v) v.muted = newMuted;
                            });
                          }}
                          className="p-1.5 rounded-full bg-black/60 backdrop-blur-md hover:bg-[#E5B842] text-white hover:text-black transition-colors"
                          title={isMuted ? 'Unmute video' : 'Mute video'}
                        >
                          {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                        </button>
                      )}

                      {/* Modal Expand Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalReel(reel);
                        }}
                        className="p-1.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-white/20 text-white transition-colors opacity-0 group-hover:opacity-100"
                        title="Expand Cinematic View"
                      >
                        <Maximize2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Centered Play/Pause Button (inline preview toggle) */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(reel.id);
                      }}
                      className={`pointer-events-auto w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-xl ${
                        isPlaying
                          ? 'bg-black/40 text-white opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'
                          : 'bg-white/20 group-hover:bg-[#E5B842] text-white group-hover:text-[#1C1A19] scale-100 group-hover:scale-110'
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </div>
                  </div>

                  {/* Bottom Text Information */}
                  <div className="absolute bottom-3 inset-x-3 text-left z-20">
                    <p className="text-xs font-serif font-bold text-white line-clamp-1">
                      {reel.title}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-white/75 font-mono mt-0.5">
                      <span className="truncate max-w-[70%] font-sans font-light text-white/80">
                        {reel.subtitle}
                      </span>
                      <span>{reel.duration}</span>
                    </div>

                    {/* Progress Bar when Playing */}
                    {isPlaying && (
                      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mt-1.5">
                        <div
                          className="h-full bg-[#E5B842] transition-all duration-100"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Cinematic Reel Modal View */}
        <AnimatePresence>
          {modalReel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6"
              onClick={() => setModalReel(null)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-sm w-full aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={modalReel.videoUrl}
                  autoPlay
                  playsInline
                  loop
                  controls
                  className="w-full h-full object-cover"
                />

                {/* Close Button */}
                <button
                  onClick={() => setModalReel(null)}
                  className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Title Overlay */}
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5B842] block">
                    ATELIER REEL
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">
                    {modalReel.title}
                  </h4>
                  <p className="text-xs text-white/70 font-sans">
                    {modalReel.subtitle}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LATEST TRENDS Lookbook Section matching Frames 18, 1210, 1255 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
          {/* Left Column: 3D Block Extruded Headline & Story (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#8B1E3F] block mb-2">
                EDITORIAL CURATION
              </span>

              {/* Massive 3D Block-Extruded Typography matching Frame 1210 */}
              <WipeText
                as="h2"
                direction="left-to-right"
                duration={0.9}
                className="font-sans font-black text-5xl sm:text-7xl tracking-tighter leading-[0.9] text-[#1C1A19] uppercase select-none"
              >
                <span
                  style={{
                    textShadow: '3px 3px 0px #C8A96B, 6px 6px 0px #651C32, 9px 9px 15px rgba(0,0,0,0.2)'
                  }}
                >
                  LATEST
                  <br />
                  TRENDS
                </span>
              </WipeText>
            </div>

            {/* Pill Button from Frame 1210 */}
            <div>
              <button
                onClick={() => navigateTo('catalog')}
                className="px-7 py-2.5 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md hover:shadow-xl"
              >
                Discover Now
              </button>
            </div>

            {/* Stories Behind The Drape */}
            <div className="space-y-2 pt-2 border-t border-[#C8A96B]/25">
              <h4 className="font-serif text-lg font-bold text-[#651C32]">
                Stories Behind The Drape
              </h4>
              <p className="text-xs text-[#1C1A19]/75 font-sans font-light leading-relaxed max-w-sm">
                Every saree carries a story woven into its silk, inspired by the loom, shaped by the hands that finish its border.
              </p>
            </div>
          </div>

          {/* Center Column: 3D Hardcover Lookbook Album (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* 3D Book Frame */}
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white group cursor-pointer">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLook.id}
                  initial={{ opacity: 0, rotateY: 15 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -15 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => navigateTo('catalog', undefined, activeLook.categoryTarget)}
                  className="w-full h-full relative"
                >
                  <img
                    src={activeLook.image}
                    alt={activeLook.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Book spine lighting accent */}
                  <div className="absolute left-0 inset-y-0 w-4 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none" />

                  <div className="absolute bottom-6 inset-x-6 text-white text-left">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5B842] block mb-1">
                      {activeLook.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl font-light text-white leading-tight">
                      {activeLook.title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Controls < 2 / 3 > matching Frame 1255 */}
            <div className="flex items-center gap-4 mt-5 text-xs font-mono text-[#1C1A19]/80">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-black/15 hover:bg-[#F2EBDD] disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>{currentPage} / {LOOKBOOK_PAGES.length}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(LOOKBOOK_PAGES.length, p + 1))}
                disabled={currentPage === LOOKBOOK_PAGES.length}
                className="p-2 rounded-full border border-black/15 hover:bg-[#F2EBDD] disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Explore The Range breakdown matching Frame 1255 (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-xl font-light text-[#651C32] border-b border-[#C8A96B]/25 pb-2">
              Explore The Range
            </h4>

            <div className="space-y-3 text-xs">
              <div
                onClick={() => navigateTo('catalog', undefined, 'Kanjivaram Sarees')}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F2EBDD] cursor-pointer transition-colors"
              >
                <span className="font-serif font-semibold text-sm text-[#1C1A19]">Kanjivaram</span>
                <span className="text-[#1C1A19]/50">7 Sarees</span>
              </div>

              <div
                onClick={() => navigateTo('catalog', undefined, 'Banarasi Sarees')}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F2EBDD] cursor-pointer transition-colors"
              >
                <span className="font-serif font-semibold text-sm text-[#1C1A19]">Banarasi</span>
                <span className="text-[#1C1A19]/50">5 Sarees</span>
              </div>

              <div
                onClick={() => navigateTo('catalog', undefined, 'Bridal Sarees')}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F2EBDD] cursor-pointer transition-colors"
              >
                <span className="font-serif font-semibold text-sm text-[#1C1A19]">Bridal</span>
                <span className="text-[#1C1A19]/50">4 Sarees</span>
              </div>

              <div
                onClick={() => navigateTo('catalog', undefined, 'Festive Sarees')}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F2EBDD] cursor-pointer transition-colors"
              >
                <span className="font-serif font-semibold text-sm text-[#1C1A19]">Festive</span>
                <span className="text-[#1C1A19]/50">6 Sarees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
