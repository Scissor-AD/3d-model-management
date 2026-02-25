'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

interface HeroPipesAnimationProps {
  onComplete?: () => void;
  skipAnimation?: boolean;
}

export default function HeroPipesAnimation({ onComplete, skipAnimation = false }: HeroPipesAnimationProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewerReady, setViewerReady] = useState(false);
  const [pointCloudLoaded, setPointCloudLoaded] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const hasCompletedRef = useRef(false);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  const triggerComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    onCompleteRef.current?.();
  }, []);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'potree-viewer-ready') {
        setViewerReady(true);
      }
      if (e.data?.type === 'potree-loaded') {
        setPointCloudLoaded(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Show the viewer as soon as the Potree viewer is initialized (before point cloud fully loads)
  useEffect(() => {
    if (!viewerReady) return;

    if (skipAnimation) {
      setShowViewer(true);
      triggerComplete();
      return;
    }

    const revealTimer = setTimeout(() => setShowViewer(true), 150);
    return () => clearTimeout(revealTimer);
  }, [viewerReady, skipAnimation, triggerComplete]);

  // Trigger onComplete once point cloud is loaded and viewer is visible
  useEffect(() => {
    if (!showViewer) return;

    if (skipAnimation) {
      triggerComplete();
      return;
    }

    if (pointCloudLoaded) {
      const completeTimer = setTimeout(() => triggerComplete(), 1200);
      return () => clearTimeout(completeTimer);
    }
  }, [showViewer, pointCloudLoaded, skipAnimation, triggerComplete]);

  // Show interaction hint after point cloud loads, then auto-dismiss
  useEffect(() => {
    if (!pointCloudLoaded || !showViewer) return;

    const showTimer = setTimeout(() => setShowHint(true), 1500);
    const hideTimer = setTimeout(() => setShowHint(false), 7000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [pointCloudLoaded, showViewer]);

  // Fallback: if messages never fire, proceed after timeout
  useEffect(() => {
    if (skipAnimation) {
      setShowViewer(true);
      triggerComplete();
      return;
    }

    const viewerFallback = setTimeout(() => {
      if (!viewerReady) setViewerReady(true);
    }, 6000);

    const loadFallback = setTimeout(() => {
      if (!pointCloudLoaded) setPointCloudLoaded(true);
    }, 12000);

    return () => {
      clearTimeout(viewerFallback);
      clearTimeout(loadFallback);
    };
  }, [skipAnimation, viewerReady, pointCloudLoaded, triggerComplete]);

  const loadingProgress = !viewerReady
    ? 'INITIALIZING VIEWER'
    : !pointCloudLoaded
    ? 'STREAMING POINT CLOUD'
    : 'READY';

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {/* Loading state */}
      <div
        className="absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-700"
        style={{ opacity: showViewer ? 0 : 1, pointerEvents: showViewer ? 'none' : 'auto' }}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
            <div
              className="absolute inset-0 rounded-full border-2 border-t-gray-900 animate-spin"
              style={{ animationDuration: '1.2s' }}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium">
              {loadingProgress}
            </span>
            <span className="text-[10px] text-gray-300 tracking-[0.15em] uppercase">
              NYPL MAIN HALL
            </span>
          </div>
        </div>
      </div>

      {/* Potree iframe */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-out"
        style={{ opacity: showViewer ? 1 : 0 }}
      >
        <iframe
          ref={iframeRef}
          src="/nypl-viewer.html"
          className="w-full h-full border-0"
          title="NYPL Main Hall - Interactive 3D Point Cloud Scan"
          aria-label="Interactive 3D point cloud scan of the New York Public Library Main Hall. Use mouse or touch to rotate, zoom, and pan."
          allow="accelerometer; autoplay; fullscreen"
          style={{ background: '#FFFFFF' }}
        />
      </div>

      {/* Corner brackets */}
      <div className="absolute top-3 left-3 pointer-events-none z-30 transition-opacity duration-1000" style={{ opacity: showViewer ? 0.5 : 0 }}>
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M 0 8 L 0 0 L 8 0" fill="none" stroke="#0D0D0D" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="absolute top-3 right-3 pointer-events-none z-30 transition-opacity duration-1000" style={{ opacity: showViewer ? 0.5 : 0 }}>
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M 16 0 L 24 0 L 24 8" fill="none" stroke="#0D0D0D" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="absolute bottom-3 left-3 pointer-events-none z-30 transition-opacity duration-1000" style={{ opacity: showViewer ? 0.5 : 0 }}>
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M 0 16 L 0 24 L 8 24" fill="none" stroke="#0D0D0D" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="absolute bottom-3 right-3 pointer-events-none z-30 transition-opacity duration-1000" style={{ opacity: showViewer ? 0.5 : 0 }}>
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M 16 24 L 24 24 L 24 16" fill="none" stroke="#0D0D0D" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Bottom gradient fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-30"
        style={{
          background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 40%, transparent 100%)',
          opacity: showViewer ? 1 : 0,
          transition: 'opacity 1s ease-out',
        }}
      />

      {/* Interaction hint */}
      <div
        className="absolute top-5 right-5 pointer-events-none z-40 flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/5 backdrop-blur-sm"
        style={{
          opacity: showHint ? 0.8 : 0,
          transform: showHint ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
        </svg>
        <span className="text-[10px] text-gray-500 tracking-[0.15em] uppercase font-medium whitespace-nowrap">
          CLICK &amp; DRAG TO EXPLORE &middot; SCROLL TO ZOOM
        </span>
      </div>

      {/* Status label */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-40 transition-opacity duration-1000"
        style={{ opacity: showViewer ? 0.6 : 0 }}
      >
        <span className="text-[9px] text-gray-400 tracking-[0.25em] uppercase font-medium">
          NYPL MAIN HALL &mdash; INTERACTIVE 3D SCAN
        </span>
      </div>
    </div>
  );
}
