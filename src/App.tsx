import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Sparkles, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import LiuliLilyModel from './components/LiuliLilyModel';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

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
// 2. KINETIC CRYSTAL BEE & GLOW MOUSE
// ==========================================
function CrystalFollowerCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(0);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      if (Math.hypot(dx, dy) > 2) {
        // Smoothly orient head towards movement direction
        const rad = Math.atan2(dy, dx) * (180 / Math.PI);
        setAngle(rad + 90);
      }

      setPos({ x: e.clientX, y: e.clientY });
      lastPos.current = { x: e.clientX, y: e.clientY };

      // Detect if user is hovering over any interactive link/button
      const target = e.target as HTMLElement;
      setIsHoveringLink(!!target.closest('a, button'));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* 1. Warm Pollen Glow Wake */}
      <div
        className="pointer-events-none fixed z-30 transition-transform duration-200 ease-out will-change-transform"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`rounded-full transition-all duration-300 ${
          isHoveringLink 
            ? 'w-[320px] h-[320px] bg-gradient-to-r from-[#002FA7]/30 via-[#FF9900]/30 to-transparent blur-[80px]' 
            : 'w-[240px] h-[240px] bg-gradient-to-r from-[#FF6600]/20 via-[#FFAA00]/20 to-transparent blur-[65px]'
        }`} />
      </div>

      {/* 2. Glass Liuli Honeybee */}
      <div
        className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out will-change-transform"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
        }}
      >
        <div className={`relative transition-transform duration-200 ${isHoveringLink ? 'scale-125' : 'scale-100'}`}>
          <svg width="44" height="44" viewBox="0 0 100 100" className="drop-shadow-[0_0_12px_rgba(255,170,0,0.85)]">
            <defs>
              <linearGradient id="beeBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFA000" />
                <stop offset="35%" stopColor="#241704" />
                <stop offset="55%" stopColor="#FFB300" />
                <stop offset="75%" stopColor="#1A1102" />
                <stop offset="100%" stopColor="#FF8800" />
              </linearGradient>
              <linearGradient id="crystalWing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#70A0FF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#002FA7" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Left Glass Wing (Flapping flutter) */}
            <path
              d="M 48 45 C 20 20 8 30 15 50 C 22 68 45 52 48 48 Z"
              fill="url(#crystalWing)"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="0.8"
              className="origin-[48px_48px] animate-[pulse_0.18s_ease-in-out_infinite]"
            />
            
            {/* Right Glass Wing (Flapping flutter) */}
            <path
              d="M 52 45 C 80 20 92 30 85 50 C 78 68 55 52 52 48 Z"
              fill="url(#crystalWing)"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="0.8"
              className="origin-[52px_48px] animate-[pulse_0.18s_ease-in-out_infinite]"
            />

            {/* Honeybee Head & Antennas */}
            <circle cx="50" cy="30" r="6" fill="#1C1405" stroke="#FFAA00" strokeWidth="0.5" />
            <path d="M 48 26 Q 44 20 40 21" stroke="#FFAA00" strokeWidth="1" strokeLinecap="round" fill="none" />
            <path d="M 52 26 Q 56 20 60 21" stroke="#FFAA00" strokeWidth="1" strokeLinecap="round" fill="none" />

            {/* Striped Glass Abdomen */}
            <ellipse cx="50" cy="52" rx="10" ry="16" fill="url(#beeBody)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          </svg>
        </div>
      </div>
    </>
  );
}

// ==========================================
// 3. MAIN HOMEPAGE APPLICATION
// ==========================================
function Controls() {
  const { gl } = useThree();
  return (
    <OrbitControls
      makeDefault
      domElement={gl.domElement}
      enablePan={false}
      enableZoom={false}          // <--- TURN OFF ZOOM: This restores normal smooth page scrolling!
      dampingFactor={0.05}
      rotateSpeed={0.8}
    />
  );
}

function CyberFloraHUD() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden select-none">
      {/* Specimen Frame Border & Hairlines */}
      <div className="absolute inset-6 md:inset-10 border border-white/[0.08]" />
      
      {/* Subtle Crosshair Guides */}
      <div className="absolute top-10 left-1/4 w-px h-full bg-white/[0.03]" />
      <div className="absolute top-1/3 left-0 w-full h-px bg-white/[0.03]" />
      
      {/* Corner Crop Marks & Specimen Labels */}
      <div className="absolute top-12 left-12 font-mono text-[10px] tracking-widest text-[#BCE7FD]/60 flex items-center gap-2">
        <span className="inline-block w-2 h-2 border-t border-l border-[#BCE7FD]" />
        <span>BIO-FLORA // SPECIMEN 01</span>
      </div>

      <div className="absolute top-12 right-12 font-mono text-[10px] tracking-widest text-neutral-500">
        <span>[ 42.2808° N, 83.7430° W ]</span>
      </div>

      {/* Dashed Orbital Path around Center Stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-dashed border-white/[0.07]" />

      {/* Focus Reticle Over Flower */}
      <div className="absolute top-[38%] left-[58%] -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 border border-[#70CFFF]/40 relative animate-pulse">
          <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#70CFFF]" />
          <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#70CFFF]" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#BCE7FD] mt-2 block ml-1">
          Focal: Core Vein
        </span>
      </div>

      {/* Bottom Technical Stamp */}
      <div className="absolute bottom-12 left-12 font-mono text-[10px] text-neutral-500 flex items-center gap-4">
        <span>REF: UX-CAPSTONE-487</span>
        <span className="text-[#FF5500]">● LIVE_RENDER</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#05060A] text-neutral-100 font-sans selection:bg-[#002FA7] selection:text-white relative overflow-x-hidden cursor-none">
      
      {/* Dynamic Cursor Indicator */}
      <CrystalFollowerCursor />

      {/* Persistent Fullscreen 3D Scene */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[-4, 3, -2]} intensity={4.0} color="#0038FF" />
          <pointLight position={[3, -2, 2]} intensity={3.5} color="#FF5500" />
          <directionalLight position={[0, 4, 3]} intensity={2.0} color="#FFFFFF" />

          <Controls />

          <Suspense fallback={null}>
            <LiuliLilyModel />
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
<section 
        id="top" 
        className="relative z-10 w-full min-h-screen flex flex-col justify-between px-8 md:px-16 pt-36 pb-12 pointer-events-none"
      >
        {/* Only the text wrapper captures clicks for links/buttons */}
        <div className="max-w-2xl pointer-events-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF5500]">
              Product Manager & 0→1 Founder
            </span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl font-normal tracking-tight text-white leading-[0.95] mb-8">
            Kelsey <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-[#4D7CFF]">
              Lin.
            </span>
          </h1>

          <div className="border-l border-white/15 pl-6 my-8">
            <p className="font-sans text-neutral-300 text-lg md:text-xl font-light leading-relaxed max-w-lg">
              Crafting products that bridge systems engineering, human emotion, and tactile Liuli craft.
            </p>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <a
              href="#works"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white border-b border-[#FF5500] pb-1 hover:text-[#FF5500] transition-colors"
            >
              Explore Works ↓
            </a>
          </div>
        </div>

      </section>

      {/* 3. WORKS EDITORIAL CHAPTERS (UNBOXED) */}
      <section 
  id="works" 
  className="relative z-10 px-8 md:px-16 py-32 max-w-5xl mx-auto w-full scroll-mt-24 pointer-events-none"
>
        <div className="border-b border-white/[0.08] pb-6 mb-16 flex items-baseline justify-between pointer-events-auto">
    <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            [ 01 // SELECTED WORKS ]
          </h2>
          <span className="font-mono text-xs text-neutral-500">0→1 Products & Systems</span>
        </div>

        <div>
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
<footer className="relative z-10 px-8 md:px-16 py-12 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-neutral-500 max-w-6xl mx-auto w-full pointer-events-none">        <span>© 2026 Kelsey Lin · Ann Arbor, MI</span>
        <div className="flex items-center gap-8 pointer-events-auto">
          <a href="mailto:contact@kelseylin.com" className="hover:text-white transition-colors">
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/kelsey-lin/"
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