import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Mail } from 'lucide-react';
import { PORTFOLIO_WAYPOINTS, Waypoint } from '../data/portfolioData';

interface RecruiterIndexModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToWaypoint: (wp: Waypoint) => void;
}

export default function RecruiterIndexModal({
  isOpen,
  onClose,
  onJumpToWaypoint,
}: RecruiterIndexModalProps) {
  // Escape key listener for instant exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050608]/96 backdrop-blur-2xl selection:bg-[#002FA7] selection:text-white pointer-events-auto">
        {/* Fixed Top Exit Bar */}
        <div className="fixed top-4 right-4 sm:top-5 sm:right-10 z-[70] flex items-center gap-3 pointer-events-auto">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-black font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#FFAA00] transition-colors shadow-2xl cursor-pointer"
          >
            <span>Close</span>
            <span className="text-[10px] text-black/60 hidden sm:inline">[ESC]</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Backdrop click dismisses */}
        <div
          onClick={onClose}
          className="fixed inset-0 z-0 bg-transparent cursor-pointer"
        />

        {/* Frameless Editorial Catalogue Viewport */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-10 py-14 sm:py-20 text-[#D8ECF8]"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="font-syne text-xl sm:text-2xl md:text-3xl text-white font-bold tracking-tight">
                Selected Works
              </h2>
              <p className="text-xs font-mono text-[#94A3B8] tracking-wider mt-1">
                A quick overview of my recent projects and case studies.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="mailto:kelslin@umich.edu"
                className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 text-white font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] hover:bg-white/20 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#FFAA00]" />
                <span>Get in Touch ↗</span>
              </a>
            </div>
          </div>

          {/* Minimal Prioritized Project Rows */}
          <div className="space-y-4 sm:space-y-6">
            {PORTFOLIO_WAYPOINTS.map((wp) => (
              <div
                key={wp.id}
                onClick={() => {
                  onClose();
                  onJumpToWaypoint(wp);
                }}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: wp.accentColor }}
                    />
                    <h3 className="font-syne text-lg sm:text-xl text-white font-semibold group-hover:text-amber-200 transition-colors">
                      {wp.title}
                    </h3>
                    <span className="text-[11px] font-mono text-[#94A3B8]">
                      · {wp.period}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-[#FFAA00] tracking-wider uppercase pl-5">
                    {wp.role}
                  </div>

                  <p className="text-xs font-sans text-[#D8ECF8]/75 font-light pl-5 max-w-2xl leading-relaxed">
                    {wp.story.split('. ')[0] + '.'}
                  </p>
                </div>

                <div className="flex items-center gap-4 md:self-center pl-5 md:pl-0">
                  <div className="hidden lg:flex items-center gap-3">
                    {wp.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="px-3 py-1.5 rounded-xl bg-white/[0.04] text-right">
                        <div className="font-syne text-xs font-bold text-white">{m.value}</div>
                        <div className="font-mono text-[8px] text-[#94A3B8] uppercase tracking-wider">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.15em] text-[#D8ECF8] group-hover:text-[#FFAA00] transition-colors">
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAA00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 text-xs font-mono text-[#94A3B8] tracking-[0.2em] uppercase">
            <div>
              Ann Arbor, MI · University of Michigan
            </div>
            <a
              href="mailto:kelslin@umich.edu"
              className="text-white hover:text-[#FFAA00] transition-colors"
            >
              Get in Touch ➔
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
