import React from 'react';

export default function LiuliMonogramSeal({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 group/seal select-none pointer-events-auto cursor-default ${className}`}
      title="Kelsey Lin · Bespoke Liuli Artisan Seal"
    >
      {/* Ambient Caustic Halo behind glass seal */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0038FF]/35 via-transparent to-[#FFAA00]/30 blur-md opacity-70 group-hover/seal:opacity-100 group-hover/seal:scale-110 transition-all duration-500 pointer-events-none" />

      {/* Tactile Liuli Glass Seal Badge */}
      <div className="relative w-full h-full rounded-full p-[1px] bg-gradient-to-b from-white/40 via-white/10 to-[#0055FF]/40 shadow-[0_8px_24px_rgba(0,47,167,0.35)] backdrop-blur-md transition-transform duration-500 group-hover/seal:scale-105">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          <defs>
            {/* 1. Glass Body Gradient: Wet Crystal Depth */}
            <radialGradient id="glassBodyGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1E293B" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#0B132B" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#050814" stopOpacity="0.95" />
            </radialGradient>

            {/* 2. Prismatic Klein Blue & Amber Rim */}
            <linearGradient id="prismaticRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#67E8F9" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#0055FF" stopOpacity="0.85" />
              <stop offset="85%" stopColor="#FFAA00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF5500" stopOpacity="0.65" />
            </linearGradient>

            {/* 3. Curved Specular Dome Highlight */}
            <linearGradient id="specularDome" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>

            {/* 4. Klein Blue Internal Caustic Pool */}
            <radialGradient id="causticPool" cx="50%" cy="55%" r="45%">
              <stop offset="0%" stopColor="#0044FF" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#002FA7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* 5. Monogram Lettering Gradient */}
            <linearGradient id="monogramLetterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>

          {/* Disc Body */}
          <circle cx="50" cy="50" r="47" fill="url(#glassBodyGrad)" />

          {/* Internal Caustic Reflection */}
          <circle cx="50" cy="52" r="38" fill="url(#causticPool)" />

          {/* Outer Prismatic Rim */}
          <circle
            cx="50"
            cy="50"
            r="46.5"
            fill="none"
            stroke="url(#prismaticRimGrad)"
            strokeWidth="1.2"
          />

          {/* Fine Artisan Seal Calibration Ring */}
          <circle
            cx="50"
            cy="50"
            r="41"
            fill="none"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="0.75"
            strokeDasharray="2 3"
          />

          {/* Dome Specular Arc Highlight */}
          <path
            d="M 24 34 Q 50 18 76 34 Q 50 24 24 34 Z"
            fill="url(#specularDome)"
          />

          {/* Bespoke Editorial KL Monogram */}
          <text
            x="50"
            y="54"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="30"
            fontWeight="500"
            letterSpacing="-0.08em"
            fill="url(#monogramLetterGrad)"
            className="select-none"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }}
          >
            KL
          </text>

          {/* Delicate Artisan Hallmark Amber Pip */}
          <circle cx="50" cy="74" r="1.6" fill="#FFAA00" opacity="0.9" />
        </svg>
      </div>
    </div>
  );
}
