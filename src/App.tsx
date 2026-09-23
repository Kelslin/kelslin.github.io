import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import LiuliLilyModel from './components/LiuliLilyModel';
import { Float, MeshTransmissionMaterial, Sparkles, OrbitControls } from '@react-three/drei';
// ==========================================
// 1. 3D LIULI LILY SCULPTURE COMPONENT
// ==========================================
function LilyModel() {
  const group = useRef<THREE.Group>(null);

  // Smooth rotation reacting to cursor
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.7, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.4, 0.04);
  });

  const petals = [0, 60, 120, 180, 240, 300];

  return (
    <group ref={group}>
      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.7}>
        {/* Core Pistils */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.04, 0.02, 1.3, 16]} />
          <meshStandardMaterial color="#FFA000" emissive="#FF4500" emissiveIntensity={2.0} />
        </mesh>

        {/* Sculptural Liuli Petals */}
        {petals.map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh
              key={i}
              position={[Math.sin(rad) * 0.5, 0.25, Math.cos(rad) * 0.5]}
              rotation={[0.55, rad, 0.18]}
            >
              <coneGeometry args={[0.45, 1.7, 32]} />
              <MeshTransmissionMaterial
                backside
                samples={14}
                resolution={512}
                transmission={0.93}
                roughness={0.14}
                thickness={0.85}
                ior={1.55}
                chromaticAberration={0.15}
                color="#FF6200"
                attenuationColor="#002FA7"
                attenuationDistance={0.5}
              />
            </mesh>
          );
        })}

        {/* Molten Klein Blue Rim Ribbon */}
        <mesh rotation={[Math.PI / 3.2, 0.35, 0]} scale={[1.45, 1.45, 0.6]}>
          <torusGeometry args={[1.35, 0.12, 16, 64]} />
          <MeshTransmissionMaterial
            transmission={0.92}
            roughness={0.08}
            ior={1.65}
            chromaticAberration={0.22}
            color="#002FA7"
          />
        </mesh>
      </Float>

      {/* Floating Luminescence Embers */}
      <Sparkles count={40} scale={4.5} size={2.5} speed={0.4} color="#FFA200" />
      <Sparkles count={25} scale={5.0} size={3.0} speed={0.2} color="#4D7CFF" />
    </group>
  );
}

// ==========================================
// 2. KINETIC CRYSTAL BUTTERFLY & GLOW MOUSE
// ==========================================
function ButterflyCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      
      if (Math.hypot(dx, dy) > 2) {
        const rad = Math.atan2(dy, dx) * (180 / Math.PI);
        setAngle(rad + 90);
        setIsMoving(true);
      }

      setPos({ x: e.clientX, y: e.clientY });
      lastPos.current = { x: e.clientX, y: e.clientY };

      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setIsMoving(false), 200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* 1. Luminescent Wake (Follower Glow) */}
      <div
        className="pointer-events-auto fixed z-30 transition-transform duration-300 ease-out will-change-transform"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#002FA7]/25 via-[#FF5500]/20 to-transparent blur-[75px]" />
      </div>

      {/* 2. Redesigned Swallowtail Butterfly */}
      <div
        className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out will-change-transform"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
        }}
      >
        <div className={`relative w-12 h-12 transition-transform duration-150 ${isMoving ? 'scale-110' : 'scale-95'}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,140,0,0.85)] filter">
            <defs>
              <linearGradient id="swallowtail" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFAE00" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#FF4D00" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0038FF" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Left Wing with Swallowtail Tail */}
            <path
              d="M 50 48 Q 20 8 8 28 Q 0 46 32 58 Q 18 78 26 84 Q 38 88 44 72 Q 48 62 50 54 Z"
              fill="url(#swallowtail)"
              stroke="#FFF"
              strokeWidth="0.8"
              strokeOpacity="0.8"
              className="origin-[50px_50px] animate-[pulse_0.25s_ease-in-out_infinite]"
            />

            {/* Right Wing with Swallowtail Tail */}
            <path
              d="M 50 48 Q 80 8 92 28 Q 100 46 68 58 Q 82 78 74 84 Q 62 88 56 72 Q 52 62 50 54 Z"
              fill="url(#swallowtail)"
              stroke="#FFF"
              strokeWidth="0.8"
              strokeOpacity="0.8"
              className="origin-[50px_50px] animate-[pulse_0.25s_ease-in-out_infinite]"
            />

            {/* Slender Glass Body */}
            <path d="M 50 28 L 50 70" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="50" cy="26" r="2.5" fill="#FFE082" />
          </svg>
        </div>
      </div>
    </>
  );
}

// ==========================================
// 3. MAIN HOMEPAGE APPLICATION
// ==========================================
export default function App() {
  return (
    <div className="min-h-screen bg-[#05060A] text-neutral-100 font-sans selection:bg-[#002FA7] selection:text-white relative overflow-x-hidden cursor-none">
      
      {/* Dynamic Cursor Indicator */}
      <ButterflyCursor />

      {/* Persistent Fullscreen 3D Scene */}
      {/* 1. MUST BE pointer-events-auto so mouse drag works! */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 4.3], fov: 42 }}>
          <ambientLight intensity={0.65} />
          <directionalLight position={[-4, 4, 3]} intensity={2.8} color="#0033FF" />
          <pointLight position={[3, -2, 2]} intensity={3.5} color="#FF5500" />
          <pointLight position={[0, 1, 2]} intensity={1.8} color="#FFA000" />

          {/* 2. ADD ORBITCONTROLS HERE */}
          <OrbitControls
            enablePan={false}         // Keeps flower centered
            enableZoom={true}        // Allows pinch / wheel zoom
            minDistance={2.5}        // Prevents clipping too close
            maxDistance={7.0}        // Prevents zooming too far out
            autoRotate={true}        // Smooth, subtle idle spin
            autoRotateSpeed={0.8}
            dampingFactor={0.05}     // Smooth momentum feel when dragged
            rotateSpeed={0.7}
          />

          <Suspense fallback={null}>
            <LilyModel />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating Ambient Lighting Fields */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#002FA7]/18 blur-[170px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#FF4500]/16 blur-[170px] pointer-events-none" />

      {/* 1. TOP NAVIGATION WITH GLAZE */}
      <header className="fixed top-0 left-0 w-full z-40 px-8 py-5 md:px-16 backdrop-blur-xl bg-[#05060A]/40 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-neutral-300 hover:text-white transition-colors">
              KELSEY LIN <span className="text-[#FF5500]">/</span> 
            </span>
          </a>

          <nav className="flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
            <a href="#works" className="text-neutral-400 hover:text-white transition-colors">// Works</a>
            <a href="#ecosystem" className="text-neutral-400 hover:text-white transition-colors">// Leadership</a>
            <a href="#spirit" className="text-neutral-400 hover:text-white transition-colors">// Passions</a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/30 bg-[#002FA7]/20 text-blue-300 hover:bg-[#002FA7]/40 transition-all"
            >
              <span>Résumé</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </nav>
        </div>
      </header>

        {/* 2. HERO EDITORIAL VIEWPORT (UNBOXED & EDITORIAL) */}
      <section id="top" className="relative z-10 w-full min-h-screen flex flex-col justify-between px-8 md:px-16 pt-36 pb-12 pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          {/* Subtle Category Micro-Tag with Klein Blue & Flame Aura */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF5500]">
              Product Manager & 0→1 Founder
            </span>
          </div>

          {/* Large Open Editorial Headline */}
          <h1 className="font-serif text-6xl md:text-8xl font-normal tracking-tight text-white leading-[0.95] mb-8">
            Kelsey <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-[#4D7CFF]">
              Lin.
            </span>
          </h1>

          {/* Body Statement with Hairline Accent */}
          <div className="border-l border-white/15 pl-6 my-8">
            <p className="font-sans text-neutral-300 text-lg md:text-xl font-light leading-relaxed max-w-lg">
              Crafting products that bridge systems engineering, human emotion, and tactile Liuli craft.
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <a
              href="#works"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white border-b border-[#FF5500] pb-1 hover:text-[#FF5500] transition-colors"
            >
              Explore Works ↓
            </a>
            <span className="text-neutral-500 font-mono text-xs tracking-wide">
              Butterfly guides your light ↗
            </span>
          </div>
        </div>

      </section>

      {/* 3. WORKS EDITORIAL CHAPTERS (UNBOXED) */}
      <section id="works" className="relative z-10 px-8 md:px-16 py-32 max-w-5xl mx-auto w-full scroll-mt-24">
        <div className="border-b border-white/[0.08] pb-6 mb-16 flex items-baseline justify-between">
          <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            [ 01 // SELECTED WORKS ]
          </h2>
          <span className="font-mono text-xs text-neutral-500">0→1 Products & Systems</span>
        </div>

        <div className="space-y-20">
          {/* Chapter 1: Afterlife Club */}
          <article className="group grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-white/[0.06] pb-16 transition-all duration-300 hover:border-orange-500/40">
            <div className="md:col-span-3 font-mono text-xs text-neutral-500">
              <span className="text-[#FF5500] font-bold text-sm">01</span> / 2026
              <p className="mt-1 text-neutral-400 uppercase tracking-wider">Co-Founder & PM</p>
            </div>
            <div className="md:col-span-9">
              <h3 className="font-serif text-3xl md:text-4xl text-white font-normal group-hover:text-amber-200 transition-colors mb-4">
                Afterlife Club
              </h3>
              <p className="font-sans text-neutral-300 text-base md:text-lg leading-relaxed font-light mb-6">
                A digital legacy platform engineered for archiving personal memories, letters, and voice records. Directed user research, sensitive workflow architecture, and interactive Figma prototyping.
              </p>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-neutral-400">
                <span className="px-2.5 py-1 rounded bg-white/[0.04] text-neutral-300">PRD</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.04] text-neutral-300">User Flows</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.04] text-neutral-300">Interactive Prototype</span>
              </div>
            </div>
          </article>

          {/* Chapter 2: Warmilu */}
          <article className="group grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-white/[0.06] pb-16 transition-all duration-300 hover:border-blue-500/40">
            <div className="md:col-span-3 font-mono text-xs text-neutral-500">
              <span className="text-[#4D7CFF] font-bold text-sm">02</span> / 2026
              <p className="mt-1 text-neutral-400 uppercase tracking-wider">Product Management</p>
            </div>
            <div className="md:col-span-9">
              <h3 className="font-serif text-3xl md:text-4xl text-white font-normal group-hover:text-blue-300 transition-colors mb-4">
                Warmilu
              </h3>
              <p className="font-sans text-neutral-300 text-base md:text-lg leading-relaxed font-light mb-6">
                Directing user experience improvements and website architecture overhaul for non-electric medical warming technology. Managing cross-functional sprints and organic SEO discovery.
              </p>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-neutral-400">
                <span className="px-2.5 py-1 rounded bg-white/[0.04] text-neutral-300">UX Architecture</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.04] text-neutral-300">SEO Strategy</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.04] text-neutral-300">Conversion Funnel</span>
              </div>
            </div>
          </article>

          {/* Chapter 3: Luxshare */}
          <article className="group grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-white/[0.06] pb-16 transition-all duration-300 hover:border-amber-400/40">
            <div className="md:col-span-3 font-mono text-xs text-neutral-500">
              <span className="text-amber-400 font-bold text-sm">03</span> / 2025
              <p className="mt-1 text-neutral-400 uppercase tracking-wider">PM Intern</p>
            </div>
            <div className="md:col-span-9">
              <h3 className="font-serif text-3xl md:text-4xl text-white font-normal group-hover:text-amber-300 transition-colors mb-4">
                Luxshare Precision
              </h3>
              <p className="font-sans text-neutral-300 text-base md:text-lg leading-relaxed font-light mb-6">
                Implemented Agile sprint planning workflows and designed enterprise performance-tracking dashboards for cross-functional hardware and software operations.
              </p>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-neutral-400">
                <span className="px-2.5 py-1 rounded bg-white/[0.04] text-neutral-300">Agile Infrastructure</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.04] text-neutral-300">KPI Dashboards</span>
              </div>
            </div>
          </article>
        </div>
      </section>

{/* 4. FOOTER */}
      <footer className="relative z-10 px-8 md:px-16 py-12 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-neutral-500 max-w-6xl mx-auto w-full">
        <span>© 2026 Kelsey Lin · Ann Arbor, MI</span>
        <div className="flex items-center gap-8">
          {/* Email Link */}
          <a
            href="mailto:kelslin@umich.edu"
            className="hover:text-white transition-colors"
          >
            Email
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/kel-lin/"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-[#4D7CFF]" />
          </a>
        </div>
      </footer>
    </div>
  );
}