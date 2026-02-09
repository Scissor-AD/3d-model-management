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
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Animation Container - starts fullscreen, shrinks when complete */}
      <div 
        ref={containerRef}
        className={`
          relative z-10
          ${!animationComplete 
            ? 'fixed inset-0 z-50' 
            : 'w-full max-w-lg md:max-w-3xl lg:max-w-5xl'
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
          {/* Tagline */}
          <div 
            className={`
              relative z-10 mt-4 md:mt-6 text-center
              ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <AnimatedTagline />
          </div>
          
          {/* Counters Row */}
          <div className="relative z-10 mt-4 md:mt-6 w-full max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8">
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
