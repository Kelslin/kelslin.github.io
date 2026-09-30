import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, ArrowRight } from 'lucide-react';
import { Waypoint, PORTFOLIO_WAYPOINTS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';

interface LeadershipSectionProps {
  onOpenDetails: (waypoint: Waypoint) => void;
  language?: Language;
}

export default function LeadershipSection({
  onOpenDetails,
  language = 'en',
}: LeadershipSectionProps) {
  const leadershipItems = PORTFOLIO_WAYPOINTS.filter((w) => w.lens === 'leadership');
  // Track open accordion items; default to first item open
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (leadershipItems.length > 0) {
      initial[leadershipItems[0].id] = true;
    }
    return initial;
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div id="chapter-leadership" className="pt-16 sm:pt-24 max-w-6xl mx-auto">
      {/* Chapter Header */}
      <div className="pb-3 mb-8 sm:mb-12 border-b border-white/[0.06]">
        <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight">
          Leadership & Community
        </h2>
      </div>

      {/* Accordion Sessions List with Small Visual on the Left (Zero Cards / Zero Decks) */}
      <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {leadershipItems.map((item) => {
          const projectT = TRANSLATIONS[language]?.projects?.[item.id];
          const title = projectT?.title || item.title;
          const role = projectT?.role || item.role;
          const period = projectT?.period || item.period;
          const summary = item.deckSummary || item.story;
          const isOpen = Boolean(openIds[item.id]);

          return (
            <div key={item.id} className="transition-colors duration-200">
              {/* Accordion Header Row */}
              <button
                type="button"
                onClick={() => toggleAccordion(item.id)}
                className="w-full py-5 sm:py-7 flex items-center justify-between gap-4 sm:gap-6 text-left cursor-pointer group focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  {/* Small Visual on the Left */}
                  {item.imageVisual && (
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-neutral-900 border border-white/10 group-hover:border-white/30 transition-all shadow-md">
                      <img
                        src={item.imageVisual}
                        alt={title}
                        className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>
                  )}

                  {/* Main Identity */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
                      <span>{period}</span>
                    </div>
                    <h3 className="font-syne text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-[#67E8F9] transition-colors truncate">
                      {title}
                    </h3>
                    <div className="text-xs sm:text-sm font-mono text-neutral-300 mt-0.5 truncate">
                      {role}
                    </div>
                  </div>
                </div>

                {/* Right Chevron Indicator */}
                <div className="shrink-0 flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/[0.04] group-hover:bg-white/[0.08] flex items-center justify-center border border-white/10 transition-colors">
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-300 group-hover:text-white transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#67E8F9]' : ''
                      }`}
                    />
                  </div>
                </div>
              </button>

              {/* Accordion Expandable Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pl-0 sm:pl-24 md:pl-28 pr-2 sm:pr-8 pb-8 pt-1">
                      {/* Narrative Paragraph */}
                      <p className="font-sans text-neutral-200 text-sm sm:text-base font-light leading-relaxed max-w-3xl mb-6">
                        {summary}
                      </p>

                      {/* Frameless Impact Metrics (Pure Editorial Typography) */}
                      {item.metrics && item.metrics.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 py-4 border-t border-b border-white/[0.06] mb-6 max-w-xl">
                          {item.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="flex flex-col">
                              <span className="font-syne text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                                {m.value}
                              </span>
                              <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wider mt-1 leading-tight">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          type="button"
                          onClick={() => onOpenDetails(item)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md"
                        >
                          <span>View Full Spec</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </button>

                        {item.websiteUrl && (
                          <a
                            href={item.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-300 hover:text-white underline underline-offset-4 decoration-neutral-500 hover:decoration-white transition-colors cursor-pointer"
                          >
                            <span>{item.websiteLabel || 'Official Link'}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
