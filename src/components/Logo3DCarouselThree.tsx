'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Image } from '@react-three/drei';
import * as THREE from 'three';

interface Logo {
  src: string;
  alt: string;
}

interface Logo3DCarouselThreeProps {
  logos: Logo[];
  autoRotate?: boolean;
  rotationSpeed?: number;
  className?: string;
}

function LogoRing({ logos, rotationSpeed = 0.2 }: { logos: Logo[]; rotationSpeed: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const count = logos.length;
  const radius = 3.2;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed * delta;
    }
  });

  return (
    <group ref={groupRef}>
      {logos.map((logo, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        return (
          <Float key={i} speed={0.5} floatIntensity={0.2}>
            <group position={[x, 0, z]} rotation={[0, -angle, 0]}>
              <Image
                url={logo.src}
                alt={logo.alt}
                scale={[1.8, 1.2]}
                transparent
                toneMapped={false}
              />
            </group>
          </Float>
        );
      })}
    </group>
  );
}

export default function Logo3DCarouselThree({
  logos,
  autoRotate = true,
  rotationSpeed = 0.2,
  className = '',
}: Logo3DCarouselThreeProps) {
  return (
    <div className={`relative w-full h-[360px] md:h-[480px] lg:h-full lg:min-h-[400px] flex items-center justify-center ${className}`}>
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-[var(--muted)]">Loading...</div>}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['transparent']} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-5, -3, -5]} intensity={0.4} />
          <LogoRing logos={logos} rotationSpeed={autoRotate ? rotationSpeed : 0} />
        </Canvas>
      </Suspense>
    </div>
  );
}
