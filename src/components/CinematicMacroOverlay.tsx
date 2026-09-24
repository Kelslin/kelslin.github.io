import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight, ArrowLeft, ExternalLink, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { Waypoint, PORTFOLIO_WAYPOINTS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';

interface CinematicMacroOverlayProps {
  activeWaypoint: Waypoint | null;
  onClose: () => void;
  onSelectWaypoint: (wp: Waypoint) => void;
  onOpenDetails: () => void;
  language?: Language;
}

export default function CinematicMacroOverlay({
  activeWaypoint,
  onClose,
  onSelectWaypoint,
  onOpenDetails,
  language = 'en',
}: CinematicMacroOverlayProps) {
  const touchStartX = useRef<number | null>(null);

  // Global Keyboard, Touch Swipe & Trackpad Navigation
  useEffect(() => {
    if (!activeWaypoint) return;

    const idx = PORTFOLIO_WAYPOINTS.findIndex((w) => w.id === activeWaypoint.id);
    const prevWaypoint =
      PORTFOLIO_WAYPOINTS[(idx - 1 + PORTFOLIO_WAYPOINTS.length) % PORTFOLIO_WAYPOINTS.length];
    const nextWaypoint =
      PORTFOLIO_WAYPOINTS[(idx + 1) % PORTFOLIO_WAYPOINTS.length];

    // 1. Keyboard Arrow Keys
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        onSelectWaypoint(nextWaypoint);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        onSelectWaypoint(prevWaypoint);
      }
    };

    // 2. Trackpad Two-Finger Horizontal Swipe
    let wheelCooldown = false;
    const handleWheel = (e: WheelEvent) => {
      if (wheelCooldown || Math.abs(e.deltaX) < 45) return;
      wheelCooldown = true;
      setTimeout(() => {
        wheelCooldown = false;
      }, 350);

      if (e.deltaX > 45) {
        onSelectWaypoint(nextWaypoint);
      } else if (e.deltaX < -45) {
        onSelectWaypoint(prevWaypoint);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeWaypoint, onClose, onSelectWaypoint]);

  if (!activeWaypoint) return null;

  const currentIndex = PORTFOLIO_WAYPOINTS.findIndex((w) => w.id === activeWaypoint.id);
  const prevWaypoint =
    PORTFOLIO_WAYPOINTS[(currentIndex - 1 + PORTFOLIO_WAYPOINTS.length) % PORTFOLIO_WAYPOINTS.length];
  const nextWaypoint =
    PORTFOLIO_WAYPOINTS[(currentIndex + 1) % PORTFOLIO_WAYPOINTS.length];

  const t = TRANSLATIONS[language]?.macro || TRANSLATIONS.en.macro;
  const projectT = TRANSLATIONS[language]?.projects[activeWaypoint.id] || TRANSLATIONS.en.projects[activeWaypoint.id];

  const title = projectT?.title || activeWaypoint.title;
  const role = projectT?.role || activeWaypoint.role;
  const period = projectT?.period || activeWaypoint.period;
  const story = projectT?.story || activeWaypoint.story;
  const deckSummary = projectT?.deckSummary || activeWaypoint.deckSummary || story;
  const { isPlaying, toggleSound } = useAudio();

  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between pt-16 sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-8 md:px-12 select-none">
      {/* Swipeable Cinematic Spatial Content Card */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeWaypoint.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -45 || info.velocity.x < -250) {
              onSelectWaypoint(nextWaypoint);
            } else if (info.offset.x > 45 || info.velocity.x > 250) {
              onSelectWaypoint(prevWaypoint);
            }
          }}
          className="w-full max-w-lg pointer-events-auto my-auto p-5 sm:p-8 rounded-3xl bg-[#06080E]/90 backdrop-blur-3xl border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.8)] text-white cursor-grab active:cursor-grabbing max-h-[68vh] sm:max-h-[80vh] overflow-y-auto"
        >
          {/* Line 1: Title */}
          <h2 className="font-syne text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mb-1 drop-shadow-sm">
            {title}
          </h2>

          {/* Line 2: Job Title / Role */}
          <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] text-[#0055FF] font-semibold mb-1">
            {role}
          </div>

          {/* Line 3: Period */}
          <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.16em] text-[#94A3B8] uppercase mb-3 sm:mb-4">
            {period}
          </div>

          {/* Concise High-Signal Scope & Achievement Summary */}
          <p className="font-sans text-neutral-200 text-xs sm:text-sm font-normal leading-relaxed mb-4 sm:mb-5">
            {deckSummary}
          </p>

          {/* Quantified Impact Metrics: Clean Frameless Numbers (Zero lines, zero borders) */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 my-4 sm:my-5">
            {activeWaypoint.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col justify-start">
                <span className="font-syne text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight">
                  {m.value}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-[0.14em] mt-1 leading-tight">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action Row: Frameless Underlined Website Link (Left) & Highlighted Case Study CTA (Right) */}
          <div className="flex items-center justify-between gap-2.5 sm:gap-4 pt-3 border-t border-white/10">
            {/* Left: Underlined Clickable Website Link (Frameless & Clean) */}
            {activeWaypoint.websiteUrl ? (
              <a
                href={activeWaypoint.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-neutral-300 hover:text-white underline underline-offset-4 decoration-neutral-500 hover:decoration-white transition-colors cursor-pointer shrink-0"
                title={`Visit ${activeWaypoint.websiteLabel || 'official website'}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-medium whitespace-nowrap">
                  {activeWaypoint.websiteLabel || t.visitWebsite}
                </span>
                <ExternalLink className="w-3 h-3 text-neutral-400 group-hover/link:text-white transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0" />
              </a>
            ) : (
              <div />
            )}

            {/* Right: De-AI'd Architectural Case Study CTA (Understated, Editorial, Tactile) */}
            <button
              onClick={onOpenDetails}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 hover:border-white bg-white/10 hover:bg-white text-white hover:text-black font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer shrink-0 ml-auto"
            >
              <span className="whitespace-nowrap">{t.readFullCase}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 font-mono font-bold">
                →
              </span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Chapter Rail: Editorial Architectural Chapter Bar (Zero AI bubbles, zero dots) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-4 sm:gap-6 pointer-events-auto text-[10px] sm:text-xs font-mono tracking-[0.15em] uppercase overflow-x-auto no-scrollbar py-2 shrink-0 border-t border-white/10"
      >
        {/* Minimized Music Icon Button directly aligned with the projects */}
        <button
          type="button"
          onClick={toggleSound}
          className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full backdrop-blur-md border transition-all duration-300 cursor-pointer shrink-0 active:scale-95 ${
            isPlaying
              ? 'bg-amber-500/15 border-amber-400/50 text-amber-300 shadow-[0_0_12px_rgba(255,170,0,0.3)] hover:border-amber-300'
              : 'bg-white/10 hover:bg-white/20 border-white/15 text-neutral-400 hover:text-white'
          }`}
          title={isPlaying ? 'Music On (Click to turn off)' : 'Music Off (Click to turn on)'}
        >
          {isPlaying ? (
            <span className="flex items-end gap-0.5 h-3 w-3 py-0.5">
              <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
              <span className="w-0.5 bg-amber-300 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-2/3" />
              <span className="w-0.5 bg-blue-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-4/5" />
            </span>
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </button>

        <span className="h-3.5 w-px bg-white/15 shrink-0" />

        {PORTFOLIO_WAYPOINTS.map((wp) => {
          const isCurrent = wp.id === activeWaypoint.id;
          const projT = TRANSLATIONS[language]?.projects[wp.id];
          const projTitle = projT?.title || wp.title;

          return (
            <button
              key={wp.id}
              onClick={() => onSelectWaypoint(wp)}
              className={`group flex items-baseline gap-2 transition-all duration-300 cursor-pointer shrink-0 pb-1.5 relative ${
                isCurrent ? 'text-white font-semibold' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <span
                className={`text-[10px] ${
                  isCurrent ? 'text-blue-400 font-bold' : 'text-neutral-600 group-hover:text-neutral-400'
                }`}
              >
                {wp.chapter} //
              </span>
              <span className="font-syne tracking-wider text-xs sm:text-sm">
                {projTitle.split(/ & | y /)[0]}
              </span>
              {isCurrent && (
                <motion.span
                  layoutId="activeDeckChapterLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-white to-amber-400"
                />
              )}
            </button>
          );
        })}
      </motion.div>
    </div>

    );
  }
