'use client';

import HeroPipesAnimation from '@/components/HeroPipesAnimation';
import AnimatedTagline from '@/components/AnimatedTagline';
import SquareFootageCounter from '@/components/SquareFootageCounter';

export default function HeroSection() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start md:justify-center pb-4 md:pb-0">
      {/* Point cloud viewer — mobile: capped so tagline + stats fit; desktop: aspect-ratio driven */}
      <div className="relative z-10 order-1 w-full flex-1 md:flex-initial min-h-0 flex items-center justify-center">
        <div className="w-full relative bg-white overflow-hidden aspect-[3/4] max-h-[55dvh] md:max-h-none md:aspect-[16/9] lg:aspect-[2.5/1]">
          <HeroPipesAnimation />
        </div>
      </div>

      {/* Tagline — below point cloud */}
      <div className="relative z-10 order-2 mt-2 md:mt-4 text-center flex-shrink-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
        <AnimatedTagline />
      </div>

      {/* Desktop: counters in separate row below tagline */}
      <div className="relative z-10 order-3 mt-4 md:mt-8 w-full max-w-4xl flex-shrink-0 px-4 md:px-0 hidden md:flex md:justify-evenly">
        <SquareFootageCounter targetValue={240000000} duration={2200} label="SQUARE FEET SCANNED" suffix="sq ft" slowIncrementRate={0.15} variant="hero" />
        <SquareFootageCounter targetValue={850} duration={2600} label="PROJECTS DELIVERED" suffix="" slowIncrementRate={0} variant="hero" />
        <SquareFootageCounter targetValue={98} duration={2800} label="ON TIME DELIVERY PERCENTAGE" suffix="%" slowIncrementRate={0} variant="hero" />
      </div>

      {/* Mobile: counter card in separate row */}
      <div className="relative z-10 order-4 mt-2 md:mt-0 w-full max-w-4xl flex-shrink-0 px-4 md:px-0">
        <div className="md:hidden rounded-lg border border-[var(--border)] bg-white/80 backdrop-blur-sm px-2 py-2 animate-fade-in" style={{ animationDelay: '0.35s', animationFillMode: 'backwards' }}>
          <div className="grid grid-cols-2 divide-x divide-[var(--border)]">
            <SquareFootageCounter targetValue={240000000} duration={2200} label="SQ FT SCANNED" suffix="sq ft" slowIncrementRate={0.15} />
            <SquareFootageCounter targetValue={98} duration={2800} label="ON TIME" suffix="%" slowIncrementRate={0} />
          </div>
          <div className="border-t border-[var(--border)] pt-2 mt-2 flex justify-center">
            <SquareFootageCounter targetValue={850} duration={2600} label="PROJECTS DELIVERED" suffix="" slowIncrementRate={0} />
          </div>
        </div>
      </div>
    </div>
  );
}
