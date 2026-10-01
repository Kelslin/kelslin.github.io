import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUp, Linkedin, Github, Mail, Menu, X, RotateCcw, Plus, Minus, ExternalLink } from 'lucide-react';
import * as THREE from 'three';
import LiuliPreloader from './components/LiuliPreloader';
import LiuliLilyModel from './components/LiuliLilyModel';
import AboutSection from './components/AboutSection';
import ProjectScrollCard from './components/ProjectScrollCard';
import RecruiterIndexModal from './components/RecruiterIndexModal';
import ProjectDetailModal from './components/ProjectDetailModal';
import LeadershipSection from './components/LeadershipSection';
import { SiteFooter } from './components/SiteFooter';
import { AudioProvider } from './context/AudioContext';
import { Waypoint, PORTFOLIO_WAYPOINTS, LensType } from './data/portfolioData';
import { Language, TRANSLATIONS } from './data/translations';

// ==========================================
// 0. BULLETPROOF WEBGL ERROR BOUNDARY
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
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-20">
          <div className="w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-[#F59E0B]/20 to-[#FFAA00]/15 blur-[100px] pointer-events-none" />
          <div className="relative z-10 text-center space-y-3 px-4">
            <p className="font-syne text-lg text-white font-bold">3D View Offline</p>
            <p className="text-xs font-mono text-neutral-400 max-w-sm">
              WebGL graphics encountered a browser glitch. The rest of the portfolio is fully functional.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 rounded-full bg-white text-black font-mono text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer shadow-lg"
            >
              Reload 3D Scene
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// 1. DYNAMIC CURSOR FOLLOWER LIGHT
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
      intensity={7.5}
      distance={6.5}
      decay={2}
      color="#FFAA00"
    />
  );
}

// ==========================================
// 2. SCROLLYTELLING CAMERA RIG
// Centered top-to-bottom blossom view in the back
// ==========================================
function CenteredScrollyCameraRig({
  scrollStateRef,
  zoomRef,
}: {
  scrollStateRef: React.MutableRefObject<{ heroProgress: number }>;
  zoomRef: React.MutableRefObject<number>;
}) {
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  useFrame(() => {
    const heroToAboutTransition = scrollStateRef.current.heroProgress;
    const zoomOffset = zoomRef.current; // -1.8 (zoom in) to +2.5 (zoom out)

    // Fade out manual zoom as user leaves Hero (heroProgress > 0)
    const effectiveZoom = zoomOffset * (1 - Math.min(1, heroToAboutTransition * 3));

    // 1. Side profile view coordinates (Hero section: centered side profile of the glass lily)
    const baseSideZ = isMobile ? 4.8 : 4.3;
    const sidePos = isMobile
      ? new THREE.Vector3(0, 0.2, baseSideZ + effectiveZoom)
      : new THREE.Vector3(0, 0.25, baseSideZ + effectiveZoom);
    const sideLook = new THREE.Vector3(0, 0, 0);

    // 2. Centered top-to-bottom blossom view (About & Projects: camera looks straight down into the petals at the back)
    const topPos = isMobile
      ? new THREE.Vector3(0, 3.4, 2.0)
      : new THREE.Vector3(0, 3.2, 1.8);
    const topLook = new THREE.Vector3(0, -0.1, 0.05);

    // Smoothly interpolate between side view and centered top-to-bottom bloom view
    const targetPos = new THREE.Vector3().lerpVectors(sidePos, topPos, heroToAboutTransition);
    const targetLook = new THREE.Vector3().lerpVectors(sideLook, topLook, heroToAboutTransition);

    camera.position.lerp(targetPos, 0.06);
    camera.lookAt(targetLook);
  });

  return null;
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
    <div className="hidden lg:block pointer-events-none">
      {/* Warm Radiant Glory & Pollen Aura Wake */}
      <div
        ref={wakeRef}
        className="pointer-events-none fixed top-0 left-0 z-[998] will-change-transform"
        style={{ transform: 'translate3d(-200px, -200px, 0) translate(-50%, -50%)' }}
      >
        <div className="w-[280px] h-[280px] rounded-full bg-gradient-to-r from-[#FF5500]/30 via-[#FFAA00]/35 to-transparent blur-[65px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85px] h-[85px] rounded-full bg-[#FFAA00]/70 blur-[18px]" />
      </div>

      {/* Bioluminescent Glass Hotaru (Firefly) */}
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
              <radialGradient id="fireflyLantern" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#FFF0B3" />
                <stop offset="55%" stopColor="#FFAA00" />
                <stop offset="85%" stopColor="#FF5500" />
                <stop offset="100%" stopColor="#1E1404" />
              </radialGradient>
              <linearGradient id="fireflyWing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3" />
              </linearGradient>
              <radialGradient id="lanternHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFAA00" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#FF7700" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FF7700" stopOpacity="0.3" />
              </radialGradient>
            </defs>

            <circle cx="50" cy="56" r="14" fill="url(#lanternHalo)" />

            <path
              d="M 49 38 C 24 16, 12 30, 20 52 C 27 66, 46 48, 48 42 Z"
              fill="url(#fireflyWing)"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="0.7"
              className="origin-[49px_40px] animate-[pulse_0.22s_ease-in-out_infinite]"
            />
            <path
              d="M 51 38 C 76 16, 88 30, 80 52 C 73 66, 54 48, 52 42 Z"
              fill="url(#fireflyWing)"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="0.7"
              className="origin-[51px_40px] animate-[pulse_0.22s_ease-in-out_infinite]"
            />

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

            <ellipse cx="50" cy="38" rx="4.5" ry="5.5" fill="#18181B" stroke="#71717A" strokeWidth="0.6" />
            <circle cx="50" cy="28" r="3.2" fill="#18181B" stroke="#71717A" strokeWidth="0.5" />
            <path d="M 48 26 Q 42 16 35 17" stroke="#FDE047" strokeWidth="0.7" strokeLinecap="round" fill="none" />
            <circle cx="35" cy="17" r="1.2" fill="#FEF08A" />
            <path d="M 52 26 Q 58 16 65 17" stroke="#FDE047" strokeWidth="0.7" strokeLinecap="round" fill="none" />
            <circle cx="65" cy="17" r="1.2" fill="#FEF08A" />

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
// 4. MAIN SCROLLYTELLING APPLICATION
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

  // Discrete UI section state (Updates only when active section changes to avoid React churn)
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(-1);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeLens, setActiveLens] = useState<LensType>('ventures');

  // Performance optimized mutable scroll ref for 60fps Three.js animation
  const scrollStateRef = useRef({ heroProgress: 0 });

  // Mutable ref for dynamic background blur and scrim transition as user scrolls
  const blurVeilRef = useRef<HTMLDivElement>(null);

  // Mutable ref for interactive mouse/touch orbit control and cursor parallax
  const manualOrbitRef = useRef({
    dragY: 0,
    dragTiltX: 0,
    hoverX: 0,
    hoverY: 0,
    isDragging: false,
    velocityX: 0,
    velocityY: 0,
  });

  // Mobile menu dropdown state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Header scroll state (frosted glass transition)
  const [isScrolled, setIsScrolled] = useState(false);

  // 3D Lily interactive zoom control (macro view to wide view)
  const [zoomDisplay, setZoomDisplay] = useState(100);
  const zoomRef = useRef(0); // 0 = default, -1.8 = ~150% macro view, +2.5 = ~50% wide view

  const handleZoomIn = () => {
    zoomRef.current = Math.max(-1.8, zoomRef.current - 0.45);
    setZoomDisplay(Math.round((1 - zoomRef.current / 4.3) * 100));
  };

  const handleZoomOut = () => {
    zoomRef.current = Math.min(2.5, zoomRef.current + 0.45);
    setZoomDisplay(Math.round((1 - zoomRef.current / 4.3) * 100));
  };

  const handleZoomReset = () => {
    zoomRef.current = 0;
    setZoomDisplay(100);
  };

  // Modals
  const [selectedDetailWaypoint, setSelectedDetailWaypoint] = useState<Waypoint | null>(null);
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  // Interactive Mouse / Touch Drag Orbit Control for 3D Flower with momentum physics
  useEffect(() => {
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const onPointerDown = (e: PointerEvent) => {
      // Don't hijack clicks on buttons, links, inputs, and modal contents
      const target = e.target as HTMLElement;
      if (
        target.closest('button, a, input, select, textarea, [role="button"]') ||
        target.closest('#project-detail-modal') ||
        target.closest('#recruiter-modal')
      ) {
        return;
      }
      isDragging = true;
      manualOrbitRef.current.isDragging = true;
      manualOrbitRef.current.velocityX = 0;
      manualOrbitRef.current.velocityY = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = performance.now();
    };

    const onPointerMove = (e: PointerEvent) => {
      // Subtle cursor tracking parallax
      if (typeof window !== 'undefined') {
        manualOrbitRef.current.hoverX = (e.clientX / window.innerWidth - 0.5) * 0.35;
        manualOrbitRef.current.hoverY = (e.clientY / window.innerHeight - 0.5) * 0.25;
      }

      if (!isDragging) return;

      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;

      const deltaAngleY = dx * 0.0065;
      const deltaTiltX = dy * 0.0035;

      manualOrbitRef.current.dragY += deltaAngleY;
      manualOrbitRef.current.dragTiltX = Math.max(
        -0.7,
        Math.min(0.7, manualOrbitRef.current.dragTiltX + deltaTiltX)
      );

      // Smooth velocity estimation for silky momentum after release
      const instVx = (deltaAngleY / dt) * 16;
      manualOrbitRef.current.velocityX = manualOrbitRef.current.velocityX * 0.35 + instVx * 0.65;
    };

    const onPointerUp = () => {
      if (isDragging) {
        isDragging = false;
        manualOrbitRef.current.isDragging = false;
      }
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  // Wheel / Trackpad pinch zoom on 3D lily when in Hero section
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (window.scrollY > 80) return;
      // Trackpad pinch gesture (ctrlKey) or Shift key held zooms the 3D flower
      if (e.ctrlKey || e.shiftKey) {
        e.preventDefault();
        const delta = e.deltaY * 0.005;
        zoomRef.current = Math.max(-1.8, Math.min(2.5, zoomRef.current + delta));
        setZoomDisplay(Math.round((1 - zoomRef.current / 4.3) * 100));
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  // Throttled high-performance scroll listener
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const vh = window.innerHeight;

          // Update header frosted glass state
          setIsScrolled(scrollY > 20);

          // 1. Continuous smooth hero progress for Three.js camera & model tilt
          const heroProgress = Math.min(1, Math.max(0, scrollY / (vh * 0.65)));
          scrollStateRef.current.heroProgress = heroProgress;

          // Dynamically adjust background flower blur and dark veil
          // At scrollY = 0 (Hero): 0px blur, 0 opacity (completely clear flower)
          // As user scrolls down: slowly dissolves into a soft, dreamlike background bokeh for high text contrast
          if (blurVeilRef.current) {
            const blurPx = heroProgress * 8;
            const scrimAlpha = heroProgress * 0.65;
            blurVeilRef.current.style.backdropFilter = `blur(${blurPx.toFixed(1)}px)`;
            blurVeilRef.current.style.webkitBackdropFilter = `blur(${blurPx.toFixed(1)}px)`;
            blurVeilRef.current.style.backgroundColor = `rgba(5, 6, 8, ${scrimAlpha.toFixed(2)})`;
          }

          // 2. Discrete section detection via getBoundingClientRect (reliable across nested offset parents)
          const aboutEl = document.getElementById('about');
          const venturesEl = document.getElementById('chapter-ventures');
          const leadershipEl = document.getElementById('chapter-leadership');
          const projectEls = document.querySelectorAll<HTMLElement>('.project-scroll-section');

          const aboutRect = aboutEl?.getBoundingClientRect();
          const venturesRect = venturesEl?.getBoundingClientRect();
          const leadershipRect = leadershipEl?.getBoundingClientRect();

          if (leadershipRect && leadershipRect.top <= vh * 0.45) {
            // User has scrolled into Leadership & Community
            setActiveLens((prev) => (prev !== 'leadership' ? 'leadership' : prev));
            setActiveSection((prev) => (prev !== 'leadership' ? 'leadership' : prev));
          } else if (venturesRect && venturesRect.top <= vh * 0.45) {
            // User has scrolled into Ventures & Products
            setActiveLens((prev) => (prev !== 'ventures' ? 'ventures' : prev));

            let activeIdx = -1;
            let activeId = '';
            let closestDist = Infinity;

            projectEls.forEach((el, idx) => {
              const rect = el.getBoundingClientRect();
              const elMid = rect.top + rect.height / 2;
              const dist = Math.abs(elMid - vh * 0.45);
              if (dist < closestDist) {
                closestDist = dist;
                activeIdx = idx;
                activeId = el.getAttribute('data-project-id') || '';
              }
            });

            if (activeIdx >= 0) {
              setActiveProjectIndex((prev) => (prev !== activeIdx ? activeIdx : prev));
              setActiveSection((prev) => (prev !== activeId ? activeId : prev));
            }
          } else if (aboutRect && aboutRect.top <= vh * 0.5) {
            // In About section
            setActiveSection((prev) => (prev !== 'about' ? 'about' : prev));
            setActiveProjectIndex((prev) => (prev !== -1 ? -1 : prev));
          } else {
            // In Hero section
            setActiveSection((prev) => (prev !== 'hero' ? 'hero' : prev));
            setActiveProjectIndex((prev) => (prev !== -1 ? -1 : prev));
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Smooth scroll navigation anchors
  const handleScrollToTop = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToHeader = (containerId: string, offset = 76) => {
    setIsMobileMenuOpen(false);
    const container = document.getElementById(containerId);
    if (container) {
      const header = container.querySelector('h2') || container;
      const targetY = header.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
  };

  const handleScrollToAbout = () => {
    scrollToHeader('about', 76);
  };

  const handleScrollToVentures = () => {
    scrollToHeader('chapter-ventures', 76);
  };

  const handleScrollToLeadership = () => {
    scrollToHeader('chapter-leadership', 76);
  };

  const handleJumpToWaypoint = (wp: Waypoint) => {
    const el = document.getElementById(`project-${wp.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Grouped projects by chapter
  const ventureProjects = PORTFOLIO_WAYPOINTS.filter((w) => w.lens === 'ventures');
  const leadershipProjects = PORTFOLIO_WAYPOINTS.filter((w) => w.lens === 'leadership');

  return (
    <AudioProvider>
      <div className="relative w-full min-h-screen bg-[#050608] text-[#D8ECF8] font-sans selection:bg-[#F59E0B] selection:text-black overflow-x-hidden">
        {/* 0. Preloader Screen with Asset Loading Progress & Cinematic Fade-out */}
        <LiuliPreloader />

        {/* 1. Kinetic Honeybee Cursor */}
        <CrystalFollowerCursor />

        {/* ========================================================================= */}
        {/* FIXED 3D BACKGROUND CANVAS: CENTERED TOP-TO-BOTTOM BLOSSOM VIEW AT THE BACK */}
        {/* ========================================================================= */}
        <div className="fixed inset-0 z-0">
          <WebGLErrorBoundary>
            <Canvas
              dpr={[1, 1.5]}
              gl={{
                powerPreference: 'high-performance',
                antialias: true,
                alpha: true,
                stencil: false,
                depth: true,
              }}
              camera={{ position: [0, 0.25, 4.3], fov: 42 }}
            >
              <ambientLight intensity={1.1} />

              {/* Back-Left & Top Electric Klein Blue Rim Lights */}
              <directionalLight position={[-3.5, 4.5, -2.0]} intensity={5.5} color="#0038FF" />
              <pointLight position={[0, 4.5, -2.0]} intensity={5.0} color="#002FA7" />
              <pointLight position={[-3, 1, -1]} intensity={4.0} color="#0055FF" />
              <directionalLight position={[3, 3.5, -2.5]} intensity={3.5} color="#0038FF" />

              {/* Warm Golden & Molten Amber Front Fill */}
              <pointLight position={[3, -1.5, 2.5]} intensity={4.5} color="#FF6600" />
              <pointLight position={[-2, -2, 2.0]} intensity={3.8} color="#FFAA00" />

              {/* Top White Specular Key Light */}
              <directionalLight position={[0, 4, 3]} intensity={3.0} color="#FFFFFF" />

              {/* Dynamic 3D Cursor Follower Light */}
              <CursorInteractiveLight />

              {/* Scrollytelling Camera Rig: Centered top-to-bottom blossom view in back */}
              <CenteredScrollyCameraRig scrollStateRef={scrollStateRef} zoomRef={zoomRef} />

              <Suspense fallback={null}>
                <LiuliLilyModel
                  heroToAboutTransition={scrollStateRef.current.heroProgress}
                  activeProjectIndex={activeProjectIndex}
                  activeSection={activeSection}
                  activeLens={activeLens}
                  position={[0, 0, 0]}
                  manualOrbitRef={manualOrbitRef}
                />
              </Suspense>
            </Canvas>
          </WebGLErrorBoundary>
        </div>

        {/* Soft Radial Ambient Glow */}
        <div className="fixed top-[-10%] left-[-10%] w-[650px] h-[650px] rounded-full bg-[#F59E0B]/15 blur-[180px] pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[650px] h-[650px] rounded-full bg-[#FFAA00]/12 blur-[180px] pointer-events-none" />

        {/* Dynamic atmospheric scrim & backdrop blur over 3D background canvas:
            Starts at 0px blur & transparent in Hero, smoothly blurring to soft bokeh as user scrolls down */}
        <div
          ref={blurVeilRef}
          className="fixed inset-0 pointer-events-none z-[1] will-change-[backdrop-filter,background-color]"
          style={{
            backdropFilter: 'blur(0px)',
            WebkitBackdropFilter: 'blur(0px)',
            backgroundColor: 'rgba(5, 6, 8, 0)',
          }}
        />

        {/* ========================================================================= */}
        {/* COHESIVE EDGE-TO-EDGE TOP NAVIGATION (FROSTED ON SCROLL, MASKING CONTENT) */}
        {/* ========================================================================= */}
        <header
          className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 pointer-events-auto ${
            isScrolled
              ? 'bg-[#050608]/85 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] py-3 sm:py-3.5'
              : 'bg-transparent py-5 sm:py-6'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
            {/* Brand Signature Monogram & Name + Dynamic Contact Icons on Scroll */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleScrollToTop}
                className="flex items-center gap-2.5 p-1 rounded-full hover:opacity-90 transition-opacity cursor-pointer focus:outline-none"
                title="Kelsey Lin — Return to Top"
              >
                <img
                  src="/kelsey-signature-logo.png"
                  alt="Kelsey Lin Logo"
                  className="h-7 sm:h-8 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]"
                />
                <span className="font-syne font-bold text-white text-sm sm:text-base tracking-tight hidden xs:inline">
                  Kelsey Lin
                </span>
              </button>

              {/* Dynamic Contact Channels in Sticky Header on Scroll */}
              <AnimatePresence>
                {isScrolled && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1 sm:gap-1.5 pl-2 sm:pl-3 border-l border-white/10"
                  >
                    <a
                      href="https://www.linkedin.com/in/kel-lin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                      title="LinkedIn"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://github.com/Kelslin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                      title="GitHub"
                      aria-label="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="mailto:kelslin@umich.edu"
                      className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                      title="Email Kelsey"
                      aria-label="Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Horizontal Navigation Capsule (Frameless & Seamless) */}
            <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/[0.03] backdrop-blur-md">
              <button
                onClick={handleScrollToTop}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeSection === 'hero'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                Home
              </button>

              <button
                onClick={handleScrollToAbout}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeSection === 'about'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                About
              </button>

              <button
                onClick={handleScrollToVentures}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeLens === 'ventures' && activeSection !== 'hero' && activeSection !== 'about'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                Ventures
              </button>

              <button
                onClick={handleScrollToLeadership}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeLens === 'leadership' && activeSection !== 'hero' && activeSection !== 'about'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                Leadership
              </button>
            </nav>

            {/* Mobile Menu Toggle Floating Capsule */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full bg-white/[0.06] text-white hover:bg-white/15 transition-colors cursor-pointer shadow-md"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Dropdown Navigation Card (Floating Island) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="fixed top-20 left-4 right-4 z-40 p-4 rounded-2xl bg-[#050608]/90 backdrop-blur-2xl shadow-2xl flex flex-col gap-1.5 md:hidden pointer-events-auto"
            >
              <button
                onClick={handleScrollToTop}
                className={`text-left px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-colors ${
                  activeSection === 'hero'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                Home
              </button>
              <button
                onClick={handleScrollToAbout}
                className={`text-left px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-colors ${
                  activeSection === 'about'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                About
              </button>
              <button
                onClick={handleScrollToVentures}
                className={`text-left px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-colors ${
                  activeLens === 'ventures' && activeSection !== 'hero' && activeSection !== 'about'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                Ventures
              </button>
              <button
                onClick={handleScrollToLeadership}
                className={`text-left px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-colors ${
                  activeLens === 'leadership' && activeSection !== 'hero' && activeSection !== 'about'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                Leadership
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (SIDE PROFILE VIEW OF THE SCULPTURAL GLASS LILY)          */}
        {/* ========================================================================= */}
        <section
          id="hero"
          className="relative min-h-[100dvh] h-[100dvh] flex flex-col justify-between pt-24 pb-8 sm:pb-12 px-6 sm:px-12 lg:px-20 pointer-events-none select-none z-10"
        >
          {/* Hero Typography & Identity */}
          <div className="my-auto max-w-3xl lg:max-w-4xl xl:max-w-5xl pointer-events-auto">
            {/* Haute Fashion Editorial Name */}
            <h1 className="select-none relative z-30 cursor-default overflow-visible mb-4 sm:mb-6">
              <span className="font-vogue text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-normal leading-[1.24] whitespace-nowrap block liuli-glass-shimmer-text pb-6 sm:pb-8 lg:pb-10 overflow-visible">
                {t.hero.name}
              </span>
            </h1>

            {/* Refined Human Introduction */}
            <p className="relative z-10 font-sans text-neutral-200 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-xl sm:max-w-2xl drop-shadow-sm">
              {t.hero.intro}
            </p>

            {/* Direct Contact Channels */}
            <div className="flex items-center gap-3 pt-5">
              <a
                href="https://www.linkedin.com/in/kel-lin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white text-xs font-mono transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5 text-neutral-300" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Kelslin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white text-xs font-mono transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5 text-neutral-300" />
                <span>GitHub</span>
              </a>
              <a
                href="mailto:kelslin@umich.edu"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white text-xs font-mono transition-all duration-200"
                aria-label="Email Kelsey"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-300" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* 3D Model Interactive Zoom Controls */}
          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-20 pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-[#050608]/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <button
              type="button"
              onClick={handleZoomOut}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Zoom Out Lily"
              aria-label="Zoom out 3D flower"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleZoomReset}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Reset Lily View"
            >
              {zoomDisplay}%
            </button>

            <button
              type="button"
              onClick={handleZoomIn}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Zoom In Lily"
              aria-label="Zoom in 3D flower"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        <AboutSection language={language} />

        {/* ========================================================================= */}
        {/* 3. SELECTED WORKS (WHOLE VIEW SPREAD WITH PETALS ROTATING IN BACK)        */}
        {/* ========================================================================= */}
        <section id="works" className="relative z-10 w-full px-4 sm:px-8 lg:px-12 pb-4 sm:pb-6 md:pb-8">
          {/* VENTURES & PRODUCTS */}
          <div id="chapter-ventures" className="pt-6 sm:pt-8 md:pt-10 scroll-mt-6">
            <div className="max-w-6xl mx-auto pb-3 mb-8 sm:mb-10 border-b border-white/[0.06] flex items-baseline justify-between">
              <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight">
                Ventures & Products
              </h2>
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#FFAA00] uppercase font-semibold">
                02 // Selected Works
              </span>
            </div>

            {/* Whole View Projects One by One with Balanced Editorial Spacing */}
            <div className="space-y-8 sm:space-y-12 md:space-y-14">
              {ventureProjects.map((wp, idx) => (
                <ProjectScrollCard
                  key={wp.id}
                  waypoint={wp}
                  index={idx}
                  onOpenDetails={(p) => setSelectedDetailWaypoint(p)}
                  language={language}
                />
              ))}
            </div>
          </div>

          {/* CAMPUS LEADERSHIP & COMMUNITY (ORGANIZED & INTUITIVE ROSTER FORMAT) */}
          <LeadershipSection
            onOpenDetails={(p) => setSelectedDetailWaypoint(p)}
            language={language}
          />
        </section>

        {/* ========================================================================= */}
        {/* 4. EDITORIAL SITE FOOTER & CONTACT                                       */}
        {/* ========================================================================= */}
        <SiteFooter language={language} />

        {/* ========================================================================= */}
        {/* FULL-SCREEN PROJECT DETAIL VIEW (DETAILED RESUME BREAKDOWN)               */}
        {/* ========================================================================= */}
        <ProjectDetailModal
          waypoint={selectedDetailWaypoint}
          onClose={() => setSelectedDetailWaypoint(null)}
          onNavigate={(wp) => setSelectedDetailWaypoint(wp)}
          language={language}
          onLanguageChange={handleLanguageChange}
        />

        {/* ========================================================================= */}
        {/* RECRUITER FAST-SCAN INDEX MODAL                                           */}
        {/* ========================================================================= */}
        <RecruiterIndexModal
          isOpen={isIndexOpen}
          onClose={() => setIsIndexOpen(false)}
          onJumpToWaypoint={(wp) => {
            setIsIndexOpen(false);
            handleJumpToWaypoint(wp);
          }}
          language={language}
        />

        {/* Audio controller temporarily hidden as requested */}
        {/* <LeftBottomAudioIndicator isMacroActive={Boolean(selectedDetailWaypoint || isIndexOpen)} /> */}
      </div>
    </AudioProvider>
  );
}