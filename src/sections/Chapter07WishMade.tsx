import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { birthdayData } from '../content/birthdayData';
import { soundManager } from '../utils/audio';
import { AnimatedButterfly } from '../components/AnimatedButterfly';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ChapterProps {
  onNext: () => void;
  onRelight?: () => void;
}

export const Chapter07WishMade: React.FC<ChapterProps> = ({ onNext }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sparklerHeartRef = useRef<HTMLDivElement>(null);
  const cakeContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleFireConfetti = () => {
    soundManager.playConfettiPop();
    confetti({
      particleCount: 160,
      spread: 95,
      origin: { y: 0.55 },
      colors: ['#ffd700', '#ff69b4', '#e0aaff', '#ffffff', '#ff9ebb', '#fbbf24'],
      shapes: ['star', 'circle'],
    });
  };

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // 1. Sparkler heart burst on entry
      if (sparklerHeartRef.current) {
        gsap.fromTo(
          sparklerHeartRef.current,
          { scale: 0.2, opacity: 0, rotate: -30 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.9,
            ease: 'back.out(1.8)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Heading reveal with warm golden glow
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Gentle float on cake
      if (cakeContainerRef.current) {
        gsap.fromTo(
          cakeContainerRef.current,
          { y: 20 },
          {
            y: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="chapter-7"
      className="chapter-section relative w-full flex flex-col items-center justify-between px-4 py-6 overflow-hidden select-none bg-gradient-to-b from-[#180424] via-[#2f0c40] to-[#1a0528]"
    >
      {/* Seamless High-Resolution Unlit Cake Artwork Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/images/bg-06-cake-unlit.jpg')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#140420]/75 via-transparent to-[#140420]/80 pointer-events-none" />

      {/* Semantic Screen Reader Content */}
      <div className="sr-only">
        <h2>07 • Wish Made!</h2>
        <p>May all your dreams come true, Divya!</p>
      </div>

      {/* Atmospheric Ambient Lighting & Golden Starburst Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-amber-400/22 rounded-full blur-[110px]" />
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-pink-500/25 rounded-full blur-[90px]" />
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
      <div className="absolute top-[28%] right-6 z-20 animate-float-slow pointer-events-none">
        <AnimatedButterfly size={34} color="#f472b6" />
      </div>
      <div className="absolute bottom-[30%] left-6 z-20 animate-float-gentle pointer-events-none">
        <AnimatedButterfly size={28} color="#e879f9" />
      </div>

      {/* Floating Sparkles & Petal Accents */}
      <div
        className="absolute top-[20%] left-6 text-pink-300 text-lg animate-float-slow pointer-events-none"
        style={{ animationDelay: '0.6s' }}
      >
        🌸
      </div>
      <div
        className="absolute bottom-[28%] right-6 text-amber-200 text-base animate-float-gentle pointer-events-none"
        style={{ animationDelay: '1.4s' }}
      >
        ✨
      </div>

      {/* Top Heading */}
      <div className="relative z-20 pt-6 text-center select-none opacity-0">
        {/* Preserves vertical layout spacing matching Chapter 06 */}
        <h2 className="font-serif italic text-3xl">Make A Wish</h2>
      </div>

      {/* CENTERPIECE: CELEBRATION CAKE WITH RADIANT SPARKLER HEART BURST */}
      <div
        ref={cakeContainerRef}
        onClick={handleFireConfetti}
        className="relative z-20 my-auto w-full max-w-[340px] flex flex-col items-center cursor-pointer select-none"
        title="Tap to shower celebration sparkles!"
      >
        {/* THE GLOWING NEON SPARKLER HEART POSITIONED OVER THE CANDLES */}
        <div
          ref={sparklerHeartRef}
          className="relative w-44 h-44 -mt-16 sm:-mt-20 flex items-center justify-center pointer-events-none z-30"
        >
          {/* Outer Pulsing Golden Aura */}
          <div className="absolute inset-0 rounded-full bg-amber-400/35 blur-2xl animate-pulse" />

          {/* Radiating Golden Sparkler Sunburst Rays */}
          <div className="absolute inset-0 flex items-center justify-center animate-spin-slow opacity-90">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <div
                key={deg}
                className="absolute w-32 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300 to-transparent"
                style={{ transform: `rotate(${deg}deg)` }}
              />
            ))}
          </div>

          {/* Golden Wire Neon Heart */}
          <div className="relative z-20 animate-heartbeat">
            <Heart className="w-16 h-16 text-amber-200 fill-amber-300/30 filter drop-shadow-[0_0_18px_#ffd700] drop-shadow-[0_0_35px_#ff9800]" />
          </div>

          {/* Crackling Star Sparks */}
          <span className="absolute -top-2 right-4 text-sm text-yellow-200 animate-ping">✨</span>
          <span className="absolute bottom-4 -left-2 text-sm text-yellow-100 animate-pulse">✨</span>
          <span className="absolute top-6 -left-3 text-xs text-pink-200 animate-ping">⭐</span>
          <span className="absolute -bottom-2 right-6 text-xs text-amber-200 animate-pulse">✨</span>
        </div>
      </div>

      {/* BOTTOM CELEBRATION CALLIGRAPHY & CHEVRON MATCHING CHAPTER 06 POSITION */}
      <div
        ref={headingRef}
        onClick={handleFireConfetti}
        className="relative z-20 w-full flex flex-col items-center pb-5 cursor-pointer select-none text-center"
      >
        <h2 className="font-script text-3xl sm:text-4xl text-white font-bold tracking-wide drop-shadow-[0_0_12px_rgba(255,255,255,0.95)] drop-shadow-[0_0_25px_rgba(244,114,182,0.85)]">
          Wish Made! ♡
        </h2>
        <p className="font-serif italic text-sm text-pink-100/95 tracking-wide mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          May all your dreams come true, Divya!
        </p>

        <div onClick={onNext} className="flex flex-col items-center opacity-90 hover:opacity-100 transition-opacity mt-2.5">
          <ChevronDown className="w-5 h-5 text-pink-200 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
