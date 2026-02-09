'use client';

import { useState, useEffect, useRef } from 'react';
import HeroPipesAnimation from '@/components/HeroPipesAnimation';
import AnimatedTagline from '@/components/AnimatedTagline';
import SquareFootageCounter from '@/components/SquareFootageCounter';

export default function HeroSection() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showCounters, setShowCounters] = useState([false, false, false]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle animation complete - start resize and text reveal sequence
  const handleAnimationComplete = () => {
    setAnimationComplete(true);
    
    // After resize animation settles, show text elements in sequence with smooth timing
    // Fade in tagline first (wait for resize transition to complete)
    setTimeout(() => setShowTagline(true), 1400);
    
    // Then counters with smooth stagger
    setTimeout(() => setShowCounters([true, false, false]), 1900);
    setTimeout(() => setShowCounters([true, true, false]), 2200);
    setTimeout(() => setShowCounters([true, true, true]), 2500);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start md:justify-center">
      {/* On mobile: tagline and counters first (order-1, order-2), then carousel centered in remaining space (order-3, flex-1). On desktop: carousel first, then tagline, then counters. */}
      {/* Animation Container - starts fullscreen, shrinks when complete. On mobile when complete, sits in flex-1 area below text and is centered there. */}
      <div 
        ref={containerRef}
        className={`
          relative z-10
          ${!animationComplete 
            ? 'fixed inset-0 z-50' 
            : 'order-3 md:order-1 w-full max-w-lg md:max-w-3xl lg:max-w-5xl flex-1 md:flex-initial min-h-0 flex items-center justify-center'
          }
        `}
        style={{
          // Fullscreen during animation
          ...((!animationComplete) ? {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
          } : {}),
          // Smooth resize transition
          transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div 
          className={`
            w-full relative bg-white
            ${!animationComplete 
              ? 'h-full' 
              : 'aspect-[4/3] md:aspect-[16/9] lg:aspect-[2.5/1]'
            }
          `}
        >
          <HeroPipesAnimation onComplete={handleAnimationComplete} />
        </div>
      </div>

      {/* Text Content - only visible after animation */}
      {animationComplete && (
        <>
          {/* Tagline - on mobile order-1 (top), on desktop order-2 */}
          <div 
            className={`
              relative z-10 order-1 md:order-2 mt-0 md:mt-6 text-center flex-shrink-0
              ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <AnimatedTagline />
          </div>
          
          {/* Counters Row - on mobile order-2, on desktop order-3 */}
          <div className="relative z-10 order-2 md:order-3 mt-4 md:mt-6 w-full max-w-3xl flex-shrink-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 justify-items-center">
              <div 
                className={`
                  ${showCounters[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                `}
                style={{
                  transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
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
                className={`
                  ${showCounters[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                `}
                style={{
                  transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
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
                className={`
                  ${showCounters[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                `}
                style={{
                  transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
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
