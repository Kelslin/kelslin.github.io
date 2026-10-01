import React from 'react';
import { Project } from '../data/projects';
import { Waypoint } from '../data/portfolioData';

interface EditorialProjectVisualProps {
  project: Project | Waypoint;
  className?: string;
  isModal?: boolean;
}

export default function EditorialProjectVisual({
  project,
  className = '',
  isModal = false,
}: EditorialProjectVisualProps) {
  // Pure Logo or Pure Image Visuals (No dashboards, no decks with words)
  if (project.id === 'afterlife') {
    return <AfterlifeLogoVisual isModal={isModal} className={className} />;
  }
  if (project.id === 'warmilu') {
    return <WarmiluLogoVisual isModal={isModal} className={className} />;
  }
  if (project.id === 'luxshare') {
    return <LuxshareLogoVisual isModal={isModal} className={className} />;
  }
  if (project.id === 'somaseek') {
    return <SomaSeekLogoVisual isModal={isModal} className={className} />;
  }
  if (project.id === 'portrait_project' || project.id === 'rich_collins') {
    return (
      <PureImageVisual
        src="/visuals/rich_collins_exhibition.jpg"
        alt="Youth Photography Exhibition"
        isModal={isModal}
        className={className}
      />
    );
  }

  // Fallback: If an imageVisual or image exists, display pure image
  const imgSrc = (project as any).imageVisual || (project as any).images?.[0];
  if (imgSrc) {
    return (
      <PureImageVisual
        src={imgSrc}
        alt={project.title || 'Project Visual'}
        isModal={isModal}
        className={className}
      />
    );
  }

  return <GenericLogoVisual title={project.title} isModal={isModal} className={className} />;
}

// =========================================================================
// 1. AFTERLIFE CLUB // PURE OFFICIAL LOGO
// =========================================================================
function AfterlifeLogoVisual({ isModal, className = '' }: { isModal: boolean; className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl flex flex-col items-center justify-center overflow-hidden select-none bg-[#050608]/60 border border-white/[0.04] transition-all duration-500 group shadow-[0_20px_60px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Soft Ambient Brand Glow (Salmon & Warm Espresso) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-56 h-56 rounded-full bg-[#FA8072]/15 blur-[70px] group-hover:scale-110 transition-transform duration-700" />
        <div className="w-44 h-44 rounded-full bg-[#704A36]/20 blur-[60px]" />
      </div>

      {/* Official Tulip Crest SVG + Clean Wordmark */}
      <div className="relative z-10 flex flex-col items-center gap-4 transition-transform duration-500 group-hover:scale-105">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#FDF5E6] p-3.5 shadow-2xl flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-sm">
            <path
              d="M32 14c-6 0-10 5-10 11 0 4 2 7 4 9-2 2-3 5-3 8 0 6 4 10 9 10s9-4 9-10c0-3-1-6-3-8 2-2 4-5 4-9 0-6-4-11-10-11z"
              fill="#704A36"
            />
            <path
              d="M32 14c-3 0-5 3-5 6 0 2 1 4 2 5 1-1 2-3 3-3s2 2 3 3c1-1 2-3 2-5 0-3-2-6-5-6z"
              fill="#FA8072"
            />
            <path d="M32 34c-2 0-3 2-3 4s1 4 3 4 3-2 3-4-1-4-3-4z" fill="#FDF5E6" />
          </svg>
        </div>

        <div className="text-center">
          <span className="font-syne font-bold text-lg sm:text-xl tracking-[0.25em] text-white/90 uppercase">
            AFTERLIFE
          </span>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 2. WARMILU // PURE OFFICIAL LOGO
// =========================================================================
function WarmiluLogoVisual({ isModal, className = '' }: { isModal: boolean; className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl flex flex-col items-center justify-center overflow-hidden select-none bg-[#050608]/60 border border-white/[0.04] transition-all duration-500 group shadow-[0_20px_60px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Soft Ambient Thermal Amber Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-60 h-60 rounded-full bg-[#FFAA00]/12 blur-[75px] group-hover:scale-110 transition-transform duration-700" />
        <div className="w-40 h-40 rounded-full bg-amber-900/15 blur-[60px]" />
      </div>

      {/* Official Warmilu Lowercase Geometric Brandmark */}
      <div className="relative z-10 flex flex-col items-center transition-transform duration-500 group-hover:scale-105">
        <div className="flex items-baseline">
          <span className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
            warm
          </span>
          <span className="relative font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
            i
            {/* Radiant Thermal Amber Dot on the 'i' */}
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFAA00] shadow-[0_0_12px_#FFAA00]" />
          </span>
          <span className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
            lu
          </span>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 3. LUXSHARE-ICT // PURE OFFICIAL LOGO
// =========================================================================
function LuxshareLogoVisual({ isModal, className = '' }: { isModal: boolean; className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl flex flex-col items-center justify-center overflow-hidden select-none bg-[#050608]/60 border border-white/[0.04] transition-all duration-500 group shadow-[0_20px_60px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Soft Precision Ice-Cyan Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-sky-500/10 blur-[80px] group-hover:scale-110 transition-transform duration-700" />
      </div>

      {/* Official LUXSHARE-ICT Corporate Precision Brandmark */}
      <div className="relative z-10 flex items-center gap-1 transition-transform duration-500 group-hover:scale-105 px-6">
        <span className="font-syne font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-[0.16em]">
          LUXSHARE
        </span>
        <span className="font-syne font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#38BDF8] tracking-widest">
          -ICT
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 4. SOMASEEK // PURE OFFICIAL LOGO
// =========================================================================
function SomaSeekLogoVisual({ isModal, className = '' }: { isModal: boolean; className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl flex flex-col items-center justify-center overflow-hidden select-none bg-[#050608]/60 border border-white/[0.04] transition-all duration-500 group shadow-[0_20px_60px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Soft Deep Violet / Cobalt Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-60 h-60 rounded-full bg-indigo-500/12 blur-[75px] group-hover:scale-110 transition-transform duration-700" />
      </div>

      {/* Official SomaSeek Robotics Laboratory Brandmark */}
      <div className="relative z-10 flex flex-col items-center gap-3 transition-transform duration-500 group-hover:scale-105">
        {/* Geometric Neural Ring Mark */}
        <div className="w-12 h-12 rounded-full border-2 border-indigo-400/80 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <div className="w-4 h-4 rounded-full bg-indigo-400 shadow-[0_0_8px_#818CF8]" />
        </div>

        <span className="font-syne font-extrabold text-xl sm:text-2xl md:text-3xl text-white tracking-[0.22em] uppercase">
          SOMASEEK
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 5. PURE IMAGE VISUAL // AUTHENTIC PHOTOGRAPHY (NO WORDS / NO DASHBOARDS)
// =========================================================================
function PureImageVisual({
  src,
  alt,
  isModal,
  className = '',
}: {
  src: string;
  alt: string;
  isModal: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden select-none bg-[#050608] border border-white/[0.04] group shadow-[0_20px_60px_rgba(0,0,0,0.8)] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
        style={{
          maskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
        }}
        loading="lazy"
      />
    </div>
  );
}

// =========================================================================
// 6. GENERIC FALLBACK LOGO VISUAL
// =========================================================================
function GenericLogoVisual({
  title,
  isModal,
  className = '',
}: {
  title: string;
  isModal: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl flex items-center justify-center overflow-hidden select-none bg-[#050608]/60 border border-white/[0.04] shadow-lg ${className}`}
    >
      <span className="font-syne font-bold text-xl sm:text-2xl text-white/80 tracking-widest uppercase">
        {title}
      </span>
    </div>
  );
}
