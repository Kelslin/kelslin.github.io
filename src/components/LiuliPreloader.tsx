import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';
import { LOGO_SVG_DATA } from '../data/logoSvgData';

export default function LiuliPreloader() {
  const { progress, active } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smooth progress count-up
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < progress) {
          return Math.min(progress, prev + 2);
        }
        return prev;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [progress]);

  // When progress reaches 100% or loading is complete, wait a moment for the signature trace to complete
  useEffect(() => {
    if (progress >= 100 && !active) {
      const timeout = setTimeout(() => {
        setIsLoaded(true);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [progress, active]);

  // Fallback safety: never hang more than 2.8s even on slow connections
  useEffect(() => {
    const fallback = setTimeout(() => {
      setIsLoaded(true);
    }, 2800);
    return () => clearTimeout(fallback);
  }, []);

  const combinedPath = LOGO_SVG_DATA.paths.join(' ');

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050608] text-white selection:bg-transparent pointer-events-auto"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#002FA7]/30 to-[#FFAA00]/25 blur-[130px] pointer-events-none" />

          {/* Centered Monogram & Brand Logo with Animated Vector Trace */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-44 sm:w-56 h-auto aspect-[656/527] flex items-center justify-center"
            >
              <svg
                viewBox={LOGO_SVG_DATA.viewBox}
                className="w-full h-full filter drop-shadow-[0_0_24px_rgba(0,85,255,0.7)] drop-shadow-[0_0_40px_rgba(255,170,0,0.4)] overflow-visible"
              >
                <defs>
                  {/* Glowing Electric Klein & Molten Amber Drawing Gradient */}
                  <linearGradient id="signatureTraceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor="#67E8F9" />
                    <stop offset="65%" stopColor="#0055FF" />
                    <stop offset="100%" stopColor="#FFAA00" />
                  </linearGradient>

                  <linearGradient id="signatureFillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#F1F5F9" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>
                </defs>

                {/* Animated Calligraphic Vector Trace of Kelsey's Signature Logo */}
                <motion.path
                  d={combinedPath}
                  fillRule="evenodd"
                  fill="url(#signatureFillGradient)"
                  stroke="url(#signatureTraceGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{
                    pathLength: 1,
                    fillOpacity: [0, 0, 0.95],
                  }}
                  transition={{
                    pathLength: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
                    fillOpacity: { duration: 0.8, delay: 1.2, ease: 'easeOut' },
                  }}
                />
              </svg>
            </motion.div>

            {/* Haute Typography */}
            <div className="text-center space-y-1.5">
              <p className="font-vogue text-xl sm:text-2xl tracking-normal text-white font-bold">
                Kelsey Lin
              </p>
              <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] text-[#94A3B8] uppercase">
                Product Manager · 0→1 Systems
              </p>
            </div>

            {/* Slender Minimalist Progress Bar */}
            <div className="w-48 sm:w-56 h-[1.5px] bg-white/10 rounded-full overflow-hidden mt-2 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0055FF] via-white to-[#FFAA00] rounded-full"
                style={{ width: `${Math.max(12, displayProgress)}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>

            {/* Percentage Counter */}
            <div className="text-[9px] font-mono tracking-[0.24em] text-neutral-400 uppercase">
              {Math.round(displayProgress)}% · BOTANICAL ARCHIVE
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
