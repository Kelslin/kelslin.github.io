import React from 'react';

interface LiuliGlassProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'blue' | 'flame' | 'mixed';
}

export default function LiuliGlass({ 
  children, 
  className = '', 
  glow = 'mixed' 
}: LiuliGlassProps) {
  return (
    <div className={`liuli-slab liuli-prism-edge relative transition-all duration-500 hover:shadow-[0_25px_60px_-10px_rgba(0,47,167,0.35)] ${className}`}>
      
      {/* 1. Internal Molten Smoky Glass Caustics */}
      <div className="absolute inset-0 liuli-caustic-bg pointer-events-none -z-10" />

      {/* 2. Diagonal Crystal Glaze Highlight (The sheen across the slab) */}
      <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-12 pointer-events-none -z-10" />

      {/* 3. Subtle Color Glow Anchors */}
      {glow === 'mixed' && (
        <>
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#002FA7]/30 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#FF4500]/25 rounded-full blur-3xl pointer-events-none -z-10" />
        </>
      )}
      {glow === 'blue' && (
        <div className="absolute -top-12 -left-12 w-52 h-52 bg-[#002FA7]/35 rounded-full blur-3xl pointer-events-none -z-10" />
      )}
      {glow === 'flame' && (
        <div className="absolute -bottom-12 -right-12 w-52 h-52 bg-[#FF4500]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      )}

      {/* Real Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}