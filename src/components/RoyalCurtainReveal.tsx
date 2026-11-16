import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../content/birthdayData';
import { soundManager } from '../utils/audio';
import { AnimatedButterfly } from './AnimatedButterfly';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface RoyalCurtainProps {
  onRevealed?: () => void;
}

export const RoyalCurtainReveal: React.FC<RoyalCurtainProps> = ({ onRevealed }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const reduced = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const topValanceRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const seamGlowRef = useRef<HTMLDivElement>(null);

  const handleOpenCurtains = () => {
    if (isOpening || isRevealed) return;
    setIsOpening(true);

    // Play royal chime sound
    soundManager.playChime();

    // Trigger golden starburst confetti from center seam
    confetti({
      particleCount: 75,
      spread: 90,
      origin: { y: 0.5, x: 0.5 },
      colors: ['#ffd700', '#fbcfe8', '#ffffff', '#fbbf24', '#f472b6'],
      shapes: ['star', 'circle'],
      scalar: 1.1,
    });

    if (reduced) {
      setIsRevealed(true);
      soundManager.play();
      onRevealed?.();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsRevealed(true);
        // Automatically start the background song once curtains part!
        soundManager.play();
        onRevealed?.();
      },
    });

    // 1. Center card fades & gently scales back
    tl.to(centerCardRef.current, {
      scale: 0.92,
      opacity: 0,
      filter: 'blur(6px)',
      duration: 0.65,
      ease: 'power2.inOut',
    })
      // 2. Seam golden light beam floods outward
      .to(
        seamGlowRef.current,
        {
          opacity: 1,
          scaleX: 18,
          duration: 0.8,
          ease: 'power1.out',
        },
        '-=0.4'
      )
      // 3. CINEMATIC SLOW MOTION CURTAIN PARTING (2.2 seconds duration)
      .to(
        leftCurtainRef.current,
        {
          xPercent: -105,
          scaleX: 0.22,
          transformOrigin: 'left center',
          duration: 2.2,
          ease: 'power3.inOut',
        },
        '-=0.5'
      )
      .to(
        rightCurtainRef.current,
        {
          xPercent: 105,
          scaleX: 0.22,
          transformOrigin: 'right center',
          duration: 2.2,
          ease: 'power3.inOut',
        },
        '<' // Simultaneous with left curtain
      )
      // 4. Top Valance drape swags lift up smoothly
      .to(
        topValanceRef.current,
        {
          yPercent: -105,
          opacity: 0,
          duration: 1.6,
          ease: 'power2.inOut',
        },
        '-=1.9'
      )
      // 5. Fade container out smoothly
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.3'
      );
  };

  if (isRevealed) {
    return null;
  }

  const { curtainIntro } = birthdayData;

  return (
    <div
      ref={containerRef}
      onClick={handleOpenCurtains}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer select-none bg-[#100318]"
      style={{ touchAction: 'manipulation' }}
      title="Tap anywhere to open the royal curtains!"
    >
      {/* 1. LEFT VELVET CURTAIN PANEL */}
      <div
        ref={leftCurtainRef}
        className="absolute left-0 top-0 bottom-0 w-[51%] z-20 pointer-events-none will-change-transform overflow-hidden bg-gradient-to-r from-[#200324] via-[#43083c] to-[#2e052c] shadow-[15px_0_40px_rgba(0,0,0,0.8)]"
      >
        {/* Realistic Vertical Velvet Pleats Shading */}
        <div
          className="absolute inset-0 opacity-75 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(0,0,0,0.55) 0px, transparent 14px, rgba(255,255,255,0.08) 28px, rgba(0,0,0,0.6) 45px)',
          }}
        />

        {/* Ambient Warm Velvet Sheen Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

        {/* Golden Braided Edge Seam along center meeting line */}
        <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-gradient-to-b from-amber-300 via-yellow-100 to-amber-500 shadow-[0_0_15px_#fbbf24] flex flex-col justify-around py-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-100 mx-auto shadow-sm" />
          ))}
        </div>

        {/* Left Golden Curtain Tieback Rope & Hanging Tassel */}
        <div className="absolute left-2 sm:left-4 top-[58%] -translate-y-1/2 flex flex-col items-center pointer-events-none opacity-85">
          <div className="w-8 sm:w-10 h-1.5 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 shadow-[0_0_10px_#fbbf24]" />
          <div className="w-1 h-12 bg-amber-400" />
          <div className="w-3.5 h-6 rounded-b-full bg-gradient-to-b from-amber-300 to-amber-600 shadow-[0_0_8px_#f59e0b]" />
        </div>

        {/* Bottom Golden Fringe */}
        <div className="absolute bottom-0 inset-x-0 h-4 border-t-2 border-amber-300 bg-gradient-to-b from-amber-400/40 to-transparent flex justify-around items-end pb-0.5">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-2.5 bg-amber-300 rounded-b-full" />
          ))}
        </div>
      </div>

      {/* 2. RIGHT VELVET CURTAIN PANEL */}
      <div
        ref={rightCurtainRef}
        className="absolute right-0 top-0 bottom-0 w-[51%] z-20 pointer-events-none will-change-transform overflow-hidden bg-gradient-to-l from-[#200324] via-[#43083c] to-[#2e052c] shadow-[-15px_0_40px_rgba(0,0,0,0.8)]"
      >
        {/* Realistic Vertical Velvet Pleats Shading */}
        <div
          className="absolute inset-0 opacity-75 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(0,0,0,0.6) 0px, rgba(255,255,255,0.08) 17px, transparent 31px, rgba(0,0,0,0.55) 45px)',
          }}
        />

        {/* Ambient Warm Velvet Sheen Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

        {/* Golden Braided Edge Seam along center meeting line */}
        <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-b from-amber-300 via-yellow-100 to-amber-500 shadow-[0_0_15px_#fbbf24] flex flex-col justify-around py-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-100 mx-auto shadow-sm" />
          ))}
        </div>

        {/* Right Golden Curtain Tieback Rope & Hanging Tassel */}
        <div className="absolute right-2 sm:right-4 top-[58%] -translate-y-1/2 flex flex-col items-center pointer-events-none opacity-85">
          <div className="w-8 sm:w-10 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_10px_#fbbf24]" />
          <div className="w-1 h-12 bg-amber-400" />
          <div className="w-3.5 h-6 rounded-b-full bg-gradient-to-b from-amber-300 to-amber-600 shadow-[0_0_8px_#f59e0b]" />
        </div>

        {/* Bottom Golden Fringe */}
        <div className="absolute bottom-0 inset-x-0 h-4 border-t-2 border-amber-300 bg-gradient-to-b from-amber-400/40 to-transparent flex justify-around items-end pb-0.5">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-2.5 bg-amber-300 rounded-b-full" />
          ))}
        </div>
      </div>

      {/* 3. TOP THEATRICAL VALANCE SWAGS (Drapery Swags) */}
      <div
        ref={topValanceRef}
        className="absolute top-0 inset-x-0 z-30 pointer-events-none will-change-transform flex flex-col items-center"
      >
        {/* Scalloped Swag Header */}
        <div className="w-full h-14 sm:h-18 bg-gradient-to-b from-[#1b021f] via-[#3d0736] to-[#250324] border-b-2 border-amber-300 shadow-[0_8px_25px_rgba(0,0,0,0.9)] flex items-center justify-between px-4 sm:px-8 relative">
          {/* Top Hanging Fairy Lights Garland */}
          <div className="absolute top-2 inset-x-4 flex justify-between items-center opacity-90">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-[1px] h-3 bg-amber-200/60" />
                <div
                  className="w-2.5 h-2.5 rounded-full bg-gradient-to-t from-amber-300 to-yellow-100 shadow-[0_0_10px_#ffe082] animate-pulse"
                  style={{ animationDelay: `${i * 280}ms` }}
                />
              </div>
            ))}
          </div>

          {/* Valance Center Golden Crest Emblem */}
          <div className="mx-auto mt-4 px-3 py-0.5 rounded-full bg-amber-400/25 border border-amber-300/60 flex items-center gap-1.5 shadow-[0_0_12px_rgba(251,191,36,0.5)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin-slow" />
            <span className="font-serif italic text-xs text-amber-100 tracking-widest font-bold">ROYAL INVITATION</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin-slow" />
          </div>
        </div>

        {/* 3 Scalloped Velvet Festoons with golden dangling tassels */}
        <div className="w-full flex justify-center -mt-1 gap-2 px-2">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className="flex-1 max-w-[140px] h-6 sm:h-8 rounded-b-full bg-gradient-to-b from-[#350630] to-[#220320] border-b-2 border-amber-300/80 shadow-[0_4px_10px_rgba(0,0,0,0.6)] flex items-end justify-center pb-0.5"
            >
              <div className="w-1.5 h-2 rounded-b-full bg-amber-300 shadow-[0_0_6px_#fbbf24]" />
            </div>
          ))}
        </div>
      </div>

      {/* 4. CENTER SEAM GOLDEN LIGHT BEAM (Floods during slow motion reveal) */}
      <div
        ref={seamGlowRef}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 z-25 bg-gradient-to-r from-transparent via-amber-200 to-transparent blur-md opacity-70 pointer-events-none will-change-transform"
      />

      {/* 5. FLOATING BUTTERFLIES & SPARKLES ON CURTAINS */}
      <div className="absolute top-[22%] left-6 z-35 animate-float-slow pointer-events-none">
        <AnimatedButterfly size={32} color="#f472b6" />
      </div>
      <div
        className="absolute bottom-[24%] right-6 z-35 animate-float-gentle pointer-events-none"
        style={{ animationDelay: '1.5s' }}
      >
        <AnimatedButterfly size={28} color="#e879f9" />
      </div>

      {/* 6. CENTER STAGE CARD (Sitting proudly on the curtains before reveal) */}
      <div
        ref={centerCardRef}
        className="relative z-40 w-full max-w-[340px] sm:max-w-[365px] px-3 py-4 flex flex-col items-center text-center"
      >
        {/* Royal Frosted Glass Plaque */}
        <div className="w-full rounded-3xl bg-gradient-to-b from-[#180424]/90 via-[#270836]/90 to-[#190426]/90 backdrop-blur-md border-2 border-amber-300/60 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(251,191,36,0.3)] flex flex-col items-center">
          {/* Header Title: "The Special Day ♡" */}
          <div className="flex items-center gap-2 text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <h1 className="font-serif italic text-base sm:text-lg tracking-widest text-amber-100 drop-shadow-[0_0_12px_#fbbf24] font-bold">
              {curtainIntro.specialDayText}
            </h1>
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </div>

          {/* Date Badge: "3 December" */}
          <div className="my-2 px-5 py-1 rounded-full bg-gradient-to-r from-pink-500/35 via-amber-400/40 to-pink-500/35 border border-amber-300/80 shadow-[0_0_18px_rgba(251,191,36,0.5)] flex items-center gap-2">
            <span className="font-serif italic text-xs text-pink-200">Date:</span>
            <span className="font-mono text-sm sm:text-base text-white font-extrabold tracking-wider drop-shadow">
              {curtainIntro.date}
            </span>
          </div>

          {/* DIVYA'S HERO IMAGE (~35% UI Area with Ornate Royal Gold Arch Frame) */}
          <div className="relative my-2 w-[215px] sm:w-[240px] h-[265px] sm:h-[295px] rounded-t-full rounded-b-2xl border-4 border-amber-300 shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(251,191,36,0.45)] overflow-hidden select-none bg-[#1a0524]">
            {/* Divya's Real Photo Perfectly Adjusted to Frame */}
            <img
              src={curtainIntro.heroImage}
              alt={birthdayData.recipientName}
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover object-center"
              style={{
                imageRendering: '-webkit-optimize-contrast',
              }}
            />

            {/* Corner Floral Ornaments on the Frame */}
            <span className="absolute top-3 left-4 text-base filter drop-shadow select-none">🌸</span>
            <span className="absolute top-3 right-4 text-base filter drop-shadow select-none">🌸</span>
            <span className="absolute bottom-2 left-2 text-sm filter drop-shadow select-none">✨</span>
            <span className="absolute bottom-2 right-2 text-sm filter drop-shadow select-none">✨</span>
          </div>

          {/* Name & Wishes: "Happy Birthday, Divya! ♡" */}
          <div className="flex flex-col items-center mt-1 select-none">
            <span className="font-serif italic text-base sm:text-lg text-pink-100 font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {curtainIntro.greeting}
            </span>
            <h2 className="font-script text-3xl sm:text-4xl text-[#ffa6cb] font-bold tracking-wider mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_0_20px_#ff2a85]">
              {curtainIntro.recipient}
            </h2>
          </div>

          {/* INTERACTIVE CALL-TO-ACTION BUTTON */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenCurtains();
            }}
            className="group relative mt-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white font-serif italic text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(251,191,36,0.65)] hover:shadow-[0_0_35px_rgba(251,191,36,0.95)] border-2 border-amber-200 flex items-center gap-2 cursor-pointer active:scale-95 transition-all animate-bounce"
            style={{ animationDuration: '2.5s' }}
          >
            <span>{curtainIntro.buttonText}</span>
            <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-45 transition-transform" />
          </button>

          {/* Subtle Helper Hint */}
          <p className="font-sans text-[11px] sm:text-xs text-pink-100/90 font-medium mt-2 tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            (Parda kholne ke liye tap karein ♡)
          </p>
        </div>
      </div>
    </div>
  );
};
