import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { birthdayData } from '../content/birthdayData';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ChapterProps {
  onNext: () => void;
}

export const Chapter04Letter: React.FC<ChapterProps> = ({ onNext }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const parchmentRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    // Use IntersectionObserver to reliably trigger when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate parchment scale
            if (parchmentRef.current) {
              gsap.fromTo(
                parchmentRef.current,
                { scale: 0.94, opacity: 0.9, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.2)' }
              );
            }

            // Stagger letter paragraphs in
            if (textContainerRef.current) {
              const paragraphs = textContainerRef.current.querySelectorAll('.letter-line');
              gsap.fromTo(
                paragraphs,
                { opacity: 0, y: 14 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.55,
                  stagger: 0.12,
                  ease: 'power2.out',
                }
              );
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="chapter-4"
      className="chapter-section relative w-full flex flex-col items-center justify-between px-3 py-6 overflow-hidden select-none bg-gradient-to-b from-[#160422] via-[#2a0b3b] to-[#150320]"
    >
      {/* Authentic High-Resolution Blank Parchment Artwork Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/images/bg-04-letter-clean.jpg')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#140420]/75 via-transparent to-[#140420]/80 pointer-events-none" />

      {/* Semantic Screen Reader Content */}
      <div className="sr-only">
        <h2>04 • A Special Letter</h2>
        <h3>{birthdayData.chapter04.recipient} - {birthdayData.chapter04.greeting}</h3>
        <p>{birthdayData.chapter04.salutation}</p>
        {birthdayData.chapter04.paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
        <p>{birthdayData.chapter04.signOff}</p>
      </div>

      {/* Atmospheric Ambient Lighting & Radial Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-pink-500/18 rounded-full blur-[110px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[320px] h-[320px] bg-amber-400/10 rounded-full blur-[90px]" />
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

      {/* Decorative Cherry Blossom Sprigs at Top */}
      <div className="absolute top-0 inset-x-0 h-24 pointer-events-none z-10 flex justify-between px-3 overflow-hidden opacity-85">
        <div className="flex gap-2 -mt-3 text-pink-300/70 text-2xl filter drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]">
          <span>🌸</span>
          <span className="mt-2 text-base text-pink-200/60">🌸</span>
          <span className="mt-4 text-xs text-amber-200/50">✨</span>
        </div>
        <div className="flex gap-2 -mt-3 text-pink-300/70 text-2xl filter drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]">
          <span className="mt-3 text-xs text-amber-200/50">✨</span>
          <span className="mt-2 text-base text-pink-200/60">🌸</span>
          <span>🌸</span>
        </div>
      </div>

      {/* Floating Sparkles & Petal Accents */}
      <div
        className="absolute top-[20%] left-5 text-pink-300 text-lg animate-float-slow pointer-events-none"
        style={{ animationDelay: '0.5s' }}
      >
        🌸
      </div>
      <div
        className="absolute bottom-[24%] right-6 text-amber-200 text-base animate-float-gentle pointer-events-none"
        style={{ animationDelay: '1.4s' }}
      >
        ✨
      </div>

      {/* VINTAGE DECKLED-EDGE PARCHMENT SCROLL CONTENT */}
      {/* Positioned strictly inside the upper/middle printable parchment area so signature stays well above the curl */}
      <div
        ref={parchmentRef}
        onClick={onNext}
        className="absolute top-[23%] sm:top-[24%] bottom-[26%] sm:bottom-[27%] left-1/2 -translate-x-1/2 w-[76%] max-w-[295px] sm:max-w-[330px] z-20 flex flex-col justify-between px-2 sm:px-3 py-1 select-none cursor-pointer"
        title="Tap to continue"
      >
        {/* Parchment Text Container with smooth inner overflow safety */}
        <div ref={textContainerRef} className="relative z-10 flex flex-col h-full justify-between overflow-y-auto no-scrollbar scrollbar-none pr-0.5">
          {/* Top Header Block: Recipient, Birthday Greeting & Salutation */}
          <div className="shrink-0 mb-0.5">
            {/* Header: Dear lazy Divya ♡ */}
            <h2
              ref={headerRef}
              className="letter-line font-script text-2xl sm:text-3xl text-[#4a0e1c] font-bold tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] leading-tight"
            >
              {birthdayData.chapter04.recipient}
            </h2>

            {/* Subheader & Salutation row */}
            <div className="letter-line flex items-baseline justify-between mt-0.5 pb-0.5 border-b border-amber-900/20">
              <span className="font-serif italic text-[11px] sm:text-xs text-[#781835] font-bold">
                {birthdayData.chapter04.greeting}
              </span>
              <span className="font-serif italic text-[11px] sm:text-xs text-[#250d15] font-bold">
                {birthdayData.chapter04.salutation}
              </span>
            </div>
          </div>

          {/* Paragraphs with Sibling Teasing & Wishes */}
          <div className="flex flex-col gap-1 sm:gap-1.5 my-auto">
            {birthdayData.chapter04.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="letter-line font-serif italic text-[10.5px] sm:text-[12px] text-[#2c0e17] leading-[1.32] sm:leading-relaxed font-medium"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Sign-off positioned noticeably higher up, safely away from curled bottom corner */}
          <div className="letter-line shrink-0 flex justify-end items-center gap-1.5 pt-1 mt-0.5 border-t border-amber-900/20 pr-1">
            <span className="font-script text-base sm:text-lg text-[#4a0e1c] font-bold">
              {birthdayData.chapter04.signOff}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR MATCHING REFERENCE */}
      <div
        onClick={onNext}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer opacity-85 hover:opacity-100 transition-opacity select-none"
      >
        <ChevronDown className="w-5 h-5 text-pink-200 animate-bounce" />
      </div>
    </section>
  );
};
