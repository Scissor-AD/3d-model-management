'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

const POINT_CLOUD_URL = 'cloud.js';
const POINT_CLOUD_BASE = 'https://3dmodelmanagement.github.io/nypl/pointclouds/nypl_main_hall/';
const INITIAL_POINT_BUDGET = 1_000_000;
const AUTO_ORBIT_SPEED = 0.12;
const AUTO_ORBIT_IDLE_MS = 5000;
const FLY_DURATION = 1.2;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface HeroPipesAnimationProps {
  onComplete?: () => void;
  skipAnimation?: boolean;
}

interface FlyAnim {
  fromPos: THREE.Vector3;
  fromTarget: THREE.Vector3;
  toPos: THREE.Vector3;
  toTarget: THREE.Vector3;
  progress: number;
  duration: number;
}

interface Preset {
  label: string;
  pos: THREE.Vector3;
  target: THREE.Vector3;
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
  const [loaded, setLoaded] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [showHud, setShowHud] = useState(false);
  const [hudDismissed, setHudDismissed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showKbPanel, setShowKbPanel] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>('front');
  const [autoOrbitActive, setAutoOrbitActive] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const hasCompletedRef = useRef(false);
  const isTouch = useIsTouchDevice();
  const initedRef = useRef(false);

  const flyToPresetRef = useRef<(name: string) => void>(() => {});
  const toggleAutoOrbitRef = useRef<() => void>(() => {});
  const adjustBudgetRef = useRef<(delta: number) => void>(() => {});

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  const triggerComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    onCompleteRef.current?.();
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const isTouch = 'ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      const blockWheel = (e: WheelEvent) => {
        if (!(document.fullscreenElement || (document as any).webkitFullscreenElement)) e.stopPropagation();
      };
      el.addEventListener('wheel', blockWheel, { capture: true, passive: false });
      return () => el.removeEventListener('wheel', blockWheel, { capture: true } as EventListenerOptions);
    }
  }, []);

  // -----------------------------------------------------------------------
  // Three.js scene
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
    camera.up.set(0, 0, 1);

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

    // ---- State for auto-orbit, fly-to, presets ----
    let lastInteraction = 0;
    let autoOrbit = false;
    let flyAnim: FlyAnim | null = null;
    let presets: Record<string, Preset> = {};
    let pointBudget = INITIAL_POINT_BUDGET;

    const markInteraction = () => { lastInteraction = performance.now(); };
    const interactionEvents = ['pointerdown', 'pointerup', 'pointermove', 'touchstart', 'touchmove'];
    interactionEvents.forEach(evt => el.addEventListener(evt, markInteraction, { passive: true }));

    const keys = new Set<string>();

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      keys.add(k);
      markInteraction();

      if (['w','a','s','d','q','e','arrowup','arrowdown','arrowleft','arrowright'].includes(k)) e.preventDefault();

      if (k === 'r' && presets['front']) {
        flyToPreset('front');
        keys.delete('r');
      }
      if (k === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const container = containerRef.current;
        if (container) {
          const doc = document as any;
          const fsEl = doc.fullscreenElement || doc.webkitFullscreenElement;
          if (fsEl) {
            (doc.exitFullscreen || doc.webkitExitFullscreen)?.call(doc);
          } else {
            (container.requestFullscreen || (container as any).webkitRequestFullscreen)?.call(container);
          }
        }
      }
      if (k === ' ') {
        e.preventDefault();
        autoOrbit = !autoOrbit;
        setAutoOrbitActive(autoOrbit);
      }
      if (k === 'h') setShowHud(prev => !prev);
      if ((k === '=' || k === '+') && potreeInstance) {
        pointBudget = Math.min(pointBudget + 500_000, 10_000_000);
        potreeInstance.pointBudget = pointBudget;
      }
      if ((k === '-' || k === '_') && potreeInstance) {
        pointBudget = Math.max(pointBudget - 500_000, 500_000);
        potreeInstance.pointBudget = pointBudget;
      }
      if (k >= '1' && k <= '4') {
        const names = ['front', 'above', 'side', 'interior'];
        const name = names[parseInt(k) - 1];
        if (presets[name]) flyToPreset(name);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => keys.delete(e.key.toLowerCase());
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    function flyToPreset(name: string) {
      const p = presets[name];
      if (!p) return;
      flyAnim = {
        fromPos: camera.position.clone(),
        fromTarget: controls.target.clone(),
        toPos: p.pos.clone(),
        toTarget: p.target.clone(),
        progress: 0,
        duration: FLY_DURATION,
      };
      setActivePreset(name);
      markInteraction();
    }

    function flyToPoint(point: THREE.Vector3) {
      const dir = camera.position.clone().sub(controls.target).normalize();
      const dist = camera.position.distanceTo(controls.target) * 0.3;
      flyAnim = {
        fromPos: camera.position.clone(),
        fromTarget: controls.target.clone(),
        toPos: point.clone().add(dir.multiplyScalar(dist)),
        toTarget: point.clone(),
        progress: 0,
        duration: FLY_DURATION,
      };
      setActivePreset(null);
      markInteraction();
    }

    flyToPresetRef.current = flyToPreset;
    toggleAutoOrbitRef.current = () => {
      autoOrbit = !autoOrbit;
      setAutoOrbitActive(autoOrbit);
    };
    adjustBudgetRef.current = (delta: number) => {
      if (!potreeInstance) return;
      pointBudget = Math.max(500_000, Math.min(10_000_000, pointBudget + delta));
      potreeInstance.pointBudget = pointBudget;
    };

    // Double-click fly-to
    let lastClickTime = 0;
    let lastClickPos = { x: 0, y: 0 };
    const onPointerDown = (e: PointerEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastClickPos.x;
      const dy = e.clientY - lastClickPos.y;
      const isDouble = (now - lastClickTime < 350) && Math.abs(dx) < 10 && Math.abs(dy) < 10;
      lastClickTime = now;
      lastClickPos = { x: e.clientX, y: e.clientY };

      if (isDouble && pointClouds.length > 0) {
        const rect = renderer.domElement.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        try {
          const PotreeModule = (window as any).__potreeModule;
          if (PotreeModule?.Potree?.pick) {
            const hit = PotreeModule.Potree.pick(pointClouds, renderer, camera, raycaster.ray);
            if (hit?.position) flyToPoint(hit.position);
          }
        } catch { /* ignore pick failures */ }
      }
    };
    renderer.domElement.addEventListener('pointerdown', onPointerDown);

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
      const potreeModule = await import('potree-core');
      if (disposed) return;
      const { Potree, PointColorType, PointSizeType, PointShape, PotreeRenderer } = potreeModule;
      (window as any).__potreeModule = potreeModule;

      const potree = new Potree();
      potree.pointBudget = pointBudget;
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
        const pullback = isMobile ? 1.45 : 1.15;

        camera.near = maxDim * 0.001;
        camera.far = maxDim * 20;
        camera.updateProjectionMatrix();

        // Build presets relative to bounding box
        const d = fitDist * pullback;
        presets = {
          front: { label: 'Front', pos: new THREE.Vector3(center.x, center.y - d * 1.3, center.z - size.z * 0.35), target: new THREE.Vector3(center.x, center.y, center.z - size.z * 0.35) },
          above: { label: 'Above', pos: new THREE.Vector3(center.x, center.y - d * 0.4, center.z + d * 0.9), target: center.clone() },
          side: { label: 'Side', pos: new THREE.Vector3(center.x + d, center.y, center.z), target: center.clone() },
          interior: { label: 'Interior', pos: new THREE.Vector3(center.x, center.y - d * (isMobile ? 0.25 : 0.4), center.z - size.z * 0.35), target: new THREE.Vector3(center.x, center.y, center.z - size.z * 0.35) },
        };

        camera.position.copy(presets.front.pos);
        controls.target.copy(presets.front.target);
        controls.update();

        lastInteraction = performance.now();
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

      // Fly-to animation
      if (flyAnim) {
        flyAnim.progress += dt / flyAnim.duration;
        if (flyAnim.progress >= 1) {
          camera.position.copy(flyAnim.toPos);
          controls.target.copy(flyAnim.toTarget);
          flyAnim = null;
        } else {
          const t = easeInOutCubic(flyAnim.progress);
          camera.position.lerpVectors(flyAnim.fromPos, flyAnim.toPos, t);
          controls.target.lerpVectors(flyAnim.fromTarget, flyAnim.toTarget, t);
        }
      }

      // Keyboard movement
      if (keys.size > 0 && !flyAnim) {
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

        setActivePreset(null);
      }

      // Auto-orbit
      if (autoOrbit && !flyAnim && keys.size === 0 && (performance.now() - lastInteraction > AUTO_ORBIT_IDLE_MS)) {
        const offset = camera.position.clone().sub(controls.target);
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), AUTO_ORBIT_SPEED * dt);
        camera.position.copy(controls.target).add(offset);
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
      interactionEvents.forEach(evt => el.removeEventListener(evt, markInteraction));
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      controls.dispose();
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

  // HUD auto-show
  useEffect(() => {
    if (!showViewer || hudDismissed) return;
    const t1 = setTimeout(() => setShowHud(true), 1500);
    const t2 = setTimeout(() => { setShowHud(false); setHudDismissed(true); }, 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [showViewer, hudDismissed]);

  // Auto-show keyboard shortcuts on desktop (stays open until user closes)
  useEffect(() => {
    if (!showViewer || isTouch) return;
    const t = setTimeout(() => setShowKbPanel(true), 2000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showViewer]);

  // Fallback
  useEffect(() => {
    if (skipAnimation) { setLoaded(true); return; }
    const t = setTimeout(() => { if (!loaded) setLoaded(true); }, 15000);
    return () => clearTimeout(t);
  }, [skipAnimation, loaded]);

  // Fullscreen tracking
  useEffect(() => {
    const fn = () => {
      const doc = document as any;
      setIsFullscreen(!!(doc.fullscreenElement || doc.webkitFullscreenElement));
    };
    document.addEventListener('fullscreenchange', fn);
    document.addEventListener('webkitfullscreenchange', fn);
    return () => {
      document.removeEventListener('fullscreenchange', fn);
      document.removeEventListener('webkitfullscreenchange', fn);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const doc = document as any;
    const fsEl = doc.fullscreenElement || doc.webkitFullscreenElement;
    if (fsEl) {
      (doc.exitFullscreen || doc.webkitExitFullscreen)?.call(doc);
    } else {
      (el.requestFullscreen || (el as any).webkitRequestFullscreen)?.call(el);
    }
  }, []);

  // Close keyboard panel on Escape or outside click
  useEffect(() => {
    if (!showKbPanel) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowKbPanel(false); };
    const onClick = () => setShowKbPanel(false);
    window.addEventListener('keydown', onKey);
    setTimeout(() => window.addEventListener('click', onClick), 100);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('click', onClick); };
  }, [showKbPanel]);

  const presetNames = ['front', 'above', 'side', 'interior'] as const;
  const presetLabels: Record<string, string> = { front: 'Front', above: 'Above', side: 'Side', interior: 'Interior' };

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
        className="absolute top-3 md:top-4 right-3 md:right-4 z-50 p-1.5 md:p-2 rounded-lg bg-black/5 hover:bg-black/10 backdrop-blur-sm transition-all duration-300 group"
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

      {/* Auto-orbit toggle */}
      <button
        onClick={() => toggleAutoOrbitRef.current()}
        className="absolute top-3 md:top-4 right-12 md:right-14 z-50 p-1.5 md:p-2 rounded-lg bg-black/5 hover:bg-black/10 backdrop-blur-sm transition-all duration-300 group"
        style={{ opacity: showViewer ? 0.7 : 0, pointerEvents: showViewer ? 'auto' : 'none', transition: 'opacity 0.8s ease' }}
        title={autoOrbitActive ? 'Pause auto-rotate (Space)' : 'Resume auto-rotate (Space)'}
        aria-label={autoOrbitActive ? 'Pause auto-rotate' : 'Resume auto-rotate'}
      >
        {autoOrbitActive ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600 group-hover:text-gray-900">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 group-hover:text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
        )}
      </button>

      {/* Preset viewpoint buttons */}
      <div
        className="absolute bottom-14 md:bottom-6 right-2 md:right-4 z-40 flex flex-col gap-1 md:gap-1.5"
        style={{ opacity: showViewer ? 1 : 0, pointerEvents: showViewer ? 'auto' : 'none', transition: 'opacity 0.8s ease' }}
      >
        {presetNames.map((name, i) => (
          <button
            key={name}
            onClick={() => flyToPresetRef.current(name)}
            className={`px-2 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg text-[8px] md:text-[10px] tracking-[0.1em] uppercase font-medium backdrop-blur-sm transition-all duration-200 ${
              activePreset === name
                ? 'bg-gray-900 text-white'
                : 'bg-black/5 text-gray-500 hover:bg-black/10 hover:text-gray-800'
            }`}
            title={`${presetLabels[name]} view (${i + 1})`}
          >
            {presetLabels[name]}
          </button>
        ))}
      </div>

      {/* Primary HUD (simple, auto-dismisses) */}
      <div
        className="absolute top-3 md:top-4 left-3 md:left-4 z-40 pointer-events-none max-w-[70%] md:max-w-none"
        style={{ opacity: showHud ? 1 : 0, transform: showHud ? 'translateY(0)' : 'translateY(-6px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
      >
        <div className="bg-black/50 backdrop-blur-md rounded-lg px-3 md:px-4 py-2 md:py-2.5 pointer-events-auto flex items-center gap-2 md:gap-3">
          <span className="text-[9px] md:text-[11px] text-white/70">
            {isTouch
              ? 'Drag to orbit \u00b7 Pinch to zoom \u00b7 Double-tap to focus'
              : 'Drag to orbit \u00b7 Right-click to pan \u00b7 Double-click to focus'
            }
          </span>
          <button onClick={() => { setShowHud(false); setHudDismissed(true); }} className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0" aria-label="Dismiss">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      {/* Bottom-left toolbar: help + keyboard shortcuts */}
      <div className="absolute bottom-12 md:bottom-5 left-3 md:left-4 z-40 flex items-center gap-1.5 md:gap-2" style={{ opacity: showViewer ? 1 : 0, pointerEvents: showViewer ? 'auto' : 'none', transition: 'opacity 0.8s ease' }}>
        {/* Help button */}
        {hudDismissed && (
          <button
            onClick={() => { setHudDismissed(false); setShowHud(true); }}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black/8 hover:bg-black/15 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
            title="Show controls" aria-label="Show controls"
          >
            <span className="text-[10px] md:text-xs font-semibold text-gray-500">?</span>
          </button>
        )}

        {/* Keyboard shortcuts button (desktop only) */}
        {!isTouch && (
          <button
            onClick={(e) => { e.stopPropagation(); setShowKbPanel(prev => !prev); }}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black/8 hover:bg-black/15 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
            title="Keyboard shortcuts" aria-label="Keyboard shortcuts"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
          </button>
        )}
      </div>

      {/* Keyboard shortcuts popout panel (desktop only) */}
      {showKbPanel && !isTouch && (
        <div
          className="absolute bottom-16 left-4 z-50 bg-black/75 backdrop-blur-lg rounded-xl px-5 py-4 text-white max-w-sm border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-white/70">KEYBOARD SHORTCUTS</span>
            <button onClick={() => setShowKbPanel(false)} className="text-white/30 hover:text-white/70 transition-colors -mr-1 -mt-1" aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] text-white/60">
            <div className="flex items-center gap-2"><div className="flex gap-0.5"><Kbd>W</Kbd><Kbd>A</Kbd><Kbd>S</Kbd><Kbd>D</Kbd></div><span>Move</span></div>
            <div className="flex items-center gap-2"><div className="flex gap-0.5"><Kbd>Q</Kbd><Kbd>E</Kbd></div><span>Up / Down</span></div>
            <div className="flex items-center gap-2"><div className="flex gap-0.5"><Kbd>&#9650;</Kbd><Kbd>&#9660;</Kbd><Kbd>&#9664;</Kbd><Kbd>&#9654;</Kbd></div><span>Orbit</span></div>
            <div className="flex items-center gap-2"><div className="flex gap-0.5"><Kbd>R</Kbd></div><span>Reset view</span></div>
            <div className="col-span-2 border-t border-white/10 my-1" />
            <div className="flex items-center gap-2"><div className="flex gap-0.5"><Kbd>1</Kbd><Kbd>2</Kbd><Kbd>3</Kbd><Kbd>4</Kbd></div><span>Viewpoints</span></div>
            <div className="flex items-center gap-2"><Kbd>Space</Kbd><span>Auto-rotate</span></div>
            <div className="flex items-center gap-2"><div className="flex gap-0.5"><Kbd>+</Kbd><Kbd>-</Kbd></div><span>Detail level</span></div>
            <div className="flex items-center gap-2"><Kbd>F</Kbd><span>Fullscreen</span></div>
            <div className="flex items-center gap-2"><Kbd>H</Kbd><span>Toggle HUD</span></div>
          </div>
        </div>
      )}

      {/* Status (hidden on mobile) */}
      <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-30 transition-opacity duration-1000" style={{ opacity: showViewer ? 0.6 : 0 }}>
        <span className="text-[9px] text-gray-400 tracking-[0.25em] uppercase font-medium">NYPL MAIN HALL &mdash; INTERACTIVE 3D SCAN</span>
      </div>
    </div>
  );
}

function Kbd({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded bg-white/10 border border-white/15 text-[9px] font-mono font-medium text-white/70 leading-none ${className}`}>
      {children}
    </span>
  );
}
