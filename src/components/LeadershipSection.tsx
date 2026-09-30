import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
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

  return (
    <div id="chapter-leadership" className="pt-16 sm:pt-24 max-w-6xl mx-auto">
      {/* Chapter Header */}
      <div className="pb-3 mb-8 sm:mb-12 border-b border-white/[0.06]">
        <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight">
          Leadership & Community
        </h2>
      </div>

      {/* Organized & Intuitive Multi-Experience Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {leadershipItems.map((item, idx) => {
          const projectT = TRANSLATIONS[language]?.projects?.[item.id];
          const title = projectT?.title || item.title;
          const role = projectT?.role || item.role;
          const period = projectT?.period || item.period;
          const summary = item.deckSummary || item.story;

          return (
            <div
              key={item.id}
              className="relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider text-neutral-400 uppercase pb-4 mb-4 border-b border-white/[0.06]">
                  <span className="font-semibold text-white truncate">
                    {item.codeTag || 'INITIATIVE'}
                  </span>
                  <span className="shrink-0">{period}</span>
                </div>

                {/* Photo Preview Container (Clickable to open spec) */}
                {item.imageVisual && (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onOpenDetails(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onOpenDetails(item);
                      }
                    }}
                    aria-label={`View details for ${title}`}
                    className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-5 bg-black/60 cursor-pointer group/img focus:outline-none focus:ring-2 focus:ring-white/40"
                  >
                    <img
                      src={item.imageVisual}
                      alt={title}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover/img:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/80 via-transparent to-transparent pointer-events-none" />

                    {/* Subtle Hover Cue */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center gap-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white">
                        View Spec
                      </span>
                      <ArrowRight className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                )}

                {/* Title */}
                <h3 className="font-syne text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug mb-1.5">
                  {title}
                </h3>

                {/* Role */}
                <div className="text-xs font-mono uppercase tracking-wider text-white font-medium mb-3">
                  {role}
                </div>

                {/* Brief Narrative (Visible directly on page without expanding) */}
                <p className="font-sans text-neutral-200 text-sm font-light leading-relaxed mb-6">
                  {summary}
                </p>
              </div>

              <div>
                {/* Frameless Impact Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-3 pb-4 border-t border-white/[0.06] mb-5">
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

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  {item.websiteUrl ? (
                    <a
                      href={item.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 font-mono text-xs text-neutral-300 hover:text-white underline underline-offset-4 decoration-neutral-500 hover:decoration-white transition-colors cursor-pointer"
                      title={`Visit ${item.websiteLabel || 'website'}`}
                    >
                      <span className="font-medium">
                        {item.websiteLabel || 'Official Link'}
                      </span>
                      <ExternalLink className="w-3 h-3 text-neutral-400 group-hover/link:text-white transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={() => onOpenDetails(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md"
                  >
                    <span>View Spec</span>
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
