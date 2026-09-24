import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Layers, Mail, User, Compass } from 'lucide-react';
import * as THREE from 'three';
import LiuliLilyModel from './components/LiuliLilyModel';
import CinematicMacroOverlay from './components/CinematicMacroOverlay';
import AboutStoryModal from './components/AboutStoryModal';
import RecruiterIndexModal from './components/RecruiterIndexModal';
import ProjectDetailModal from './components/ProjectDetailModal';
import LeftBottomAudioIndicator from './components/LeftBottomAudioIndicator';
import { AudioProvider } from './context/AudioContext';
import { Waypoint, PORTFOLIO_WAYPOINTS } from './data/portfolioData';
import { Language, TRANSLATIONS } from './data/translations';

// ==========================================
// 0. BULLETPROOF WEBGL ERROR BOUNDARY (FOR MOBILE RESILIENCE)
// ==========================================
class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.warn('WebGL scene handled gracefully:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[#002FA7]/30 to-[#FFAA00]/20 blur-[100px]" />
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// 1. DYNAMIC CURSOR FOLLOWER LIGHT (MICRO-DETAIL ILLUMINATION)
// ==========================================
function CursorInteractiveLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    if (!lightRef.current || !viewport) return;
    const px = pointer?.x ?? 0;
    const py = pointer?.y ?? 0;
    const vw = viewport.width || 10;
    const vh = viewport.height || 10;
    const x = (px * vw) / 2;
    const y = (py * vh) / 2;
    if (!isNaN(x) && !isNaN(y)) {
      lightRef.current.position.set(x, y, 1.2);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      intensity={8.5}
      distance={6.5}
      decay={2}
      color="#FFAA00"
    />
  );
}

// ==========================================
// 2. CINEMATIC CAMERA RIG & 100% UNHINDERED ORBIT CONTROLS
// ==========================================
function CameraRig({
  activeWaypoint,
  flowerPos,
}: {
  activeWaypoint: Waypoint | null;
  flowerPos: [number, number, number];
}) {
  const { camera, gl, size } = useThree();
  const controlsRef = useRef<any>(null);
  const isTransitioning = useRef(false);
  const prevWaypointRef = useRef<Waypoint | null>(null);

  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width < 1024;

  useEffect(() => {
    if (activeWaypoint || prevWaypointRef.current) {
      isTransitioning.current = true;
    }
    prevWaypointRef.current = activeWaypoint;
  }, [activeWaypoint]);

  useFrame(() => {
    const controls = controlsRef.current;
    const [gx, gy, gz] = flowerPos;

    if (activeWaypoint) {
      // 1. Cinematic Top-Down Flower Bloom View (Device-adaptive framing)
      const macroCamPos = isMobile
        ? new THREE.Vector3(gx, gy + 3.4, gz + 2.3)
        : isTablet
        ? new THREE.Vector3(gx - 0.15, gy + 3.0, gz + 1.9)
        : new THREE.Vector3(gx - 0.25, gy + 2.8, gz + 1.6);

      const macroLookAt = isMobile
        ? new THREE.Vector3(gx, gy + 0.25, gz + 0.1)
        : isTablet
        ? new THREE.Vector3(gx - 0.2, gy - 0.05, gz + 0.1)
        : new THREE.Vector3(gx - 0.35, gy - 0.15, gz + 0.1);

      camera.position.lerp(macroCamPos, 0.08);
      if (controls) {
        controls.enabled = false;
        controls.target.lerp(macroLookAt, 0.08);
        controls.update();
      } else {
        camera.lookAt(macroLookAt);
      }
    } else if (isTransitioning.current) {
      // 2. Smooth Return to Overview (Device-adaptive distance)
      const defaultZ = isMobile ? 5.2 : isTablet ? 4.6 : 4.2;
      const defaultY = isMobile ? gy + 0.2 : gy + 0.15;
      const defaultPos = new THREE.Vector3(0, 0, defaultZ);
      const defaultLook = new THREE.Vector3(gx, defaultY, gz);

      camera.position.lerp(defaultPos, 0.08);
      if (controls) {
        controls.target.lerp(defaultLook, 0.08);
        controls.update();
      }

      if (camera.position.distanceTo(defaultPos) < 0.03) {
        camera.position.copy(defaultPos);
        if (controls) {
          controls.target.copy(defaultLook);
          controls.update();
          controls.enabled = true;
        }
        isTransitioning.current = false;
      }
    } else {
      // 3. Overview Mode: Free, unrestricted 360-degree rotation and zoom
      if (controls && !controls.enabled) {
        controls.enabled = true;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      domElement={gl.domElement}
      target={[flowerPos[0], flowerPos[1] + 0.15, flowerPos[2]]}
      enablePan={false}
      enableZoom={true}
      minDistance={1.8}
      maxDistance={6.0}
      zoomSpeed={0.8}
      rotateSpeed={0.9}
      enableDamping={true}
      dampingFactor={0.06}
      minPolarAngle={Math.PI / 8}
      maxPolarAngle={(7 * Math.PI) / 8}
      enabled={!activeWaypoint}
    />
  );
}

// ==========================================
// 3. ZERO-RENDER KINETIC BEE CURSOR
// ==========================================
function CrystalFollowerCursor() {
  const wakeRef = useRef<HTMLDivElement>(null);
  const beeRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    let angle = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (lastPos.current.x === -200) {
        lastPos.current = { x, y };
        return;
      }
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;

      if (Math.hypot(dx, dy) > 2) {
        angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      }
      lastPos.current = { x, y };

      if (wakeRef.current) {
        wakeRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (beeRef.current) {
        beeRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angle}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="hidden lg:block">
      {/* Warm Radiant Glory & Pollen Aura Wake (Concentrated Warm Halo) */}
      <div
        ref={wakeRef}
        className="pointer-events-none fixed top-0 left-0 z-[998] will-change-transform"
        style={{ transform: 'translate3d(-200px, -200px, 0) translate(-50%, -50%)' }}
      >
        {/* Outer ambient warm golden glow */}
        <div className="w-[280px] h-[280px] rounded-full bg-gradient-to-r from-[#FF5500]/30 via-[#FFAA00]/35 to-transparent blur-[65px]" />
        {/* Concentrated radiant inner glory halo centered right behind firefly */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85px] h-[85px] rounded-full bg-[#FFAA00]/70 blur-[18px]" />
      </div>

      {/* Bioluminescent Glass Hotaru (Firefly) with Concentrated Warm Glow & Iridescent Wings */}
      <div
        ref={beeRef}
        className="pointer-events-none fixed top-0 left-0 z-[999] will-change-transform"
        style={{ transform: 'translate3d(-200px, -200px, 0) translate(-50%, -50%)' }}
      >
        <div className="relative">
          <svg
            width="42"
            height="42"
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_14px_rgba(255,170,0,0.95)] drop-shadow-[0_0_5px_rgba(255,255,255,0.85)]"
          >
            <defs>
              {/* Concentrated Warm Golden Lantern Gradient */}
              <radialGradient id="fireflyLantern" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#FFF0B3" />
                <stop offset="55%" stopColor="#FFAA00" />
                <stop offset="85%" stopColor="#FF5500" />
                <stop offset="100%" stopColor="#1E1404" />
              </radialGradient>

              {/* Iridescent Crystalline Gossamer Wing */}
              <linearGradient id="fireflyWing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#002FA7" stopOpacity="0.3" />
              </linearGradient>

              <radialGradient id="lanternHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFAA00" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#FF7700" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FF7700" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Concentrated Warm Lantern Core behind abdomen */}
            <circle cx="50" cy="56" r="14" fill="url(#lanternHalo)" />

            {/* Forewings (Long, delicate, aerodynamic crystal gossamer) */}
            {/* Left Forewing */}
            <path
              d="M 49 38 C 24 16, 12 30, 20 52 C 27 66, 46 48, 48 42 Z"
              fill="url(#fireflyWing)"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="0.7"
              className="origin-[49px_40px] animate-[pulse_0.22s_ease-in-out_infinite]"
            />
            {/* Right Forewing */}
            <path
              d="M 51 38 C 76 16, 88 30, 80 52 C 73 66, 54 48, 52 42 Z"
              fill="url(#fireflyWing)"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="0.7"
              className="origin-[51px_40px] animate-[pulse_0.22s_ease-in-out_infinite]"
            />

            {/* Hindwings (Smaller delicate lower wings) */}
            <path
              d="M 49 42 C 34 46, 26 58, 32 68 C 38 74, 47 56, 49 48 Z"
              fill="url(#fireflyWing)"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="0.5"
              className="origin-[49px_46px] animate-[pulse_0.18s_ease-in-out_infinite]"
            />
            <path
              d="M 51 42 C 66 46, 74 58, 68 68 C 62 74, 53 56, 51 48 Z"
              fill="url(#fireflyWing)"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="0.5"
              className="origin-[51px_46px] animate-[pulse_0.18s_ease-in-out_infinite]"
            />

            {/* Slender Obsidian/Bronze Thorax */}
            <ellipse cx="50" cy="38" rx="4.5" ry="5.5" fill="#18181B" stroke="#71717A" strokeWidth="0.6" />

            {/* Delicate Head & Calligraphic Antennas */}
            <circle cx="50" cy="28" r="3.2" fill="#18181B" stroke="#71717A" strokeWidth="0.5" />
            {/* Left Antenna with Glowing Stardust Tip */}
            <path d="M 48 26 Q 42 16 35 17" stroke="#FDE047" strokeWidth="0.7" strokeLinecap="round" fill="none" />
            <circle cx="35" cy="17" r="1.2" fill="#FEF08A" />
            {/* Right Antenna with Glowing Stardust Tip */}
            <path d="M 52 26 Q 58 16 65 17" stroke="#FDE047" strokeWidth="0.7" strokeLinecap="round" fill="none" />
            <circle cx="65" cy="17" r="1.2" fill="#FEF08A" />

            {/* Glowing Bioluminescent Lantern Abdomen (Smooth Teardrop) */}
            <path
              d="M 46 42 C 44 48, 44 58, 50 68 C 56 58, 56 48, 54 42 Z"
              fill="url(#fireflyLantern)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.8"
              className="animate-[pulse_1.6s_ease-in-out_infinite]"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3.5 HAUTE EDITORIAL HERO NAME
// ==========================================
function WindBreezeHeroName({ name }: { name: string }) {
  return (
    <h1 className="select-none relative z-30 pointer-events-auto cursor-default overflow-visible mb-4 sm:mb-6">
      <span className="font-vogue text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-normal leading-[1.28] whitespace-nowrap block liuli-glass-shimmer-text pb-6 sm:pb-8 lg:pb-10 overflow-visible">
        {name}
      </span>
    </h1>
  );
}

// ==========================================
// 4. MAIN INTERACTIVE APPLICATION
// ==========================================
export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kelsey_portfolio_lang') as Language;
      if (['en', 'zh', 'es', 'fr'].includes(saved)) return saved;
    }
    return 'en';
  });

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kelsey_portfolio_lang', lang);
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [activeWaypoint, setActiveWaypoint] = useState<Waypoint | null>(null);
  const [hoveredWaypoint, setHoveredWaypoint] = useState<Waypoint | null>(null);
  const [selectedDetailWaypoint, setSelectedDetailWaypoint] = useState<Waypoint | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  // Responsive layout detection to place flower elegantly in center-right on desktop
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const flowerPos: [number, number, number] = [0, 0, 0];

  // Real-time flower drag-to-spin & deck cycle interaction
  const [dragAngleOffset, setDragAngleOffset] = useState<number>(0);
  const isDraggingFlower = useRef(false);
  const dragStartX = useRef<number>(0);
  const currentDragDelta = useRef<number>(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!activeWaypoint) return;
    isDraggingFlower.current = true;
    dragStartX.current = e.clientX;
    currentDragDelta.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeWaypoint || !isDraggingFlower.current) return;
    const delta = e.clientX - dragStartX.current;
    currentDragDelta.current = delta;
    // Map horizontal drag delta to angular offset
    setDragAngleOffset((delta / 250) * (Math.PI / 3));
  };

  // Navigate to homepage / overview of everything
  const handleGoHome = () => {
    setActiveWaypoint(null);
    setSelectedDetailWaypoint(null);
    setIsAboutOpen(false);
    setIsIndexOpen(false);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '#works');
    }
  };

  // Jump directly to Afterlife Club (first project) when clicking // WORKS
  const handleWorksClick = () => {
    setIsAboutOpen(false);
    setIsIndexOpen(false);
    setSelectedDetailWaypoint(null);
    setActiveWaypoint(PORTFOLIO_WAYPOINTS[0]);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '#afterlife');
    }
  };

  // Navigate to specific waypoint
  const handleSelectWaypoint = (wp: Waypoint) => {
    setActiveWaypoint(wp);
    setIsAboutOpen(false);
    setIsIndexOpen(false);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#${wp.id}`);
    }
  };

  // URL Hash routing & sync: initial #works requirement & browser back/forward support
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncFromHash = () => {
      const rawHash = window.location.hash.replace('#', '').trim();
      const hash = rawHash.toLowerCase();

      if (!hash || hash === 'works' || hash === 'overview' || hash === 'home') {
        // Ensure the address bar contains #works on the homepage overview
        if (!window.location.hash || window.location.hash === '#' || window.location.hash === '') {
          window.history.replaceState(null, '', '#works');
        }
        setActiveWaypoint(null);
        setSelectedDetailWaypoint(null);
        setIsAboutOpen(false);
        setIsIndexOpen(false);
      } else if (hash === 'about') {
        setIsAboutOpen(true);
        setIsIndexOpen(false);
        setActiveWaypoint(null);
        setSelectedDetailWaypoint(null);
      } else if (hash === 'index') {
        setIsIndexOpen(true);
        setIsAboutOpen(false);
        setActiveWaypoint(null);
        setSelectedDetailWaypoint(null);
      } else {
        const found = PORTFOLIO_WAYPOINTS.find((w) => w.id.toLowerCase() === hash);
        if (found) {
          setActiveWaypoint(found);
          setIsAboutOpen(false);
          setIsIndexOpen(false);
        }
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const handlePointerUp = () => {
    if (!activeWaypoint || !isDraggingFlower.current) return;
    isDraggingFlower.current = false;
    const delta = currentDragDelta.current;
    setDragAngleOffset(0);

    const idx = PORTFOLIO_WAYPOINTS.findIndex((w) => w.id === activeWaypoint.id);
    if (delta < -35) {
      // Swiped / dragged left: go to next project
      handleSelectWaypoint(PORTFOLIO_WAYPOINTS[(idx + 1) % PORTFOLIO_WAYPOINTS.length]);
    } else if (delta > 35) {
      // Swiped / dragged right: go to prev project
      handleSelectWaypoint(
        PORTFOLIO_WAYPOINTS[(idx - 1 + PORTFOLIO_WAYPOINTS.length) % PORTFOLIO_WAYPOINTS.length]
      );
    }
  };

  return (
    <AudioProvider>
      <div className="relative w-full min-h-[100dvh] h-[100dvh] overflow-hidden bg-[#050608] text-[#D8ECF8] font-sans selection:bg-[#002FA7] selection:text-white">
        {/* 1. Kinetic Honeybee Cursor (Zero-Render) */}
        <CrystalFollowerCursor />

      {/* ========================================================================= */}
      {/* UNIFIED 3D SCENE: TACTILE LIULI GLASS WITH REAL-TIME CURSOR LIGHT & FREE ORBIT */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-0 z-0 pointer-events-auto ${
          activeWaypoint ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <WebGLErrorBoundary>
          <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }}>
            {/* Authentic OG Amber Liuli Crystal Lighting with Signature Electric Klein Blue Glow */}
            <ambientLight intensity={1.0} />

            {/* 1. Back-Left & Top Electric Klein Blue Rim Lights (Klein Blue glow over orange lily) */}
            <directionalLight position={[-3.5, 4.5, -2.0]} intensity={6.0} color="#0038FF" />
            <pointLight position={[0, 4.5, -2.0]} intensity={5.5} color="#002FA7" />
            <pointLight position={[-3, 1, -1]} intensity={4.5} color="#0055FF" />
            <directionalLight position={[3, 3.5, -2.5]} intensity={3.5} color="#0038FF" />

            {/* 2. Warm Golden & Molten Amber Front Fill (Radiant orange lily body) */}
            <pointLight position={[3, -1.5, 2.5]} intensity={5.0} color="#FF6600" />
            <pointLight position={[-2, -2, 2.0]} intensity={4.0} color="#FFAA00" />

            {/* 3. Top White Specular Key Light (Glistening wet glaze shine) */}
            <directionalLight position={[0, 4, 3]} intensity={3.2} color="#FFFFFF" />

            {/* Dynamic 3D Cursor Follower Light: Illuminates micro-details & petal reflections under cursor */}
            <CursorInteractiveLight />

            {/* Unified Cinematic Camera Rig with Free Orbit & Wheel Zoom */}
            <CameraRig activeWaypoint={activeWaypoint} flowerPos={flowerPos} />

            <Suspense fallback={null}>
              <group position={flowerPos}>
                <LiuliLilyModel
                  activeWaypoint={activeWaypoint}
                  position={[0, 0, 0]}
                  dragAngleOffset={dragAngleOffset}
                />
              </group>
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      </div>

      {/* Deep Klein Blue & Molten Amber Atmospheric Radiance */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#002FA7]/14 blur-[180px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#FF5500]/10 blur-[180px] pointer-events-none" />

      {/* Directional atmospheric vignette on left for guaranteed text contrast without obscuring mobile flower */}
      <div className="fixed top-0 left-0 w-full lg:w-3/5 h-full pointer-events-none bg-gradient-to-b from-[#050608]/75 via-transparent to-[#050608]/75 lg:bg-gradient-to-r lg:from-[#050608]/90 lg:via-[#050608]/50 lg:to-transparent z-10" />

      {/* ========================================================================= */}
      {/* 3. UNIFIED TOP NAVIGATION (FRAMELESS, ZERO OVERLAP, ADAPTIVE HEADER)      */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 w-full z-40 px-3 sm:px-6 lg:px-10 py-3 sm:py-5 flex items-center justify-between pointer-events-auto">
        {!activeWaypoint ? (
          <>
            {/* Overview Left: Personal Brand Signature Logo + Language Switcher (EN | 中 | ES | FR) */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <button
                onClick={handleGoHome}
                className="flex items-center gap-2 group cursor-pointer transition-transform duration-300 hover:scale-105"
                title="Kelsey Lin"
              >
                <img
                  src="/kelsey-signature-logo.png"
                  alt="Kelsey Lin Logo"
                  className="h-8 sm:h-9 w-auto object-contain opacity-85 group-hover:opacity-100 transition-opacity filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]"
                />
              </button>

              {/* Language Switcher moved next to logo */}
              <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/[0.08]">
                {(['en', 'zh', 'es', 'fr'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
                      language === lang
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : lang === 'zh' ? '中' : lang === 'es' ? 'ES' : 'FR'}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview Right: Navigation Links */}
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6 ml-auto">
              <nav className="flex items-center gap-2 sm:gap-4 md:gap-6 text-[10px] sm:text-xs font-mono tracking-[0.12em] sm:tracking-[0.18em] uppercase">
                <button
                  onClick={handleWorksClick}
                  className={`transition-colors cursor-pointer ${
                    !isAboutOpen && !isIndexOpen
                      ? 'text-white font-semibold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                  title="Explore Works (Afterlife Club)"
                >
                  {t.header.works}
                </button>

                <button
                  onClick={() => {
                    setIsAboutOpen(true);
                    setIsIndexOpen(false);
                    setSelectedDetailWaypoint(null);
                    if (typeof window !== 'undefined') window.history.pushState(null, '', '#about');
                  }}
                  className={`transition-colors cursor-pointer ${
                    isAboutOpen ? 'text-white font-semibold' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {t.header.about}
                </button>

                <button
                  onClick={() => {
                    setIsIndexOpen(true);
                    setIsAboutOpen(false);
                    setSelectedDetailWaypoint(null);
                    if (typeof window !== 'undefined') window.history.pushState(null, '', '#index');
                  }}
                  className={`transition-colors cursor-pointer hidden xs:inline ${
                    isIndexOpen ? 'text-white font-semibold' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {t.header.index}
                </button>

                <a
                  href="mailto:kelslin@umich.edu"
                  className="text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                >
                  {t.header.contact}
                </a>
              </nav>
            </div>
          </>
        ) : (
          <>
            {/* Macro View Left: Brand Logo + Language Switcher + Overview Exit + Chapter Badge (Responsive) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleGoHome}
                className="flex items-center gap-2 group cursor-pointer transition-transform duration-300 hover:scale-105 mr-1"
                title="Kelsey Lin — Homepage"
              >
                <img
                  src="/kelsey-signature-logo.png"
                  alt="Kelsey Lin Logo"
                  className="h-8 sm:h-9 w-auto object-contain opacity-85 group-hover:opacity-100 transition-opacity filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]"
                />
              </button>

              {/* Language Switcher next to logo */}
              <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/[0.08] mr-1">
                {(['en', 'zh', 'es', 'fr'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
                      language === lang
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : lang === 'zh' ? '中' : lang === 'es' ? 'ES' : 'FR'}
                  </button>
                ))}
              </div>

              <button
                onClick={handleGoHome}
                className="flex items-center gap-1.5 sm:gap-2 py-1.5 px-3 sm:px-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] transition-all cursor-pointer backdrop-blur-md"
              >
                <span>✕</span>
                <span>{t.header.overviewExit}</span>
              </button>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#0055FF] hidden sm:inline font-semibold">
                {t.projects[activeWaypoint.id]?.title || activeWaypoint.title}
              </span>
            </div>

            {/* Macro View Right: Prev / Next Petal Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono tracking-[0.12em] sm:tracking-[0.15em] uppercase">
              <button
                onClick={() => {
                  const idx = PORTFOLIO_WAYPOINTS.findIndex((w) => w.id === activeWaypoint.id);
                  handleSelectWaypoint(
                    PORTFOLIO_WAYPOINTS[(idx - 1 + PORTFOLIO_WAYPOINTS.length) % PORTFOLIO_WAYPOINTS.length]
                  );
                }}
                className="flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E2E8F0] hover:text-white backdrop-blur-md transition-colors cursor-pointer"
                title="Previous project"
              >
                <span>←</span>
                <span className="hidden sm:inline">{t.header.prev}</span>
              </button>
              <button
                onClick={() => {
                  const idx = PORTFOLIO_WAYPOINTS.findIndex((w) => w.id === activeWaypoint.id);
                  handleSelectWaypoint(
                    PORTFOLIO_WAYPOINTS[(idx + 1) % PORTFOLIO_WAYPOINTS.length]
                  );
                }}
                className="flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E2E8F0] hover:text-white backdrop-blur-md transition-colors cursor-pointer"
                title="Next project"
              >
                <span className="hidden sm:inline">{t.header.next}</span>
                <span>→</span>
              </button>
            </div>
          </>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 4. OVERVIEW EDITORIAL IDENTITY (FULLY RESPONSIVE & CLEAN)                  */}
      {/* ========================================================================= */}
      {!activeWaypoint && !isAboutOpen && !isIndexOpen && !selectedDetailWaypoint && (
        <div className="fixed left-5 sm:left-12 lg:left-20 top-24 sm:top-28 lg:top-1/2 lg:-translate-y-1/2 max-w-2xl lg:max-w-3xl xl:max-w-5xl z-20 pointer-events-none select-none">
          <div className="pointer-events-none">
            {/* Haute Fashion Editorial Identity: Wind Breeze Vogue Typography */}
            <WindBreezeHeroName name={t.hero.name} />

            {/* Natural Human Recruiter Introduction (Elevated with clean vertical rhythm) */}
            <p className="relative z-10 font-sans text-neutral-300/90 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-md sm:max-w-lg">
              {t.hero.intro}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. EDITORIAL PROJECT NAVIGATION (DOTLESS, FRAMELESS, ARCHITECTURAL)       */}
      {/* ========================================================================= */}
      {/* Desktop: Refined Frameless Architectural Project Index (No dots, no clunky boxes) */}
      {!activeWaypoint && !isAboutOpen && !isIndexOpen && !selectedDetailWaypoint && (
        <div className="hidden lg:flex fixed right-8 xl:right-14 top-1/2 -translate-y-1/2 z-20 pointer-events-auto flex-col items-end gap-3.5 select-none">
          <div className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase mb-1">
            {t.constellation.title}
          </div>
          {PORTFOLIO_WAYPOINTS.map((wp) => {
            const projectT = TRANSLATIONS[language]?.projects[wp.id];
            const title = projectT?.title || wp.title;

            return (
              <button
                key={wp.id}
                type="button"
                onClick={() => handleSelectWaypoint(wp)}
                onMouseEnter={() => setHoveredWaypoint(wp)}
                onMouseLeave={() => setHoveredWaypoint(null)}
                className="group flex items-baseline justify-end gap-3 text-right transition-all duration-300 cursor-pointer py-1 relative"
              >
                <span className="font-mono text-[10px] text-neutral-500 group-hover:text-blue-400 transition-colors duration-300">
                  {wp.chapter} //
                </span>
                <span className="font-syne text-xs sm:text-sm font-semibold tracking-wide text-neutral-400 group-hover:text-white group-hover:translate-x-[-4px] transition-all duration-300">
                  {title.split(/ & | y /)[0]}
                </span>
                <span className="inline-block h-px w-0 group-hover:w-5 bg-gradient-to-r from-blue-400 to-amber-400 transition-all duration-300 self-center" />
              </button>
            );
          })}
        </div>
      )}

      {/* Mobile: Sleek horizontal bottom project dock (Frameless, zero dots) */}
      {!activeWaypoint && !isAboutOpen && !isIndexOpen && !selectedDetailWaypoint && (
        <div className="flex lg:hidden fixed bottom-16 left-0 right-0 z-20 pointer-events-auto justify-center gap-2 px-4 select-none overflow-x-auto no-scrollbar">
          {PORTFOLIO_WAYPOINTS.map((wp) => {
            const projectT = TRANSLATIONS[language]?.projects[wp.id];
            const title = projectT?.title || wp.title;

            return (
              <button
                key={wp.id}
                type="button"
                onClick={() => handleSelectWaypoint(wp)}
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#06080E]/85 backdrop-blur-md text-[10px] font-mono tracking-wider text-neutral-300 hover:text-white border border-white/10 transition-all cursor-pointer shadow-lg active:scale-95 shrink-0"
              >
                <span className="text-[9px] text-blue-400 font-bold">{wp.chapter}</span>
                <span>{title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. CINEMATIC MACRO OVERLAY (ZOOMED INTO PETAL)                            */}
      {/* ========================================================================= */}
      <CinematicMacroOverlay
        activeWaypoint={activeWaypoint}
        onClose={handleGoHome}
        onSelectWaypoint={handleSelectWaypoint}
        onOpenDetails={() => {
          if (activeWaypoint) {
            setSelectedDetailWaypoint(activeWaypoint);
          }
        }}
        language={language}
      />

      {/* ========================================================================= */}
      {/* 7. FULL-SCREEN PROJECT DETAIL VIEW (DETAILED RESUME BREAKDOWN)            */}
      {/* ========================================================================= */}
      <ProjectDetailModal
        waypoint={selectedDetailWaypoint}
        onClose={() => setSelectedDetailWaypoint(null)}
        onNavigate={(wp) => {
          setSelectedDetailWaypoint(wp);
          handleSelectWaypoint(wp);
        }}
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* ========================================================================= */}
      {/* 8. ABOUT & STORY MODAL (WITH FIXED EXIT BAR & BULLETPROOF DISMISSAL)      */}
      {/* ========================================================================= */}
      <AboutStoryModal
        isOpen={isAboutOpen}
        onClose={handleGoHome}
        onExploreWorks={handleWorksClick}
        language={language}
      />

      {/* ========================================================================= */}
      {/* 9. RECRUITER FAST-SCAN INDEX MODAL (WITH FIXED EXIT BAR)                 */}
      {/* ========================================================================= */}
      <RecruiterIndexModal
        isOpen={isIndexOpen}
        onClose={handleGoHome}
        onJumpToWaypoint={(wp) => {
          setIsIndexOpen(false);
          handleSelectWaypoint(wp);
        }}
        language={language}
      />

      {/* Single Dedicated Audio Controller on Left Bottom Screen */}
      <LeftBottomAudioIndicator />
    </div>
    </AudioProvider>
  );
}