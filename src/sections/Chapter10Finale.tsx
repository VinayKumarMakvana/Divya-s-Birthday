import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCcw } from 'lucide-react';
import { birthdayData } from '../content/birthdayData';
import { soundManager } from '../utils/audio';
import { AnimatedButterfly } from '../components/AnimatedButterfly';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ChapterProps {
  onRestart?: () => void;
  onReplay?: () => void;
}

export const Chapter10Finale: React.FC<ChapterProps> = ({ onRestart, onReplay }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sunsetPhotoRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleRestartAction = () => {
    if (onRestart) onRestart();
    else if (onReplay) onReplay();
  };

  const handleCelebrate = () => {
    soundManager.playConfettiPop();
    // 3-wave confetti explosion
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    };

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#ff69b4', '#ffd700', '#ffffff'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#ff1493', '#e0aaff', '#ffd700'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#f472b6', '#fbbf24', '#c084fc'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // SCROLL-DRIVEN PARALLAX ON SUNSET PHOTO
      if (sunsetPhotoRef.current) {
        gsap.fromTo(
          sunsetPhotoRef.current,
          { y: 25, scale: 0.96 },
          {
            y: -15,
            scale: 1.02,
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
      id="chapter-10"
      className="chapter-section relative w-full flex flex-col items-center justify-between px-4 py-6 overflow-hidden select-none bg-gradient-to-b from-[#1b0629] via-[#350d44] to-[#1c062a]"
    >
      {/* Clean High-Resolution 3D Sunset Sea Horizon Background (Zero Text, Zero UI) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/images/bg-10-finale.jpg')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#140420]/85 via-[#1a0528]/45 to-[#140420]/85 pointer-events-none" />

      {/* Semantic Screen Reader Content */}
      <div className="sr-only">
        <h2>10 • The Grand Finale</h2>
        <p>Some people make life more beautiful just by being in it. ♡</p>
        <p>Happy Birthday, Divya. Keep smiling, keep shining, and never stop being you.</p>
        <p>With lots of love, Your Brother ♡</p>
      </div>

      {/* Atmospheric Ambient Lighting & Sunset Glows (Pure Code) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-pink-500/22 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[360px] h-[360px] bg-amber-400/18 rounded-full blur-[100px]" />
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
        <AnimatedButterfly size={34} color="#f472b6" />
      </div>
      <div
        className="absolute bottom-[35%] right-6 z-20 animate-float-gentle pointer-events-none"
        style={{ animationDelay: '1.6s' }}
      >
        <AnimatedButterfly size={28} color="#e879f9" />
      </div>

      {/* Floating Sparkles & Petal Accents */}
      <div
        className="absolute top-[20%] right-6 text-pink-300 text-lg animate-float-slow pointer-events-none"
        style={{ animationDelay: '0.6s' }}
      >
        🌸
      </div>
      <div
        className="absolute bottom-[25%] left-6 text-amber-200 text-base animate-float-gentle pointer-events-none"
        style={{ animationDelay: '1.4s' }}
      >
        ✨
      </div>

      {/* GLOWING NEON HEART & HIGH-CONTRAST READABLE SENTIMENTAL WORDS */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-[345px] px-4 py-3.5 my-auto select-none rounded-3xl bg-[#170322]/70 backdrop-blur-md border border-pink-300/40 shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_25px_rgba(244,114,182,0.25)]">
        {/* Pulsing Neon Outline Heart */}
        <div className="mb-2 relative animate-heartbeat">
          <Heart className="w-10 h-10 text-rose-300 fill-rose-500/40 filter drop-shadow-[0_0_16px_#f43f5e] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
          <span className="absolute -top-1 -right-1 text-xs text-amber-200 animate-ping">✨</span>
        </div>

        {/* Sentimental Quote with High-Contrast White & Dark Shadow */}
        <p className="font-serif italic text-sm sm:text-base text-white font-medium tracking-wide leading-relaxed mb-2.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_0_12px_rgba(244,114,182,0.6)]">
          "Some people make life more beautiful just by being in it. ♡"
        </p>

        {/* Grand Typography: Warm Golden Champagne & Neon Rose */}
        <h2 className="font-serif italic text-3xl sm:text-4xl text-[#fff5ea] font-bold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_16px_rgba(20,4,30,0.95)]">
          Happy Birthday,
        </h2>
        <p className="font-script text-4xl sm:text-5xl text-[#ffa6cb] font-bold tracking-wider mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_0_20px_#ff2a85] drop-shadow-[0_4px_16px_rgba(20,4,30,0.95)]">
          Divya. ♡
        </p>

        {/* Blessing line: Luminous Amber Gold */}
        <p className="font-serif italic text-xs sm:text-sm text-[#fef08a] font-semibold tracking-wide mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]">
          Keep smiling, keep shining, and never stop being you.
        </p>
      </div>

      {/* SIBLINGS SUNSET ZONE IS OPEN IN THE CENTER */}

      {/* BOTTOM SECTION: SIGNATURE PLAQUE RESTING ON ROSES & ACTIONS */}
      <div className="relative z-20 w-full flex flex-col items-center gap-3 pb-5">
        {/* VINTAGE BROTHER SIGNATURE PLAQUE (100% Pure Code matching Reference) */}
        <div
          ref={signatureRef}
          onClick={handleCelebrate}
          className="relative w-full max-w-[280px] sm:max-w-[310px] rounded-xl bg-gradient-to-r from-[#faf4e8]/95 via-[#f7eedc]/95 to-[#efe2cb]/95 p-3 text-center shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(255,216,117,0.3)] border border-amber-300/70 cursor-pointer group active:scale-98 transition-transform select-none"
          title="Tap to celebrate!"
        >
          <span className="font-script text-2xl sm:text-3xl text-[#5c102a] font-bold block drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            With lots of love, Your Brother ♡
          </span>
        </div>

        {/* Celebrate Again Button */}
        <button
          onClick={handleCelebrate}
          className="group relative inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full bg-gradient-to-r from-[#8a245a]/85 via-[#aa3170]/90 to-[#6d1b46]/85 hover:from-[#9d2b6b] hover:via-[#be337a] hover:to-[#7b1f5c] border border-pink-200/75 text-pink-100 hover:text-white text-xs sm:text-sm font-serif italic tracking-wide backdrop-blur-md transition-all shadow-[0_0_25px_rgba(244,114,182,0.8)] hover:shadow-[0_0_40px_rgba(244,114,182,1)] cursor-pointer active:scale-95"
        >
          <span>Celebrate Again 🎉</span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
        </button>

        {/* Replay Experience Button */}
        <button
          onClick={handleRestartAction}
          className="inline-flex items-center gap-1.5 text-xs text-pink-200/80 hover:text-pink-100 font-mono tracking-wide cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay Experience ↺</span>
        </button>
      </div>
    </section>
  );
};
