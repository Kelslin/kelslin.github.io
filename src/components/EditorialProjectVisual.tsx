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
  // Pure Frameless Logo or Pure Image Visuals
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
// 1. AFTERLIFE CLUB // FRAMELESS TRANSPARENT LOGO WITH POP-OUT EFFECT
// =========================================================================
function AfterlifeLogoVisual({ isModal, className = '' }: { isModal: boolean; className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center select-none overflow-visible group/logo transition-all duration-700 ${className}`}
    >
      {/* Soft Ambient Brand Glow (Salmon & Warm Apricot) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 sm:w-88 h-72 sm:h-88 rounded-full bg-gradient-to-tr from-[#FA8072]/20 via-[#FFAA00]/15 to-transparent blur-[85px] opacity-40 group-hover/logo:opacity-85 group-hover/logo:scale-115 transition-all duration-700 ease-out" />
      </div>

      {/* Pure Floating Brand Logo with 3D Pop-Out Effect (Standardized Consistent Stage) */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] h-28 sm:h-32 md:h-36 p-2 flex items-center justify-center transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:scale-108 group-hover/logo:-translate-y-1.5">
        <img
          src="/visuals/logos/afterlife.png"
          alt="Afterlife Club"
          className="max-h-20 sm:max-h-24 md:max-h-26 w-auto max-w-full object-contain [image-rendering:-webkit-optimize-contrast] drop-shadow-[0_4px_24px_rgba(250,128,114,0.35)] transition-all duration-500"
          loading="eager"
        />
      </div>
    </div>
  );
}

// =========================================================================
// 2. WARMILU // FRAMELESS TRANSPARENT LOGO WITH POP-OUT EFFECT
// =========================================================================
function WarmiluLogoVisual({ isModal, className = '' }: { isModal: boolean; className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center select-none overflow-visible group/logo transition-all duration-700 ${className}`}
    >
      {/* Soft Ambient Thermal Amber Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 sm:w-88 h-72 sm:h-88 rounded-full bg-gradient-to-tr from-[#FFAA00]/25 via-amber-600/10 to-transparent blur-[85px] opacity-40 group-hover/logo:opacity-85 group-hover/logo:scale-115 transition-all duration-700 ease-out" />
      </div>

      {/* Pure Floating Brandmark with 3D Pop-Out Effect (Standardized Consistent Stage) */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] h-28 sm:h-32 md:h-36 p-2 flex items-center justify-center transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:scale-108 group-hover/logo:-translate-y-1.5">
        <img
          src="/visuals/logos/warmilu.png"
          alt="Warmilu"
          className="max-h-16 sm:max-h-20 md:max-h-22 w-auto max-w-full object-contain [image-rendering:-webkit-optimize-contrast] drop-shadow-[0_4px_24px_rgba(255,170,0,0.35)] transition-all duration-500"
          loading="eager"
        />
      </div>
    </div>
  );
}

// =========================================================================
// 3. LUXSHARE-ICT // FRAMELESS HIGH-RES LOGO WITH POP-OUT EFFECT
// =========================================================================
function LuxshareLogoVisual({ isModal, className = '' }: { isModal: boolean; className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center select-none overflow-visible group/logo transition-all duration-700 ${className}`}
    >
      {/* Soft Precision Ice-Cyan Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 sm:w-88 h-72 sm:h-88 rounded-full bg-gradient-to-tr from-sky-500/20 via-cyan-400/10 to-transparent blur-[85px] opacity-40 group-hover/logo:opacity-85 group-hover/logo:scale-115 transition-all duration-700 ease-out" />
      </div>

      {/* Pure Floating Brandmark with 3D Pop-Out Effect (Standardized Consistent Stage) */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] h-28 sm:h-32 md:h-36 p-2 flex items-center justify-center transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:scale-108 group-hover/logo:-translate-y-1.5">
        <img
          src="/visuals/logos/luxshare.png"
          alt="LUXSHARE-ICT"
          className="max-h-16 sm:max-h-20 md:max-h-22 w-auto max-w-full object-contain [image-rendering:-webkit-optimize-contrast] drop-shadow-[0_4px_24px_rgba(56,189,248,0.35)] transition-all duration-500"
          loading="eager"
        />
      </div>
    </div>
  );
}

// =========================================================================
// 4. SOMASEEK // FRAMELESS LOGO WITH POP-OUT EFFECT (PRESERVED)
// =========================================================================
function SomaSeekLogoVisual({ isModal, className = '' }: { isModal: boolean; className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center select-none overflow-visible group/logo transition-all duration-700 ${className}`}
    >
      {/* Soft Deep Violet / Cobalt Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 sm:w-88 h-72 sm:h-88 rounded-full bg-gradient-to-tr from-indigo-500/25 via-violet-500/15 to-transparent blur-[85px] opacity-40 group-hover/logo:opacity-85 group-hover/logo:scale-115 transition-all duration-700 ease-out" />
      </div>

      {/* Pure Floating Brandmark with 3D Pop-Out Effect (Standardized Consistent Stage) */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] h-28 sm:h-32 md:h-36 p-2 flex flex-col items-center justify-center gap-2.5 sm:gap-3 transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:scale-108 group-hover/logo:-translate-y-1.5">
        {/* Geometric Neural Ring Mark */}
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-indigo-400/90 flex items-center justify-center p-2 shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover/logo:border-indigo-300 group-hover/logo:shadow-[0_0_30px_rgba(99,102,241,0.7)] transition-all duration-500">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-indigo-400 shadow-[0_0_12px_#818CF8]" />
        </div>

        <span className="font-syne font-extrabold text-xl sm:text-2xl md:text-3xl text-white tracking-[0.24em] uppercase drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
          SOMASEEK
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 5. PURE IMAGE VISUAL // AUTHENTIC PHOTOGRAPHY (NO WORDS / NO BORDERS)
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
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden select-none group/logo transition-all duration-700 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover/logo:scale-105 group-hover/logo:brightness-105 transition-all duration-700 ease-out"
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
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center select-none group/logo ${className}`}
    >
      <span className="font-syne font-bold text-xl sm:text-2xl text-white/80 tracking-widest uppercase transition-transform duration-500 group-hover/logo:scale-110">
        {title}
      </span>
    </div>
  );
}
