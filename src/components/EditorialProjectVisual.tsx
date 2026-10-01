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
// 1. AFTERLIFE CLUB // OFFICIAL UPLOADED LOGO
// =========================================================================
function AfterlifeLogoVisual({ isModal, className = '' }: { isModal: boolean; className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl flex flex-col items-center justify-center overflow-hidden select-none bg-[#050608]/60 border border-white/[0.04] transition-all duration-500 group shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 ${className}`}
    >
      {/* Soft Ambient Brand Glow (Salmon & Warm Espresso) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-[#FA8072]/15 blur-[75px] group-hover:scale-110 transition-transform duration-700" />
        <div className="w-48 h-48 rounded-full bg-[#704A36]/20 blur-[60px]" />
      </div>

      {/* Official Afterlife Brandmark on warm cream backing */}
      <div className="relative z-10 w-full max-w-[260px] sm:max-w-[320px] px-6 py-6 sm:py-7 rounded-2xl bg-[#FDF5E6] flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-105 border border-white/20">
        <img
          src="/visuals/logos/afterlife.png"
          alt="Afterlife Club"
          className="w-full h-auto max-h-24 sm:max-h-28 object-contain filter contrast-105"
          loading="lazy"
        />
      </div>
    </div>
  );
}

// =========================================================================
// 2. WARMILU // OFFICIAL UPLOADED LOGO
// =========================================================================
function WarmiluLogoVisual({ isModal, className = '' }: { isModal: boolean; className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl flex flex-col items-center justify-center overflow-hidden select-none bg-[#050608]/60 border border-white/[0.04] transition-all duration-500 group shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 ${className}`}
    >
      {/* Soft Ambient Thermal Amber Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-[#FFAA00]/15 blur-[80px] group-hover:scale-110 transition-transform duration-700" />
        <div className="w-48 h-48 rounded-full bg-amber-900/20 blur-[60px]" />
      </div>

      {/* Official Warmilu Brandmark */}
      <div className="relative z-10 w-full max-w-[300px] sm:max-w-[380px] p-4 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <img
          src="/visuals/logos/warmilu.png"
          alt="Warmilu"
          className="w-full h-auto max-h-20 sm:max-h-24 object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)] filter brightness-105"
          loading="lazy"
        />
      </div>
    </div>
  );
}

// =========================================================================
// 3. LUXSHARE-ICT // OFFICIAL UPLOADED LOGO
// =========================================================================
function LuxshareLogoVisual({ isModal, className = '' }: { isModal: boolean; className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl flex flex-col items-center justify-center overflow-hidden select-none bg-[#050608]/60 border border-white/[0.04] transition-all duration-500 group shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 ${className}`}
    >
      {/* Soft Precision Ice-Cyan Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-sky-500/12 blur-[80px] group-hover:scale-110 transition-transform duration-700" />
      </div>

      {/* Official LUXSHARE-ICT Corporate Precision Brandmark on crisp white card */}
      <div className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] px-8 py-7 sm:py-8 rounded-2xl bg-white flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-105 border border-white/20">
        <img
          src="/visuals/logos/luxshare.png"
          alt="LUXSHARE-ICT"
          className="w-full h-auto max-h-16 sm:max-h-20 object-contain filter contrast-105"
          loading="lazy"
        />
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
