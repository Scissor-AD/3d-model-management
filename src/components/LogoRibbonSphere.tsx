'use client';

import { useEffect, useRef, useState } from 'react';

interface Logo {
  src: string;
  alt: string;
}

interface LogoRibbonSphereProps {
  logos: Logo[];
  autoRotate?: boolean;
  rotationSpeed?: number;
  onHoverChange?: (company: string | null) => void;
}

// Company blurbs describing what 3DMM does with their equipment
export const companyBlurbs: Record<string, { name: string; blurb: string }> = {
  'NavVis': {
    name: 'NavVis',
    blurb: 'We utilize NavVis mobile mapping systems for rapid, high-fidelity indoor scanning of large-scale facilities and campuses.',
  },
  'Leica': {
    name: 'Leica Geosystems',
    blurb: 'Our team deploys Leica laser scanners for precision terrestrial surveys, delivering sub-millimeter accuracy for critical infrastructure projects.',
  },
  'FARO': {
    name: 'FARO Technologies',
    blurb: 'We leverage FARO scanning solutions for detailed as-built documentation and quality control across industrial and architectural applications.',
  },
  'Emesent': {
    name: 'Emesent',
    blurb: 'Emesent Hovermap enables our autonomous drone-based scanning in GPS-denied environments like mines, tunnels, and complex structures.',
  },
  'XGRIDS': {
    name: 'XGRIDS',
    blurb: 'We integrate XGRIDS SLAM technology for efficient mobile mapping in challenging indoor and underground environments.',
  },
  'Revit': {
    name: 'Autodesk Revit',
    blurb: 'Our BIM specialists develop intelligent Revit models from scan data, supporting design coordination and facility management workflows.',
  },
};

export default function LogoRibbonSphere({
  logos,
  autoRotate = true,
  rotationSpeed = 0.05,
  onHoverChange,
}: LogoRibbonSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
  const [phase, setPhase] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Sphere dimensions - responsive
  const [sphereSize, setSphereSize] = useState(260);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1024) {
        setSphereSize(456); // 380 * 1.2
      } else if (window.innerWidth >= 768) {
        setSphereSize(408); // 340 * 1.2
      } else {
        setSphereSize(336); // 280 * 1.2
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (!autoRotate) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
      }

      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      setPhase((prev) => (prev + delta * 0.00008) % (Math.PI * 2));
      setRotation((prev) => (prev + rotationSpeed * (delta / 16)) % 360);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoRotate, rotationSpeed]);

  const radius = sphereSize / 2;
  const itemCount = logos.length;
  const angleStep = 360 / itemCount;

  const tiltX = Math.sin(phase) * 12;
  const tiltZ = Math.sin(phase * 2) * 25;
  const morphIntensity = 0.5 + Math.sin(phase) * 0.5;
  const easedMorph = morphIntensity * morphIntensity * (3 - 2 * morphIntensity);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-80 md:h-96 lg:h-[28rem] flex items-center justify-center"
      style={{ perspective: '900px' }}
      onMouseLeave={() => {
        setHoveredLogo(null);
        onHoverChange?.(null);
      }}
    >
      {/* Container with continuous flowing motion */}
      <div
        className="relative"
        style={{
          width: sphereSize,
          height: sphereSize * 0.75,
          transformStyle: 'preserve-3d',
          transform: `
            rotateX(${tiltX}deg) 
            rotateZ(${tiltZ}deg) 
            rotateY(${rotation}deg)
          `,
        }}
      >
        {logos.map((logo, index) => {
          const baseAngle = angleStep * index;
          
          const effectiveAngle = (baseAngle + rotation) % 360;
          const normalizedAngle = effectiveAngle > 180 ? effectiveAngle - 360 : effectiveAngle;
          const facingCamera = Math.cos((normalizedAngle * Math.PI) / 180);
          const isFront = facingCamera > -0.2;

          const carouselY = 0;
          const carouselRadius = radius * 0.8;

          const sphereT = (index / (itemCount - 1)) * 1.4 - 0.7;
          const waveOffset = Math.sin(phase * 1.5 + index * 0.8) * 6;
          const sphereY = sphereT * radius * 0.5 + waveOffset;
          const sphereRadius = Math.sqrt(Math.max(0.4, 1 - sphereT * sphereT * 0.6)) * radius * 0.85;

          const currentY = carouselY + (sphereY - carouselY) * easedMorph;
          const currentRadius = carouselRadius + (sphereRadius - carouselRadius) * easedMorph;

          const breathe = 1 + Math.sin(phase * 2.5 + index * 0.6) * 0.025;
          
          const isHovered = hoveredLogo === logo.alt;
          const baseOpacity = isFront ? 0.4 + facingCamera * 0.6 : 0.1;
          const opacity = isHovered ? 1 : baseOpacity;
          const scale = ((isFront ? 0.88 + facingCamera * 0.12 : 0.72) * breathe) * (isHovered ? 1.15 : 1);

          const blur = isFront ? 0 : 1.2;
          const counterTiltZ = -tiltZ * 0.8;

          return (
            <div
              key={index}
              className="absolute flex items-center justify-center cursor-pointer"
              style={{
                width: 168,
                height: 90,
                left: '50%',
                top: '50%',
                marginLeft: -84,
                marginTop: -45,
                transformStyle: 'preserve-3d',
                transform: `
                  translateY(${currentY}px)
                  rotateY(${baseAngle}deg)
                  translateZ(${currentRadius}px)
                  rotateY(0deg)
                  rotateZ(${counterTiltZ}deg)
                  scale(${scale})
                `,
                zIndex: isHovered ? 100 : isFront ? 10 : 1,
                pointerEvents: isFront ? 'auto' : 'none',
              }}
              onMouseEnter={() => {
                if (isFront) {
                  setHoveredLogo(logo.alt);
                  onHoverChange?.(logo.alt);
                }
              }}
              onMouseLeave={() => {
                setHoveredLogo(null);
                onHoverChange?.(null);
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-[144px] max-h-[78px] object-contain select-none"
                draggable={false}
                style={{
                  opacity,
                  filter: `grayscale(${isFront && !isHovered ? 0 : isHovered ? 0 : 0.5}) blur(${blur}px)`,
                  transition: 'opacity 0.2s ease, filter 0.2s ease, transform 0.2s ease',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Subtle shadow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: sphereSize * 0.5,
          height: 16,
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: `radial-gradient(ellipse, rgba(0,0,0,${0.03 + easedMorph * 0.02}) 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
      />
    </div>
  );
}
