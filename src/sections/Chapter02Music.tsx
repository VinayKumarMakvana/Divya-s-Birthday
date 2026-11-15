import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, ChevronDown } from 'lucide-react';
import { birthdayData } from '../content/birthdayData';
import { soundManager, AudioState } from '../utils/audio';
import { AnimatedButterfly } from '../components/AnimatedButterfly';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ChapterProps {
  onNext: () => void;
}

const IDLE_EQ_HEIGHTS = [6, 10, 14, 18, 22, 26, 28, 26, 22, 18, 14, 10, 6];

export const Chapter02Music: React.FC<ChapterProps> = ({ onNext }) => {
  const [audioState, setAudioState] = useState<AudioState>(soundManager.getState());
  const [barHeights, setBarHeights] = useState(IDLE_EQ_HEIGHTS);
  const sectionRef = useRef<HTMLElement>(null);
  const vinylWrapRef = useRef<HTMLDivElement>(null);
  const vinylDiskRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const unsub = soundManager.subscribe((state) => setAudioState(state));
    return unsub;
  }, []);

  // Equalizer animation: dynamic audio pulsing when playing, gentle breathing wave when idle
  useEffect(() => {
    if (!audioState.isPlaying) {
      // Gentle ambient breathing wave when idle
      const interval = setInterval(() => {
        setBarHeights(
          IDLE_EQ_HEIGHTS.map((base, idx) =>
            Math.round(base * (0.8 + Math.sin(Date.now() / 400 + idx * 0.4) * 0.25))
          )
        );
      }, 100);
      return () => clearInterval(interval);
    }
    const interval = setInterval(() => {
      setBarHeights(
        IDLE_EQ_HEIGHTS.map((base) =>
          Math.max(6, Math.round(base * (0.5 + Math.random() * 1.3)))
        )
      );
    }, 110);
    return () => clearInterval(interval);
  }, [audioState.isPlaying]);

  const handleTogglePlay = () => {
    soundManager.playChime();
    soundManager.toggle();
  };

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // SCROLL-DRIVEN GSAP ANIMATION: Vinyl spins dynamically as user scrolls down!
      if (vinylDiskRef.current) {
        gsap.to(vinylDiskRef.current, {
          rotation: 720,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Parallax float on vinyl wrapper
      if (vinylWrapRef.current) {
        gsap.fromTo(
          vinylWrapRef.current,
          { opacity: 0, scale: 0.85, y: -20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Text reveal
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
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
      id="chapter-2"
      className="chapter-section relative w-full flex flex-col items-center justify-between px-4 py-8 overflow-hidden select-none bg-gradient-to-b from-[#160523] via-[#2a0b3e] to-[#170422]"
    >
      {/* Clean High-Resolution 3D Sakura Garden Background (Zero Text, Zero UI) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/images/bg-02-music.jpg')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#140420]/75 via-black/40 to-[#140420]/80 pointer-events-none" />

      {/* Soft Ambient Radial Lights (Champagne & Magenta Glow) */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[360px] h-[360px] rounded-full bg-pink-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full bg-purple-600/20 blur-[90px] pointer-events-none" />

      {/* Floating Animated Butterflies */}
      <div className="absolute top-20 left-6 z-20 animate-float-slow pointer-events-none">
        <AnimatedButterfly size={32} color="#f472b6" />
      </div>
      <div
        className="absolute bottom-28 right-5 z-20 animate-float-gentle pointer-events-none"
        style={{ animationDelay: '1.6s' }}
      >
        <AnimatedButterfly size={26} color="#ffd54f" />
      </div>

      {/* Floating Sparkles & Petal Accents */}
      <div
        className="absolute top-36 right-8 text-pink-300 text-lg animate-float-gentle pointer-events-none"
        style={{ animationDelay: '0.8s' }}
      >
        🌸
      </div>
      <div
        className="absolute bottom-36 left-6 text-amber-200 text-sm animate-float-slow pointer-events-none"
        style={{ animationDelay: '2.2s' }}
      >
        ✨
      </div>

      {/* Top Bar: Clean Right-Aligned Skip Button matching reference */}
      <div className="relative z-20 w-full max-w-sm flex items-center justify-end pt-2 pr-14">
        <button
          onClick={onNext}
          className="text-xs font-serif italic text-pink-100 hover:text-white px-4 py-1.5 rounded-full bg-[#3d1838]/80 border border-pink-300/50 backdrop-blur-md transition-all hover:bg-pink-500/50 flex items-center gap-1 shadow-md cursor-pointer active:scale-95"
        >
          <span>{birthdayData.chapter02.skipText}</span>
        </button>
      </div>

      {/* Centerpiece: Realistic Luxury Vinyl Record & Glowing Soundwave */}
      <div
        ref={vinylWrapRef}
        className="relative z-20 max-w-sm w-full flex flex-col items-center my-auto py-2"
      >
        {/* Vinyl Container */}
        <div className="relative mb-5 flex flex-col items-center">
          {/* Glowing Radial Halo behind Vinyl */}
          <div
            className={`absolute -inset-8 rounded-full bg-gradient-to-tr from-pink-500/35 via-purple-600/30 to-amber-300/25 blur-3xl transition-all duration-700 pointer-events-none ${
              audioState.isPlaying ? 'scale-110 opacity-100' : 'scale-90 opacity-40'
            }`}
          />

          {/* Authentic High-End Vinyl Disc */}
          <div
            onClick={handleTogglePlay}
            className="relative w-56 h-56 sm:w-60 sm:h-60 rounded-full bg-[#0d0b10] p-2.5 shadow-[0_0_50px_rgba(244,114,182,0.45),0_15px_35px_rgba(0,0,0,0.8)] cursor-pointer group transition-transform hover:scale-105 active:scale-95 border border-pink-300/30"
          >
            {/* Rotating Disc */}
            <div
              ref={vinylDiskRef}
              className={`w-full h-full rounded-full relative overflow-hidden transition-transform ${
                audioState.isPlaying ? 'animate-spin-slow' : ''
              }`}
              style={{
                background: 'radial-gradient(circle at center, #1a1622 0%, #0d0b10 100%)',
              }}
            >
              {/* Vinyl Sound Grooves (Fine Concentric Circles) */}
              <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-6 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-10 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-12 rounded-full border border-white/5 pointer-events-none" />

              {/* Anisotropic Light Sheen (Simulating LP Light Reflection) */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none opacity-40 mix-blend-screen"
                style={{
                  background:
                    'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.18) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.18) 225deg, transparent 270deg)',
                }}
              />

              {/* Center Circular Album Art Label (Pure Cherry Blossom Painting) */}
              <div className="absolute inset-0 m-auto w-24 h-24 sm:w-26 sm:h-26 rounded-full overflow-hidden border-2 border-pink-200/90 shadow-[0_0_15px_rgba(0,0,0,0.6)] flex items-center justify-center bg-gradient-to-tr from-pink-400 to-purple-600">
                <img
                  src="/images/vinyl-label.jpg"
                  alt="Cherry blossom twilight album label"
                  className="w-full h-full object-cover filter brightness-105"
                />
                {/* Spindle hole in dead center */}
                <div className="absolute w-3.5 h-3.5 rounded-full bg-[#0d0b10] border-2 border-amber-200/90 shadow-inner z-20" />
              </div>
            </div>

            {/* Hover Play/Pause indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-pink-500/90 backdrop-blur-md flex items-center justify-center text-white shadow-xl">
                {audioState.isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </div>
            </div>
          </div>

          {/* Dancing Glowing Equalizer Soundwave Bars positioned directly beneath the vinyl */}
          <div className="flex items-end justify-center gap-1.5 px-4 pt-3.5 select-none pointer-events-none h-9">
            {barHeights.map((h, i) => (
              <div
                key={i}
                className="w-1 sm:w-1.5 rounded-full bg-gradient-to-t from-pink-500 via-rose-300 to-white transition-all duration-150 shadow-[0_0_8px_rgba(244,114,182,0.9)]"
                style={{ height: `${Math.max(6, h)}px` }}
              />
            ))}
          </div>
        </div>

        {/* Text Section Matching Reference */}
        <div ref={textRef} className="text-center px-4 mb-4">
          <h2 className="font-script text-3xl sm:text-4xl text-pink-100 drop-shadow-[0_0_20px_rgba(244,114,182,0.8)] leading-tight mb-2">
            Let's Add Some Music<br />To This Special Journey ♡
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-pink-200/90 font-light leading-relaxed max-w-xs mx-auto drop-shadow">
            A soft melody to 🎶 make your birthday experience even more magical😁
          </p>
        </div>

        {/* Interactive Play/Pause Button */}
        <div className="flex flex-col items-center select-none mt-1">
          <button
            ref={playBtnRef}
            onClick={handleTogglePlay}
            aria-label={audioState.isPlaying ? 'Pause Music' : 'Play Music'}
            className="group relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#9d2b6b] via-[#d946ef] to-[#ec4899] text-white flex items-center justify-center shadow-[0_0_35px_rgba(244,114,182,0.95),0_0_20px_rgba(255,216,117,0.7)] hover:shadow-[0_0_55px_rgba(244,114,182,1)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/90"
          >
            {audioState.isPlaying ? (
              <Pause className="w-7 h-7 fill-white text-white drop-shadow" />
            ) : (
              <Play className="w-7 h-7 fill-white text-white ml-1 drop-shadow" />
            )}
            {/* Subtle pulsing ripple rings when playing */}
            {audioState.isPlaying && (
              <span className="absolute -inset-2 rounded-full border border-pink-300/60 animate-ping opacity-35 pointer-events-none" />
            )}
          </button>

          <span className="text-[10px] tracking-wider text-pink-200/90 font-mono mt-2 drop-shadow">
            {audioState.isPlaying ? 'Playing Melody ♫' : 'Tap to Play ♫'}
          </span>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        onClick={onNext}
        className="relative z-20 flex flex-col items-center gap-1 cursor-pointer opacity-85 hover:opacity-100 transition-opacity pb-2"
      >
        <span className="text-[10px] tracking-wider text-pink-200 uppercase font-mono">
          Scroll to explore
        </span>
        <ChevronDown className="w-4 h-4 text-pink-200 animate-bounce" />
      </div>
    </section>
  );
};
