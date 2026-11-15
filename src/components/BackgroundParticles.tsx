import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'petal' | 'sparkle' | 'orb';
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

export const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle count: modest for smooth 60fps on mobile
    const particleCount = window.innerWidth < 768 ? 32 : 55;
    const particles: Particle[] = [];

    const petalColors = ['#f472b6', '#fbcfe8', '#fda4af', '#f43f5e', '#e879f9'];
    const sparkleColors = ['#ffd54f', '#ffffff', '#ffeaa7', '#fce7f3'];
    const orbColors = ['rgba(244, 114, 182, 0.12)', 'rgba(168, 85, 247, 0.08)', 'rgba(253, 224, 71, 0.07)'];

    for (let i = 0; i < particleCount; i++) {
      const randType = Math.random();
      let type: 'petal' | 'sparkle' | 'orb' = 'petal';
      let size = 6 + Math.random() * 8;
      let color = petalColors[Math.floor(Math.random() * petalColors.length)];

      if (randType < 0.45) {
        type = 'petal';
      } else if (randType < 0.85) {
        type = 'sparkle';
        size = 1.5 + Math.random() * 3;
        color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
      } else {
        type = 'orb';
        size = 25 + Math.random() * 50;
        color = orbColors[Math.floor(Math.random() * orbColors.length)];
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        speedX: (Math.random() - 0.5) * 0.8 + 0.3,
        speedY: type === 'orb' ? (Math.random() - 0.5) * 0.3 : 0.6 + Math.random() * 1.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: type === 'orb' ? 0.3 : 0.3 + Math.random() * 0.5,
        type,
        color,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.globalAlpha = opacity;
      context.fillStyle = color;

      context.beginPath();
      // Curved organic petal path
      context.moveTo(0, 0);
      context.bezierCurveTo(size * 0.8, -size * 0.6, size * 1.2, size * 0.5, 0, size * 1.4);
      context.bezierCurveTo(-size * 1.2, size * 0.5, -size * 0.8, -size * 0.6, 0, 0);
      context.closePath();
      context.fill();

      // Subtle center vein
      context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      context.lineWidth = 0.6;
      context.beginPath();
      context.moveTo(0, 2);
      context.lineTo(0, size * 0.9);
      context.stroke();

      context.restore();
    };

    const drawSparkle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.globalAlpha = opacity;
      context.fillStyle = color;

      // 4-pointed star
      context.beginPath();
      for (let i = 0; i < 4; i++) {
        context.lineTo(Math.cos((i * Math.PI) / 2) * size * 1.5, Math.sin((i * Math.PI) / 2) * size * 1.5);
        context.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.35), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.35));
      }
      context.closePath();
      context.fill();
      context.restore();
    };

    const drawOrb = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number
    ) => {
      context.save();
      context.globalAlpha = opacity;
      const grad = context.createRadialGradient(x, y, 0, x, y, size);
      grad.addColorStop(0, color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = grad;
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      scrollVelocity = Math.min(Math.max(delta * 0.12, -4), 10);
      lastScrollY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth decay of scroll velocity
      scrollVelocity *= 0.93;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.wobble += p.wobbleSpeed + Math.abs(scrollVelocity) * 0.02;
        p.x += p.speedX + Math.sin(p.wobble) * (0.8 + Math.abs(scrollVelocity) * 0.3);
        p.y += p.speedY + scrollVelocity * 0.7;
        p.rotation += p.rotationSpeed + scrollVelocity * 0.015;

        // Wrap around borders
        if (p.y > height + 50) {
          p.y = -40;
          p.x = Math.random() * width;
        } else if (p.y < -50) {
          p.y = height + 40;
          p.x = Math.random() * width;
        }
        if (p.x > width + 40) {
          p.x = -30;
        } else if (p.x < -40) {
          p.x = width + 30;
        }

        if (p.type === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.opacity);
        } else if (p.type === 'sparkle') {
          // twinkling opacity
          const twinkle = p.opacity * (0.6 + 0.4 * Math.sin(time * 0.005 + i));
          drawSparkle(ctx, p.x, p.y, p.size, p.color, twinkle);
        } else if (p.type === 'orb') {
          drawOrb(ctx, p.x, p.y, p.size, p.color, p.opacity);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
};

