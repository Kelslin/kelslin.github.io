import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Waypoint, LENS_CONFIG } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';

interface ProjectScrollCardProps {
  waypoint: Waypoint;
  index: number;
  onOpenDetails: (wp: Waypoint) => void;
  language?: Language;
}

export default function ProjectScrollCard({
  waypoint,
  index,
  onOpenDetails,
  language = 'en',
}: ProjectScrollCardProps) {
  const projectT =
    TRANSLATIONS[language]?.projects[waypoint.id] ||
    TRANSLATIONS.en.projects[waypoint.id];

  const title = projectT?.title || waypoint.title;
  const role = projectT?.role || waypoint.role;
  const period = projectT?.period || waypoint.period;
  const story = projectT?.story || waypoint.story;
  const deckSummary = projectT?.deckSummary || waypoint.deckSummary || story;
  const t = TRANSLATIONS[language]?.macro || TRANSLATIONS.en.macro;

  const lensConfig = LENS_CONFIG[waypoint.lens];
  const isEven = index % 2 === 0;

  return (
    <div
      id={`project-${waypoint.id}`}
      data-project-index={index}
      data-project-id={waypoint.id}
      className="project-scroll-section py-14 sm:py-20 lg:py-24 flex items-center justify-center pointer-events-auto relative z-10 w-full"
    >
      {/* Expansive "Whole View" Editorial Spread */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center ${
            isEven ? '' : 'lg:grid-flow-dense'
          }`}
        >
          {/* 1. Visual Hero Photograph (Frameless with Natural Shadows) */}
          <div
            className={`w-full ${
              isEven ? 'lg:col-span-6' : 'lg:col-span-6 lg:col-start-7'
            }`}
          >
            {waypoint.imageVisual && (
              <div
                role="button"
                tabIndex={0}
                onClick={() => onOpenDetails(waypoint)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenDetails(waypoint);
                  }
                }}
                aria-label={`Open case specification for ${title}`}
                className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.85)] group/visual bg-black/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 transition-shadow duration-300 hover:shadow-[0_35px_90px_rgba(0,0,0,0.95)]"
              >
                <img
                  src={waypoint.imageVisual}
                  alt={title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover/visual:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/90 via-transparent to-black/20 pointer-events-none" />

                {/* Subtle Hover Affordance */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover/visual:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white">
                    View Spec
                  </span>
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
          </div>

          {/* 2. Expansive Haute Editorial Typography (Frameless & Open, No Box) */}
          <div
            className={`w-full space-y-5 sm:space-y-6 ${
              isEven ? 'lg:col-span-6' : 'lg:col-span-6 lg:col-start-1'
            }`}
          >
            {/* Header Stamp */}
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
              <span className="font-semibold text-white">{lensConfig?.label || waypoint.lens}</span>
              <span className="text-white/20">·</span>
              <span>{period}</span>
            </div>

            {/* Title */}
            <h3 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.08]">
              {title}
            </h3>

            {/* Role (Clean White Typography) */}
            <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-white font-medium">
              {role}
            </div>

            {/* Human Narrative */}
            <p className="font-sans text-neutral-200 text-sm sm:text-base font-light leading-relaxed max-w-xl">
              {deckSummary}
            </p>

            {/* Frameless Impact Metrics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-2 pb-1 max-w-lg">
              {waypoint.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col justify-start">
                  <span className="font-syne text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                    {m.value}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider mt-1 leading-tight">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {waypoint.websiteUrl && (
                <a
                  href={waypoint.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 font-mono text-xs text-neutral-300 hover:text-white underline underline-offset-4 decoration-neutral-500 hover:decoration-white transition-colors cursor-pointer"
                  title={`Visit ${waypoint.websiteLabel || 'official website'}`}
                >
                  <span className="font-medium whitespace-nowrap">
                    {waypoint.websiteLabel || t.visitWebsite}
                  </span>
                  <ExternalLink className="w-3 h-3 text-neutral-400 group-hover/link:text-white transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              )}

              <button
                type="button"
                onClick={() => onOpenDetails(waypoint)}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg"
              >
                <span>
                  {waypoint.lens === 'ventures' ? t.readFullCase : 'View Case Spec'}
                </span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
