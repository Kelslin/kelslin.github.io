import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface AboutSectionProps {
  language?: Language;
  onOpenStory?: () => void;
}

export default function AboutSection({
  language = 'en',
  onOpenStory,
}: AboutSectionProps) {
  const t = TRANSLATIONS[language]?.about || TRANSLATIONS.en.about;

  return (
    <section
      id="about"
      className="relative z-10 w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 flex items-center justify-center pointer-events-auto"
    >
      {/* Editorial Spread Container */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header Line (Consistent Across All Sessions) */}
        <div className="pb-3 mb-8 sm:mb-12 border-b border-white/[0.06]">
          <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight">
            About
          </h2>
        </div>

        {/* Two-Column Haute Editorial Spread — Open, Human-Crafted */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Portrait & Direct Statement */}
          <div className="lg:col-span-5 space-y-8">
            {/* Kelsey Portrait (Natural, No Box, Clean Shadow) */}
            <div className="relative group w-full max-w-[320px] sm:max-w-[360px] mx-auto lg:mx-0">
              <div className="overflow-hidden rounded-3xl bg-black/40 shadow-[0_24px_70px_rgba(0,0,0,0.85)] aspect-[3/4] w-full relative">
                <img
                  src="/portrait.jpg"
                  alt="Kelsey Lin"
                  className="w-full h-full object-cover object-top filter contrast-105 brightness-95 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/90 via-transparent to-black/20 pointer-events-none" />
              </div>
            </div>

            {/* Direct Personal Manifesto (No generic 'Core Philosophy' label) */}
            <div className="max-w-sm sm:max-w-md lg:max-w-none mx-auto lg:mx-0">
              <p className="font-serif italic text-lg sm:text-xl text-neutral-200 font-light leading-relaxed">
                "{t.manifesto}"
              </p>
            </div>

            {/* Direct Action Channels */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="mailto:kelslin@umich.edu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#0055FF] hover:text-white transition-all shadow-lg cursor-pointer"
                title="Send email to kelslin@umich.edu"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{t.getInTouch}</span>
              </a>

              <a
                href="https://linkedin.com/in/kel-lin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer shadow-md"
                title="View LinkedIn Profile"
              >
                <span>LinkedIn ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Pure Editorial Narrative — Frameless & Direct */}
          <div className="lg:col-span-7 space-y-8">
            {/* Headline */}
            <div>
              <h3 className="font-syne text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-[1.1] tracking-tight mb-4">
                Building zero-to-one digital products and intentional physical craft.
              </h3>

              <p className="font-sans text-sm sm:text-base text-neutral-200 font-normal leading-relaxed mt-4">
                I am a Product Manager at the University of Michigan navigating high-ambiguity technical spaces—from real-time EV telemetry on factory floors to clinical neonatal warmers. My approach bridges extreme user listening, systems thinking, and execution momentum.
              </p>
            </div>

            {/* Pure Typographic Editorial Pillars (Frameless, Clean & Flush) */}
            <div className="space-y-6 pt-2">
              <div className="space-y-1.5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                  0→1 Product Architecture & Systems Thinking
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Led cross-functional teams spanning factory-floor hardware telemetry (Luxshare-ICT), clinical medical device intake (Warmilu), and ethical digital legacy systems (Afterlife Club).
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                  Adaptability & User Intuition in Ambiguity
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Moved to the US alone at 13. Navigating unfamiliar cultures independently forged acute room-reading intuition, active listening, and empathy for unspoken human needs.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                  Technical Leadership & Venture Mentorship
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Entrepreneurial Leadership Program (ELP Cohort 2) Fellow, VP of Product Motion, and CFE Peer Advisor guiding 80+ student founders and engineering capstones at Michigan.
                </p>
              </div>
            </div>

            {/* Read More Floating Page Action Trigger */}
            <div className="pt-3">
              <button
                type="button"
                onClick={onOpenStory}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer shadow-md"
              >
                <span>Read Full Background & Photo Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
