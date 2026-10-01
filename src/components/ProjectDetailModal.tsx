import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, ExternalLink, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { Waypoint, PORTFOLIO_WAYPOINTS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';
import EditorialProjectVisual from './EditorialProjectVisual';

interface ProjectDetailModalProps {
  waypoint: Waypoint | null;
  onClose: () => void;
  onNavigate: (wp: Waypoint) => void;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export default function ProjectDetailModal({
  waypoint,
  onClose,
  onNavigate,
  language = 'en',
  onLanguageChange,
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

  const { isPlaying, toggleSound } = useAudio();

  const title = projectT?.title || waypoint.title;
  const role = projectT?.role || waypoint.role;
  const period = projectT?.period || waypoint.period;
  const context = projectT?.context || waypoint.detailedBreakdown.context;
  const bulletPoints = projectT?.bulletPoints || waypoint.detailedBreakdown.bulletPoints;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050608]/96 backdrop-blur-2xl selection:bg-[#002FA7] selection:text-white pointer-events-auto">
        {/* Fixed Top Exit & Navigation Bar */}
        <div className="fixed top-4 sm:top-5 left-4 right-4 sm:left-10 sm:right-10 z-[70] flex items-center justify-between gap-3 pointer-events-auto">
          {/* Arrow cycle buttons (Visible on all devices, single arrow each) */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono tracking-[0.15em] uppercase">
            <button
              onClick={() => onNavigate(prevWaypoint)}
              className="flex items-center gap-1.5 hover:text-white text-[#D8ECF8] transition-colors cursor-pointer py-1.5 px-2.5 sm:px-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md"
              title="Previous project"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Prev</span>
            </button>
            <span className="text-white/20">/</span>
            <button
              onClick={() => onNavigate(nextWaypoint)}
              className="flex items-center gap-1.5 hover:text-white text-[#D8ECF8] transition-colors cursor-pointer py-1.5 px-2.5 sm:px-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md"
              title="Next project"
            >
              <span className="hidden xs:inline">Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right side: Close Button */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Close Fullscreen Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-black font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#0055FF] hover:text-white transition-colors shadow-2xl cursor-pointer"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
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
          {/* Clean Case Study Category */}
          <div className="mb-3 text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
            <span className="font-semibold text-white">PERSPECTIVE</span>
            <span className="text-white/20 mx-2">·</span>
            <span>{waypoint.lens === 'ventures' ? 'VENTURES & PRODUCTS' : 'LEADERSHIP & COMMUNITY'}</span>
          </div>

          {/* Line 1: Title */}
          <h1 className="font-syne text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] sm:leading-[0.98] mb-2">
            {title}
          </h1>

          {/* Line 2: Job Title / Role */}
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.16em] text-white font-medium mb-1">
            {role}
          </div>

          {/* Line 3: Period & Live Website Link */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-6 sm:mb-8">
            <div className="text-[11px] sm:text-xs font-mono tracking-[0.15em] text-[#94A3B8] uppercase">
              {period}
            </div>

            {waypoint.websiteUrl && (
              <>
                <span className="text-white/20 hidden xs:inline">·</span>
                <a
                  href={waypoint.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/site inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/10 hover:border-white/25 text-[11px] font-mono text-[#D8ECF8] hover:text-white transition-all shadow-sm cursor-pointer"
                >
                  <span className="font-medium text-white group-hover/site:text-[#0055FF] transition-colors">
                    {waypoint.websiteLabel || 'Visit Live Platform'}
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#94A3B8] group-hover/site:text-white transition-transform group-hover/site:translate-x-0.5 group-hover/site:-translate-y-0.5" />
                </a>
              </>
            )}
          </div>

          {/* Impact Metrics (Pure Editorial Typography, Zero Pill Tags) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10 py-2">
            {waypoint.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-syne text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-none">
                  {m.value}
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-[#94A3B8] uppercase tracking-[0.14em] mt-2">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Editorial Visual Hero (Wireframe, Contact Sheet, Telemetry, Specimen) */}
          <EditorialProjectVisual
            project={waypoint}
            isModal={true}
            className="mb-8 sm:mb-12 shadow-[0_30px_80px_rgba(0,0,0,0.85)]"
          />

          {/* Problem & Strategic Context */}
          <div className="mb-8">
            <h3 className="font-mono text-[11px] sm:text-xs tracking-[0.16em] text-[#67E8F9] font-semibold mb-2">
              01 · Strategic Context & Problem Space
            </h3>
            <p className="font-sans text-[#D8ECF8]/90 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              {context}
            </p>
          </div>

          {/* Key Architecture & Execution Deliverables */}
          <div className="mb-8">
            <h3 className="font-mono text-[11px] sm:text-xs tracking-[0.16em] text-[#0055FF] font-semibold mb-3">
              02 · Architecture & Execution Deliverables
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

          {/* Narrative Footnote */}
          {waypoint.narrativeOrigin && (
            <div className="pl-4 py-2 mb-8 text-xs sm:text-sm font-light text-[#94A3B8] italic bg-white/[0.02] rounded-r-xl">
              "{waypoint.narrativeOrigin}"
            </div>
          )}

          {/* Quick Cycle Navigation (Clean & Editorial) */}
          <div className="pt-8 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono tracking-[0.16em]">
            <button
              onClick={() => onNavigate(prevWaypoint)}
              className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors cursor-pointer py-2 px-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Project</span>
            </button>
            <button
              onClick={() => onNavigate(nextWaypoint)}
              className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors cursor-pointer py-2 px-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12]"
            >
              <span>Next Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
