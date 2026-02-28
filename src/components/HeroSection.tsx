'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import HeroPipesAnimation from '@/components/HeroPipesAnimation';
import AnimatedTagline from '@/components/AnimatedTagline';
import SquareFootageCounter from '@/components/SquareFootageCounter';

type Phase = 'loading' | 'revealing' | 'complete';

interface HeroSectionProps {
  onComplete?: () => void;
  skipAnimation?: boolean;
}

export default function HeroSection({ onComplete, skipAnimation = false }: HeroSectionProps) {
  const [phase, setPhase] = useState<Phase>(skipAnimation ? 'complete' : 'loading');
  const [animationComplete, setAnimationComplete] = useState(skipAnimation);
  const [showTagline, setShowTagline] = useState(skipAnimation);
  const [showCounters, setShowCounters] = useState(
    skipAnimation ? [true, true, true] : [false, false, false]
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const addTimeout = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    if (skipAnimation && phase !== 'complete') {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      setPhase('complete');
      setAnimationComplete(true);
      setShowTagline(true);
      setShowCounters([true, true, true]);
    }
  }, [skipAnimation, phase]);

  const handleViewerReady = useCallback(() => {
    if (skipAnimation) {
      setPhase('complete');
      setAnimationComplete(true);
      setShowTagline(true);
      setShowCounters([true, true, true]);
      onCompleteRef.current?.();
      return;
    }

    setPhase('revealing');
    setAnimationComplete(true);

    addTimeout(() => setShowTagline(true), 400);
    addTimeout(() => setShowCounters([true, true, true]), 700);

    addTimeout(() => {
      setPhase('complete');
      onCompleteRef.current?.();
    }, 1600);
  }, [skipAnimation, addTimeout]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start md:justify-center pb-16 md:pb-0">
      {/* Viewer container -- starts fullscreen during load, settles into layout */}
      <div
        ref={containerRef}
        className="relative z-10 order-1 w-full flex-1 md:flex-initial min-h-0 flex items-center justify-center"
      >
        <div className="w-full relative bg-white overflow-hidden aspect-[3/4] md:aspect-[16/9] lg:aspect-[2.5/1]">
          <HeroPipesAnimation onComplete={handleViewerReady} skipAnimation={skipAnimation} />
        </div>
      </div>

      {/* Text content (visible after viewer loads) */}
      {animationComplete && (
        <>
          <div
            className={`
              relative z-10 order-2 mt-4 md:mt-6 text-center flex-shrink-0
              ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
            `}
            style={{
              transition:
                'opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
          >
            <AnimatedTagline />
          </div>

          <div
            className={`relative z-10 order-3 mt-3 md:mt-6 w-full max-w-4xl flex-shrink-0 px-4 md:px-0 ${showCounters[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transition: 'opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
          >
            <div className="md:hidden rounded-lg border border-[var(--border)] bg-white/80 backdrop-blur-sm px-2 py-2">
              <div className="grid grid-cols-2 divide-x divide-[var(--border)]">
                <SquareFootageCounter targetValue={240000000} duration={2200} label="SQ FT SCANNED" suffix="sq ft" slowIncrementRate={0.15} />
                <SquareFootageCounter targetValue={98} duration={2800} label="ON TIME" suffix="%" slowIncrementRate={0} />
              </div>
            </div>
            <div className="hidden md:flex md:justify-evenly">
              <SquareFootageCounter targetValue={240000000} duration={2200} label="SQUARE FEET SCANNED" suffix="sq ft" slowIncrementRate={0.15} />
              <SquareFootageCounter targetValue={850} duration={2600} label="PROJECTS DELIVERED" suffix="" slowIncrementRate={0} />
              <SquareFootageCounter targetValue={98} duration={2800} label="ON TIME DELIVERY PERCENTAGE" suffix="%" slowIncrementRate={0} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
