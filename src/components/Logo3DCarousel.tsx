'use client';

import { useEffect, useRef, useState } from 'react';

interface Logo {
  src: string;
  alt: string;
}

interface Logo3DCarouselProps {
  logos: Logo[];
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export default function Logo3DCarousel({ 
  logos, 
  autoRotate = true, 
  rotationSpeed = 0.3 
}: Logo3DCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const itemCount = logos.length;
  const angleStep = 360 / itemCount;
  // Radius of the cylinder - larger on desktop
  const [radius, setRadius] = useState(180);

  useEffect(() => {
    const updateRadius = () => {
      // Larger radius on desktop
      if (window.innerWidth >= 1024) {
        setRadius(260); // lg screens
      } else if (window.innerWidth >= 768) {
        setRadius(220); // md screens
      } else {
        setRadius(180); // mobile
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useEffect(() => {
    if (!autoRotate || isPaused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }
      
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      
      setRotation(prev => (prev + rotationSpeed * (delta / 16)) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoRotate, isPaused, rotationSpeed]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-48 md:h-64 lg:h-72 flex items-center justify-center"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        {logos.map((logo, index) => {
          const angle = angleStep * index;
          // Calculate opacity based on position - items at back are more faded
          const normalizedAngle = ((angle + rotation) % 360 + 360) % 360;
          const isFront = normalizedAngle > 270 || normalizedAngle < 90;
          const opacity = isFront ? 1 : 0.3;
          const scale = isFront ? 1 : 0.85;
          
          return (
            <div
              key={index}
              className="absolute flex items-center justify-center transition-opacity duration-300 w-[120px] h-[80px] md:w-[160px] md:h-[120px] lg:w-[180px] lg:h-[130px]"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'visible',
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-[100px] max-h-[60px] md:max-w-[140px] md:max-h-[100px] lg:max-w-[160px] lg:max-h-[110px] object-contain transition-all duration-300"
                style={{
                  opacity,
                  transform: `rotateY(0deg) scale(${scale})`,
                  filter: isFront ? 'none' : 'grayscale(0.3)',
                }}
              />
            </div>
          );
        })}
      </div>
      
      {/* Gradient overlays for depth effect */}
      <div 
        className="absolute inset-y-0 left-0 w-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, var(--surface) 0%, transparent 100%)',
        }}
      />
      <div 
        className="absolute inset-y-0 right-0 w-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, var(--surface) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
