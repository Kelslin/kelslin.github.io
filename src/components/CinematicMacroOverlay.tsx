import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { Waypoint, PORTFOLIO_WAYPOINTS, LensType, LENS_CONFIG } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';

interface CinematicMacroOverlayProps {
  activeWaypoint: Waypoint | null;
  onClose: () => void;
  onSelectWaypoint: (wp: Waypoint) => void;
  onOpenDetails: () => void;
  language?: Language;
  activeLens: LensType;
  onSelectLens: (lens: LensType) => void;
}

export default function CinematicMacroOverlay({
  activeWaypoint,
  onClose,
  onSelectWaypoint,
  onOpenDetails,
  language = 'en',
  activeLens,
  onSelectLens,
}: CinematicMacroOverlayProps) {
  // Current lens items
  const currentLensId = activeWaypoint?.lens || activeLens;
  const lensWaypoints = PORTFOLIO_WAYPOINTS.filter((w) => w.lens === currentLensId);

  // Global Keyboard, Touch Swipe & Trackpad Navigation
  useEffect(() => {
    if (!activeWaypoint) return;

    const idx = lensWaypoints.findIndex((w) => w.id === activeWaypoint.id);
    const validIdx = idx === -1 ? 0 : idx;
    const prevWaypoint =
      lensWaypoints[(validIdx - 1 + lensWaypoints.length) % lensWaypoints.length];
    const nextWaypoint =
      lensWaypoints[(validIdx + 1) % lensWaypoints.length];

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
  }, [activeWaypoint, onClose, onSelectWaypoint, lensWaypoints]);

  if (!activeWaypoint) return null;

  const currentIdx = lensWaypoints.findIndex((w) => w.id === activeWaypoint.id);
  const validIndex = currentIdx === -1 ? 0 : currentIdx;
  const prevWaypoint =
    lensWaypoints[(validIndex - 1 + lensWaypoints.length) % lensWaypoints.length];
  const nextWaypoint =
    lensWaypoints[(validIndex + 1) % lensWaypoints.length];

  const t = TRANSLATIONS[language]?.macro || TRANSLATIONS.en.macro;
  const projectT =
    TRANSLATIONS[language]?.projects[activeWaypoint.id] ||
    TRANSLATIONS.en.projects[activeWaypoint.id];

  const title = projectT?.title || activeWaypoint.title;
  const role = projectT?.role || activeWaypoint.role;
  const period = projectT?.period || activeWaypoint.period;
  const story = projectT?.story || activeWaypoint.story;
  const deckSummary = projectT?.deckSummary || activeWaypoint.deckSummary || story;
  const { isPlaying, toggleSound } = useAudio();

  const lensesList: LensType[] = ['ventures', 'leadership', 'craft'];

  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between pt-14 sm:pt-20 pb-3 sm:pb-6 px-4 sm:px-8 md:px-12 select-none">
      {/* Swipeable Haute Editorial Visual Card */}
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
          className="w-full max-w-[490px] pointer-events-auto my-auto p-4 sm:p-6 rounded-3xl bg-[#06080E]/92 backdrop-blur-3xl border border-white/[0.08] shadow-[0_30px_90px_rgba(0,0,0,0.85)] text-white cursor-grab active:cursor-grabbing max-h-[76vh] sm:max-h-[82vh] overflow-y-auto no-scrollbar"
        >
          {/* 1. Haute 16:9 Visual Hero Preview (Photo instead of text overload) */}
          {activeWaypoint.imageVisual && (
            <div className="relative w-full aspect-[16/9] mb-4 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 group/visual">
              <img
                src={activeWaypoint.imageVisual}
                alt={title}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover/visual:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080E]/90 via-transparent to-black/25 pointer-events-none" />

              {/* Minimal architectural chapter stamp */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-300">
                {LENS_CONFIG[activeWaypoint.lens]?.shortLabel || activeWaypoint.lens} // {activeWaypoint.chapter}
              </div>
            </div>
          )}

          {/* Line 1: Title */}
          <h2 className="font-syne text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight mb-1 drop-shadow-sm">
            {title}
          </h2>

          {/* Line 2: Role & Period in one balanced line */}
          <div className="flex flex-wrap items-baseline gap-2 mb-3">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] text-[#0055FF] font-semibold">
              {role}
            </span>
            <span className="text-neutral-500 text-[10px] font-mono">·</span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.14em] text-[#94A3B8] uppercase">
              {period}
            </span>
          </div>

          {/* Line 3: De-AI'd 1-2 Sentence Narrative (Zero fluff, authentic achievements) */}
          <p className="font-sans text-neutral-200 text-xs sm:text-[13px] font-normal leading-relaxed mb-3.5">
            {deckSummary}
          </p>

          {/* Line 4: Authentic Tactile Chips (Physical + Digital, Non-Robotic) */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {activeWaypoint.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[9px] sm:text-[10px] font-mono tracking-wider text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Line 5: Quantified Impact Metrics (Frameless Clean Numerals) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 my-3 pt-3 border-t border-white/[0.08]">
            {activeWaypoint.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col justify-start">
                <span className="font-syne text-base sm:text-xl font-bold tracking-tight text-white leading-tight">
                  {m.value}
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-[0.12em] mt-0.5 leading-tight">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Line 6: De-AI'd Action Row (Underlined live link + Refined Spec trigger) */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/[0.08]">
            {activeWaypoint.websiteUrl ? (
              <a
                href={activeWaypoint.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 font-mono text-[11px] text-neutral-300 hover:text-white underline underline-offset-4 decoration-neutral-500 hover:decoration-white transition-colors cursor-pointer shrink-0"
                title={`Visit ${activeWaypoint.websiteLabel || 'official website'}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-medium whitespace-nowrap">
                  {activeWaypoint.websiteLabel || t.visitWebsite}
                </span>
                <ExternalLink className="w-3 h-3 text-neutral-400 group-hover/link:text-white transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0" />
              </a>
            ) : (
              <div className="text-[10px] font-mono text-neutral-500 tracking-wider">
                {activeWaypoint.lens === 'craft' ? 'Creative Discipline' : 'Field Initiative'}
              </div>
            )}

            <button
              onClick={onOpenDetails}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/25 hover:border-white bg-white/[0.06] hover:bg-white text-white hover:text-black font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer shrink-0 ml-auto"
            >
              <span className="whitespace-nowrap">
                {activeWaypoint.lens === 'ventures' ? t.readFullCase : 'View Archival Spec'}
              </span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 font-mono font-bold">
                →
              </span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* BOTTOM CONTROLLER: ARCHITECTURAL LENS SWITCHER + ALIGNED CHAPTER RAIL      */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-2 pointer-events-auto">
        {/* Subtle Lens Switcher (Fast-switching between 01 Ventures, 02 Leadership, 03 Craft) */}
        <div className="flex items-center gap-4 text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase overflow-x-auto no-scrollbar py-1">
          <span className="text-neutral-600 hidden xs:inline">PERSPECTIVE:</span>
          {lensesList.map((lens) => {
            const isLensActive = currentLensId === lens;
            const config = LENS_CONFIG[lens];
            const lensFirstWp = PORTFOLIO_WAYPOINTS.find((w) => w.lens === lens);

            return (
              <button
                key={lens}
                type="button"
                onClick={() => {
                  onSelectLens(lens);
                  if (lensFirstWp) onSelectWaypoint(lensFirstWp);
                }}
                className={`transition-colors cursor-pointer pb-0.5 relative whitespace-nowrap ${
                  isLensActive ? 'text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <span>
                  {config.index} // {config.shortLabel}
                </span>
                {isLensActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#0055FF]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Chapter Rail: Minimized Music Icon + Active Lens Items */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-4 sm:gap-6 pointer-events-auto text-[10px] sm:text-xs font-mono tracking-[0.15em] uppercase overflow-x-auto no-scrollbar py-1.5 shrink-0 border-t border-white/10"
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

          {/* Waypoints of Active Lens */}
          {lensWaypoints.map((wp) => {
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
                    isCurrent
                      ? 'text-blue-400 font-bold'
                      : 'text-neutral-600 group-hover:text-neutral-400'
                  }`}
                >
                  {wp.chapter} //
                </span>
                <span className="font-syne tracking-wider text-xs sm:text-sm">
                  {projTitle.split(/ & | y | 和 /)[0]}
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
    </div>
  );
}
