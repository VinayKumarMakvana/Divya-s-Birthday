import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Fade + slide entrance triggered by scroll. Returns cleanup fn. */
export function scrollReveal(
  targets: gsap.TweenTarget,
  triggerEl?: Element | null,
  fromVars?: gsap.TweenVars,
  toVars?: gsap.TweenVars,
  stVars?: ScrollTrigger.Vars
) {
  const tween = gsap.fromTo(
    targets,
    { opacity: 0, y: 32, ...(fromVars ?? {}) },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power3.out',
      ...(toVars ?? {}),
      scrollTrigger: {
        trigger: triggerEl ?? (targets as Element),
        start: 'top 88%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...(stVars ?? {}),
      },
    }
  );
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

/** Staggered entrance for a list of elements. Returns cleanup fn. */
export function staggerReveal(
  targets: gsap.TweenTarget,
  triggerEl?: Element | null,
  fromVars?: gsap.TweenVars,
  toVars?: gsap.TweenVars,
  stVars?: ScrollTrigger.Vars
) {
  const tween = gsap.fromTo(
    targets,
    { opacity: 0, y: 40, scale: 0.95, ...(fromVars ?? {}) },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.65,
      stagger: 0.12,
      ease: 'back.out(1.4)',
      ...(toVars ?? {}),
      scrollTrigger: {
        trigger: triggerEl ?? (targets as Element),
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        ...(stVars ?? {}),
      },
    }
  );
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

/** Kill all ScrollTrigger instances — call on unmount */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}
