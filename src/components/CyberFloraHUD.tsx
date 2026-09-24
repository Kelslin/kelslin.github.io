import React, { useRef, useEffect } from 'react';

interface CyberFloraHUDProps {
  boxSize?: number;
  isZoomed: boolean;
}

export default function CyberFloraHUD({ boxSize = 140, isZoomed }: CyberFloraHUDProps) {
  const loupeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (loupeRef.current) {
        loupeRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none">
      {/* Soft Luminous Amber Aperture following cursor (Frameless) */}
      <div
        ref={loupeRef}
        className={`absolute top-0 left-0 transition-opacity duration-300 ease-out will-change-transform ${
          isZoomed ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          width: `${boxSize}px`,
          height: `${boxSize}px`,
          transform: 'translate3d(-500px, -500px, 0) translate(-50%, -50%)',
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-[#FFAA00]/10 via-[#FF5500]/10 to-transparent blur-2xl pointer-events-none" />
      </div>
    </div>
  );
}
