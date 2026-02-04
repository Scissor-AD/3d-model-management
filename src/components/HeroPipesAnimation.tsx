'use client';

import { useRef, useState, useEffect } from 'react';

// Layer configuration - 4 layers stack together
const LAYER_IMAGES = [
  { src: '/layer-3.png', label: 'Interior' },
  { src: '/layer-4.png', label: 'Structure' },
  { src: '/hero-image.png', label: 'Complete Model' },
  { src: '/hero-final.png', label: 'Final' },
];

interface HeroPipesAnimationProps {
  onComplete?: () => void;
}

export default function HeroPipesAnimation({ onComplete }: HeroPipesAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  
  // Animation refs
  const layerElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const totalLayers = LAYER_IMAGES.length;

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const allImages = LAYER_IMAGES.map(l => l.src);
    
    allImages.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount === allImages.length) {
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount === allImages.length) {
          setIsLoading(false);
        }
      };
      img.src = src;
    });
  }, []);

  // Main animation loop
  useEffect(() => {
    if (isLoading || isComplete) return;

    // Easing functions
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // ============================================
    // STORYBOARD - Tight, clean sequence
    // ============================================
    // Phase 1: SCAN (0-2000ms) - Hero image with scan line
    // Phase 2: REVEAL (2000-3200ms) - Hero fades, layers appear spread
    // Phase 3: HOLD SPREAD (3200-4500ms) - Layers visible, spread apart
    // Phase 4: ASSEMBLE (4500-7500ms) - Layers smoothly stack together
    // Phase 5: FINALIZE (7500-8500ms) - Merge into final image
    // ============================================
    
    const SCAN_END = 2000;
    const REVEAL_END = 3200;
    const HOLD_END = 4500;
    const ASSEMBLE_END = 7500;
    const FINAL_END = 8500;

    const startAnimation = () => {
      startTimeRef.current = Date.now();
      
      // Initialize all elements to correct starting state
      if (heroImageRef.current) {
        heroImageRef.current.style.opacity = '1';
      }
      layerElementsRef.current.forEach((el) => {
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(0) scale(0.85)';
        }
      });
      if (scanLineRef.current) {
        scanLineRef.current.style.opacity = '0';
        scanLineRef.current.style.top = '20%';
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;

      // Animation complete
      if (elapsed >= FINAL_END) {
        setIsComplete(true);
        
        // Final state - only last layer visible
        layerElementsRef.current.forEach((el, idx) => {
          if (el) {
            el.style.opacity = idx === totalLayers - 1 ? '1' : '0';
            el.style.transform = 'translateY(0) translateZ(0) rotateX(0) scale(1)';
          }
        });
        if (heroImageRef.current) heroImageRef.current.style.opacity = '0';
        if (scanLineRef.current) scanLineRef.current.style.opacity = '0';
        
        if (onComplete) onComplete();
        return;
      }

      // Determine phase
      let phase: 'scan' | 'reveal' | 'hold' | 'assemble' | 'finalize';
      let progress: number;

      if (elapsed < SCAN_END) {
        phase = 'scan';
        progress = elapsed / SCAN_END;
      } else if (elapsed < REVEAL_END) {
        phase = 'reveal';
        progress = (elapsed - SCAN_END) / (REVEAL_END - SCAN_END);
      } else if (elapsed < HOLD_END) {
        phase = 'hold';
        progress = (elapsed - REVEAL_END) / (HOLD_END - REVEAL_END);
      } else if (elapsed < ASSEMBLE_END) {
        phase = 'assemble';
        progress = (elapsed - HOLD_END) / (ASSEMBLE_END - HOLD_END);
      } else {
        phase = 'finalize';
        progress = (elapsed - ASSEMBLE_END) / (FINAL_END - ASSEMBLE_END);
      }

      // Update status text
      if (statusTextRef.current) {
        statusTextRef.current.textContent = 
          phase === 'scan' ? 'SCANNING MODEL' :
          phase === 'reveal' ? 'ANALYZING LAYERS' :
          phase === 'hold' ? 'LAYERS DETECTED' :
          phase === 'assemble' ? 'ASSEMBLING MODEL' :
          'COMPLETE';
      }

      // ============================================
      // PHASE 1: SCAN - Show hero with scanning line
      // ============================================
      if (phase === 'scan') {
        // Hero image fully visible
        if (heroImageRef.current) {
          heroImageRef.current.style.opacity = '1';
        }
        
        // Scan line animation
        if (scanLineRef.current) {
          const scanStart = 0.1;  // Start at 10%
          const scanEnd = 0.85;   // End at 85%
          
          if (progress < scanStart) {
            // Fade in at top
            const fadeIn = easeOutCubic(progress / scanStart);
            scanLineRef.current.style.opacity = String(fadeIn);
            scanLineRef.current.style.top = '20%';
          } else if (progress < scanEnd) {
            // Move down smoothly
            const moveProgress = (progress - scanStart) / (scanEnd - scanStart);
            const eased = easeInOutCubic(moveProgress);
            scanLineRef.current.style.opacity = '1';
            scanLineRef.current.style.top = `${20 + eased * 60}%`; // 20% to 80%
          } else {
            // Fade out at bottom
            const fadeOut = easeOutCubic((progress - scanEnd) / (1 - scanEnd));
            scanLineRef.current.style.opacity = String(1 - fadeOut);
          }
        }
        
        // Layers hidden
        layerElementsRef.current.forEach((el) => {
          if (el) el.style.opacity = '0';
        });
      }

      // ============================================
      // PHASE 2: REVEAL - Hero fades, layers appear
      // ============================================
      if (phase === 'reveal') {
        // Fade out hero
        if (heroImageRef.current) {
          heroImageRef.current.style.opacity = String(1 - easeOutQuart(progress));
        }
        
        // Hide scan line
        if (scanLineRef.current) {
          scanLineRef.current.style.opacity = '0';
        }
        
        // Layers fade in and spread to positions (smaller scale)
        layerElementsRef.current.forEach((el, index) => {
          if (!el) return;
          
          const offset = (index - (totalLayers - 1) / 2) * 110;
          const rotation = 10 - (index * 3);
          
          // Staggered appear
          const stagger = index * 0.12;
          const layerProgress = Math.max(0, Math.min(1, (progress - stagger) / (1 - stagger * 0.5)));
          const eased = easeOutQuart(layerProgress);
          
          el.style.opacity = String(eased * 0.9);
          el.style.transform = `translateY(${offset * eased}px) translateZ(${index * 15}px) rotateX(${rotation * eased}deg) scale(${0.55 + 0.05 * eased})`;
        });
      }

      // ============================================
      // PHASE 3: HOLD - Layers visible and spread (smaller)
      // ============================================
      if (phase === 'hold') {
        // Hero hidden
        if (heroImageRef.current) {
          heroImageRef.current.style.opacity = '0';
        }
        
        // Layers at full spread positions (smaller scale)
        layerElementsRef.current.forEach((el, index) => {
          if (!el) return;
          
          const offset = (index - (totalLayers - 1) / 2) * 110;
          const rotation = 10 - (index * 3);
          
          // Slight settle animation
          const settle = easeOutCubic(Math.min(1, progress * 3));
          
          el.style.opacity = String(0.9 + settle * 0.05);
          el.style.transform = `translateY(${offset}px) translateZ(${index * 15}px) rotateX(${rotation}deg) scale(${0.6 + 0.02 * settle})`;
        });
      }

      // ============================================
      // PHASE 4: ASSEMBLE - Layers stack together
      // ============================================
      if (phase === 'assemble') {
        if (heroImageRef.current) {
          heroImageRef.current.style.opacity = '0';
        }
        
        layerElementsRef.current.forEach((el, index) => {
          if (!el) return;
          
          const offset = (index - (totalLayers - 1) / 2) * 110;
          const rotation = 10 - (index * 3);
          const isLastLayer = index === totalLayers - 1;
          
          // Smooth assembly
          const eased = easeInOutQuart(progress);
          
          // Position moves from spread to stacked
          const y = offset * (1 - eased);
          const rot = rotation * (1 - eased);
          // Scale from small (0.62) to full size (1.0)
          const scale = 0.62 + (0.38 * eased);
          
          // Non-final layers fade out in last 30%
          let opacity: number;
          if (isLastLayer) {
            opacity = 0.95 + (0.05 * eased);
          } else if (progress > 0.7) {
            const fadeProgress = (progress - 0.7) / 0.3;
            opacity = 0.95 - (easeOutCubic(fadeProgress) * 0.95);
          } else {
            opacity = 0.95;
          }
          
          el.style.opacity = String(opacity);
          el.style.transform = `translateY(${y}px) translateZ(${index * 15 * (1 - eased)}px) rotateX(${rot}deg) scale(${scale})`;
        });
      }

      // ============================================
      // PHASE 5: FINALIZE - Clean up to final image
      // ============================================
      if (phase === 'finalize') {
        if (heroImageRef.current) {
          heroImageRef.current.style.opacity = '0';
        }
        
        layerElementsRef.current.forEach((el, index) => {
          if (!el) return;
          
          const isLastLayer = index === totalLayers - 1;
          
          el.style.transform = 'translateY(0) translateZ(0) rotateX(0) scale(1)';
          el.style.opacity = isLastLayer ? '1' : '0';
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Small delay then start
    const delayTimeout = setTimeout(startAnimation, 300);

    return () => {
      clearTimeout(delayTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isLoading, isComplete, totalLayers, onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full bg-white overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-24 h-16">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute left-1/2 -translate-x-1/2 w-16 h-2 rounded-sm transition-all duration-300"
                  style={{
                    top: `${10 + i * 22}%`,
                    background: i < imagesLoaded 
                      ? `linear-gradient(90deg, #2563EB, #10B981)` 
                      : '#E5E7EB',
                    opacity: i < imagesLoaded ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 tracking-[0.25em] uppercase">
              Loading {imagesLoaded}/{totalLayers}
            </span>
          </div>
        </div>
      )}

      {/* Hero image - visible during scan phase (smaller) */}
      {!isLoading && (
        <div 
          ref={heroImageRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0, zIndex: 15 }}
        >
          <div className="w-full max-w-md md:max-w-lg lg:max-w-xl px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-image.png"
              alt="3D Model"
              className="w-full h-auto object-contain"
              style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.1))' }}
            />
          </div>
        </div>
      )}

      {/* Layer stack (larger final size) */}
      {!isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(6deg)' }}
        >
          {LAYER_IMAGES.map((layer, index) => (
            <div
              key={layer.src}
              ref={(el) => { layerElementsRef.current[index] = el; }}
              className="absolute w-full max-w-3xl md:max-w-4xl lg:max-w-5xl px-4"
              style={{
                transformStyle: 'preserve-3d',
                zIndex: totalLayers - index,
                opacity: 0, // Start hidden, animation controls visibility
                willChange: 'transform, opacity',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={layer.src}
                alt={layer.label}
                className="w-full h-auto object-contain"
                style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.12))' }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Scan line */}
      {!isLoading && !isComplete && (
        <div
          ref={scanLineRef}
          className="absolute left-[12%] w-[76%] h-[3px] z-40 pointer-events-none"
          style={{ top: '20%', opacity: 0 }}
        >
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #2563EB 15%, #10B981 50%, #2563EB 85%, transparent 100%)',
              boxShadow: '0 0 15px rgba(37, 99, 235, 0.9), 0 0 30px rgba(16, 185, 129, 0.6), 0 0 45px rgba(37, 99, 235, 0.4)',
            }}
          />
          <div 
            className="absolute -inset-x-2 -inset-y-6"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(37, 99, 235, 0.2) 45%, rgba(16, 185, 129, 0.25) 50%, rgba(37, 99, 235, 0.2) 55%, transparent 100%)',
              filter: 'blur(6px)',
            }}
          />
        </div>
      )}

      {/* Corner brackets */}
      {!isLoading && !isComplete && (
        <>
          <div className="absolute top-4 left-4 pointer-events-none z-30">
            <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-40">
              <path d="M 0 8 L 0 0 L 8 0" fill="none" stroke="#2563EB" strokeWidth="2" />
            </svg>
          </div>
          <div className="absolute top-4 right-4 pointer-events-none z-30">
            <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-40">
              <path d="M 16 0 L 24 0 L 24 8" fill="none" stroke="#2563EB" strokeWidth="2" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 pointer-events-none z-30">
            <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-40">
              <path d="M 0 16 L 0 24 L 8 24" fill="none" stroke="#10B981" strokeWidth="2" />
            </svg>
          </div>
          <div className="absolute bottom-4 right-4 pointer-events-none z-30">
            <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-40">
              <path d="M 16 24 L 24 24 L 24 16" fill="none" stroke="#10B981" strokeWidth="2" />
            </svg>
          </div>
        </>
      )}

      {/* Status */}
      {!isLoading && !isComplete && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none z-30">
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
            ))}
          </div>
          <span 
            ref={statusTextRef}
            className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-medium"
          >
            INITIALIZING
          </span>
        </div>
      )}
    </div>
  );
}
