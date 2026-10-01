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
        <div className="w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-tr from-[#FA8072]/25 via-[#FFAA00]/18 to-transparent blur-[90px] opacity-45 group-hover/logo:opacity-90 group-hover/logo:scale-115 transition-all duration-700 ease-out" />
      </div>

      {/* Pure Floating Brand Logo with 3D Pop-Out Effect (Scaled to Match Actual Content Footprint) */}
      <div className="relative z-10 w-full max-w-[360px] sm:max-w-[420px] md:max-w-[480px] h-32 sm:h-38 md:h-44 p-2 flex items-center justify-center transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:scale-108 group-hover/logo:-translate-y-1.5">
        <img
          src="/visuals/logos/afterlife.png"
          alt="Afterlife Club"
          className="w-full h-auto max-h-32 sm:max-h-40 md:max-h-44 max-w-[340px] sm:max-w-[400px] md:max-w-[460px] object-contain [image-rendering:-webkit-optimize-contrast] drop-shadow-[0_4px_28px_rgba(250,128,114,0.4)] transition-all duration-500"
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
        <div className="w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-tr from-[#FFAA00]/25 via-amber-600/10 to-transparent blur-[90px] opacity-45 group-hover/logo:opacity-90 group-hover/logo:scale-115 transition-all duration-700 ease-out" />
      </div>

      {/* Pure Floating Brandmark with 3D Pop-Out Effect (Balanced to Match Optical Mass) */}
      <div className="relative z-10 w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] h-32 sm:h-38 md:h-44 p-2 flex items-center justify-center transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:scale-108 group-hover/logo:-translate-y-1.5">
        <img
          src="/visuals/logos/warmilu.png"
          alt="Warmilu"
          className="w-full h-auto max-h-16 sm:max-h-18 md:max-h-20 object-contain [image-rendering:-webkit-optimize-contrast] drop-shadow-[0_4px_28px_rgba(255,170,0,0.4)] transition-all duration-500"
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
        <div className="w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-tr from-sky-500/20 via-cyan-400/10 to-transparent blur-[90px] opacity-45 group-hover/logo:opacity-90 group-hover/logo:scale-115 transition-all duration-700 ease-out" />
      </div>

      {/* Pure Floating Brandmark with 3D Pop-Out Effect (Balanced to Match Optical Mass) */}
      <div className="relative z-10 w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] h-32 sm:h-38 md:h-44 p-2 flex items-center justify-center transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:scale-108 group-hover/logo:-translate-y-1.5">
        <img
          src="/visuals/logos/luxshare.png"
          alt="LUXSHARE-ICT"
          className="w-full h-auto max-h-18 sm:max-h-20 md:max-h-24 object-contain [image-rendering:-webkit-optimize-contrast] drop-shadow-[0_4px_28px_rgba(56,189,248,0.4)] transition-all duration-500"
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
        <div className="w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-tr from-indigo-500/25 via-violet-500/15 to-transparent blur-[90px] opacity-45 group-hover/logo:opacity-90 group-hover/logo:scale-115 transition-all duration-700 ease-out" />
      </div>

      {/* Pure Floating Brandmark with 3D Pop-Out Effect (Standardized Consistent Stage) */}
      <div className="relative z-10 w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] h-32 sm:h-38 md:h-44 p-2 flex flex-col items-center justify-center gap-2.5 sm:gap-3.5 transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:scale-108 group-hover/logo:-translate-y-1.5">
        {/* Geometric Neural Ring Mark */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-indigo-400/90 flex items-center justify-center p-2 shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover/logo:border-indigo-300 group-hover/logo:shadow-[0_0_30px_rgba(99,102,241,0.7)] transition-all duration-500">
          <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-indigo-400 shadow-[0_0_12px_#818CF8]" />
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
