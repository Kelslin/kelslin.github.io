import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUp, Linkedin, Github, Mail, Menu, X, RotateCcw } from 'lucide-react';
import * as THREE from 'three';
import LiuliPreloader from './components/LiuliPreloader';
import LiuliLilyModel from './components/LiuliLilyModel';
import AboutSection from './components/AboutSection';
import ProjectScrollCard from './components/ProjectScrollCard';
import RecruiterIndexModal from './components/RecruiterIndexModal';
import ProjectDetailModal from './components/ProjectDetailModal';
import LeftBottomAudioIndicator from './components/LeftBottomAudioIndicator';
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
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[#002FA7]/30 to-[#FFAA00]/20 blur-[100px]" />
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
}: {
  scrollStateRef: React.MutableRefObject<{ heroProgress: number }>;
}) {
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  useFrame(() => {
    const heroToAboutTransition = scrollStateRef.current.heroProgress;

    // 1. Side profile view coordinates (Hero section: centered side profile of the glass lily)
    const sidePos = isMobile
      ? new THREE.Vector3(0, 0.2, 4.8)
      : new THREE.Vector3(0, 0.25, 4.3);
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
                <stop offset="100%" stopColor="#002FA7" stopOpacity="0.3" />
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

  // Mutable ref for interactive mouse/touch orbit control and cursor parallax
  const manualOrbitRef = useRef({
    dragY: 0,
    dragTiltX: 0,
    hoverX: 0,
    hoverY: 0,
  });

  // Mobile menu dropdown state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals
  const [selectedDetailWaypoint, setSelectedDetailWaypoint] = useState<Waypoint | null>(null);
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  // Interactive Mouse / Touch Drag Orbit Control for 3D Flower
  useEffect(() => {
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

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
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      // Subtle cursor tracking parallax
      if (typeof window !== 'undefined') {
        manualOrbitRef.current.hoverX = (e.clientX / window.innerWidth - 0.5) * 0.35;
        manualOrbitRef.current.hoverY = (e.clientY / window.innerHeight - 0.5) * 0.25;
      }

      if (!isDragging) return;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      manualOrbitRef.current.dragY += dx * 0.007;
      manualOrbitRef.current.dragTiltX = Math.max(
        -0.7,
        Math.min(0.7, manualOrbitRef.current.dragTiltX + dy * 0.004)
      );
    };

    const onPointerUp = () => {
      isDragging = false;
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

  // Throttled high-performance scroll listener
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const vh = window.innerHeight;

          // 1. Continuous smooth hero progress for Three.js camera & model tilt
          const heroProgress = Math.min(1, Math.max(0, scrollY / (vh * 0.65)));
          scrollStateRef.current.heroProgress = heroProgress;

          // 2. Discrete section detection
          const aboutEl = document.getElementById('about');
          const projectEls = document.querySelectorAll<HTMLElement>('.project-scroll-section');

          const scrollCenter = scrollY + vh * 0.42;

          if (aboutEl && scrollCenter < aboutEl.offsetTop) {
            setActiveSection((prev) => (prev !== 'hero' ? 'hero' : prev));
            setActiveProjectIndex((prev) => (prev !== -1 ? -1 : prev));
          } else if (projectEls.length > 0 && scrollCenter < projectEls[0].offsetTop) {
            setActiveSection((prev) => (prev !== 'about' ? 'about' : prev));
            setActiveProjectIndex((prev) => (prev !== -1 ? -1 : prev));
          } else {
            let foundIdx = -1;
            let foundId = '';

            projectEls.forEach((el, idx) => {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollCenter >= top - 100 && scrollCenter < top + height) {
                foundIdx = idx;
                foundId = el.getAttribute('data-project-id') || '';
              }
            });

            if (foundIdx >= 0) {
              setActiveProjectIndex((prev) => (prev !== foundIdx ? foundIdx : prev));
              setActiveSection((prev) => (prev !== foundId ? foundId : prev));
              const currentWp = PORTFOLIO_WAYPOINTS[foundIdx];
              if (currentWp) {
                setActiveLens((prev) => (prev !== currentWp.lens ? currentWp.lens : prev));
              }
            }
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

  const handleScrollToAbout = () => {
    setIsMobileMenuOpen(false);
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToVentures = () => {
    setIsMobileMenuOpen(false);
    document.getElementById('chapter-ventures')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToLeadership = () => {
    setIsMobileMenuOpen(false);
    document.getElementById('chapter-leadership')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    setIsMobileMenuOpen(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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
  const craftProjects = PORTFOLIO_WAYPOINTS.filter((w) => w.lens === 'craft');

  return (
    <AudioProvider>
      <div className="relative w-full min-h-screen bg-[#050608] text-[#D8ECF8] font-sans selection:bg-[#002FA7] selection:text-white overflow-x-hidden">
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
              <CenteredScrollyCameraRig scrollStateRef={scrollStateRef} />

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
        <div className="fixed top-[-10%] left-[-10%] w-[650px] h-[650px] rounded-full bg-[#002FA7]/10 blur-[180px] pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[650px] h-[650px] rounded-full bg-[#FF5500]/08 blur-[180px] pointer-events-none" />

        {/* Soft atmospheric scrim & backdrop blur over 3D background canvas for supreme text legibility */}
        <div className="fixed inset-0 pointer-events-none bg-[#050608]/55 backdrop-blur-[3.5px] z-[1]" />

        {/* ========================================================================= */}
        {/* FIXED TOP NAVIGATION BAR WITH HORIZONTAL MENU & MOBILE DROPDOWN           */}
        {/* ========================================================================= */}
        <header className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between pointer-events-auto backdrop-blur-md bg-[#050608]/80">
          {/* Brand Signature Logo (Scrolls to top) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-2 group cursor-pointer transition-transform duration-300 hover:scale-105"
              title="Kelsey Lin — Return to Top"
            >
              <img
                src="/kelsey-signature-logo.png"
                alt="Kelsey Lin Logo"
                className="h-8 sm:h-9 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]"
              />
            </button>
          </div>

          {/* Desktop Horizontal Navigation Menu (No Boxes, No Borders) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-white/[0.06] backdrop-blur-xl shadow-lg">
            <button
              onClick={handleScrollToTop}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.14em] transition-all cursor-pointer ${
                activeSection === 'hero'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Home
            </button>

            <button
              onClick={handleScrollToAbout}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.14em] transition-all cursor-pointer ${
                activeSection === 'about'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              About
            </button>

            <button
              onClick={handleScrollToVentures}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.14em] transition-all cursor-pointer ${
                activeLens === 'ventures' && activeSection !== 'hero' && activeSection !== 'about'
                  ? 'bg-[#0055FF] text-white font-bold shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Ventures
            </button>

            <button
              onClick={handleScrollToLeadership}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.14em] transition-all cursor-pointer ${
                activeLens === 'leadership' && activeSection !== 'hero' && activeSection !== 'about'
                  ? 'bg-[#FFAA00] text-black font-bold shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Leadership
            </button>

            <button
              onClick={handleScrollToContact}
              className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.14em] text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Navigation Card */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="fixed top-16 left-4 right-4 z-40 p-4 rounded-2xl bg-[#050608]/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-1.5 md:hidden pointer-events-auto"
            >
              <button
                onClick={handleScrollToTop}
                className="text-left px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-neutral-200 hover:bg-white/10 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={handleScrollToAbout}
                className="text-left px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-neutral-200 hover:bg-white/10 hover:text-white transition-colors"
              >
                About
              </button>
              <button
                onClick={handleScrollToVentures}
                className="text-left px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-neutral-200 hover:bg-white/10 hover:text-white transition-colors"
              >
                Ventures & Products
              </button>
              <button
                onClick={handleScrollToLeadership}
                className="text-left px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-neutral-200 hover:bg-white/10 hover:text-white transition-colors"
              >
                Campus Leadership
              </button>
              <button
                onClick={handleScrollToContact}
                className="text-left px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-neutral-200 hover:bg-white/10 hover:text-white transition-colors"
              >
                Contact
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (SIDE PROFILE VIEW OF THE SCULPTURAL GLASS LILY)          */}
        {/* ========================================================================= */}
        <section
          id="hero"
          className="relative min-h-[100dvh] h-[100dvh] flex flex-col justify-between pt-28 pb-10 sm:pb-14 px-6 sm:px-12 lg:px-20 pointer-events-none select-none z-10"
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
          </div>

          {/* Downward Scroll & Drag to Orbit Indicators */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-neutral-400 uppercase pointer-events-auto self-start">
            <button
              type="button"
              onClick={handleScrollToAbout}
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronDown className="w-4 h-4 text-[#0055FF] animate-bounce" />
              <span>SCROLL DOWN TO BLOOM</span>
            </button>

            <span className="text-white/20 hidden sm:inline">·</span>

            <div className="flex items-center gap-2 text-neutral-300">
              <RotateCcw className="w-3.5 h-3.5 text-[#FFAA00]" />
              <span>CLICK & DRAG ANYWHERE TO ORBIT FLOWER</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. ABOUT SECTION (FRAMELESS & BORDERLESS EDITORIAL SPREAD)                 */}
        {/* ========================================================================= */}
        <AboutSection language={language} />

        {/* ========================================================================= */}
        {/* 3. SELECTED WORKS (WHOLE VIEW SPREAD WITH PETALS ROTATING IN BACK)        */}
        {/* ========================================================================= */}
        <section id="works" className="relative z-10 w-full px-4 sm:px-8 lg:px-12 pb-16 sm:pb-24">
          {/* VENTURES & PRODUCTS */}
          <div id="chapter-ventures" className="pt-6 sm:pt-10">
            <div className="max-w-6xl mx-auto pb-2 mb-6 sm:mb-8 flex items-baseline justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#0055FF]" />
                <h2 className="font-syne text-lg sm:text-xl md:text-2xl text-white font-bold uppercase tracking-wider">
                  Ventures & Products
                </h2>
              </div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest hidden sm:inline">
                0→1 Medical Devices, Telemetry & Systems
              </span>
            </div>

            {/* Whole View Projects One by One */}
            <div className="space-y-8 sm:space-y-12">
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

          {/* CAMPUS LEADERSHIP & COMMUNITY */}
          <div id="chapter-leadership" className="pt-10 sm:pt-14">
            <div className="max-w-6xl mx-auto pb-2 mb-6 sm:mb-8 flex items-baseline justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FFAA00]" />
                <h2 className="font-syne text-lg sm:text-xl md:text-2xl text-white font-bold uppercase tracking-wider">
                  Campus Leadership & Community
                </h2>
              </div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest hidden sm:inline">
                Richard Collins Fellowship, ELP Cohort 2 & Product Motion
              </span>
            </div>

            {/* Whole View Projects One by One */}
            <div className="space-y-8 sm:space-y-12">
              {leadershipProjects.map((wp, idx) => (
                <ProjectScrollCard
                  key={wp.id}
                  waypoint={wp}
                  index={ventureProjects.length + idx}
                  onOpenDetails={(p) => setSelectedDetailWaypoint(p)}
                  language={language}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ARCHITECTURAL FOOTER WITH DIRECT CONTACT & SOCIAL CHANNELS               */}
        {/* ========================================================================= */}
        <footer
          id="contact"
          className="relative z-10 w-full py-14 px-6 sm:px-12 lg:px-20 bg-[#050608]/95 backdrop-blur-xl"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="font-syne text-lg text-white font-bold mb-1">Kelsey Lin</p>
              <p className="text-xs font-mono text-[#94A3B8] tracking-wider">
                Product Manager · University of Michigan · Ann Arbor, MI
              </p>
            </div>

            {/* Direct Channels: LinkedIn, GitHub, Email (Resume hidden) */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/kel-lin"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white text-neutral-300 hover:text-black transition-all duration-300 shadow-md cursor-pointer text-xs font-mono"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0055FF] group-hover:text-black transition-colors" />
                <span className="font-medium">LinkedIn</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Kelslin"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white text-neutral-300 hover:text-black transition-all duration-300 shadow-md cursor-pointer text-xs font-mono"
                title="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5 text-neutral-300 group-hover:text-black transition-colors" />
                <span className="font-medium">GitHub</span>
              </a>

              {/* Email */}
              <a
                href="mailto:kelslin@umich.edu"
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white text-neutral-300 hover:text-black transition-all duration-300 shadow-md cursor-pointer text-xs font-mono"
                title="Send Email to kelslin@umich.edu"
              >
                <Mail className="w-3.5 h-3.5 text-[#FFAA00] group-hover:text-black transition-colors" />
                <span className="font-medium">Email</span>
              </a>

              {/* Back to Top */}
              <button
                type="button"
                onClick={handleScrollToTop}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all cursor-pointer ml-1 shadow-md"
                title="Return to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </footer>

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