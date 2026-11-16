import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { birthdayData, MemoryItem } from '../content/birthdayData';
import { ModalImageViewer } from '../components/ModalImageViewer';
import { soundManager } from '../utils/audio';
import { AnimatedButterfly } from '../components/AnimatedButterfly';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ChapterProps {
  onNext: () => void;
}

export const Chapter05Memories: React.FC<ChapterProps> = ({ onNext }) => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const polaroid1Ref = useRef<HTMLDivElement>(null);
  const polaroid2Ref = useRef<HTMLDivElement>(null);
  const polaroid3Ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleOpenPhoto = (mem: MemoryItem) => {
    soundManager.playChime();
    setSelectedMemory(mem);
  };

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // 1. Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. STAGGERED FLIGHT: Images arrive ONE BY ONE sequentially onto the screen
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Polaroid 1 swoops from top-right with tilt bounce
      if (polaroid1Ref.current) {
        tl.fromTo(
          polaroid1Ref.current,
          { y: -140, x: 40, rotate: 22, opacity: 0, scale: 0.8 },
          {
            y: 0,
            x: 0,
            rotate: 5,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: 'back.out(1.4)',
          }
        );
      }

      // Polaroid 2 slides from left with spring bounce
      if (polaroid2Ref.current) {
        tl.fromTo(
          polaroid2Ref.current,
          { x: -160, y: -20, rotate: -24, opacity: 0, scale: 0.8 },
          {
            x: 0,
            y: 0,
            rotate: -7,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: 'back.out(1.4)',
          },
          '-=0.35' // begins before #1 finishes for natural stagger
        );
      }

      // Polaroid 3 rises from bottom-right with spring bounce
      if (polaroid3Ref.current) {
        tl.fromTo(
          polaroid3Ref.current,
          { y: 140, x: 40, rotate: -15, opacity: 0, scale: 0.8 },
          {
            y: 0,
            x: 0,
            rotate: 4,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: 'back.out(1.4)',
          },
          '-=0.35'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="chapter-5"
      className="chapter-section relative w-full flex flex-col items-center justify-between px-4 py-6 overflow-hidden select-none bg-gradient-to-b from-[#150320] via-[#2c093a] to-[#170423]"
    >
      {/* Clean High-Resolution 3D Scrapbook Background (Zero Text, Zero UI) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/images/bg-05-memories.jpg')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#140420]/75 via-transparent to-[#140420]/80 pointer-events-none" />

      {/* Semantic Screen Reader Content */}
      <div className="sr-only">
        <h2>05 • Our Beautiful Memories</h2>
        <p>A collection of our favourite moments together ♡</p>
      </div>

      {/* Atmospheric Ambient Lighting & Radial Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[360px] h-[360px] bg-pink-500/18 rounded-full blur-[110px]" />
        <div className="absolute bottom-[25%] left-[5%] w-[320px] h-[320px] bg-purple-600/22 rounded-full blur-[100px]" />
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
        className="absolute top-[35%] right-6 z-20 animate-float-gentle pointer-events-none"
        style={{ animationDelay: '1.2s' }}
      >
        <AnimatedButterfly size={32} color="#f472b6" />
      </div>
      <div
        className="absolute bottom-[35%] left-5 z-20 animate-float-slow pointer-events-none"
        style={{ animationDelay: '2.2s' }}
      >
        <AnimatedButterfly size={28} color="#e879f9" />
      </div>

      {/* Floating Sparkles & Petal Accents */}
      <div
        className="absolute top-[18%] left-5 text-pink-300 text-lg animate-float-slow pointer-events-none"
        style={{ animationDelay: '0.7s' }}
      >
        🌸
      </div>
      <div
        className="absolute bottom-[22%] right-5 text-amber-200 text-base animate-float-gentle pointer-events-none"
        style={{ animationDelay: '1.5s' }}
      >
        ✨
      </div>

      {/* Top Heading matching Reference */}
      <div ref={headerRef} className="relative z-20 pt-6 text-center select-none">
        <h2 className="font-serif italic text-3xl sm:text-4xl text-pink-100 tracking-wide drop-shadow-[0_2px_12px_rgba(255,182,193,0.6)] leading-tight">
          Our Beautiful
        </h2>
        <p className="font-script text-3xl sm:text-4xl text-pink-200 tracking-wider mt-0.5 drop-shadow-[0_2px_10px_rgba(244,114,182,0.5)]">
          Memories ♡
        </p>
      </div>

      {/* SCRAPBOOK POLAROID GALLERY LAYOUT (Staggered Animation Flight on Scroll) */}
      <div className="relative z-20 w-full max-w-[370px] sm:max-w-[400px] h-[460px] my-auto">
        {/* Polaroid 1 (Top-Right: Childhood / Sunrise) */}
        <div
          ref={polaroid1Ref}
          onClick={() => handleOpenPhoto(birthdayData.chapter05.memories[0])}
          className="absolute top-2 right-1 sm:right-4 w-[165px] sm:w-[175px] bg-white p-2.5 pb-5 rounded-sm shadow-[0_14px_32px_rgba(0,0,0,0.65)] cursor-pointer group hover:scale-105 active:scale-95 transition-all duration-300 z-10"
          title="View Sunrise Memory"
        >
          {/* Realistic Washi Tape across top-center */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-100/75 border-y border-amber-200/60 shadow-xs backdrop-blur-xs rotate-[-3deg] z-20 pointer-events-none" />

          {/* Photo Frame */}
          <div className="relative w-full aspect-square overflow-hidden bg-neutral-900 rounded-xs">
            <img
              src="/images/polaroid-1.jpg"
              alt="Memory 1"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-pink-500/10 group-hover:opacity-0 transition-opacity" />
          </div>

          <div className="mt-1.5 text-center">
            <span className="font-script text-xs text-neutral-800 font-bold block drop-shadow-xs">Sweet childhood ♡</span>
          </div>
        </div>

        {/* Polaroid 2 (Middle-Left: Brother & Sister smiling together) */}
        <div
          ref={polaroid2Ref}
          onClick={() => handleOpenPhoto(birthdayData.chapter05.memories[1])}
          className="absolute top-[140px] left-1 sm:left-3 w-[175px] sm:w-[185px] bg-white p-2.5 pb-5 rounded-sm shadow-[0_18px_38px_rgba(0,0,0,0.7)] cursor-pointer group hover:scale-105 active:scale-95 transition-all duration-300 z-20"
          title="View Brother & Sister Memory"
        >
          {/* Realistic Washi Tape across top-left */}
          <div className="absolute -top-3 left-3 w-16 h-5 bg-pink-100/80 border-y border-pink-200/60 shadow-xs backdrop-blur-xs rotate-[8deg] z-20 pointer-events-none" />

          {/* Photo Frame */}
          <div className="relative w-full aspect-square overflow-hidden bg-neutral-900 rounded-xs">
            <img
              src="/images/polaroid-2.jpg"
              alt="Memory 2"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-pink-500/10 group-hover:opacity-0 transition-opacity" />
          </div>

          <div className="mt-1.5 text-center">
            <span className="font-script text-xs text-neutral-800 font-bold block drop-shadow-xs">Always by your side ♡</span>
          </div>
        </div>

        {/* Polaroid 3 (Bottom-Right: Beach Sunset Silhouette) */}
        <div
          ref={polaroid3Ref}
          onClick={() => handleOpenPhoto(birthdayData.chapter05.memories[2])}
          className="absolute top-[270px] right-2 sm:right-5 w-[165px] sm:w-[175px] bg-white p-2.5 pb-5 rounded-sm shadow-[0_16px_35px_rgba(0,0,0,0.65)] cursor-pointer group hover:scale-105 active:scale-95 transition-all duration-300 z-15"
          title="View Beach Memory"
        >
          {/* Realistic Washi Tape across top-right */}
          <div className="absolute -top-3 right-3 w-16 h-5 bg-amber-100/75 border-y border-amber-200/60 shadow-xs backdrop-blur-xs rotate-[-5deg] z-20 pointer-events-none" />

          {/* Photo Frame */}
          <div className="relative w-full aspect-square overflow-hidden bg-neutral-900 rounded-xs">
            <img
              src="/images/polaroid-3.jpg"
              alt="Memory 3"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-pink-500/10 group-hover:opacity-0 transition-opacity" />
          </div>

          <div className="mt-1.5 text-center">
            <span className="font-script text-xs text-neutral-800 font-bold block drop-shadow-xs">Endless smiles ✨</span>
          </div>
        </div>

        {/* Floating Decorative Petal on Scrapbook */}
        <div className="absolute bottom-4 left-6 text-pink-300/80 text-xl pointer-events-none animate-float-slow">
          🌸
        </div>
      </div>

      {/* Subtitle & Bottom Scroll Indicator matching Reference */}
      <div
        onClick={onNext}
        className="relative z-20 flex flex-col items-center pb-4 cursor-pointer opacity-90 hover:opacity-100 transition-opacity select-none text-center"
      >
        <p className="font-serif italic text-sm text-pink-100 font-medium tracking-wide mb-1.5 leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)]">
          A collection of our<br />favourite moments together ♡
        </p>
        <ChevronDown className="w-5 h-5 text-pink-200 animate-bounce" />
      </div>

      {/* Modal Image Viewer for Tap Interactions */}
      <ModalImageViewer
        memory={selectedMemory}
        memories={birthdayData.chapter05.memories}
        onSelect={setSelectedMemory}
        onClose={() => setSelectedMemory(null)}
      />
    </section>
  );
};
