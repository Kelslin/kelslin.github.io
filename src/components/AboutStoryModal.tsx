import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface AboutStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreWorks: () => void;
  language?: Language;
}

export default function AboutStoryModal({
  isOpen,
  onClose,
  language = 'en',
}: AboutStoryModalProps) {
  const t = TRANSLATIONS[language]?.about || TRANSLATIONS.en.about;

  // Bulletproof Escape key listener to exit anytime
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050608]/96 backdrop-blur-2xl selection:bg-[#002FA7] selection:text-white pointer-events-auto">
        {/* Fixed Top Exit Bar - ALWAYS visible regardless of scroll */}
        <div className="fixed top-4 right-4 sm:top-5 sm:right-10 z-[70] flex items-center gap-3 pointer-events-auto">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-black font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#0055FF] hover:text-white transition-colors shadow-2xl cursor-pointer"
          >
            <span>{t.close}</span>
            <span className="text-[10px] opacity-60 hidden sm:inline">[ESC]</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Backdrop click dismisses */}
        <div
          onClick={onClose}
          className="fixed inset-0 z-0 bg-transparent cursor-pointer"
        />

        {/* Modal Editorial Spread */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-10 py-14 sm:py-20 text-[#D8ECF8]"
        >
          {/* Top Category Stamp */}
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[#94A3B8] uppercase pb-3 sm:pb-4 mb-6 sm:mb-10">
            <span className="text-[#0055FF]">✦</span>
            <span>{t.badge}</span>
            <span className="text-white/20">/</span>
            <span className="text-[#67E8F9]">KELSEY LIN</span>
          </div>

          {/* Two-Column Editorial Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            {/* Left Column: Portrait & Manifesto (Fully Adaptive Aspect Ratio) */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              {/* Kelsey Portrait: Native 3:4 aspect container shrinks proportionately on all screen sizes */}
              <div className="relative group w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] mx-auto">
                <div className="overflow-hidden rounded-2xl bg-white/[0.02] shadow-2xl aspect-[3/4] w-full">
                  <img
                    src="/portrait.webp"
                    alt="Kelsey Lin"
                    className="w-full h-full object-cover object-top filter contrast-105 brightness-95 group-hover:brightness-100 transition-all duration-500 ease-out"
                  />
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-center sm:text-left px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[8px] sm:text-[9px] font-mono tracking-[0.18em] text-[#D8ECF8] uppercase shadow-md pointer-events-none">
                  {t.location}
                </div>
              </div>

              {/* Personal Manifesto Quote */}
              <div className="pl-4 py-2 border-l border-[#0055FF]/40 bg-white/[0.02] rounded-r-xl max-w-sm sm:max-w-md lg:max-w-none mx-auto">
                <p className="font-serif italic text-sm sm:text-base lg:text-lg text-[#D8ECF8] font-light leading-snug">
                  "{t.manifesto}"
                </p>
              </div>
            </div>

            {/* Right Column: Conversational Human Narrative */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7 pr-0 lg:pr-2">
              <div>
                <h1 className="font-syne text-2xl sm:text-4xl lg:text-5xl text-white font-bold leading-[1.12] sm:leading-[1.05] tracking-tight mb-4 sm:mb-6">
                  {t.title} <br />
                  <span className="font-serif italic font-light frosted-quartz-text">
                    {t.subtitle}
                  </span>
                </h1>
              </div>

              {/* Human Narrative Blocks in Complete Sentences */}
              <div className="space-y-4 sm:space-y-5 text-xs sm:text-sm font-sans text-[#D8ECF8]/85 font-light leading-relaxed">
                <div>
                  <h3 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#0055FF] font-semibold mb-1.5">
                    {t.story1Title}
                  </h3>
                  <p>{t.story1Text}</p>
                </div>

                <div>
                  <h3 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#67E8F9] font-semibold mb-1.5">
                    {t.story2Title}
                  </h3>
                  <p>{t.story2Text}</p>
                </div>

                <div>
                  <h3 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#FFAA00] font-semibold mb-1.5">
                    {t.story3Title}
                  </h3>
                  <p>{t.story3Text}</p>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                <a
                  href="mailto:kelslin@umich.edu"
                  className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-black font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#0055FF] hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{t.getInTouch}</span>
                </a>

                <a
                  href="https://linkedin.com/in/kel-lin"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 text-white font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] hover:bg-white/20 transition-colors"
                >
                  <span>{t.essays}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Authentic Personal Foundations (Zero boxes, zero borders) */}
          <div className="mt-10 sm:mt-14 pt-4 sm:pt-6">
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FFAA00] mb-2 sm:mb-3 font-semibold">
              {t.moreTitle}
            </div>
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#D8ECF8]/80 font-light leading-relaxed max-w-3xl">
              {t.moreText}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
