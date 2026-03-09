'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface SquareFootageCounterProps {
  targetValue: number;
  duration?: number;
  label?: string;
  suffix?: string;
  slowIncrementRate?: number; // SF per second after reaching target
  variant?: 'default' | 'hero';
}

export default function SquareFootageCounter({
  targetValue,
  duration = 5000,
  label = 'SQUARE FEET CAPTURED',
  suffix = 'SF',
  slowIncrementRate = 3, // ~3 SF per second after reaching target
  variant = 'default',
}: SquareFootageCounterProps) {
  const isHero = variant === 'hero';
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isSlowCounting, setIsSlowCounting] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const slowCountRef = useRef<number | null>(null);

  const startSlowCount = useCallback(() => {
    setIsSlowCounting(true);
    let currentCount = targetValue;
    let lastTime = Date.now();
    let accumulator = 0;

    const tick = () => {
      const now = Date.now();
      const delta = now - lastTime;
      lastTime = now;
      
      // Accumulate fractional SF
      accumulator += (slowIncrementRate * delta) / 1000;
      
      // Only update when we have at least 1 SF to add
      if (accumulator >= 1) {
        const toAdd = Math.floor(accumulator);
        accumulator -= toAdd;
        currentCount += toAdd;
        setCount(currentCount);
      }
      
      slowCountRef.current = requestAnimationFrame(tick);
    };

    slowCountRef.current = requestAnimationFrame(tick);
  }, [targetValue, slowIncrementRate]);

  const animateCounter = useCallback(() => {
    const startTime = Date.now();
    const startValue = 0;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuint — graceful, smooth deceleration
      const easeOutQuint = 1 - Math.pow(1 - progress, 5);
      
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuint);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(targetValue);
        // Start slow counting after reaching target (only if rate > 0)
        if (slowIncrementRate > 0) {
          startSlowCount();
        }
      }
    };

    requestAnimationFrame(updateCounter);
  }, [duration, targetValue, startSlowCount, slowIncrementRate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
      if (slowCountRef.current) {
        cancelAnimationFrame(slowCountRef.current);
      }
    };
  }, [hasAnimated, animateCounter]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
    <div 
      ref={counterRef}
      className="flex flex-col items-center gap-0 md:gap-1 py-0.5 md:py-0 w-full md:w-auto"
    >
      <div className={`flex items-baseline ${suffix ? 'gap-1 md:gap-1.5' : ''}`}>
        <span 
          className={`font-display tracking-tight tabular-nums ${isHero ? 'text-[1.1rem] md:text-[1.375rem] lg:text-[1.65rem] font-bold' : 'text-sm md:text-2xl lg:text-3xl font-bold md:font-semibold'}`}
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {formatNumber(count)}
        </span>
        {suffix && (
          <span className={`font-display text-[var(--muted)] font-medium ${isHero ? 'text-[10px] md:text-[13px] lg:text-[15px]' : 'text-[9px] md:text-sm lg:text-base'}`}>
            {suffix}
          </span>
        )}
      </div>
      <span className={`font-display tracking-[0.08em] md:tracking-[0.2em] text-[var(--muted)] uppercase text-center leading-tight ${isHero ? 'text-[8px] md:text-[11px] lg:text-[12px]' : 'text-[7px] md:text-[11px]'}`}>
        {label}
      </span>
    </div>
  );
}
