import React, { useState } from 'react';
import { Mail, Sparkles, ChevronDown, ChevronUp, Compass, Cpu, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, TRANSLATIONS } from '../data/translations';

interface AboutSectionProps {
  language?: Language;
}

export default function AboutSection({ language = 'en' }: AboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = TRANSLATIONS[language]?.about || TRANSLATIONS.en.about;

  return (
    <section
      id="about"
      className="relative z-10 w-full py-12 sm:py-18 px-4 sm:px-8 lg:px-12 flex items-center justify-center pointer-events-auto"
    >
      {/* Editorial Spread Container */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header Stamp (Frameless, No Border) */}
        <div className="flex items-center justify-between pb-2 mb-8 sm:mb-12">
          <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-mono tracking-[0.22em] text-[#0055FF] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse" />
            <span className="font-semibold">{t.badge}</span>
            <span className="text-white/20">·</span>
            <span className="text-neutral-400">PERSPECTIVE & BACKGROUND</span>
          </div>

          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest hidden sm:inline">
            University of Michigan
          </span>
        </div>

        {/* Two-Column Haute Editorial Spread — Open, Human-Crafted, No Box Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Portrait & Identity Profile (Open & Frameless) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Kelsey Portrait (Soft Natural Caustics, No Stiff Box) */}
            <div className="relative group w-full max-w-[320px] sm:max-w-[360px] mx-auto lg:mx-0">
              <div className="overflow-hidden rounded-3xl bg-black/40 shadow-[0_24px_70px_rgba(0,0,0,0.85)] aspect-[3/4] w-full relative">
                <img
                  src="/portrait.jpg"
                  alt="Kelsey Lin"
                  className="w-full h-full object-cover object-top filter contrast-105 brightness-95 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/90 via-transparent to-black/20 pointer-events-none" />

                {/* Location Badge on Photo */}
                <div className="absolute bottom-3 left-3 right-3 text-center sm:text-left px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-[9px] font-mono tracking-[0.16em] text-white uppercase pointer-events-none shadow-md">
                  {t.location}
                </div>
              </div>
            </div>

            {/* Core Philosophy Quote (Open Editorial Typography) */}
            <div className="max-w-sm sm:max-w-md lg:max-w-none mx-auto lg:mx-0 pt-2">
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#FFAA00] uppercase tracking-widest mb-2 font-semibold">
                <Sparkles className="w-3 h-3 text-[#FFAA00]" />
                <span>Core Philosophy</span>
              </div>
              <p className="font-serif italic text-base sm:text-lg text-white font-light leading-relaxed">
                "{t.manifesto}"
              </p>
            </div>

            {/* Direct Action Channels (Resume removed) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="mailto:kelslin@umich.edu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#0055FF] hover:text-white transition-all shadow-lg cursor-pointer"
                title="Send email to kelslin@umich.edu"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{t.getInTouch}</span>
              </a>

              <a
                href="https://linkedin.com/in/kel-lin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs uppercase tracking-[0.12em] backdrop-blur-md transition-all cursor-pointer shadow-md"
                title="View LinkedIn Profile"
              >
                <span>LinkedIn ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Pure Editorial Narrative — Frameless, No Boxes */}
          <div className="lg:col-span-7 space-y-6">
            {/* Headline */}
            <div>
              <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-[1.08] tracking-tight mb-3 drop-shadow-md">
                {t.title} <br />
                <span className="font-serif italic font-light frosted-quartz-text">
                  {t.subtitle}
                </span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-neutral-200 font-normal leading-relaxed mt-4">
                I am a Product Manager and 0→1 builder at the University of Michigan, focused on bridging hardware, software, and AI to turn ambiguous technical challenges into intuitive, human-centered products.
              </p>
            </div>

            {/* Pure Typographic Editorial Pillars (No Box Cards) */}
            <div className="space-y-6 pt-3">
              {/* 01 */}
              <div className="space-y-1.5">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-xs text-[#0055FF] font-bold tracking-widest">01</span>
                  <span className="text-white/20 text-xs">/</span>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                    0→1 Product Builder & Systems Thinker
                  </h3>
                </div>
                <p className="pl-6 text-sm text-neutral-300 font-light leading-relaxed">
                  Led cross-functional engineering and design spanning assembly telemetry dashboards (Luxshare), infant phase-change incubators (Warmilu), and AI legacy platforms (Afterlife Club).
                </p>
              </div>

              {/* 02 */}
              <div className="space-y-1.5">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-xs text-[#67E8F9] font-bold tracking-widest">02</span>
                  <span className="text-white/20 text-xs">/</span>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                    Resilience & Adaptability in Ambiguity
                  </h3>
                </div>
                <p className="pl-6 text-sm text-neutral-300 font-light leading-relaxed">
                  Moved to the US alone at 13; forged high adaptability, room-reading intuition, and deep empathy for unspoken user needs across high-complexity cross-cultural environments.
                </p>
              </div>

              {/* 03 */}
              <div className="space-y-1.5">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-xs text-[#FFAA00] font-bold tracking-widest">03</span>
                  <span className="text-white/20 text-xs">/</span>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                    Craft, Discipline & Community Leadership
                  </h3>
                </div>
                <p className="pl-6 text-sm text-neutral-300 font-light leading-relaxed">
                  14-year classical violinist, Richard Collins Arts Fellow, and CFE Peer Advisor mentoring 80+ student entrepreneurs and engineering teams at Michigan.
                </p>
              </div>
            </div>

            {/* Read More Details Expandable Toggle Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 cursor-pointer shadow-md"
                aria-expanded={isExpanded}
                aria-controls="about-expanded-story"
              >
                <span>{isExpanded ? 'Hide Detailed Story' : 'Read More Details & Stories'}</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                )}
              </button>
            </div>

            {/* Expandable In-Depth Personal Essays */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  id="about-expanded-story"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden pt-4 space-y-6"
                >
                  {/* Story 01 */}
                  <div className="space-y-1.5">
                    <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-[#0055FF] font-semibold">
                      {t.story1Title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
                      {t.story1Text}
                    </p>
                  </div>

                  {/* Story 02 */}
                  <div className="space-y-1.5">
                    <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-[#67E8F9] font-semibold">
                      {t.story2Title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
                      {t.story2Text}
                    </p>
                  </div>

                  {/* Story 03 */}
                  <div className="space-y-1.5">
                    <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-[#FFAA00] font-semibold">
                      {t.story3Title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
                      {t.story3Text}
                    </p>
                  </div>

                  {/* Everyday Disciplines (Frameless) */}
                  <div className="space-y-1.5 pt-2">
                    <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-[#FFAA00] font-semibold">
                      {t.moreTitle}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
                      {t.moreText}
                    </p>
                  </div>

                  {/* Collapse Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsExpanded(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                      <span>Collapse Story</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
