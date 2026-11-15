import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Sparkles, ChevronDown } from 'lucide-react';
import { birthdayData } from '../content/birthdayData';
import { soundManager } from '../utils/audio';
import { AnimatedButterfly } from '../components/AnimatedButterfly';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ChapterProps {
  onNext: () => void;
}

export const Chapter08Special: React.FC<ChapterProps> = ({ onNext }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardListRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    soundManager.playChime();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 15,
      spread: 45,
      origin: { x, y },
      colors: ['#f472b6', '#ffd700', '#ec4899', '#ffffff'],
      shapes: ['star', 'circle'],
      scalar: 0.7,
    });
  };

  useEffect(() => {
    if (reduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (headerRef.current) {
              gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: -15 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
              );
            }

            if (cardListRef.current) {
              const cards = cardListRef.current.children;
              Array.from(cards).forEach((card, index) => {
                const fromX = index % 2 === 0 ? -40 : 40;
                gsap.fromTo(
                  card,
                  { x: fromX, opacity: 0, scale: 0.95 },
                  {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: 'back.out(1.2)',
                  }
                );
              });
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="chapter-8"
      className="chapter-section relative w-full flex flex-col items-center justify-between px-3.5 py-6 overflow-hidden select-none bg-gradient-to-b from-[#1a0528] via-[#2d093b] to-[#1c0628]"
    >
      {/* Clean High-Resolution 3D Dawn Rose Garden Background (Zero Text, Zero UI) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/images/bg-08-special.jpg')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#140420]/75 via-transparent to-[#140420]/80 pointer-events-none" />

      {/* Semantic Screen Reader Content */}
      <div className="sr-only">
        <h2>08 • Why You Are Special</h2>
        <p>Beautiful reasons that make Divya truly special ♡</p>
      </div>

      {/* Atmospheric Ambient Lighting & Dawn Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-pink-400/20 rounded-full blur-[110px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[320px] h-[320px] bg-amber-400/12 rounded-full blur-[90px]" />
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

      {/* Top Cherry Blossom Sprig Garland */}
      <div className="absolute top-0 inset-x-0 h-20 pointer-events-none z-10 flex justify-between px-3 overflow-hidden opacity-85">
        <div className="flex gap-2 -mt-2 text-pink-300/70 text-2xl filter drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]">
          <span>🌸</span>
          <span className="mt-2 text-base text-pink-200/60">🌸</span>
        </div>
        <div className="flex gap-2 -mt-2 text-pink-300/70 text-2xl filter drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]">
          <span className="mt-2 text-base text-pink-200/60">🌸</span>
          <span>🌸</span>
        </div>
      </div>

      {/* Floating Animated Butterflies */}
      <div
        className="absolute top-[32%] right-4 z-20 animate-float-gentle pointer-events-none"
        style={{ animationDelay: '1.2s' }}
      >
        <AnimatedButterfly size={32} color="#f472b6" />
      </div>
      <div
        className="absolute bottom-[35%] left-4 z-20 animate-float-slow pointer-events-none"
        style={{ animationDelay: '2.4s' }}
      >
        <AnimatedButterfly size={28} color="#e879f9" />
      </div>

      {/* Top Heading matching Reference */}
      <div ref={headerRef} className="relative z-20 pt-6 text-center select-none">
        <h2 className="font-serif italic text-3xl sm:text-4xl text-[#5c1334] tracking-wide drop-shadow-[0_1px_8px_rgba(255,255,255,0.8)] leading-tight">
          Why You Are
        </h2>
        <p className="font-script text-3xl sm:text-4xl text-[#9c2759] tracking-wider mt-0.5 drop-shadow-[0_1px_8px_rgba(255,255,255,0.8)]">
          So Special ♡
        </p>
      </div>

      {/* THE 5 SCALLOPED BRACKET IVORY CARDS (Cascading in on Enter) */}
      <div
        ref={cardListRef}
        className="relative z-20 my-auto w-full max-w-[345px] sm:max-w-[365px] flex flex-col gap-2 sm:gap-2.5 py-1"
      >
        {birthdayData.chapter08.reasons.map((reason, idx) => {
          const renderIcon = () => {
            switch (reason.icon) {
              case 'heart':
                return <span className="text-xl filter drop-shadow-sm">💖</span>;
              case 'star':
                return <span className="text-xl filter drop-shadow-sm">⭐</span>;
              case 'crown':
                return <span className="text-xl filter drop-shadow-sm">👑</span>;
              case 'flower':
                return <span className="text-xl filter drop-shadow-sm">🌸</span>;
              case 'gift':
                return <span className="text-xl filter drop-shadow-sm">🎁</span>;
              default:
                return <span className="text-xl filter drop-shadow-sm">✨</span>;
            }
          };

          return (
            <div
              key={idx}
              onClick={handleCardClick}
              className="group relative rounded-2xl bg-white/90 backdrop-blur-md p-2.5 sm:p-3 shadow-[0_6px_16px_rgba(244,114,182,0.18)] border border-pink-200/80 flex items-center gap-2.5 sm:gap-3 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              title="Tap to react"
            >
              {/* 3D Embossed Icon Badge */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-br from-pink-100 to-amber-100 border border-pink-200/70 shadow-inner flex items-center justify-center group-hover:scale-110 transition-transform">
                {renderIcon()}
              </div>

              {/* Text details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-bold text-[13px] sm:text-[14px] text-[#4a1226] tracking-tight group-hover:text-[#7a1c3d] transition-colors leading-snug">
                  {reason.title}
                </h3>
                <p className="text-[11px] sm:text-[11.5px] text-neutral-700 font-sans leading-snug line-clamp-2 mt-0.5 font-normal">
                  {reason.description}
                </p>
              </div>

              {/* Sparkle subtle hover badge */}
              <div className="shrink-0 text-amber-500/70 group-hover:text-amber-500 group-hover:rotate-12 transition-all">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM SCROLL INDICATOR MATCHING REFERENCE */}
      <div
        onClick={onNext}
        className="relative z-20 w-full flex flex-col items-center pb-4 cursor-pointer opacity-90 hover:opacity-100 transition-opacity select-none"
      >
        <ChevronDown className="w-5 h-5 text-pink-400 animate-bounce" />
      </div>
    </section>
  );
};
