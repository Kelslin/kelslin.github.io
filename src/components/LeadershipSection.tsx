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
    <div id="chapter-leadership" className="pt-6 sm:pt-8 pb-10 max-w-6xl mx-auto scroll-mt-20">
      {/* Chapter Header */}
      <div className="pb-3 mb-6 sm:mb-8 border-b border-white/[0.06] flex items-baseline justify-between">
        <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight">
          Leadership
        </h2>
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#FFAA00] uppercase font-semibold">
          03 // Roster & Community
        </span>
      </div>

      {/* Expanded Rows (Without Lines Between, Generous Breathing Room) */}
      <div className="space-y-4 sm:space-y-5">
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

function LeadershipLogoBadge({ id }: { id: string }) {
  switch (id) {
    case 'product_motion':
      return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-[#1A150D] to-[#0D0B07] border border-[#FFAA00]/25 group-hover:border-[#FFAA00]/50 transition-all flex flex-col items-center justify-center shadow-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FFAA00] absolute top-2 right-2 animate-pulse" />
          <span className="font-syne font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFAA00] to-[#FF8800]">
            PM
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.16em] uppercase text-[#FFAA00]/80 mt-0.5">
            GUILD
          </span>
        </div>
      );
    case 'cfe_advising':
      return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-[#00274C] border border-[#FFCB05]/30 group-hover:border-[#FFCB05]/60 transition-all flex flex-col items-center justify-center shadow-lg">
          <span className="font-serif font-black text-2xl sm:text-3xl text-[#FFCB05] leading-none">
            M
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.18em] uppercase text-white/90 mt-1">
            CFE
          </span>
        </div>
      );
    case 'elp_fellowship':
      return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-[#0B1528] to-[#040810] border border-[#38BDF8]/25 group-hover:border-[#38BDF8]/50 transition-all flex flex-col items-center justify-center shadow-lg">
          <span className="font-syne font-black text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-white">
            ELP
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.18em] uppercase text-[#38BDF8]/90 mt-0.5">
            FELLOW
          </span>
        </div>
      );
    case 'mpowered_career_fair':
      return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-[#0D1C28] to-[#080E14] border border-[#00F0FF]/30 group-hover:border-[#00F0FF]/60 transition-all flex flex-col items-center justify-center shadow-lg">
          <span className="font-syne font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-white to-[#00F0FF]">
            M⚡
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.14em] uppercase text-[#00F0FF]/80 mt-0.5">
            STARTUP
          </span>
        </div>
      );
    case 'si201_ia':
      return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-[#121624] to-[#070A12] border border-[#818CF8]/25 group-hover:border-[#818CF8]/50 transition-all flex flex-col items-center justify-center shadow-lg">
          <span className="font-mono font-bold text-xs sm:text-sm text-[#818CF8]">
            {'{ SI }'}
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.16em] uppercase text-white/90 mt-1">
            201 · IA
          </span>
        </div>
      );
    case 'campus_tech_consultant':
      return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-[#0F171A] to-[#06090A] border border-[#34D399]/25 group-hover:border-[#34D399]/50 transition-all flex flex-col items-center justify-center shadow-lg">
          <span className="font-mono font-black text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#34D399] to-white">
            ITS_
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.16em] uppercase text-[#34D399]/80 mt-0.5">
            TECH
          </span>
        </div>
      );
    default:
      return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono text-xs text-white/60">
          U-M
        </div>
      );
  }
}
