'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import HeroPipesAnimation from '@/components/HeroPipesAnimation';
import AnimatedTagline from '@/components/AnimatedTagline';
import SquareFootageCounter from '@/components/SquareFootageCounter';

type Phase = 'animating' | 'finalImage' | 'stat0' | 'stat1' | 'stat2' | 'revealing' | 'complete';

const SHOWCASE_STATS = [
  { value: 240000000, suffix: 'sq ft', label: 'SQUARE FEET SCANNED' },
  { value: 850, suffix: '', label: 'PROJECTS DELIVERED' },
  { value: 98, suffix: '%', label: 'ON TIME DELIVERY PERCENTAGE' },
];

// Timing constants (ms)
const FINAL_IMAGE_HOLD = 800;
const STAT_DURATION = 1200;  // longer hold for each stat — more luxurious pacing
const REVEAL_HOLD = 300;

interface HeroSectionProps {
  onComplete?: () => void;
  skipAnimation?: boolean;
}

/**
 * Large centered stat display with premium count-up animation.
 * Uses easeOutExpo for dramatic deceleration — numbers rush in
 * then elegantly settle. The suffix fades alongside the number
 * while the label reveals with its own CSS-driven stagger.
 */
function ShowcaseStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 750;
    let frame: number;
    let startTime: number;

    // easeOutExpo — dramatic initial rush, elegant deceleration
    const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -12 * t));

    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = ease(progress);

      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    // Delay start so the CSS blur-to-sharp entrance is visible first
    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(animate);
    }, 220);

    return () => {
      clearTimeout(timeout);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div className="text-center px-4">
      <div className="flex items-baseline justify-center gap-2 md:gap-3">
        <span
          className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight leading-none"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {displayValue.toLocaleString()}
        </span>
        {suffix && (
          <span className="font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl text-[var(--muted)] font-medium leading-none">
            {suffix}
          </span>
        )}
      </div>
      {/* .stat-label class triggers a staggered CSS reveal */}
      <div className="stat-label mt-4 md:mt-6 font-display text-[11px] sm:text-xs md:text-sm tracking-[0.3em] text-[var(--muted)] uppercase">
        {label}
      </div>
    </div>
  );
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

    // Phase 2–4: Each stat shown big and centered
    addTimeout(() => setPhase('stat0'), FINAL_IMAGE_HOLD);
    addTimeout(() => setPhase('stat1'), FINAL_IMAGE_HOLD + STAT_DURATION);
    addTimeout(() => setPhase('stat2'), FINAL_IMAGE_HOLD + STAT_DURATION * 2);

    // Phase 5: Reveal — container shrinks, text elements fade in
    addTimeout(() => {
      setPhase('revealing');

      addTimeout(() => {
        setAnimationComplete(true);

        addTimeout(() => setShowTagline(true), 1000);
        addTimeout(() => setShowCounters([true, false, false]), 1300);
        addTimeout(() => setShowCounters([true, true, false]), 1600);
        addTimeout(() => setShowCounters([true, true, true]), 1900);

        addTimeout(() => {
          setPhase('complete');
          onCompleteRef.current?.();
        }, 2400);
      }, REVEAL_HOLD);
    }, FINAL_IMAGE_HOLD + STAT_DURATION * 3);
  }, [skipAnimation, addTimeout]);

  const statPhaseIndex =
    phase === 'stat0' ? 0 : phase === 'stat1' ? 1 : phase === 'stat2' ? 2 : -1;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start md:justify-center">
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
          transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
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

      {/* ── Stat Showcase Overlay ────────────────────────── */}
      {/* Persistent white backdrop while any stat is showing */}
      {statPhaseIndex >= 0 && (
        <div className="fixed inset-0 z-[55] bg-white" />
      )}

      {/* Stat content — key forces remount per phase so animation replays */}
      {statPhaseIndex >= 0 && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          key={phase}
        >
          <div className="stat-showcase-enter">
            <ShowcaseStat
              value={SHOWCASE_STATS[statPhaseIndex].value}
              suffix={SHOWCASE_STATS[statPhaseIndex].suffix}
              label={SHOWCASE_STATS[statPhaseIndex].label}
            />
          </div>
        </div>
      )}

      {/* ── Text Content (visible after animation) ────── */}
      {animationComplete && (
        <>
          {/* Tagline */}
          <div
            className={`
              relative z-10 order-2 mt-4 md:mt-6 text-center flex-shrink-0
              ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{
              transition:
                'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <AnimatedTagline />
          </div>

          {/* Counters Row */}
          <div className="relative z-10 order-3 mt-4 md:mt-6 w-full max-w-4xl flex-shrink-0">
            <div className="grid grid-cols-1 md:flex md:justify-evenly gap-2 md:gap-0 justify-items-center">
              <div
                className={`${showCounters[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{
                  transition:
                    'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <SquareFootageCounter
                  targetValue={240000000}
                  duration={1500}
                  label="SQUARE FEET SCANNED"
                  suffix="sq ft"
                  slowIncrementRate={0.15}
                />
              </div>

              <div
                className={`${showCounters[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{
                  transition:
                    'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <SquareFootageCounter
                  targetValue={850}
                  duration={2000}
                  label="PROJECTS DELIVERED"
                  suffix=""
                  slowIncrementRate={0}
                />
              </div>

              <div
                className={`${showCounters[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{
                  transition:
                    'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <SquareFootageCounter
                  targetValue={98}
                  duration={2200}
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
