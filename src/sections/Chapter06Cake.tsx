import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { AnimatedButterfly } from '../components/AnimatedButterfly';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ChapterProps {
  onWishMade: () => void;
}

export const Chapter06Cake: React.FC<ChapterProps> = ({ onWishMade }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);
  const [screenFlash, setScreenFlash] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const flamesRef = useRef<HTMLDivElement>(null);
  const litBgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setScreenFlash(true);

    // 1. Play realistic blow sound & chime
    soundManager.playCandleBlow();
    setTimeout(() => {
      soundManager.playConfettiPop();
    }, 200);

    // 2. Extinguish flames rapidly: fade out the lit background layer
    if (litBgRef.current) {
      gsap.to(litBgRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.inOut',
      });
    }

    if (flamesRef.current) {
      gsap.to(flamesRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power4.in',
      });
    }

    // 3. Screen flash fade-out
    setTimeout(() => setScreenFlash(false), 280);

    // 4. Show celebration banner
    setShowCelebrationBanner(true);

    // 5. Grand celebration confetti explosion!
    confetti({
      particleCount: 190,
      spread: 100,
      origin: { y: 0.55 },
      colors: ['#ffd700', '#f472b6', '#ec4899', '#c084fc', '#ffffff', '#fbbf24'],
      shapes: ['star', 'circle'],
      scalar: 1.1,
    });

    // 6. Smoothly glide to Chapter 07 after celebration vibe settles
    setTimeout(() => {
      onWishMade();
    }, 1350);
  };

  return (
    <section
      ref={sectionRef}
      id="chapter-6"
      className="chapter-section relative w-full flex flex-col items-center justify-between px-4 py-6 overflow-hidden select-none bg-gradient-to-b from-[#170423] via-[#2d093b] to-[#180424]"
    >
      {/* Quick golden celebration screen flash on candle blow */}
      {screenFlash && (
        <div className="absolute inset-0 z-50 bg-amber-200/40 pointer-events-none transition-opacity duration-300" />
      )}

      {/* 1. Base Layer: Extinguished Cake Artwork (Clean Wicks With Embers) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/images/bg-06-cake-unlit.jpg')",
        }}
      />

      {/* 2. Top Layer: Lit Candles Cake Artwork (Physically fades out when candles are blown out!) */}
      <div
        ref={litBgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/images/bg-06-cake-clean.jpg')",
          opacity: candlesLit ? 1 : 0,
        }}
      />

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#140420]/75 via-transparent to-[#140420]/80 pointer-events-none" />

      {/* Semantic Screen Reader Content */}
      <div className="sr-only">
        <h2>06 • A Little Celebration</h2>
        <h3>Make A Wish, Divya! ♡</h3>
        <p>Tap the candles to make a wish ♡</p>
      </div>

      {/* Atmospheric Ambient Lighting & Radial Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-pink-500/22 rounded-full blur-[110px]" />
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-amber-400/15 rounded-full blur-[90px]" />
      </div>

      {/* Hanging Fairy Lights Garland in top right */}
      <div className="absolute top-4 right-6 flex items-center gap-3.5 z-20 pointer-events-none select-none">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-[1px] h-5 bg-amber-200/60" />
            <div
              className="w-2.5 h-3 rounded-full bg-gradient-to-t from-amber-300 to-yellow-100 shadow-[0_0_12px_#ffe082,0_0_22px_rgba(255,216,117,0.85)] animate-pulse"
              style={{ animationDelay: `${i * 350}ms` }}
            />
          </div>
        ))}
      </div>

      {/* Floating Animated Butterflies */}
      <div className="absolute top-[30%] left-5 z-20 animate-float-slow pointer-events-none">
        <AnimatedButterfly size={34} color="#e879f9" />
      </div>
      <div
        className="absolute bottom-[32%] right-6 z-20 animate-float-gentle pointer-events-none"
        style={{ animationDelay: '1.8s' }}
      >
        <AnimatedButterfly size={28} color="#f472b6" />
      </div>

      {/* Floating Sparkles & Petal Accents */}
      <div
        className="absolute top-[22%] right-6 text-pink-300 text-lg animate-float-gentle pointer-events-none"
        style={{ animationDelay: '0.8s' }}
      >
        🌸
      </div>
      <div
        className="absolute bottom-[25%] left-6 text-amber-200 text-base animate-float-slow pointer-events-none"
        style={{ animationDelay: '1.6s' }}
      >
        ✨
      </div>

      {/* Top Heading matching Reference */}
      <div className="relative z-20 pt-6 text-center select-none">
        <h2 className="font-serif italic text-3xl sm:text-4xl text-pink-100 tracking-wide drop-shadow-[0_2px_12px_rgba(255,182,193,0.6)] leading-tight">
          Make A Wish,
        </h2>
        <p className="font-script text-3xl sm:text-4xl text-pink-200 tracking-wider mt-0.5 drop-shadow-[0_2px_10px_rgba(244,114,182,0.5)]">
          Divya! ♡
        </p>
      </div>

      {/* INTERACTIVE CANDLE HITBOX ALIGNED DIRECTLY OVER THE REAL CANDLE FLAMES */}
      <div
        onClick={handleBlowCandles}
        className="absolute top-[33.5%] left-1/2 -translate-x-1/2 z-30 w-64 h-36 cursor-pointer group flex flex-col items-center select-none"
        title="Tap the candles to blow them out & make a wish!"
      >
        {/* Subtle warm ambient flame halo positioned over the 4 candles */}
        {candlesLit && (
          <div ref={flamesRef} className="flex justify-center items-center gap-6 pt-1 pointer-events-none">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="w-7 h-7 rounded-full bg-amber-300/40 blur-sm animate-pulse"
                style={{ animationDelay: `${idx * 220}ms` }}
              />
            ))}
          </div>
        )}

        {/* Rising smoke wisps when candles are blown out */}
        {!candlesLit && (
          <div className="flex justify-center items-center gap-6 pt-1 pointer-events-none">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="w-1.5 h-10 bg-gradient-to-t from-white/80 via-pink-200/40 to-transparent rounded-full animate-smoke-wisp"
                style={{ animationDelay: `${idx * 120}ms` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* CELEBRATION VIBE BANNER POPUP OVER CAKE (Center aligned) */}
      {showCelebrationBanner && (
        <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 px-7 py-3 rounded-full bg-gradient-to-r from-pink-500/95 via-amber-400/95 to-purple-600/95 shadow-[0_0_40px_rgba(255,216,117,1)] border border-white/90 animate-bounce flex items-center justify-center gap-2.5 whitespace-nowrap pointer-events-none">
          <Sparkles className="w-5 h-5 text-amber-200 animate-spin-slow" />
          <span className="font-script text-3xl text-white font-bold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            Wish Made! ✨
          </span>
          <Sparkles className="w-5 h-5 text-amber-200 animate-spin-slow" />
        </div>
      )}

      {/* SUBTITLE & PROMPT MATCHING REFERENCE */}
      <div
        onClick={handleBlowCandles}
        className="relative z-20 w-full flex flex-col items-center pb-5 cursor-pointer select-none"
      >
        <p className="font-serif italic text-sm text-pink-100 font-medium tracking-wide text-center leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
          Tap the candles to<br />make a wish ♡
        </p>

        <div className="flex flex-col items-center opacity-85 hover:opacity-100 transition-opacity mt-2.5">
          <ChevronDown className="w-5 h-5 text-pink-200 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
