import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Mail, ExternalLink } from 'lucide-react';
import { PORTFOLIO_WAYPOINTS, Waypoint, LensType, LENS_CONFIG } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';

interface RecruiterIndexModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToWaypoint: (wp: Waypoint) => void;
  language?: Language;
}

export default function RecruiterIndexModal({
  isOpen,
  onClose,
  onJumpToWaypoint,
  language = 'en',
}: RecruiterIndexModalProps) {
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

  const t = TRANSLATIONS[language]?.index || TRANSLATIONS.en.index;
  const lensesList: LensType[] = ['ventures', 'leadership'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050608]/96 backdrop-blur-2xl selection:bg-[#002FA7] selection:text-white pointer-events-auto">
        {/* Fixed Top Exit Bar */}
        <div className="fixed top-4 right-4 sm:top-5 sm:right-10 z-[70] flex items-center gap-3 pointer-events-auto">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-black font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#0055FF] hover:text-white transition-colors shadow-2xl cursor-pointer"
          >
            <span>{t.close}</span>
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
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 sm:pb-6 mb-8 sm:mb-12 border-b border-white/10 gap-4">
            <div>
              <h2 className="font-syne text-xl sm:text-2xl md:text-3xl text-white font-bold tracking-tight">
                {t.title}
              </h2>
              <p className="text-xs font-mono text-[#94A3B8] tracking-wider mt-1">
                {t.experienceSection} · Ventures & Leadership
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="mailto:kelslin@umich.edu"
                className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 text-white font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] hover:bg-white/20 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#0055FF]" />
                <span>kelslin@umich.edu ↗</span>
              </a>
            </div>
          </div>

          {/* Grouped by Lens Perspectives */}
          <div className="space-y-12 sm:space-y-16">
            {lensesList.map((lens) => {
              const config = LENS_CONFIG[lens];
              const lensWaypoints = PORTFOLIO_WAYPOINTS.filter((w) => w.lens === lens);

              return (
                <div key={lens} className="space-y-4">
                  {/* Lens Header */}
                  <div className="flex items-baseline justify-between pb-2 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF]" />
                      <h3 className="font-syne text-base sm:text-lg text-white font-semibold uppercase tracking-wider">
                        {config.label}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hidden sm:inline">
                      {config.tagline}
                    </span>
                  </div>

                  {/* Waypoint Rows */}
                  <div className="space-y-3 sm:space-y-4">
                    {lensWaypoints.map((wp) => {
                      const projectT =
                        TRANSLATIONS[language]?.projects[wp.id] ||
                        TRANSLATIONS.en.projects[wp.id];
                      const title = projectT?.title || wp.title;
                      const role = projectT?.role || wp.role;
                      const period = projectT?.period || wp.period;
                      const story = projectT?.story || wp.story;
                      const deckSummary = projectT?.deckSummary || wp.deckSummary || story;

                      return (
                        <div
                          key={wp.id}
                          onClick={() => {
                            onClose();
                            onJumpToWaypoint(wp);
                          }}
                          className="group flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] transition-all cursor-pointer border border-white/[0.04] hover:border-white/10"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: wp.accentColor }}
                              />
                              <h4 className="font-syne text-base sm:text-lg text-white font-semibold group-hover:text-blue-300 transition-colors">
                                {title}
                              </h4>
                              <span className="text-[10px] sm:text-[11px] font-mono text-[#94A3B8]">
                                · {period}
                              </span>
                            </div>

                            <div className="text-xs font-mono text-[#0055FF] tracking-wider uppercase pl-5">
                              {role}
                            </div>

                            <p className="text-xs font-sans text-[#D8ECF8]/75 font-light pl-5 max-w-2xl leading-relaxed">
                              {deckSummary.split('. ')[0] + (deckSummary.includes('. ') ? '.' : '')}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 md:self-center pl-5 md:pl-0 shrink-0">
                            <div className="hidden lg:flex items-center gap-2.5">
                              {wp.metrics.slice(0, 2).map((m, idx) => (
                                <div
                                  key={idx}
                                  className="px-2.5 py-1 rounded-xl bg-white/[0.04] text-right"
                                >
                                  <div className="font-syne text-xs font-bold text-white">
                                    {m.value}
                                  </div>
                                  <div className="font-mono text-[8px] text-[#94A3B8] uppercase tracking-wider">
                                    {m.label}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="flex items-center gap-2.5">
                              {wp.websiteUrl && (
                                <a
                                  href={wp.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.14] text-[10px] font-mono text-[#94A3B8] hover:text-white transition-all cursor-pointer shadow-sm border border-white/[0.06] hover:border-white/20"
                                  title={`Visit ${wp.websiteLabel || 'official website'}`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  <span>{wp.websiteLabel}</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}

                              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.15em] text-[#D8ECF8] group-hover:text-[#FFAA00] transition-colors">
                                <span>{t.viewProject || 'View Project'}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAA00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 text-xs font-mono text-[#94A3B8] tracking-[0.2em] uppercase border-t border-white/10 mt-12">
            <div>Ann Arbor, MI · University of Michigan</div>
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
