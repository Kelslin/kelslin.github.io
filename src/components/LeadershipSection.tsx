import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Waypoint, PORTFOLIO_WAYPOINTS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';

interface LeadershipSectionProps {
  onOpenDetails?: (waypoint: Waypoint) => void;
  language?: Language;
}

export default function LeadershipSection({
  language = 'en',
}: LeadershipSectionProps) {
  const leadershipItems = PORTFOLIO_WAYPOINTS.filter((w) => w.lens === 'leadership');

  return (
    <div id="chapter-leadership" className="pt-20 sm:pt-28 pb-12 max-w-6xl mx-auto">
      {/* Chapter Header */}
      <div className="pb-3 mb-10 sm:mb-14 border-b border-white/[0.06]">
        <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight">
          Leadership & Initiatives
        </h2>
      </div>

      {/* Expanded Rows (Without Lines Between, Generous Breathing Room) */}
      <div className="space-y-6 sm:space-y-8">
        {leadershipItems.map((item) => {
          const projectT = TRANSLATIONS[language]?.projects?.[item.id];
          const title = projectT?.title || item.title;
          const role = projectT?.role || item.role;
          const period = projectT?.period || item.period;
          const summary = item.deckSummary || item.story;

          return (
            <div
              key={item.id}
              id={`project-${item.id}`}
              className="group relative flex flex-col md:flex-row md:items-start justify-between gap-5 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.03] hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4 sm:gap-6 min-w-0 flex-1">
                {/* Small Visual on the Left */}
                {item.imageVisual ? (
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-neutral-900 border border-white/10 group-hover:border-white/25 transition-all shadow-md">
                    <img
                      src={item.imageVisual}
                      alt={title}
                      className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105 filter brightness-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                ) : (
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono text-xs text-white/60">
                    {item.specimenCode || '01'}
                  </div>
                )}

                {/* Main Identity & Narrative Body */}
                <div className="min-w-0 flex-1">
                  {/* Period Tag */}
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1.5">
                    <span>{period}</span>
                  </div>

                  {/* Title & Role */}
                  <h3 className="font-syne text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#67E8F9] transition-colors">
                    {title}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-neutral-300 mt-1">
                    {role}
                  </div>

                  {/* Expanded Narrative Paragraph (No Full Spec or Metrics Needed) */}
                  <p className="font-sans text-neutral-300 text-xs sm:text-sm md:text-base font-light leading-relaxed mt-3.5 max-w-3xl">
                    {summary}
                  </p>
                </div>
              </div>

              {/* Website Attached on the Side If Interested */}
              {item.websiteUrl && (
                <div className="md:shrink-0 pt-1 self-start md:self-auto pl-20 sm:pl-26 md:pl-0">
                  <a
                    href={item.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white text-neutral-300 hover:text-black border border-white/10 hover:border-white font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
                    aria-label={`Visit official website for ${title}`}
                  >
                    <span>{item.websiteLabel || 'Website'}</span>
                    <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
