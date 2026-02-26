'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

const POINT_CLOUD_URL = 'cloud.js';
const POINT_CLOUD_BASE = 'https://3dmodelmanagement.github.io/nypl/pointclouds/nypl_main_hall/';
const POINT_BUDGET = 1_000_000;

interface HeroPipesAnimationProps {
  onComplete?: () => void;
  skipAnimation?: boolean;
}

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches);
  }, []);
  return isTouch;
}

export default function HeroPipesAnimation({ onComplete, skipAnimation = false }: HeroPipesAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const controlsObjRef = useRef<OrbitControls | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [showHud, setShowHud] = useState(false);
  const [hudDismissed, setHudDismissed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const hasCompletedRef = useRef(false);
  const isTouch = useIsTouchDevice();
  const initedRef = useRef(false);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  const triggerComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    onCompleteRef.current?.();
  }, []);

  // Block scroll-wheel zoom when not fullscreen (so page scrolling works),
  // but allow touch pinch-zoom always.
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const blockWheel = (e: WheelEvent) => {
      if (!document.fullscreenElement) e.stopPropagation();
    };
    el.addEventListener('wheel', blockWheel, { capture: true, passive: false });
    return () => el.removeEventListener('wheel', blockWheel, { capture: true } as EventListenerOptions);
  }, []);

  // -----------------------------------------------------------------------
  // Three.js + potree-core — matched to original Potree viewer
  // -----------------------------------------------------------------------
  useEffect(() => {
    const el = canvasRef.current;
    if (!el || initedRef.current) return;
    initedRef.current = true;

    let disposed = false;
    let animId = 0;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const w = el.clientWidth || 1;
    const h = el.clientHeight || 1;
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 50000);

    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0xffffff, 1);
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.15;
    controls.rotateSpeed = 0.6;
    controls.panSpeed = 0.6;
    controls.enableZoom = true;
    controls.zoomSpeed = 1.0;
    controls.minDistance = 1;
    controls.maxDistance = 10000;
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
    controlsObjRef.current = controls;

    const keys = new Set<string>();
    let initialCam: { pos: THREE.Vector3; target: THREE.Vector3 } | null = null;

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      keys.add(k);
      if (['w','a','s','d','q','e','arrowup','arrowdown','arrowleft','arrowright'].includes(k)) e.preventDefault();
    };
    const onKeyUp = (e: KeyboardEvent) => keys.delete(e.key.toLowerCase());
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const onResize = () => {
      const rw = el.clientWidth;
      const rh = el.clientHeight;
      if (rw < 1 || rh < 1) return;
      camera.aspect = rw / rh;
      camera.updateProjectionMatrix();
      renderer.setSize(rw, rh);
    };
    const resizeObs = new ResizeObserver(onResize);
    resizeObs.observe(el);

    let potreeInstance: any = null;
    let potreeRenderer: any = null;
    let pointClouds: any[] = [];

    (async () => {
      const { Potree, PointColorType, PointSizeType, PointShape, PotreeRenderer } = await import('potree-core');
      if (disposed) return;

      const potree = new Potree();
      potree.pointBudget = POINT_BUDGET;
      potreeInstance = potree;

      potreeRenderer = new PotreeRenderer({
        edl: { enabled: true, strength: 0.4, radius: 1.4, opacity: 1.0 },
      });

      try {
        const pco = await potree.loadPointCloud(POINT_CLOUD_URL, POINT_CLOUD_BASE);
        if (disposed) return;

        const mat = pco.material;
        mat.pointColorType = PointColorType.RGB;
        mat.size = 1;
        mat.pointSizeType = PointSizeType.ADAPTIVE;
        mat.shape = PointShape.SQUARE;
        mat.inputColorEncoding = 1;
        mat.outputColorEncoding = 1;

        scene.add(pco);
        pointClouds = [pco];

        const box = pco.boundingBox;
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const fitDist = (maxDim / 2) / Math.tan(fov / 2);

        const isMobile = el.clientWidth < 768;
        const pullback = isMobile ? 1.6 : 1.15;

        camera.position.set(center.x, center.y, center.z + fitDist * pullback);
        camera.near = maxDim * 0.001;
        camera.far = maxDim * 20;
        camera.updateProjectionMatrix();

        controls.target.copy(center);
        controls.update();

        initialCam = { pos: camera.position.clone(), target: center.clone() };

        setLoaded(true);
      } catch (err) {
        console.error('Point cloud load failed:', err);
        setLoaded(true);
      }
    })();

    let lastTime = 0;
    function animate(time: number) {
      if (disposed) return;
      animId = requestAnimationFrame(animate);

      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0.016;
      lastTime = time;

      if (keys.size > 0) {
        const speed = 20 * dt;
        const orbSpeed = 1.0 * dt;
        const fwd = new THREE.Vector3(); camera.getWorldDirection(fwd);
        const rt = new THREE.Vector3().crossVectors(fwd, camera.up).normalize();
        const up = camera.up;

        if (keys.has('w')) { camera.position.addScaledVector(fwd, speed); controls.target.addScaledVector(fwd, speed); }
        if (keys.has('s')) { camera.position.addScaledVector(fwd, -speed); controls.target.addScaledVector(fwd, -speed); }
        if (keys.has('a')) { camera.position.addScaledVector(rt, -speed); controls.target.addScaledVector(rt, -speed); }
        if (keys.has('d')) { camera.position.addScaledVector(rt, speed); controls.target.addScaledVector(rt, speed); }
        if (keys.has('q')) { camera.position.addScaledVector(up, speed); controls.target.addScaledVector(up, speed); }
        if (keys.has('e')) { camera.position.addScaledVector(up, -speed); controls.target.addScaledVector(up, -speed); }

        if (keys.has('arrowleft'))  { const o = camera.position.clone().sub(controls.target); o.applyAxisAngle(up, orbSpeed);  camera.position.copy(controls.target).add(o); }
        if (keys.has('arrowright')) { const o = camera.position.clone().sub(controls.target); o.applyAxisAngle(up, -orbSpeed); camera.position.copy(controls.target).add(o); }
        if (keys.has('arrowup'))    { const o = camera.position.clone().sub(controls.target); o.applyAxisAngle(rt, orbSpeed);  camera.position.copy(controls.target).add(o); }
        if (keys.has('arrowdown'))  { const o = camera.position.clone().sub(controls.target); o.applyAxisAngle(rt, -orbSpeed); camera.position.copy(controls.target).add(o); }

        if (keys.has('r') && initialCam) { camera.position.copy(initialCam.pos); controls.target.copy(initialCam.target); keys.delete('r'); }
      }

      controls.update();

      if (potreeInstance && pointClouds.length > 0 && potreeRenderer) {
        potreeRenderer.updateAndRender(potreeInstance, pointClouds, camera, renderer, scene);
      } else {
        renderer.render(scene, camera);
      }
    }
    animId = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      resizeObs.disconnect();
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      controls.dispose();
      controlsObjRef.current = null;
      pointClouds.forEach(pc => { scene.remove(pc); pc.dispose(); });
      potreeRenderer?.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      initedRef.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reveal
  useEffect(() => {
    if (!loaded) return;
    if (skipAnimation) { setShowViewer(true); triggerComplete(); return; }
    const t1 = setTimeout(() => setShowViewer(true), 200);
    const t2 = setTimeout(() => triggerComplete(), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [loaded, skipAnimation, triggerComplete]);

  // HUD
  useEffect(() => {
    if (!showViewer || hudDismissed) return;
    const t1 = setTimeout(() => setShowHud(true), 1500);
    const t2 = setTimeout(() => { setShowHud(false); setHudDismissed(true); }, 13000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [showViewer, hudDismissed]);

  // Fallback
  useEffect(() => {
    if (skipAnimation) { setLoaded(true); return; }
    const t = setTimeout(() => { if (!loaded) setLoaded(true); }, 15000);
    return () => clearTimeout(t);
  }, [skipAnimation, loaded]);

  // Fullscreen tracking
  useEffect(() => {
    const fn = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fn);
    return () => document.removeEventListener('fullscreenchange', fn);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    document.fullscreenElement ? document.exitFullscreen() : containerRef.current.requestFullscreen();
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [toggleFullscreen]);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden">
      {/* Loading */}
      <div
        className="absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-700 bg-white"
        style={{ opacity: showViewer ? 0 : 1, pointerEvents: showViewer ? 'none' : 'auto' }}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
            <div className="absolute inset-0 rounded-full border-2 border-t-gray-900 animate-spin" style={{ animationDuration: '1.2s' }} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium">
              {!loaded ? 'STREAMING POINT CLOUD' : 'READY'}
            </span>
            <span className="text-[10px] text-gray-300 tracking-[0.15em] uppercase">NYPL MAIN HALL</span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div ref={canvasRef} className="absolute inset-0 transition-opacity duration-1000 ease-out" style={{ opacity: showViewer ? 1 : 0 }} />

      {/* Corner brackets */}
      {['top-3 left-3','top-3 right-3','bottom-3 left-3','bottom-3 right-3'].map((pos, i) => (
        <div key={i} className={`absolute ${pos} pointer-events-none z-30 transition-opacity duration-1000`} style={{ opacity: showViewer ? 0.5 : 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d={i===0?'M 0 8 L 0 0 L 8 0':i===1?'M 16 0 L 24 0 L 24 8':i===2?'M 0 16 L 0 24 L 8 24':'M 16 24 L 24 24 L 24 16'} fill="none" stroke="#0D0D0D" strokeWidth="1.5" />
          </svg>
        </div>
      ))}

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-30"
        style={{
          background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 40%, transparent 100%)',
          opacity: showViewer ? 1 : 0, transition: 'opacity 1s ease-out',
        }}
      />

      {/* Fullscreen button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-black/5 hover:bg-black/10 backdrop-blur-sm transition-all duration-300 group"
        style={{ opacity: showViewer ? 0.7 : 0, pointerEvents: showViewer ? 'auto' : 'none', transition: 'opacity 0.8s ease, background-color 0.3s ease' }}
        title={isFullscreen ? 'Exit fullscreen (F)' : 'Fullscreen (F)'}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600 group-hover:text-gray-900">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600 group-hover:text-gray-900">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
        )}
      </button>

      {/* HUD */}
      <div
        className="absolute bottom-6 left-4 z-40 pointer-events-none"
        style={{ opacity: showHud ? 1 : 0, transform: showHud ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
      >
        <div className="bg-black/60 backdrop-blur-md rounded-xl px-5 py-4 text-white pointer-events-auto max-w-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-white/80">CONTROLS</span>
            <button onClick={() => { setShowHud(false); setHudDismissed(true); }} className="text-white/40 hover:text-white/80 transition-colors ml-4 -mr-1 -mt-1" aria-label="Dismiss controls">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          {isTouch ? (
            <div className="space-y-2 text-[11px] text-white/70">
              <div className="flex items-center gap-3"><span className="text-white/50 w-20 flex-shrink-0">1 finger</span><span>Drag to orbit</span></div>
              <div className="flex items-center gap-3"><span className="text-white/50 w-20 flex-shrink-0">Pinch</span><span>Zoom in / out</span></div>
              <div className="flex items-center gap-3"><span className="text-white/50 w-20 flex-shrink-0">2 fingers</span><span>Drag to pan</span></div>
            </div>
          ) : (
            <div className="space-y-2 text-[11px] text-white/70">
              <div className="flex items-center gap-3"><div className="flex gap-0.5"><Kbd>W</Kbd><Kbd>A</Kbd><Kbd>S</Kbd><Kbd>D</Kbd></div><span>Move</span></div>
              <div className="flex items-center gap-3"><div className="flex gap-0.5"><Kbd>Q</Kbd><Kbd>E</Kbd></div><span>Up / Down</span></div>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5"><Kbd className="text-[9px] px-1">&#9650;</Kbd><Kbd className="text-[9px] px-1">&#9660;</Kbd><Kbd className="text-[9px] px-1">&#9664;</Kbd><Kbd className="text-[9px] px-1">&#9654;</Kbd></div>
                <span>Orbit</span>
              </div>
              <div className="flex items-center gap-3"><span className="text-white/50 w-20 flex-shrink-0">Mouse</span><span>Drag orbit &middot; Right pan</span></div>
              <div className="flex items-center gap-3 pt-1 border-t border-white/10">
                <div className="flex gap-0.5"><Kbd>R</Kbd></div><span>Reset</span>
                <span className="text-white/30 mx-1">&middot;</span>
                <div className="flex gap-0.5"><Kbd>F</Kbd></div><span>Fullscreen</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Help button */}
      {hudDismissed && showViewer && (
        <button
          onClick={() => { setHudDismissed(false); setShowHud(true); }}
          className="absolute bottom-5 left-4 z-40 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
          style={{ opacity: 0.6 }}
          title="Show controls" aria-label="Show controls"
        >
          <span className="text-xs font-semibold text-gray-600">?</span>
        </button>
      )}

      {/* Status */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-40 transition-opacity duration-1000" style={{ opacity: showViewer ? 0.6 : 0 }}>
        <span className="text-[9px] text-gray-400 tracking-[0.25em] uppercase font-medium">NYPL MAIN HALL &mdash; INTERACTIVE 3D SCAN</span>
      </div>
    </div>
  );
}

function Kbd({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded bg-white/15 border border-white/20 text-[10px] font-mono font-medium text-white/80 ${className}`}>
      {children}
    </span>
  );
}
