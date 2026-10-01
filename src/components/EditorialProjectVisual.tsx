import React from 'react';
import { Project } from '../data/projects';
import { Waypoint } from '../data/portfolioData';
import {
  Activity,
  Layers,
  Camera,
  Cpu,
  Lock,
  Radio,
  Sliders,
  CheckCircle2,
  Terminal,
  Grid,
} from 'lucide-react';

interface EditorialProjectVisualProps {
  project: Project | Waypoint;
  className?: string;
  isModal?: boolean;
}

const BOTANICAL_VISUALS: Record<string, { image: string; subtitle: string; tint: string }> = {
  afterlife: {
    image: '/visuals/afterlife_chroma_lily.jpg',
    subtitle: 'ETHEREAL CHROMA LILY · MEMORY PRESERVATION',
    tint: '#00F0FF',
  },
  warmilu: {
    image: '/visuals/warmilu_amber_lotus.jpg',
    subtitle: 'MOLTEN AMBER LOTUS · THERMAL PHASE-CHANGE CORE',
    tint: '#FFAA00',
  },
  luxshare: {
    image: '/visuals/luxshare_optic_orchid.jpg',
    subtitle: 'PRECISION OPTIC ORCHID · HIGH-SPEED TELEMETRY',
    tint: '#0055FF',
  },
  somaseek: {
    image: '/visuals/somaseek_cyber_flora.jpg',
    subtitle: 'CYBERNETIC DICHROIC FLORA · EMBODIED ROBOTICS',
    tint: '#D946EF',
  },
};

export default function EditorialProjectVisual({
  project,
  className = '',
  isModal = false,
}: EditorialProjectVisualProps) {
  // Check if project has a curated 3D chromatic botanical flower visual
  if (project.id in BOTANICAL_VISUALS) {
    return (
      <div className={`relative w-full select-none ${className}`}>
        <ChromaticBotanicalVisual project={project} isModal={isModal} />
      </div>
    );
  }

  const visualType = project.visualType || 'specimen';

  return (
    <div
      className={`relative w-full select-none transition-all duration-500 ${
        isModal ? 'aspect-[16/9] rounded-3xl overflow-hidden' : 'aspect-[16/10] rounded-3xl overflow-hidden'
      } ${className}`}
    >
      {visualType === 'wireframe' && <WireframeVisual project={project} isModal={isModal} />}
      {visualType === 'contact-sheet' && <ContactSheetVisual project={project} isModal={isModal} />}
      {visualType === 'telemetry' && <TelemetryVisual project={project} isModal={isModal} />}
      {visualType === 'specimen' && <SpecimenVisual project={project} isModal={isModal} />}
      {visualType === 'liuli' && <LiuliGlassVisual project={project} isModal={isModal} />}
    </div>
  );
}

// =========================================================================
// 0. BORDERLESS CHROMATIC BOTANICAL FLORA VISUAL
// Surreal 3D iridescent liquid chrome & crystal glass floral sculptures
// =========================================================================
function ChromaticBotanicalVisual({ project, isModal }: { project: Project | Waypoint; isModal: boolean }) {
  const visual = BOTANICAL_VISUALS[project.id];
  if (!visual) return null;

  return (
    <div
      className={`relative w-full flex items-center justify-center select-none overflow-visible group/flora transition-all duration-700 ${
        isModal
          ? 'h-[320px] sm:h-[420px] md:h-[480px]'
          : 'h-[300px] sm:h-[380px] md:h-[420px]'
      }`}
    >
      {/* 1. Ambient Background Glow Matching Flower Tonal Identity */}
      <div
        className="absolute w-[240px] sm:w-[320px] md:w-[380px] h-[240px] sm:h-[320px] md:h-[380px] rounded-full blur-[90px] sm:blur-[120px] opacity-20 pointer-events-none transition-all duration-700 ease-out group-hover/flora:scale-115 group-hover/flora:opacity-30"
        style={{ backgroundColor: visual.tint }}
      />

      {/* 2. Seamless Borderless Botanical Image with Elliptical Radial Mask */}
      <div
        className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden transition-transform duration-700 ease-out group-hover/flora:scale-[1.04]"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 96%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 96%)',
        }}
      >
        <img
          src={visual.image}
          alt={`${project.title} - Chromatic Botanical Visual`}
          className="w-full h-full object-contain object-center filter contrast-[1.05] brightness-[1.02] drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
          loading="eager"
        />
      </div>

      {/* 3. Archival Monospace Caption (Borderless & Floating) */}
      <div className="absolute bottom-1 right-2 sm:right-4 z-20 pointer-events-none select-none text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-[#94A3B8] opacity-75 group-hover/flora:opacity-100 transition-opacity">
        [ {visual.subtitle} ]
      </div>
    </div>
  );
}

// =========================================================================
// 1. WIREFRAME / INTERACTIVE MEMORY CAPSULE SANDBOX
// Functional micro-sandbox for digital software & ethical AI platforms
// =========================================================================
function WireframeVisual({ project, isModal }: { project: Project | Waypoint; isModal: boolean }) {
  const [activeTab, setActiveTab] = React.useState(0);

  const prompts = [
    {
      title: 'Family Traditions & Oral Histories',
      date: 'Archived for Generation 2045',
      excerpt: '“Every Autumn festival, grandma would tell us how our family crossed the river—preserving the recipe for sweet osmanthus tea.”',
      hash: 'SHA-256 :: 8f3a...c9b2',
      category: 'Oral History',
    },
    {
      title: 'Letters to Future Generations',
      date: 'Time-locked until 18th Birthday',
      excerpt: '“The courage to begin always matters more than the certainty of where you will land. Never lose your gentle curiosity.”',
      hash: 'SHA-256 :: 4d1e...a77f',
      category: 'Time Capsule',
    },
    {
      title: 'Life Philosophy & Disciplines',
      date: 'Living Digital Testament',
      excerpt: '“Intentional craft in music and engineering: the discipline to listen before speaking, and the patience to refine every stroke.”',
      hash: 'SHA-256 :: 9b02...33e1',
      category: 'Legacy Journal',
    },
  ];

  const currentPrompt = prompts[activeTab];

  return (
    <div className="relative w-full h-full bg-[#06080C] border border-white/[0.08] flex flex-col justify-between p-4 sm:p-6 select-none overflow-hidden group">
      {/* Background CAD Blueprint Dots */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Top Application Header Bar */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-mono">
        <div className="flex items-center gap-2">
          {/* Subtle OS Window Controls */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>

          <span className="hidden xs:inline-block px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] text-neutral-300">
            app.afterlife.internal/vault
          </span>
        </div>

        {/* Ethical Verification Gate Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/[0.1] text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ZERO SYNTHETIC VOICE</span>
          </span>
        </div>
      </div>

      {/* Middle Interactive Memory Capsule UI */}
      <div className="relative z-10 my-auto py-2 space-y-3">
        {/* Memory Capsule Selector Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1">
          {prompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(idx);
              }}
              className={`px-3 py-1.5 rounded-xl font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === idx
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {p.category}
            </button>
          ))}
        </div>

        {/* Active Memory Preview Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-xl space-y-2.5 relative overflow-hidden backdrop-blur-sm">
          <div className="flex items-baseline justify-between">
            <div className="font-syne text-sm sm:text-base font-bold text-white tracking-tight">
              {currentPrompt.title}
            </div>
            <div className="font-mono text-[9px] text-[#FFAA00] tracking-wider uppercase">
              {currentPrompt.date}
            </div>
          </div>

          <p className="font-serif italic text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            {currentPrompt.excerpt}
          </p>

          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-neutral-400">
            <span>TASK COMPLETION: 88%</span>
            <span className="text-neutral-500 font-mono">{currentPrompt.hash}</span>
          </div>
        </div>
      </div>

      {/* Bottom Technical Spec Strip */}
      <div className="relative z-10 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <Layers className="w-3 h-3 text-[#FFAA00]" />
          <span className="uppercase tracking-wider">ETHICAL PRODUCT SPEC</span>
        </div>
        <span className="text-[#FFAA00] hidden sm:inline">92% USER TRUST RATING</span>
      </div>
    </div>
  );
}

// =========================================================================
// 2. CONTACT-SHEET VISUAL
// Archival photo grid with 35mm frame markers and captions for real documentary photography
// =========================================================================
function ContactSheetVisual({
  project,
  isModal,
}: {
  project: Project | Waypoint;
  isModal: boolean;
}) {
  const images = project.images && project.images.length > 0
    ? project.images
    : ['/visuals/rich_collins_exhibition.jpg', '/visuals/portrait_project.jpg'];

  return (
    <div className="relative w-full h-full bg-[#050505] border border-white/[0.1] flex flex-col justify-between p-3 sm:p-5 select-none overflow-hidden">
      {/* 35mm Top Film Edge with Sprocket Holes */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] text-[9px] font-mono text-neutral-400 tracking-wider">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-1.5 rounded-[1px] bg-[#020202] border border-white/20 inline-block" />
          <span className="w-2.5 h-1.5 rounded-[1px] bg-[#020202] border border-white/20 inline-block" />
          <span className="w-2.5 h-1.5 rounded-[1px] bg-[#020202] border border-white/20 inline-block" />
          <span className="text-white/60 font-semibold ml-1">▶ KODAK TRI-X 400</span>
        </div>
        <span className="hidden sm:inline text-neutral-400">SAFETY FILM · EXP 24 · 35MM</span>
        <div className="flex items-center gap-1.5">
          <span className="text-white/60 font-mono">FRAME 14A</span>
          <span className="w-2.5 h-1.5 rounded-[1px] bg-[#020202] border border-white/20 inline-block" />
          <span className="w-2.5 h-1.5 rounded-[1px] bg-[#020202] border border-white/20 inline-block" />
        </div>
      </div>

      {/* Archival Multi-Frame Photo Strip */}
      <div className="my-auto py-2 grid grid-cols-2 gap-3 sm:gap-4 items-center">
        {/* Frame 1: Primary Exhibition Photo */}
        <div className="relative group/frame aspect-[4/3] rounded-xl overflow-hidden bg-black border border-white/20 shadow-xl">
          <img
            src={images[0]}
            alt={`${project.title} - Frame 14`}
            className="w-full h-full object-cover object-center filter contrast-105 group-hover/frame:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Grease Pencil Frame Marker */}
          <div className="absolute top-2 left-2 text-[9px] font-mono text-amber-300 font-bold bg-black/60 px-1.5 py-0.5 rounded">
            #14A
          </div>
          <div className="absolute bottom-2 left-2 right-2 text-[9px] font-mono text-white/90 truncate">
            SLOSBERG LOBBY EXHIBITION
          </div>
        </div>

        {/* Frame 2: Workshop / Field Photo */}
        <div className="relative group/frame aspect-[4/3] rounded-xl overflow-hidden bg-black border border-white/20 shadow-xl">
          <img
            src={images[1] || images[0]}
            alt={`${project.title} - Frame 15`}
            className="w-full h-full object-cover object-center filter contrast-105 group-hover/frame:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          <div className="absolute top-2 left-2 text-[9px] font-mono text-amber-300 font-bold bg-black/60 px-1.5 py-0.5 rounded">
            #15A
          </div>
          <div className="absolute bottom-2 left-2 right-2 text-[9px] font-mono text-white/90 truncate">
            YOUTH PHOTOGRAPHY CURATION
          </div>
        </div>
      </div>

      {/* 35mm Bottom Film Edge */}
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[9px] font-mono text-neutral-400 tracking-wider">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-1.5 rounded-[1px] bg-[#020202] border border-white/20 inline-block" />
          <span className="w-2.5 h-1.5 rounded-[1px] bg-[#020202] border border-white/20 inline-block" />
          <span className="text-white/60">BRANDEIS ARTS FESTIVAL</span>
        </div>
        <span className="text-amber-400/90 font-medium">CURATED ARCHIVAL PROOF</span>
        <div className="flex items-center gap-1.5">
          <span className="text-white/60">ISO 400</span>
          <span className="w-2.5 h-1.5 rounded-[1px] bg-[#020202] border border-white/20 inline-block" />
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 3. TELEMETRY VISUAL
// Data metrics, status badges, and logic flow curves for PM & operational projects
// =========================================================================
function TelemetryVisual({ project, isModal }: { project: Project | Waypoint; isModal: boolean }) {
  const metrics = project.metrics || [
    { label: 'CAN Bus Stream', value: '1,000Hz', delta: 'Real-Time' },
    { label: 'EV Platforms', value: '85+', delta: 'Active Protocol' },
    { label: 'Sync Latency', value: '12ms', delta: '-68% Latency' },
  ];

  return (
    <div className="relative w-full h-full bg-[#05070B] border border-white/[0.08] flex flex-col justify-between p-5 sm:p-7 select-none overflow-hidden">
      {/* Background CAD Grid Crosshairs */}
      <div className="absolute top-4 left-4 text-white/10 font-mono text-xs">+</div>
      <div className="absolute top-4 right-4 text-white/10 font-mono text-xs">+</div>
      <div className="absolute bottom-4 left-4 text-white/10 font-mono text-xs">+</div>
      <div className="absolute bottom-4 right-4 text-white/10 font-mono text-xs">+</div>

      {/* Telemetry Header Strip */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-mono">
        <div className="flex items-center gap-2.5">
          {/* Radar Ping Dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F59E0B]" />
          </span>
          <span className="text-white font-semibold uppercase tracking-wider">
            {project.statusBadge || 'DEPLOYED'}
          </span>
          <span className="text-neutral-400 hidden sm:inline">· 1,000Hz STREAM</span>
        </div>

        <div className="text-[10px] text-neutral-400 uppercase tracking-widest">
          SYS_ID: {project.specimenCode || '03/LX'}
        </div>
      </div>

      {/* Interactive Vector Logic Flow & Telemetry Curves */}
      <div className="relative z-10 my-auto py-2 sm:py-4">
        {/* Logic Flow Nodes */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 text-center">
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider mb-0.5">
              Source
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-white font-medium truncate">
              CAN Bus 1000Hz
            </div>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.05] border border-white/15 shadow-md">
            <div className="text-[9px] font-mono text-[#F59E0B] uppercase tracking-wider mb-0.5">
              Pipeline
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-white font-medium truncate">
              Stream Engine
            </div>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider mb-0.5">
              Target
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-white font-medium truncate">
              Assembly HUD
            </div>
          </div>
        </div>

        {/* Vector Curve Indicator */}
        <div className="relative w-full h-8 flex items-center justify-center">
          <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 32">
            <defs>
              <linearGradient id="telemetryStreamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#FFAA00" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M 10 16 Q 100 2, 200 16 T 390 16"
              fill="none"
              stroke="url(#telemetryStreamGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="200" cy="16" r="3.5" fill="#67E8F9" />
          </svg>
        </div>

        {/* Numeric Telemetry Readouts */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-white/[0.06]">
          {metrics.slice(0, 3).map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-syne text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                {m.value}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5 truncate">
                {m.label}
              </span>
              {m.delta && (
                <span className="font-mono text-[8px] text-[#67E8F9] uppercase tracking-widest mt-0.5">
                  {m.delta}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Trace Log at Bottom */}
      <div className="relative z-10 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-400">
        <div className="flex items-center gap-2 truncate">
          <Terminal className="w-3 h-3 text-[#67E8F9] shrink-0" />
          <span className="truncate">SYS_LOG :: FRAME_PARSER_ACTIVE · 0.00% PACKET_LOSS</span>
        </div>
        <span className="text-[#67E8F9] shrink-0 hidden sm:inline">12MS SYNC</span>
      </div>
    </div>
  );
}

// =========================================================================
// 4. SPECIMEN VISUAL
// Swiss typographic poster with oversized numerals, monospace metadata, and grid lines
// =========================================================================
function SpecimenVisual({ project, isModal }: { project: Project | Waypoint; isModal: boolean }) {
  const specimenNum = project.specimenCode?.split('/')[0]?.trim() || '04';

  return (
    <div className="relative w-full h-full bg-[#07080A] border border-white/[0.08] flex flex-col justify-between p-5 sm:p-7 select-none overflow-hidden">
      {/* Oversized Architectural Background Numeral */}
      <div className="absolute right-2 bottom-0 font-syne font-black text-white/[0.05] text-8xl sm:text-9xl md:text-[10rem] leading-none pointer-events-none select-none">
        {specimenNum}
      </div>

      {/* Swiss Precision Coordinate Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-[0.2em] text-white font-semibold uppercase">
            SPECIMEN {project.specimenCode || '04 / WM'}
          </span>
          <span className="text-white/20">·</span>
          <span className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded bg-white/[0.06] text-neutral-300 uppercase">
            {project.statusBadge || 'CLINICAL'}
          </span>
        </div>

        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest hidden sm:inline">
          ISO 13485 ARCHIVE
        </span>
      </div>

      {/* Main Specimen Typographic Centerpiece */}
      <div className="relative z-10 my-auto py-3 space-y-3">
        {/* Title */}
        <h4 className="font-syne text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none uppercase">
          {project.title}
        </h4>

        {/* Monospace Specimen Ledger Block */}
        <div className="space-y-1.5 pt-1 max-w-md font-mono text-[10px] sm:text-[11px] text-neutral-300">
          <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-1">
            <span className="text-neutral-400 uppercase tracking-wider">Classification</span>
            <span className="text-white font-medium">Non-Electric Medical Phase-Change</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-1">
            <span className="text-neutral-400 uppercase tracking-wider">Thermal Buffer</span>
            <span className="text-white font-medium">36.5°C — 37.5°C Constant (5+ Hrs)</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-1">
            <span className="text-neutral-400 uppercase tracking-wider">Deployment Reach</span>
            <span className="text-white font-medium">10,000+ Infants · 100+ Hospitals</span>
          </div>
          <div className="flex items-baseline justify-between pt-0.5">
            <span className="text-neutral-400 uppercase tracking-wider">Energy Input</span>
            <span className="text-[#67E8F9] font-medium">0 Watts · Zero Electrical Grid</span>
          </div>
        </div>
      </div>

      {/* Bottom Barcode & Verification Stamp */}
      <div className="relative z-10 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-400">
        {/* Vector SVG Barcode */}
        <div className="flex items-center gap-1 opacity-60">
          <span className="w-[1.5px] h-3.5 bg-white inline-block" />
          <span className="w-[3px] h-3.5 bg-white inline-block" />
          <span className="w-[1px] h-3.5 bg-white inline-block" />
          <span className="w-[2px] h-3.5 bg-white inline-block" />
          <span className="w-[1px] h-3.5 bg-white inline-block" />
          <span className="w-[3px] h-3.5 bg-white inline-block" />
          <span className="w-[1.5px] h-3.5 bg-white inline-block" />
          <span className="text-[9px] font-mono text-neutral-400 ml-1.5 uppercase">
            WM-SPEC-2026
          </span>
        </div>

        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
          SWISS SPECIMEN ARCHIVE
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 5. LIULI GLASS VISUAL (PÂTE-DE-VERRE / CAST CRYSTAL)
// Organic, borderless sculptural cast crystal with amber and smoked-quartz refraction
// =========================================================================
function LiuliGlassVisual({ project, isModal }: { project: Project | Waypoint; isModal: boolean }) {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center select-none overflow-hidden"
      style={{
        maskImage: 'radial-gradient(circle at center, black 60%, transparent 95%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 95%)',
      }}
    >
      {/* 1. Deep Smoked-Quartz & Void Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#0C0A09]/95 to-[#1C1917]/70 pointer-events-none" />

      {/* 2. Internal Amber Heart Radiance (Warm Honey #F59E0B Glow at 18-20% Opacity) */}
      <div className="absolute w-[260px] sm:w-[340px] md:w-[420px] h-[260px] sm:h-[340px] md:h-[420px] rounded-full bg-gradient-to-r from-[#F59E0B]/22 via-[#FFAA00]/18 to-transparent blur-[85px] pointer-events-none transform -translate-x-6 -translate-y-4 group-hover/visual:scale-110 transition-transform duration-700 ease-out" />
      <div className="absolute w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] rounded-full bg-[#F59E0B]/25 blur-[50px] pointer-events-none transform translate-x-8 translate-y-6" />
      <div className="absolute w-[80px] sm:w-[110px] h-[80px] sm:h-[110px] rounded-full bg-[#FEF3C7]/35 blur-[25px] pointer-events-none" />

      {/* 3. Sculptural Cast-Crystal (Pâte-de-Verre) Curves */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-4 transform group-hover/visual:scale-[1.03] transition-transform duration-700 ease-out">
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full max-h-[360px] sm:max-h-[420px] filter drop-shadow-[0_20px_60px_rgba(245,158,11,0.22)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Molten Amber Internal Refraction */}
            <linearGradient id="amberCoreGrad" x1="160" y1="90" x2="660" y2="410" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.88" />
              <stop offset="16%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="42%" stopColor="#D97706" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#78350F" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1C1917" stopOpacity="0" />
            </linearGradient>

            {/* Smoked Quartz Outer Contour */}
            <radialGradient id="smokedQuartzGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#292524" stopOpacity="0.8" />
              <stop offset="55%" stopColor="#1C1917" stopOpacity="0.65" />
              <stop offset="85%" stopColor="#0C0A09" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* High-Gloss Wet Glaze Specular Rim */}
            <linearGradient id="specularRimGrad" x1="190" y1="70" x2="560" y2="390" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="28%" stopColor="#FEF3C7" stopOpacity="0.4" />
              <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>

            {/* Internal Caustic Ribbon */}
            <linearGradient id="causticFlowGrad" x1="120" y1="250" x2="680" y2="250" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#000000" stopOpacity="0" />
              <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.38" />
              <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.65" />
              <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Layer 1: Ambient Smoked-Quartz Mass (Heavy Cast Glass Silhouette) */}
          <path
            d="M 180 260 C 190 140, 320 90, 440 110 C 560 130, 640 210, 620 310 C 600 410, 480 430, 360 410 C 250 390, 170 360, 180 260 Z"
            fill="url(#smokedQuartzGrad)"
          />

          {/* Layer 2: Main Sculptural Pâte-de-Verre Curve (Cast Crystal Body) */}
          <path
            d="M 220 280 C 230 170, 350 120, 460 140 C 570 160, 610 230, 580 320 C 550 400, 450 410, 350 380 C 270 350, 210 360, 220 280 Z"
            fill="url(#amberCoreGrad)"
            stroke="url(#specularRimGrad)"
            strokeWidth="1.5"
          />

          {/* Layer 3: Secondary Swirling Glass Petal / Thermal Phase-Change Matrix */}
          <path
            d="M 280 240 C 310 160, 420 150, 490 180 C 560 210, 570 290, 520 340 C 460 390, 370 370, 320 330 C 280 295, 260 280, 280 240 Z"
            fill="#F59E0B"
            fillOpacity="0.25"
            stroke="url(#specularRimGrad)"
            strokeWidth="0.8"
          />

          {/* Layer 4: Internal Caustic Ribbons (Light Traveling Through Optical Density) */}
          <path
            d="M 240 290 Q 380 180 500 240 T 560 320"
            stroke="url(#causticFlowGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 270 260 Q 400 160 520 220 T 540 290"
            stroke="#FFFBEB"
            strokeOpacity="0.45"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 310 320 Q 420 350 510 300"
            stroke="#F59E0B"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Layer 5: Artisanal Pâte-de-Verre Micro Air Bubble Inclusions */}
          <g opacity="0.75">
            <circle cx="340" cy="230" r="3.5" fill="#FFFBEB" fillOpacity="0.85" />
            <circle cx="340" cy="230" r="1.5" fill="#FFFFFF" />
            <circle cx="420" cy="200" r="2.5" fill="#FFFBEB" fillOpacity="0.75" />
            <circle cx="470" cy="260" r="4.0" fill="#FFFBEB" fillOpacity="0.7" />
            <circle cx="470" cy="260" r="1.8" fill="#FFFFFF" />
            <circle cx="380" cy="290" r="2.0" fill="#FFFBEB" fillOpacity="0.65" />
            <circle cx="440" cy="320" r="3.0" fill="#FFFBEB" fillOpacity="0.55" />
            <circle cx="510" cy="240" r="2.0" fill="#FFFBEB" fillOpacity="0.65" />
            <circle cx="310" cy="270" r="1.5" fill="#FFFBEB" fillOpacity="0.55" />
          </g>

          {/* Layer 6: Prismatic Sheen Highlight Arc along Rim */}
          <path
            d="M 260 210 C 330 145, 430 135, 510 165"
            stroke="#FFFFFF"
            strokeOpacity="0.7"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* 4. Monospace Archival Label in Bottom-Right Corner */}
      <div className="absolute bottom-3 right-4 z-20 pointer-events-none select-none text-[10px] font-mono tracking-widest text-neutral-400">
        [ SPECIMEN // 02 — WARMTH IN THE RAIN ]
      </div>
    </div>
  );
}
