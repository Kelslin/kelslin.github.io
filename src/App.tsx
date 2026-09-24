import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Layers, Mail, User, Compass } from 'lucide-react';
import * as THREE from 'three';
import LiuliLilyModel from './components/LiuliLilyModel';
import CinematicMacroOverlay from './components/CinematicMacroOverlay';
import AboutStoryModal from './components/AboutStoryModal';
import RecruiterIndexModal from './components/RecruiterIndexModal';
import ProjectDetailModal from './components/ProjectDetailModal';
import { Waypoint, PORTFOLIO_WAYPOINTS } from './data/portfolioData';

// ==========================================
// 1. DYNAMIC CURSOR FOLLOWER LIGHT (MICRO-DETAIL ILLUMINATION)
// ==========================================
function CursorInteractiveLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    if (!lightRef.current) return;
    // Map 2D pointer coordinates (-1 to 1) into 3D world space over the flower
    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;
    lightRef.current.position.set(x, y, 1.2);
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
      {/* Warm Radiant Glory & Pollen Aura Wake */}
      <div
        ref={wakeRef}
        className="pointer-events-none fixed top-0 left-0 z-[998] will-change-transform"
        style={{ transform: 'translate3d(-200px, -200px, 0) translate(-50%, -50%)' }}
      >
        {/* Outer ambient warm golden glow */}
        <div className="w-[280px] h-[280px] rounded-full bg-gradient-to-r from-[#FF5500]/30 via-[#FFAA00]/35 to-transparent blur-[65px]" />
        {/* Radiant inner glory halo centered right behind bee */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85px] h-[85px] rounded-full bg-[#FFAA00]/70 blur-[18px]" />
      </div>

      {/* Glass Liuli Honeybee with Luminous Glory */}
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
              <linearGradient id="beeBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFAA00" />
                <stop offset="35%" stopColor="#1E1404" />
                <stop offset="55%" stopColor="#FF5500" />
                <stop offset="75%" stopColor="#140D02" />
                <stop offset="100%" stopColor="#FF8800" />
              </linearGradient>
              <linearGradient id="crystalWing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#002FA7" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Left Glass Wing */}
            <path
              d="M 48 45 C 20 20 8 30 15 50 C 22 68 45 52 48 48 Z"
              fill="url(#crystalWing)"
              stroke="rgba(216,236,248,0.8)"
              strokeWidth="0.8"
              className="origin-[48px_48px] animate-[pulse_0.18s_ease-in-out_infinite]"
            />

            {/* Right Glass Wing */}
            <path
              d="M 52 45 C 80 20 92 30 85 50 C 78 68 55 52 52 48 Z"
              fill="url(#crystalWing)"
              stroke="rgba(216,236,248,0.8)"
              strokeWidth="0.8"
              className="origin-[52px_48px] animate-[pulse_0.18s_ease-in-out_infinite]"
            />

            {/* Honeybee Head & Antennas */}
            <circle cx="50" cy="30" r="6" fill="#1C1405" stroke="#FFAA00" strokeWidth="0.5" />
            <path d="M 48 26 Q 44 20 40 21" stroke="#FFAA00" strokeWidth="1" strokeLinecap="round" fill="none" />
            <path d="M 52 26 Q 56 20 60 21" stroke="#FFAA00" strokeWidth="1" strokeLinecap="round" fill="none" />

            {/* Striped Glass Abdomen */}
            <ellipse
              cx="50"
              cy="52"
              rx="10"
              ry="16"
              fill="url(#beeBody)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. MAIN INTERACTIVE APPLICATION
// ==========================================
export default function App() {
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

  const handlePointerUp = () => {
    if (!activeWaypoint || !isDraggingFlower.current) return;
    isDraggingFlower.current = false;
    const delta = currentDragDelta.current;
    setDragAngleOffset(0);

    const idx = PORTFOLIO_WAYPOINTS.findIndex((w) => w.id === activeWaypoint.id);
    if (delta < -35) {
      // Swiped / dragged left: go to next project
      setActiveWaypoint(PORTFOLIO_WAYPOINTS[(idx + 1) % PORTFOLIO_WAYPOINTS.length]);
    } else if (delta > 35) {
      // Swiped / dragged right: go to prev project
      setActiveWaypoint(
        PORTFOLIO_WAYPOINTS[(idx - 1 + PORTFOLIO_WAYPOINTS.length) % PORTFOLIO_WAYPOINTS.length]
      );
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050608] text-[#D8ECF8] font-sans selection:bg-[#002FA7] selection:text-white">
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
      </div>

      {/* Deep Klein Blue & Molten Amber Atmospheric Radiance */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#002FA7]/14 blur-[180px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#FF5500]/10 blur-[180px] pointer-events-none" />

      {/* Directional atmospheric vignette on left for guaranteed text contrast */}
      <div className="fixed top-0 left-0 w-full lg:w-3/5 h-full pointer-events-none bg-gradient-to-r from-[#050608]/90 via-[#050608]/50 to-transparent z-10" />

      {/* ========================================================================= */}
      {/* 3. UNIFIED TOP NAVIGATION (FRAMELESS, ZERO OVERLAP, ADAPTIVE HEADER)      */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 lg:px-10 py-4 sm:py-5 flex items-center justify-between pointer-events-auto">
        {!activeWaypoint ? (
          <>
            {/* Overview Left: KELSEY LIN / */}
            <button
              onClick={() => {
                setActiveWaypoint(null);
                setSelectedDetailWaypoint(null);
                setIsAboutOpen(false);
                setIsIndexOpen(false);
              }}
              className="flex items-center gap-1.5 group text-left cursor-pointer"
            >
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.22em] text-white uppercase">
                KELSEY LIN
              </span>
              <span className="text-[#0055FF] font-mono text-xs sm:text-sm font-semibold">
                /
              </span>
            </button>

            {/* Overview Right: Works, About, Index, Contact (Adaptive spacing) */}
            <nav className="flex items-center gap-3 sm:gap-6 md:gap-8 text-[11px] sm:text-xs font-mono tracking-[0.14em] sm:tracking-[0.2em] uppercase">
              <button
                onClick={() => {
                  setActiveWaypoint(null);
                  setSelectedDetailWaypoint(null);
                  setIsAboutOpen(false);
                  setIsIndexOpen(false);
                }}
                className={`transition-colors cursor-pointer ${
                  !isAboutOpen && !isIndexOpen
                    ? 'text-white font-semibold'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                // WORKS
              </button>

              <button
                onClick={() => {
                  setIsAboutOpen(true);
                  setIsIndexOpen(false);
                  setSelectedDetailWaypoint(null);
                }}
                className={`transition-colors cursor-pointer ${
                  isAboutOpen ? 'text-white font-semibold' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                // ABOUT
              </button>

              <button
                onClick={() => {
                  setIsIndexOpen(true);
                  setIsAboutOpen(false);
                  setSelectedDetailWaypoint(null);
                }}
                className={`transition-colors cursor-pointer ${
                  isIndexOpen ? 'text-white font-semibold' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                // INDEX
              </button>

              <a
                href="mailto:kelslin@umich.edu"
                className="text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              >
                CONTACT ↗
              </a>
            </nav>
          </>
        ) : (
          <>
            {/* Macro View Left: Overview Exit & Chapter Badge (Responsive) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setActiveWaypoint(null)}
                className="flex items-center gap-1.5 sm:gap-2 py-1.5 px-3 sm:px-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] transition-all cursor-pointer backdrop-blur-md"
              >
                <span>✕</span>
                <span>Overview</span>
                <span className="text-[10px] text-white/50 hidden sm:inline">[ESC]</span>
              </button>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#FFAA00] hidden sm:inline font-semibold">
                {activeWaypoint.title}
              </span>
            </div>

            {/* Macro View Right: Prev / Next Petal Buttons (Responsive) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-xs font-mono tracking-[0.12em] sm:tracking-[0.15em] uppercase">
              <button
                onClick={() => {
                  const idx = PORTFOLIO_WAYPOINTS.findIndex((w) => w.id === activeWaypoint.id);
                  setActiveWaypoint(
                    PORTFOLIO_WAYPOINTS[(idx - 1 + PORTFOLIO_WAYPOINTS.length) % PORTFOLIO_WAYPOINTS.length]
                  );
                }}
                className="flex items-center gap-1 py-1.5 px-2.5 sm:px-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E2E8F0] hover:text-white backdrop-blur-md transition-colors cursor-pointer"
              >
                <span>←</span>
                <span className="hidden sm:inline">Prev [←]</span>
              </button>
              <button
                onClick={() => {
                  const idx = PORTFOLIO_WAYPOINTS.findIndex((w) => w.id === activeWaypoint.id);
                  setActiveWaypoint(
                    PORTFOLIO_WAYPOINTS[(idx + 1) % PORTFOLIO_WAYPOINTS.length]
                  );
                }}
                className="flex items-center gap-1 py-1.5 px-2.5 sm:px-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E2E8F0] hover:text-white backdrop-blur-md transition-colors cursor-pointer"
              >
                <span className="hidden sm:inline">Next [→]</span>
                <span>→</span>
              </button>
            </div>
          </>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 4. OVERVIEW EDITORIAL IDENTITY (FULLY RESPONSIVE & COUTURE DECORATIVE)    */}
      {/* ========================================================================= */}
      {!activeWaypoint && !isAboutOpen && !isIndexOpen && !selectedDetailWaypoint && (
        <div className="fixed left-5 sm:left-12 lg:left-20 top-[40%] sm:top-1/2 -translate-y-1/2 max-w-xl z-20 pointer-events-none select-none">
          <div className="pointer-events-none">
            {/* Bespoke Decorative Name Display */}
            <h1 className="leading-[0.88] select-none tracking-tight mb-5 sm:mb-6">
              {/* Line 1: Kelsey in high-fashion sculptural serif */}
              <div className="font-decorative-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-normal tracking-[-0.02em] flex items-baseline decorative-name-glow">
                <span>Kelsey</span>
                <span className="text-[#0055FF] text-2xl sm:text-3xl md:text-4xl font-mono ml-2.5 opacity-90 select-none font-light drop-shadow-[0_0_12px_rgba(0,56,255,0.9)]">
                  ✦
                </span>
              </div>
              {/* Line 2: Lin in sweeping dramatic italic flourish with Amber & Klein Blue glaze */}
              <div className="font-flourish-italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[-0.02em] amber-klein-prismatic-text flex items-baseline pl-1 sm:pl-2">
                <span>Lin</span>
                <span className="text-[#0055FF] not-italic drop-shadow-[0_0_14px_rgba(0,56,255,0.95)]">
                  .
                </span>
              </div>
            </h1>

            {/* Clear, Human 1-Sentence Recruiter Description */}
            <div className="border-l border-white/20 pl-4 sm:pl-5 my-5 sm:my-7 max-w-md sm:max-w-lg">
              <p className="font-sans text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                Product manager and 0→1 builder at Michigan, turning complex systems and human insights into intuitive, high-impact products.
              </p>
            </div>

            {/* High-Touch Fast Actions (Frameless, NO borders) */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pointer-events-auto pt-1">
              <button
                onClick={() => setActiveWaypoint(PORTFOLIO_WAYPOINTS[0])}
                className="group inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white hover:text-[#0055FF] transition-colors cursor-pointer"
              >
                <span>EXPLORE WORKS</span>
                <span className="transition-transform group-hover:translate-y-0.5 text-[#0055FF]">↓</span>
              </button>

              <button
                onClick={() => setIsAboutOpen(true)}
                className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              >
                // ABOUT ME
              </button>

              <button
                onClick={() => setIsIndexOpen(true)}
                className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              >
                // QUICK INDEX
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. ALWAYS-ON-TOP EXPERIENCE CONSTELLATION PINS (FRAMELESS GLASS)          */}
      {/* ========================================================================= */}
      {!activeWaypoint && !isAboutOpen && !isIndexOpen && !selectedDetailWaypoint && (
        <div className="fixed right-3 sm:right-10 top-1/2 -translate-y-1/2 z-20 pointer-events-auto flex flex-col gap-2 sm:gap-2.5 select-none">
          {PORTFOLIO_WAYPOINTS.map((wp) => {
            const isHovered = hoveredWaypoint?.id === wp.id;
            return (
              <button
                key={wp.id}
                type="button"
                onClick={() => setActiveWaypoint(wp)}
                onMouseEnter={() => setHoveredWaypoint(wp)}
                onMouseLeave={() => setHoveredWaypoint(null)}
                className={`group flex items-center justify-end gap-2 sm:gap-3 text-right transition-all duration-300 py-1.5 px-2 sm:px-3 rounded-xl cursor-pointer ${
                  isHovered
                    ? 'bg-white/15 translate-x-[-4px] shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md'
                    : 'bg-black/40 hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                <div className="hidden sm:block">
                  <div className="font-syne text-xs font-semibold text-white tracking-wide group-hover:text-amber-200 transition-colors">
                    {wp.title.split(' & ')[0]}
                  </div>
                </div>

                <span
                  className="w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: wp.accentColor }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. CINEMATIC MACRO OVERLAY (ZOOMED INTO PETAL — ZERO TEXT OVERLAP)        */}
      {/* ========================================================================= */}
      <CinematicMacroOverlay
        activeWaypoint={activeWaypoint}
        onClose={() => setActiveWaypoint(null)}
        onSelectWaypoint={setActiveWaypoint}
        onOpenDetails={() => {
          if (activeWaypoint) {
            setSelectedDetailWaypoint(activeWaypoint);
          }
        }}
      />

      {/* ========================================================================= */}
      {/* 7. FULL-SCREEN PROJECT DETAIL VIEW (DETAILED RESUME BREAKDOWN)            */}
      {/* ========================================================================= */}
      <ProjectDetailModal
        waypoint={selectedDetailWaypoint}
        onClose={() => setSelectedDetailWaypoint(null)}
        onNavigate={(wp) => {
          setSelectedDetailWaypoint(wp);
          setActiveWaypoint(wp);
        }}
      />

      {/* ========================================================================= */}
      {/* 8. ABOUT & STORY MODAL (WITH FIXED EXIT BAR & BULLETPROOF DISMISSAL)      */}
      {/* ========================================================================= */}
      <AboutStoryModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onExploreWorks={() => {
          setIsAboutOpen(false);
          setActiveWaypoint(null);
          setSelectedDetailWaypoint(null);
        }}
      />

      {/* ========================================================================= */}
      {/* 9. RECRUITER FAST-SCAN INDEX MODAL (WITH FIXED EXIT BAR)                 */}
      {/* ========================================================================= */}
      <RecruiterIndexModal
        isOpen={isIndexOpen}
        onClose={() => setIsIndexOpen(false)}
        onJumpToWaypoint={(wp) => {
          setIsIndexOpen(false);
          setActiveWaypoint(wp);
        }}
      />
    </div>
  );
}