import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { birthdayData } from '../content/birthdayData';
import { soundManager } from '../utils/audio';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ChapterProps {
  onNext: () => void;
}

export const Chapter09Wishes: React.FC<ChapterProps> = ({ onNext }) => {
  const [wishIndex, setWishIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const jarRef = useRef<HTMLDivElement>(null);
  const wishTextRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const wishes = birthdayData.chapter09.wishes;

  const triggerJarSparkles = () => {
    confetti({
      particleCount: 22,
      spread: 50,
      origin: { y: 0.62 },
      colors: ['#ffd700', '#ffeb3b', '#fff9c4', '#fbcfe8'],
      shapes: ['star', 'circle'],
      scalar: 0.8,
    });
  };

  const nextWish = () => {
    soundManager.playChime();
    triggerJarSparkles();
    setWishIndex((prev) => (prev + 1) % wishes.length);
  };

  const prevWish = () => {
    soundManager.playChime();
    triggerJarSparkles();
    setWishIndex((prev) => (prev - 1 + wishes.length) % wishes.length);
  };

  useEffect(() => {
    if (!wishTextRef.current) return;
    // 3D Flip & Pop on wish parchment note
    gsap.fromTo(
      wishTextRef.current,
      { rotateY: 90, opacity: 0, scale: 0.85 },
      { rotateY: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }
    );
  }, [wishIndex]);

  return (
    <section
      ref={sectionRef}
      id="chapter-9"
      className="chapter-section relative w-full flex flex-col items-center justify-between px-4 py-6 overflow-hidden select-none bg-gradient-to-b from-[#0b0416] via-[#1a082e] to-[#0d031c]"
    >
      {/* Clean High-Resolution 3D Midnight Sky & Wish Jar Artwork (Zero Text, Zero UI) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/images/bg-09-wishes.jpg')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#140420]/75 via-transparent to-[#140420]/80 pointer-events-none" />

      {/* Semantic Screen Reader Content */}
      <div className="sr-only">
        <h2>09 • A Sky Full of Wishes</h2>
        <p>Heartfelt birthday wishes in a magical illuminated jar</p>
      </div>

      {/* Atmospheric Ambient Lighting & Midnight Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-amber-400/18 rounded-full blur-[110px]" />
        <div className="absolute bottom-[20%] left-1/4 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px]" />
      </div>

      {/* Top Heading matching Reference */}
      <div className="relative z-20 pt-6 text-center select-none">
        <h2 className="font-serif italic text-3xl sm:text-4xl text-pink-100 tracking-wide drop-shadow-[0_2px_12px_rgba(255,182,193,0.6)] leading-tight">
          A Sky Full
        </h2>
        <p className="font-script text-3xl sm:text-4xl text-pink-200 tracking-wider mt-0.5 drop-shadow-[0_2px_10px_rgba(244,114,182,0.5)]">
          of Wishes ♡
        </p>
      </div>

      {/* CENTERPIECE: WISH TEXT POSITIONED PRECISELY INSIDE THE 3D GLASS JAR */}
      <div
        ref={jarRef}
        className="relative z-20 w-full max-w-[340px] flex items-center justify-center mt-auto mb-14 select-none pt-40 sm:pt-44"
      >
        {/* Carousel Left Navigation Arrow */}
        <button
          onClick={prevWish}
          aria-label="Previous Wish"
          className="absolute left-1 z-30 w-9 h-9 rounded-full bg-black/45 hover:bg-black/75 border border-pink-300/40 text-pink-100 flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-lg backdrop-blur-xs"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* The Wish Text Tag & Dots (Positioned directly inside the illuminated 3D Glass Jar) */}
        <div
          onClick={nextWish}
          className="relative w-[210px] sm:w-[230px] flex flex-col items-center justify-center cursor-pointer select-none px-2 perspective-1000"
          title="Tap jar to read next wish!"
        >
          {/* Active Warm Glowing Parchment Note Inside Jar with 3D Card Flip */}
          <div
            ref={wishTextRef}
            className="relative z-20 w-[195px] sm:w-[220px] rounded-xl bg-gradient-to-br from-[#fffdf7]/98 via-[#fef8ea]/95 to-[#fcf0d5]/95 p-3.5 text-center shadow-[0_0_25px_rgba(255,216,117,0.75),0_6px_20px_rgba(0,0,0,0.6)] border-2 border-amber-300/90 preserve-3d"
          >
            <p className="font-serif italic text-[12.5px] sm:text-sm text-[#4a0d1e] font-bold leading-relaxed">
              "{wishes[wishIndex]}"
            </p>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="relative z-20 flex gap-1.5 mt-2.5">
            {wishes.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playChime();
                  triggerJarSparkles();
                  setWishIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  wishIndex === i
                    ? 'bg-amber-300 shadow-[0_0_8px_#ffd54f] scale-125'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Carousel Right Navigation Arrow */}
        <button
          onClick={nextWish}
          aria-label="Next Wish"
          className="absolute right-1 z-30 w-9 h-9 rounded-full bg-black/45 hover:bg-black/75 border border-pink-300/40 text-pink-100 flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-lg backdrop-blur-xs"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Subtitle & Bottom Scroll Indicator matching Reference */}
      <div
        onClick={onNext}
        className="relative z-20 flex flex-col items-center pb-4 cursor-pointer opacity-90 hover:opacity-100 transition-opacity select-none text-center"
      >
        <p className="font-serif italic text-xs sm:text-sm text-pink-100 font-medium tracking-wide mb-1.5 drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)]">
          Tap the jar or arrows to reveal more wishes ♡
        </p>
        <ChevronDown className="w-5 h-5 text-pink-200 animate-bounce" />
      </div>
    </section>
  );
};
