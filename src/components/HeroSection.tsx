'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import HeroPipesAnimation from '@/components/HeroPipesAnimation';
import AnimatedTagline from '@/components/AnimatedTagline';
import SquareFootageCounter from '@/components/SquareFootageCounter';

type Phase = 'animating' | 'finalImage' | 'revealing' | 'complete';

// Timing constants (ms)
const FINAL_IMAGE_HOLD = 500;
const REVEAL_HOLD = 300;

interface HeroSectionProps {
  onComplete?: () => void;
  skipAnimation?: boolean;
}

export default function HeroSection({ onComplete, skipAnimation = false }: HeroSectionProps) {
  const [phase, setPhase] = useState<Phase>(skipAnimation ? 'complete' : 'animating');
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

  // Cleanup timeouts on unmount
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

  // Handle mid-animation skip (e.g. user clicks HOME while animation is playing)
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

  /** Called when the pipes animation finishes — starts the showcase sequence */
  const handlePipesComplete = useCallback(() => {
    if (skipAnimation) {
      setPhase('complete');
      setAnimationComplete(true);
      setShowTagline(true);
      setShowCounters([true, true, true]);
      onCompleteRef.current?.();
      return;
    }

    // Phase 1: Hold the final assembled image big (fullscreen)
    setPhase('finalImage');

    // Phase 2: Reveal — container shrinks, text elements fade in
    addTimeout(() => {
      setPhase('revealing');

      addTimeout(() => {
        setAnimationComplete(true);

        addTimeout(() => setShowTagline(true), 500);
        addTimeout(() => setShowCounters([true, true, true]), 800);

        addTimeout(() => {
          setPhase('complete');
          onCompleteRef.current?.();
        }, 1800);
      }, REVEAL_HOLD);
    }, FINAL_IMAGE_HOLD);
  }, [skipAnimation, addTimeout]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start md:justify-center pb-16 md:pb-0">
      {/* Animation Container — starts fullscreen, shrinks when complete */}
      <div
        ref={containerRef}
        className={`
          relative z-10
          ${!animationComplete
            ? 'fixed inset-0 z-50'
            : 'order-1 w-full max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl flex-1 md:flex-initial min-h-0 flex items-center justify-center'
          }
        `}
        style={{
          ...(!animationComplete
            ? { top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }
            : {}),
          transition: 'all 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        <div
          className={`
            w-full relative bg-white
            ${!animationComplete ? 'h-full' : 'aspect-[4/3] md:aspect-[16/9] lg:aspect-[2.5/1]'}
          `}
        >
          <HeroPipesAnimation onComplete={handlePipesComplete} skipAnimation={skipAnimation} />
        </div>
      </div>

      {/* ── Text Content (visible after animation) ────── */}
      {animationComplete && (
        <>
          {/* Tagline */}
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

          {/* Counters Row */}
          <div className="relative z-10 order-3 mt-4 md:mt-6 w-full max-w-4xl flex-shrink-0">
            <div className="grid grid-cols-1 md:flex md:justify-evenly gap-2 md:gap-0 justify-items-center">
              <div
                className={`${showCounters[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                style={{
                  transition:
                    'opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              >
                <SquareFootageCounter
                  targetValue={240000000}
                  duration={2200}
                  label="SQUARE FEET SCANNED"
                  suffix="sq ft"
                  slowIncrementRate={0.15}
                />
              </div>

              <div
                className={`${showCounters[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                style={{
                  transition:
                    'opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              >
                <SquareFootageCounter
                  targetValue={850}
                  duration={2600}
                  label="PROJECTS DELIVERED"
                  suffix=""
                  slowIncrementRate={0}
                />
              </div>

              <div
                className={`${showCounters[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                style={{
                  transition:
                    'opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              >
                <SquareFootageCounter
                  targetValue={98}
                  duration={2800}
                  label="ON TIME DELIVERY PERCENTAGE"
                  suffix="%"
                  slowIncrementRate={0}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
