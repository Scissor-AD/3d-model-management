'use client';

import { useState } from 'react';

interface Logo {
  src: string;
  alt: string;
  scale?: number;
}

interface Logo3DCarouselThreeProps {
  logos: Logo[];
  autoRotate?: boolean;
  rotationSpeed?: number;
  className?: string;
}

export default function Logo3DCarouselThree({
  logos,
  autoRotate = true,
  rotationSpeed = 0.3,
  className = '',
}: Logo3DCarouselThreeProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Map rotationSpeed to a sensible marquee duration (lower = slower)
  const duration = Math.max(12, Math.round(20 / rotationSpeed));

  // Duplicate the full set for seamless infinite scroll
  // (the scrollLogos keyframe translates -50%, so doubling creates a perfect loop)
  const track = [...logos, ...logos];

  return (
    <div
      className={`relative w-full h-[200px] md:h-[280px] lg:h-full lg:min-h-[200px] flex items-center justify-center overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient fade — left edge */}
      <div
        className="absolute inset-y-0 left-0 w-20 md:w-32 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, var(--surface) 0%, transparent 100%)',
        }}
      />

      {/* Gradient fade — right edge */}
      <div
        className="absolute inset-y-0 right-0 w-20 md:w-32 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, var(--surface) 0%, transparent 100%)',
        }}
      />

      {/* Scrolling track */}
      <div
        className="flex items-center"
        style={{
          width: 'max-content',
          animation: `scrollLogos ${duration}s linear infinite`,
          animationPlayState: isPaused || !autoRotate ? 'paused' : 'running',
        }}
      >
        {track.map((logo, index) => (
          <div
            key={index}
            className="group flex-shrink-0 flex flex-col items-center justify-center mx-8 md:mx-14 lg:mx-16"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-10 md:h-14 lg:h-16 w-auto max-w-[120px] md:max-w-[160px] lg:max-w-[180px] object-contain select-none transition-opacity duration-300 opacity-70 group-hover:opacity-100"
              style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
              draggable={false}
            />
            <span className="mt-2 md:mt-3 font-display text-[10px] md:text-xs tracking-widest text-[var(--muted)] uppercase select-none pointer-events-none">
              {logo.alt}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
