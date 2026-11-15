import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RoyalCurtainReveal } from './components/RoyalCurtainReveal';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { BackgroundParticles } from './components/BackgroundParticles';
import { killAllScrollTriggers } from './animations/gsapHelpers';

import { Chapter01Entrance } from './sections/Chapter01Entrance';
import { Chapter02Music } from './sections/Chapter02Music';
import { Chapter03Envelope } from './sections/Chapter03Envelope';
import { Chapter04Letter } from './sections/Chapter04Letter';
import { Chapter05Memories } from './sections/Chapter05Memories';
import { Chapter06Cake } from './sections/Chapter06Cake';
import { Chapter07WishMade } from './sections/Chapter07WishMade';
import { Chapter08Special } from './sections/Chapter08Special';
import { Chapter09Wishes } from './sections/Chapter09Wishes';
import { Chapter10Finale } from './sections/Chapter10Finale';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  useEffect(() => {
    // Refresh ScrollTrigger after initial render so measurements are accurate
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeout);
      // Kill all ScrollTrigger instances when app unmounts (dev HMR safety)
      killAllScrollTriggers();
    };
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#12061e] text-white selection:bg-pink-500 selection:text-white overflow-x-hidden font-body">
      {/* Cinematic Ambient Grain Overlay */}
      <div className="grain-overlay" />

      {/* Interactive Background Particle Canvas (Petals, Sparkles, Orbs) */}
      <BackgroundParticles />

      {/* Floating Persistent Music Player */}
      <FloatingMusicPlayer />

      {/* Grand Royal Curtain Opening (Theatrical Slow Motion Reveal) */}
      <RoyalCurtainReveal onRevealed={() => scrollToChapter('chapter-1')} />

      {/* The 10 Scroll Chapters */}
      <main className="relative z-10 w-full flex flex-col items-center">
        {/* Mobile Viewport Container Constraint for authentic phone preview / wide responsive handling */}
        <div className="w-full max-w-xl mx-auto flex flex-col items-center shadow-2xl relative">
          <Chapter01Entrance onNext={() => scrollToChapter('chapter-2')} />
          <Chapter02Music onNext={() => scrollToChapter('chapter-3')} />
          <Chapter03Envelope onOpenLetter={() => scrollToChapter('chapter-4')} />
          <Chapter04Letter onNext={() => scrollToChapter('chapter-5')} />
          <Chapter05Memories onNext={() => scrollToChapter('chapter-6')} />
          <Chapter06Cake onWishMade={() => scrollToChapter('chapter-7')} />
          <Chapter07WishMade
            onNext={() => scrollToChapter('chapter-8')}
            onRelight={() => scrollToChapter('chapter-6')}
          />
          <Chapter08Special onNext={() => scrollToChapter('chapter-9')} />
          <Chapter09Wishes onNext={() => scrollToChapter('chapter-10')} />
          <Chapter10Finale onRestart={() => scrollToChapter('chapter-1')} />
        </div>
      </main>
    </div>
  );
};

export default App;

