import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Waypoint, PORTFOLIO_WAYPOINTS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';

interface ProjectDetailModalProps {
  waypoint: Waypoint | null;
  onClose: () => void;
  onNavigate: (wp: Waypoint) => void;
  language?: Language;
}

export default function ProjectDetailModal({
  waypoint,
  onClose,
  onNavigate,
  language = 'en',
}: ProjectDetailModalProps) {
  // Global Escape & Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && waypoint) {
        const idx = PORTFOLIO_WAYPOINTS.findIndex((w) => w.id === waypoint.id);
        onNavigate(PORTFOLIO_WAYPOINTS[(idx + 1) % PORTFOLIO_WAYPOINTS.length]);
      } else if (e.key === 'ArrowLeft' && waypoint) {
        const idx = PORTFOLIO_WAYPOINTS.findIndex((w) => w.id === waypoint.id);
        onNavigate(PORTFOLIO_WAYPOINTS[(idx - 1 + PORTFOLIO_WAYPOINTS.length) % PORTFOLIO_WAYPOINTS.length]);
      }
    };

    if (waypoint) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [waypoint, onClose, onNavigate]);

  if (!waypoint) return null;

  const currentIndex = PORTFOLIO_WAYPOINTS.findIndex((w) => w.id === waypoint.id);
  const prevWaypoint =
    PORTFOLIO_WAYPOINTS[(currentIndex - 1 + PORTFOLIO_WAYPOINTS.length) % PORTFOLIO_WAYPOINTS.length];
  const nextWaypoint =
    PORTFOLIO_WAYPOINTS[(currentIndex + 1) % PORTFOLIO_WAYPOINTS.length];

  const projectT = waypoint
    ? TRANSLATIONS[language]?.projects[waypoint.id] || TRANSLATIONS.en.projects[waypoint.id]
    : null;

  const title = projectT?.title || waypoint.title;
  const role = projectT?.role || waypoint.role;
  const period = projectT?.period || waypoint.period;
  const context = projectT?.context || waypoint.detailedBreakdown.context;
  const bulletPoints = projectT?.bulletPoints || waypoint.detailedBreakdown.bulletPoints;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050608]/96 backdrop-blur-2xl selection:bg-[#002FA7] selection:text-white pointer-events-auto">
        {/* Fixed Top Exit & Navigation Bar */}
        <div className="fixed top-5 left-6 right-6 sm:left-10 sm:right-10 z-[70] flex items-center justify-between pointer-events-auto">
          {/* Arrow cycle hints */}
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[#94A3B8] uppercase">
            <button
              onClick={() => onNavigate(prevWaypoint)}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-1.5 px-3 rounded-full bg-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Prev [←]</span>
            </button>
            <span className="text-white/20">/</span>
            <button
              onClick={() => onNavigate(nextWaypoint)}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-1.5 px-3 rounded-full bg-white/10"
            >
              <span>Next [→]</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Close Fullscreen Button */}
          <button
            onClick={onClose}
            className="ml-auto flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-black font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#0055FF] hover:text-white transition-colors shadow-2xl cursor-pointer"
          >
            <span>Close</span>
            <span className="text-[10px] opacity-60 hidden sm:inline">[ESC]</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Backdrop click dismisses */}
        <div
          onClick={onClose}
          className="fixed inset-0 z-0 bg-transparent cursor-pointer"
        />

        {/* Full-Screen Detailed Case Study Container */}
        <motion.div
          key={waypoint.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-10 py-16 sm:py-24 text-[#D8ECF8]"
        >
          {/* Clean Case Study Header */}
          <div className="flex items-center gap-2 mb-2 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[#0055FF] uppercase font-semibold">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: waypoint.accentColor }}
            />
            <span>CASE STUDY</span>
          </div>

          {/* Line 1: Title */}
          <h1 className="font-syne text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] sm:leading-[0.98] mb-2">
            {title}
          </h1>

          {/* Line 2: Job Title / Role */}
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.18em] text-[#0055FF] font-semibold mb-1">
            {role}
          </div>

          {/* Line 3: Period */}
          <div className="text-[11px] sm:text-xs font-mono tracking-[0.15em] text-[#94A3B8] uppercase mb-6 sm:mb-8">
            {period}
          </div>

          {/* Highlight Metric Tags (Zero card boxes, zero borders) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {waypoint.metrics.map((m, idx) => (
              <div
                key={idx}
                className="inline-flex items-baseline gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.06]"
              >
                <span className="font-syne text-sm sm:text-base md:text-lg font-bold text-white tracking-tight">
                  {m.value}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-[#94A3B8] uppercase tracking-wider">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Problem & Strategic Context */}
          <div className="mb-8">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#67E8F9] font-semibold mb-2">
              01 // PROBLEM & STRATEGIC CONTEXT
            </h3>
            <p className="font-sans text-[#D8ECF8]/90 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              {context}
            </p>
          </div>

          {/* Numbered Architecture & Execution Decisions (Frameless, zero borders) */}
          <div className="mb-8">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0055FF] font-semibold mb-3">
              02 // KEY ARCHITECTURE & EXECUTION DELIVERABLES
            </h3>
            <ul className="space-y-3 font-sans text-xs sm:text-sm md:text-base text-[#D8ECF8]/85 font-light leading-relaxed">
              {bulletPoints.map((bp, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-mono text-xs font-semibold text-[#0055FF] pt-0.5 shrink-0">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span>{bp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 03 // PROJECT LINKS & ARTIFACTS (FRAMELESS TAGS) */}
          {waypoint.links && waypoint.links.length > 0 && (
            <div className="mb-8">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FFAA00] font-semibold mb-3">
                03 // PROJECT LINKS & ARTIFACTS
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {waypoint.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[11px] sm:text-xs font-mono text-white transition-all group cursor-pointer"
                  >
                    <span className="text-[#FFAA00] font-semibold">{link.category} ·</span>
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 text-[#94A3B8] group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Narrative Footnote */}
          {waypoint.narrativeOrigin && (
            <div className="pl-4 py-2 mb-8 text-xs sm:text-sm font-light text-[#94A3B8] italic bg-white/[0.02] rounded-r-xl">
              "{waypoint.narrativeOrigin}"
            </div>
          )}

          {/* Technical & Methodological Deliverables */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-[0.2em] mr-2">
                DELIVERABLES:
              </span>
              {waypoint.detailedBreakdown.technicalStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-white/[0.06] text-xs font-mono text-[#D8ECF8]"
                >
                  .{tech.toLowerCase().replace(/[^a-z0-9]/g, '_')}
                </span>
              ))}
            </div>

            {/* Quick Cycle */}
            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.2em] text-[#94A3B8]">
              <button
                onClick={() => onNavigate(prevWaypoint)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                ← Prev Petal
              </button>
              <span className="text-white/20">/</span>
              <button
                onClick={() => onNavigate(nextWaypoint)}
                className="text-amber-300 hover:text-white transition-colors cursor-pointer"
              >
                Next Petal →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
