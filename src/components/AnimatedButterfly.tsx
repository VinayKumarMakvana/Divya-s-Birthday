import React from 'react';

interface ButterflyProps {
  className?: string;
  size?: number;
  color?: string;
  glow?: boolean;
}

export const AnimatedButterfly: React.FC<ButterflyProps> = ({
  className = '',
  size = 28,
  color = '#f472b6',
  glow = true,
}) => {
  return (
    <div
      className={`inline-block relative select-none pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        filter: glow ? `drop-shadow(0 0 8px ${color})` : undefined,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        fill="none"
      >
        <defs>
          <linearGradient id={`bfGrad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor={color} stopOpacity="0.85" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        {/* Left Wing */}
        <g className="wing-left" style={{ transformOrigin: '50px 50px' }}>
          <path
            d="M 50,50 C 40,25 15,18 10,35 C 5,50 30,55 50,55 Z"
            fill={`url(#bfGrad-${color})`}
          />
          <path
            d="M 50,55 C 35,58 20,70 25,82 C 30,90 44,75 50,58 Z"
            fill={`url(#bfGrad-${color})`}
            opacity="0.85"
          />
        </g>
        {/* Right Wing */}
        <g className="wing-right" style={{ transformOrigin: '50px 50px' }}>
          <path
            d="M 50,50 C 60,25 85,18 90,35 C 95,50 70,55 50,55 Z"
            fill={`url(#bfGrad-${color})`}
          />
          <path
            d="M 50,55 C 65,58 80,70 75,82 C 70,90 56,75 50,58 Z"
            fill={`url(#bfGrad-${color})`}
            opacity="0.85"
          />
        </g>
        {/* Body */}
        <ellipse cx="50" cy="54" rx="2" ry="12" fill="#ffe4e6" />
        {/* Antennae */}
        <path d="M 49,43 Q 44,35 41,36" stroke="#fbcfe8" strokeWidth="1" strokeLinecap="round" />
        <path d="M 51,43 Q 56,35 59,36" stroke="#fbcfe8" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
};

