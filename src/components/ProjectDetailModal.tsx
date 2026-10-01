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
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050608]/96 backdrop-blur-2xl selection:bg-[#F59E0B] selection:text-black pointer-events-auto">
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
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-black font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#F59E0B] hover:text-black transition-colors shadow-2xl cursor-pointer"
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
          {/* Header Spread: Title, Role & Period on Left; Website Link on Right */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-white/[0.06]">
            <div className="space-y-2 max-w-2xl">
              <h1 className="font-syne text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] sm:leading-[0.98]">
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-mono uppercase tracking-[0.16em]">
                <span className="text-[#FFAA00] font-semibold">{role}</span>
                <span className="text-white/20">·</span>
                <span className="text-[#94A3B8]">{period}</span>
              </div>
            </div>

            {waypoint.websiteUrl && (
              <a
                href={waypoint.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/site inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-[#FFAA00] text-white hover:text-black border border-white/15 hover:border-[#FFAA00] text-xs font-mono tracking-wider transition-all duration-300 shadow-md cursor-pointer shrink-0 self-start sm:self-auto mt-1"
                aria-label={`Visit live website for ${title}`}
              >
                <span className="font-semibold">
                  {waypoint.websiteLabel || 'Visit Website'}
                </span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/site:translate-x-0.5 group-hover/site:-translate-y-0.5" />
              </a>
            )}
          </div>

          {/* Impact Metrics (Editorial Typography with Warm Amber numerals) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10 py-2">
            {waypoint.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-syne text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#FFAA00]">
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
            <h3 className="font-mono text-[11px] sm:text-xs tracking-[0.16em] text-[#F59E0B] font-semibold mb-2">
              01 · Strategic Context & Problem Space
            </h3>
            <p className="font-sans text-[#D8ECF8]/90 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              {context}
            </p>
          </div>

          {/* Key Architecture & Execution Deliverables */}
          <div className="mb-8">
            <h3 className="font-mono text-[11px] sm:text-xs tracking-[0.16em] text-[#F59E0B] font-semibold mb-3">
              02 · Architecture & Execution Deliverables
            </h3>
            <ul className="space-y-3 font-sans text-xs sm:text-sm md:text-base text-[#D8ECF8]/85 font-light leading-relaxed">
              {bulletPoints.map((bp, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-mono text-xs font-semibold text-[#F59E0B] pt-0.5 shrink-0">
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
