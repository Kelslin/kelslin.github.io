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
    <div id="chapter-leadership" className="pt-14 sm:pt-18 md:pt-22 pb-4 sm:pb-6 max-w-6xl mx-auto scroll-mt-24">
      {/* Chapter Header */}
      <div className="pb-3 mb-8 sm:mb-10 border-b border-white/[0.06] flex items-baseline justify-between">
        <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight">
          Leadership
        </h2>
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#FFAA00] uppercase font-semibold">
          03 // Roster & Community
        </span>
      </div>

      {/* Expanded Rows (Without Lines Between, Generous Breathing Room) */}
      <div className="space-y-5 sm:space-y-6">
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
                {/* Organization Brand Logo Badge on the Left */}
                <LeadershipLogoBadge id={item.id} />

                {/* Main Identity & Narrative Body */}
                <div className="min-w-0 flex-1">
                  {/* Period Tag */}
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.18em] text-[#94A3B8] uppercase mb-1.5">
                    <span>{period}</span>
                  </div>

                  {/* Title & Role */}
                  <h3 className="font-syne text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#FFAA00] transition-colors">
                    {title}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-[#FFAA00]/90 font-medium tracking-wide mt-1">
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

const MichiganBlockM = ({ className = "w-7 sm:w-8 h-auto" }: { className?: string }) => (
  <svg viewBox="0 0 100 75" className={className}>
    <path
      d="M 6 10 h 20 v 8 h -6 v 39 h 6 v 8 h -20 v -8 h 6 v -39 h -6 z 
         M 74 10 h 20 v 8 h -6 v 39 h 6 v 8 h -20 v -8 h 6 v -39 h -6 z 
         M 26 10 h 11 l 13 25 l 13 -25 h 11 l -19 36 v 20 h -10 v -20 z"
      fill="#FFCB05"
    />
  </svg>
);

function LeadershipLogoBadge({ id }: { id: string }) {
  switch (id) {
    case 'product_motion':
      return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-white border border-white/20 group-hover:border-white/40 transition-all flex items-center justify-center p-2.5 sm:p-3 shadow-lg">
          <img
            src="/visuals/logos/product_motion.png"
            alt="Product Motion"
            className="w-full h-full object-contain filter contrast-105"
            loading="lazy"
          />
        </div>
      );
    case 'cfe_advising':
      return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-[#00274C] border border-[#FFCB05]/30 group-hover:border-[#FFCB05]/60 transition-all flex items-center justify-center p-2 sm:p-2.5 shadow-lg">
          <img
            src="/visuals/logos/entr_minor.png"
            alt="Entrepreneurship Minor (CFE)"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      );
    case 'elp_fellowship':
      return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-[#00274C] border border-[#FFCB05]/30 group-hover:border-[#FFCB05]/60 transition-all flex items-center justify-center p-2.5 sm:p-3 shadow-lg">
          <img
            src="/visuals/logos/cfe.png"
            alt="Center for Entrepreneurship (CFE)"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      );
    case 'mpowered_career_fair':
      return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-white border border-white/20 group-hover:border-white/40 transition-all flex items-center justify-center p-2 sm:p-2.5 shadow-lg">
          <img
            src="/visuals/logos/mpowered.png"
            alt="MPowered Entrepreneurship"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      );
    case 'si201_ia':
      return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-[#00274C] border border-[#FFCB05]/30 group-hover:border-[#FFCB05]/60 transition-all flex items-center justify-center shadow-lg">
          <img
            src="/visuals/logos/umsi.png"
            alt="School of Information (UMSI)"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      );
    case 'campus_tech_consultant':
      return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-[#00274C] border border-[#FFCB05]/30 group-hover:border-[#FFCB05]/60 transition-all flex items-center justify-center shadow-lg">
          <img
            src="/visuals/logos/its.png"
            alt="Information and Technology Services (ITS)"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      );
    default:
      return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-[#00274C] border border-[#FFCB05]/30 flex items-center justify-center shadow-lg">
          <MichiganBlockM />
        </div>
      );
  }
}
