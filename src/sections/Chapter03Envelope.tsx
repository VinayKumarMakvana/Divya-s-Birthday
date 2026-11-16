import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { AnimatedButterfly } from '../components/AnimatedButterfly';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ChapterProps {
  onOpenLetter: () => void;
}

export const Chapter03Envelope: React.FC<ChapterProps> = ({ onOpenLetter }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const envelopeContainerRef = useRef<HTMLDivElement>(null);
  const envelopeTiltRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const reduced = useReducedMotion();

  const handleOpen = () => {
    if (isOpen) {
      onOpenLetter();
      return;
    }
    setIsOpen(true);
    soundManager.playChime();

    // Trigger golden star sparkles at the wax seal
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.52 },
      colors: ['#ffd700', '#fbcfe8', '#ffffff', '#fbbf24', '#f472b6'],
      shapes: ['star', 'circle'],
      scalar: 0.9,
    });

    if (reduced) {
      setTimeout(() => onOpenLetter(), 350);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => onOpenLetter(), 750);
      },
    });

    // 1. Seal pulse and golden flash
    tl.to(sealRef.current, {
      scale: 1.5,
      opacity: 0,
      filter: 'blur(4px)',
      duration: 0.3,
      ease: 'power2.out',
    })
      // 2. Physical letter rises UP out of the envelope seam!
      .fromTo(
        letterRef.current,
        {
          y: 40,
          scale: 0.75,
          opacity: 0,
          rotateX: 20,
        },
        {
          y: -175,
          scale: 1.1,
          opacity: 1,
          rotateX: 0,
          duration: 0.75,
          ease: 'back.out(1.25)',
        },
        '-=0.15'
      );
  };

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // 3D Tilt physics on scroll scrub
      if (envelopeTiltRef.current) {
        gsap.fromTo(
          envelopeTiltRef.current,
          { rotateX: 10, rotateY: -6, scale: 0.97 },
          {
            rotateX: -4,
            rotateY: 5,
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
      id="chapter-3"
      className="chapter-section relative w-full flex flex-col items-center justify-between px-4 py-6 overflow-hidden select-none bg-gradient-to-b from-[#180527] via-[#2f0c43] to-[#160422]"
    >
      {/* Clean High-Resolution 3D Envelope Artwork Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/images/bg-03-envelope.jpg')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#140420]/75 via-transparent to-[#140420]/80 pointer-events-none" />

      {/* Semantic Screen Reader Content */}
      <div className="sr-only">
        <h2>03 • A Special Letter</h2>
        <p>A Letter From Your Brother ♡</p>
        <p>An animated envelope that opens to a heartfelt letter.</p>
      </div>

      {/* Atmospheric Ambient Lighting & Radial Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-pink-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-1/4 w-[280px] h-[280px] bg-purple-600/25 rounded-full blur-[90px]" />
        <div className="absolute top-[40%] right-[10%] w-[240px] h-[240px] bg-amber-300/15 rounded-full blur-[80px]" />
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
      <div
        className="absolute top-[28%] right-6 z-20 animate-float-gentle pointer-events-none"
        style={{ animationDelay: '1.2s' }}
      >
        <AnimatedButterfly size={36} color="#f472b6" />
      </div>
      <div
        className="absolute bottom-[24%] left-6 z-20 animate-float-slow pointer-events-none"
        style={{ animationDelay: '2.5s' }}
      >
        <AnimatedButterfly size={30} color="#e879f9" />
      </div>

      {/* Drifting Petals & Sparkles */}
      <div className="absolute top-[26%] left-6 text-pink-300/60 text-lg animate-float-slow pointer-events-none select-none">
        🌸
      </div>
      <div className="absolute bottom-[36%] right-8 text-amber-200/70 text-sm animate-float-gentle pointer-events-none select-none">
        ✨
      </div>

      {/* TOP HEADER & CALLIGRAPHY MATCHING REFERENCE */}
      <div className="relative z-20 pt-6 flex flex-col items-center text-center select-none">
        <h2 className="font-serif italic text-3xl sm:text-4xl text-pink-100 tracking-wide drop-shadow-[0_2px_12px_rgba(255,182,193,0.6)]">
          A Letter
        </h2>
        <p className="font-script text-3xl sm:text-4xl text-pink-200 tracking-wider mt-1 drop-shadow-[0_2px_10px_rgba(244,114,182,0.5)]">
          From Your Brother ♡
        </p>
      </div>

      {/* 3D INTERACTIVE ENVELOPE RIG WITH REAL PHYSICAL LETTER EMERGENCE */}
      <div
        ref={envelopeContainerRef}
        className="relative z-20 my-auto w-full max-w-[340px] flex justify-center items-center py-4 perspective-1000"
      >
        <div
          ref={envelopeTiltRef}
          onClick={handleOpen}
          className="relative w-[310px] sm:w-[330px] h-[220px] cursor-pointer group select-none preserve-3d"
          title="Tap envelope to open brother's letter"
        >
          {/* THE PHYSICAL PARCHMENT LETTER (Slides UP out of the envelope when tapped!) */}
          <div
            ref={letterRef}
            className="absolute inset-x-2 -top-4 h-[240px] rounded-xl bg-[#fdfaf3] p-5 flex flex-col justify-between opacity-0 z-30 pointer-events-none shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_20px_rgba(255,216,117,0.35)] border border-amber-300/80"
            style={{
              backgroundImage:
                'radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 40%), repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(217, 189, 150, 0.45) 19px, transparent 20px)',
            }}
          >
            {/* Top Letter Header */}
            <div className="flex items-center justify-between border-b border-amber-300/60 pb-1.5">
              <span className="font-script text-2xl text-[#7a1c3d] font-bold">Dear lazy Divya ♡</span>
              <span className="font-serif italic text-xs text-amber-900/80">Happy Birthday!</span>
            </div>

            {/* Letter Sneak Peek Text */}
            <div className="space-y-1.5 my-1">
              <p className="font-serif italic text-[11.5px] text-neutral-900 leading-relaxed font-semibold">
                "To my lazy sister, duniya jaye bhad me un sab ki MKC, Din bhar mobile chalao reels dekho..."
              </p>
              <p className="font-serif italic text-[11px] text-neutral-800 leading-snug line-clamp-2 font-medium">
                Log bolein din bhar mobile chalati fir bhi ye achieve kar liya! Aur padhai ki tension mat lena 😂
              </p>
            </div>

            {/* Bottom Sign-off */}
            <div className="flex items-center justify-between pt-1 border-t border-amber-200/50">
              <span className="font-script text-sm text-[#7a1c3d] font-semibold">With lots of love ♡</span>
              <span className="font-mono text-[10px] text-pink-700 animate-pulse font-bold">Opening full letter →</span>
            </div>
          </div>

          {/* INTERACTIVE GOLDEN WAX SEAL WITH EMBOSSED HEART & PULSE HALO */}
          <div
            ref={sealRef}
            className="absolute top-[52%] left-[49.5%] -translate-x-1/2 -translate-y-1/2 z-25 w-18 h-18 rounded-full flex items-center justify-center cursor-pointer group-hover:scale-110 active:scale-95 transition-transform duration-300"
          >
            {/* Pulsing Golden Aura Ring */}
            <span className="absolute -inset-2.5 rounded-full border border-amber-300/80 animate-ping opacity-35 pointer-events-none" />
            <span className="absolute -inset-1 rounded-full bg-amber-400/20 blur-sm pointer-events-none" />
          </div>
        </div>
      </div>

      {/* BOTTOM INTERACTIVE BUTTON & CHEVRON */}
      <div className="relative z-20 flex flex-col items-center select-none pb-4">
        <button
          onClick={handleOpen}
          aria-label="Tap to Open Letter"
          className="group relative px-8 py-3 rounded-full bg-gradient-to-r from-[#8a245a]/85 via-[#aa3170]/90 to-[#6d1b46]/85 hover:from-[#9d2b6b] hover:via-[#be337a] hover:to-[#7b1f5c] text-white font-semibold text-xs shadow-[0_0_25px_rgba(244,114,182,0.8)] hover:shadow-[0_0_40px_rgba(244,114,182,1)] hover:scale-[1.04] active:scale-95 transition-all duration-300 cursor-pointer border border-pink-200/75 flex items-center justify-center backdrop-blur-sm"
        >
          <span className="relative z-10 flex items-center gap-2 text-white text-[13px] font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
            Tap to Open ♡
          </span>
          <span className="absolute inset-0 rounded-full border border-pink-200/60 animate-ping opacity-25" />
        </button>

        <div
          onClick={handleOpen}
          className="flex flex-col items-center cursor-pointer opacity-90 hover:opacity-100 transition-opacity mt-2"
        >
          <ChevronDown className="w-4 h-4 text-pink-200 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
