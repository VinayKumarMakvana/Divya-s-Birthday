import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';
import { AnimatedButterfly } from '../components/AnimatedButterfly';
import { soundManager } from '../utils/audio';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ChapterProps {
  onNext: () => void;
}

export const Chapter01Entrance: React.FC<ChapterProps> = ({ onNext }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const lightsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  const handleStart = () => {
    soundManager.playChime();
    soundManager.play();
    onNext();
  };

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // SCROLL-DRIVEN PARALLAX ON ARCH
      gsap.to(archRef.current, {
        scale: 1.04,
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Fairy lights gentle sway
      if (lightsRef.current) {
        gsap.to(lightsRef.current.children, {
          y: '+=5',
          duration: 2.2,
          stagger: 0.15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Initial entrance reveal
      gsap.fromTo(
        archRef.current,
        { opacity: 0, y: 50, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'power3.out', delay: 0.1 }
      );

      // Button pulse animation
      gsap.fromTo(
        btnRef.current,
        { scale: 0.95 },
        { scale: 1.03, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="chapter-1"
      className="chapter-section relative w-full flex flex-col items-center justify-between px-3 py-6 overflow-hidden select-none bg-gradient-to-b from-[#130520] via-[#240835] to-[#14031d]"
    >
      {/* Atmospheric High-Resolution 3D Clean Artwork Background (Zero Text, Zero UI) */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/images/bg-01-entrance.jpg')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#140420]/75 via-black/35 to-[#140420]/80 pointer-events-none" />

      {/* Soft Ambient Radial Lights (Champagne & Magenta Glow) */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] rounded-full bg-pink-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-amber-300/15 blur-[90px] pointer-events-none" />

      {/* Floating Animated Butterflies */}
      <div className="absolute top-28 left-4 z-20 animate-float-slow pointer-events-none">
        <AnimatedButterfly size={34} color="#e879f9" />
      </div>
      <div
        className="absolute top-24 right-5 z-20 animate-float-gentle pointer-events-none"
        style={{ animationDelay: '1.8s' }}
      >
        <AnimatedButterfly size={26} color="#ffd54f" />
      </div>

      {/* Floating Blossom Accents */}
      <div
        className="absolute top-16 right-8 text-pink-300 text-lg animate-float-gentle pointer-events-none"
        style={{ animationDelay: '0.8s' }}
      >
        🌸
      </div>
      <div
        className="absolute bottom-36 left-4 text-pink-300 text-sm animate-float-slow pointer-events-none"
        style={{ animationDelay: '2.2s' }}
      >
        ✨
      </div>

      {/* Delicate Golden Cathedral Arch Frame (Allows Breathtaking 9:16 Artwork to Shine Through) */}
      <div
        ref={archRef}
        className="relative z-10 w-[92%] max-w-[380px] rounded-t-[190px] rounded-b-[32px] border border-amber-300/45 bg-[#140420]/35 backdrop-blur-[1.5px] shadow-[0_0_50px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(244,114,182,0.12)] px-5 pt-7 pb-6 flex flex-col items-center text-center my-auto will-change-transform"
      >
        {/* Inner Delicate Arch Accent Line */}
        <div className="absolute inset-1.5 rounded-t-[182px] rounded-b-[26px] border border-pink-300/30 pointer-events-none" />

        {/* Hanging Fairy Lights Garland inside the arch */}
        <div
          ref={lightsRef}
          className="relative w-full flex justify-center items-center gap-3.5 mb-3 select-none"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="w-1.5 h-3 rounded-full bg-gradient-to-t from-amber-300 to-yellow-100 shadow-[0_0_10px_#ffe082,0_0_18px_rgba(255,216,117,0.8)] animate-pulse"
                style={{ animationDelay: `${i * 300}ms` }}
              />
              <div className="w-[1px] h-3 bg-amber-200/50" />
            </div>
          ))}
        </div>

        {/* Top Note matching reference */}
        <p className="font-serif italic text-sm sm:text-base text-pink-100/95 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-2">
          A Little World<br />Made Just For You ♡
        </p>

        {/* Grand Birthday Calligraphy Heading matching reference */}
        <div ref={textRef} className="my-1 space-y-0.5">
          <h2 className="font-script text-5xl sm:text-6xl text-pink-200 drop-shadow-[0_0_25px_rgba(244,114,182,0.9)] leading-none">
            Happy
          </h2>
          <h2 className="font-script text-5xl sm:text-6xl text-pink-200 drop-shadow-[0_0_25px_rgba(244,114,182,0.9)] leading-tight -mt-2">
            Birthday,
          </h2>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_25px_rgba(255,216,117,0.8)] mt-1">
            Divya! ♡
          </h1>
        </div>

        {/* Supporting text matching reference */}
        <p className="text-xs sm:text-sm text-pink-100/90 font-light leading-relaxed max-w-xs mt-3 mb-6 px-2 drop-shadow">
          Today's, someone's birthday! <br />
          Jo ye sochti he vo jyada samjhdar he 😜
        </p>

        {/* The Exact Glowing Pill Button from Reference */}
        <button
          ref={btnRef}
          onClick={handleStart}
          aria-label="Open Your Surprise"
          className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9d2b6b] via-[#be337a] to-[#7b1f5c] text-white font-semibold text-sm shadow-[0_0_35px_rgba(244,114,182,0.85),0_0_15px_rgba(255,216,117,0.5)] hover:shadow-[0_0_55px_rgba(244,114,182,1),0_0_25px_rgba(255,216,117,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-pink-200/80"
        >
          <span className="relative z-10 flex items-center gap-2 text-white text-sm font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
            Open Your Surprise ✨
          </span>
          <span className="absolute inset-0 rounded-full border border-pink-200/70 animate-ping opacity-30" />
        </button>

        {/* Bottom Floral Garland Decor */}
        <div className="mt-5 flex items-center justify-center gap-2 text-pink-300/90 select-none text-sm">
          <span>🌸</span>
          <span className="text-xs">✨</span>
          <span>🌹</span>
          <span className="text-xs">✨</span>
          <span>🌸</span>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        onClick={handleStart}
        className="relative z-10 flex flex-col items-center gap-1 cursor-pointer opacity-85 hover:opacity-100 transition-opacity pb-2"
      >
        <span className="text-[10px] tracking-wider text-pink-200 uppercase font-mono">
          Scroll to explore
        </span>
        <ChevronDown className="w-4 h-4 text-pink-200 animate-bounce" />
      </div>
    </section>
  );
};
