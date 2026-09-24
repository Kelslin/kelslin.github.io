import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
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
          className="w-full max-w-lg pointer-events-auto my-auto p-5 sm:p-8 rounded-3xl bg-[#06080E]/90 backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] text-white cursor-grab active:cursor-grabbing max-h-[68vh] sm:max-h-[80vh] overflow-y-auto"
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

          {/* Concise High-Signal Summary */}
          <p className="font-sans text-[#E2E8F0] text-xs sm:text-sm font-normal leading-relaxed mb-4 sm:mb-5">
            {story.split('. ')[0] + (story.includes('. ') ? '.' : '')}
          </p>

          {/* Quantified Highlight Tags (Zero card box, zero borders) */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {activeWaypoint.metrics.map((m, idx) => (
              <div
                key={idx}
                className="inline-flex items-baseline gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/[0.06]"
              >
                <span className="font-syne text-xs sm:text-sm font-bold text-white tracking-tight">
                  {m.value}
                </span>
                <span className="font-mono text-[9px] text-[#94A3B8] uppercase tracking-wider">
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
                className="group/link inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-[#CBD5E1] hover:text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors cursor-pointer shrink-0"
                title={`Visit ${activeWaypoint.websiteLabel || 'official website'}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-medium whitespace-nowrap">
                  {activeWaypoint.websiteLabel || t.visitWebsite}
                </span>
                <ExternalLink className="w-3 h-3 text-[#94A3B8] group-hover/link:text-white transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0" />
              </a>
            ) : (
              <div />
            )}

            {/* Right: Highlighted Case Study Primary Button */}
            <button
              onClick={onOpenDetails}
              className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white text-[#0A0D14] hover:bg-[#0055FF] hover:text-white font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-all duration-300 shadow-[0_2px_12px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_20px_rgba(0,85,255,0.45)] cursor-pointer shrink-0 ml-auto"
            >
              <span className="whitespace-nowrap">{t.readFullCase}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 font-bold">
                →
              </span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Petal Rail (Clean Project Names, Scrollable on Mobile) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-start gap-2 pointer-events-auto text-[10px] sm:text-xs font-mono tracking-[0.12em] sm:tracking-[0.15em] uppercase overflow-x-auto no-scrollbar py-1 shrink-0"
      >
        {PORTFOLIO_WAYPOINTS.map((wp) => {
          const isCurrent = wp.id === activeWaypoint.id;
          return (
            <button
              key={wp.id}
              onClick={() => onSelectWaypoint(wp)}
              className={`transition-all duration-300 flex items-center gap-1.5 sm:gap-2 py-1.5 px-3 sm:py-2 sm:px-4 rounded-full cursor-pointer backdrop-blur-md shrink-0 ${
                isCurrent
                  ? 'bg-white text-black font-bold shadow-xl scale-105'
                  : 'bg-white/10 text-[#CBD5E1] hover:bg-white/20 hover:text-white'
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: wp.accentColor }}
              />
              <span>{wp.title.split(' & ')[0]}</span>
            </button>
          );
        })}
      </motion.div>
    </div>
    );
  }
