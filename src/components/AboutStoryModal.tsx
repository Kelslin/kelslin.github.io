import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ExternalLink, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface AboutStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

interface PhotoMoment {
  image: string;
  tag: string;
  title: string;
  description: string;
  aspect?: string;
}

const PHOTO_MOMENTS: PhotoMoment[] = [
  {
    image: '/visuals/campus_leadership.jpg',
    tag: 'VENTURE FELLOWSHIP',
    title: 'ELP Cohort 2 Leadership Retreat',
    description:
      'Venture leadership and strategy cohort at the University of Michigan Center for Entrepreneurship (CFE), mentoring student founders on 0→1 validation.',
    aspect: 'aspect-[4/3]',
  },
  {
    image: '/visuals/rich_collins_exhibition.jpg',
    tag: 'ARTS CURATION',
    title: 'Rich Collins Arts Festival Exhibition',
    description:
      'Community exhibition feature highlighting interdisciplinary creative craftsmanship, installations, and student design expression.',
    aspect: 'aspect-[4/3]',
  },
  {
    image: '/visuals/violin_piano.jpg',
    tag: 'MUSICAL DISCIPLINE',
    title: '14 Years of Classical Violin & Ensemble Harmony',
    description:
      'Chamber music performance and acoustic discipline—building the patience, micro-timing, and deep listening that anchors my product management philosophy.',
    aspect: 'aspect-[4/3]',
  },
  {
    image: '/visuals/physical_discipline.jpg',
    tag: 'TACTILE CRAFT',
    title: 'Physical Discipline & Tactile Precision',
    description:
      'Hands-on physical craft, micro-scale precision, and tactile prototyping that deepens my empathy for hardware and human-computer interfaces.',
    aspect: 'aspect-[4/3]',
  },
  {
    image: '/portrait.jpg',
    tag: 'EXECUTIVE PROFILE',
    title: 'Kelsey Lin · Ann Arbor, MI',
    description:
      'Navigating high-ambiguity technical spaces across EV factory floors, clinical medical devices, and generative AI systems.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/visuals/warmilu.jpg',
    tag: 'CLINICAL COLLABORATION',
    title: 'Warmilu Field Deployments & Relief Care',
    description:
      'Working alongside relief clinicians to streamline procurement and patient intake for non-electric neonatal warming devices.',
    aspect: 'aspect-[4/3]',
  },
];

export default function AboutStoryModal({
  isOpen,
  onClose,
  language = 'en',
}: AboutStoryModalProps) {
  const t = TRANSLATIONS[language]?.about || TRANSLATIONS.en.about;

  // Escape key listener & Body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050608]/96 backdrop-blur-2xl selection:bg-[#002FA7] selection:text-white pointer-events-auto">
        {/* Fixed Top Exit Bar */}
        <div className="fixed top-4 sm:top-5 left-4 right-4 sm:left-10 sm:right-10 z-[70] flex items-center justify-between gap-3 pointer-events-auto">
          {/* Header Monospace Stamp */}
          <div className="flex items-center text-[11px] sm:text-xs font-mono tracking-[0.15em] uppercase text-neutral-400">
            <span className="font-semibold text-white">PERSPECTIVE</span>
            <span className="text-white/20 mx-2">·</span>
            <span>EXECUTIVE PROFILE</span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-black font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#0055FF] hover:text-white transition-colors shadow-2xl cursor-pointer"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Backdrop click dismisses */}
        <div
          onClick={onClose}
          className="fixed inset-0 z-0 bg-transparent cursor-pointer"
        />

        {/* Full-Screen Detailed Story Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-10 py-16 sm:py-24 text-[#D8ECF8]"
        >
          {/* Section Category Stamp */}
          <div className="mb-3 text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
            <span className="font-semibold text-white">PERSPECTIVE</span>
            <span className="text-white/20 mx-2">·</span>
            <span>EXECUTIVE PROFILE & STORY</span>
          </div>

          {/* Title */}
          <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] sm:leading-[0.98] mb-3">
            Kelsey Lin
          </h1>

          {/* Role / Discipline */}
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.16em] text-white font-medium mb-3">
            Product Manager · Systems Thinker · University of Michigan
          </div>

          {/* Location & Direct Communication Channels */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10 text-[11px] sm:text-xs font-mono tracking-[0.15em] text-[#94A3B8] uppercase">
            <span>Ann Arbor, MI</span>
            <span className="text-white/20">·</span>
            <a
              href="mailto:kelslin@umich.edu"
              className="inline-flex items-center gap-1.5 text-white hover:text-[#0055FF] transition-colors underline underline-offset-4 decoration-neutral-600 hover:decoration-white cursor-pointer"
            >
              <Mail className="w-3 h-3" />
              <span>kelslin@umich.edu</span>
            </a>
            <span className="text-white/20">·</span>
            <a
              href="https://linkedin.com/in/kel-lin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white hover:text-[#0055FF] transition-colors underline underline-offset-4 decoration-neutral-600 hover:decoration-white cursor-pointer"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Impact Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12 py-3 border-y border-white/[0.08]">
            <div className="flex flex-col">
              <span className="font-syne text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-none">
                13 Yrs
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[#94A3B8] uppercase tracking-[0.14em] mt-2">
                US Independent Arrival & Adaptability
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-syne text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-none">
                80+
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[#94A3B8] uppercase tracking-[0.14em] mt-2">
                Founders Guided (ELP & CFE Mentorship)
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-syne text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-none">
                14 Yrs
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[#94A3B8] uppercase tracking-[0.14em] mt-2">
                Classical Violin & Ensemble Craft
              </span>
            </div>
          </div>

          {/* Personal Manifesto Quote */}
          <div className="pl-5 py-3 mb-10 sm:mb-12 border-l-2 border-white/20 bg-white/[0.02] rounded-r-2xl">
            <p className="font-serif italic text-base sm:text-lg lg:text-xl text-neutral-200 font-light leading-relaxed">
              "{t.manifesto}"
            </p>
          </div>

          {/* Leadership Chapters (The 4 Google APM Foundations) */}
          <div className="space-y-10 sm:space-y-12 mb-16">
            {/* Story 01 */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs sm:text-sm tracking-[0.16em] text-white font-semibold uppercase">
                01 · Observational Intuition in Zero-Guidance Environments
              </h3>
              <p className="font-sans text-neutral-200 text-sm sm:text-base font-light leading-relaxed">
                When I moved from China to the United States alone at 13, I was immersed in an environment where I had to independently decode culture, unspoken expectations, and social dynamics. That formative experience taught me to listen with extreme care—not just to what people say, but to what they hesitate to say. In product management, this has become my core instinct: identifying latent user friction, building trust in zero-guidance environments, and designing for genuine human comfort.
              </p>
            </div>

            {/* Story 02 */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs sm:text-sm tracking-[0.16em] text-white font-semibold uppercase">
                02 · Principled Product Trade-offs: User Trust vs Vanity Hype
              </h3>
              <p className="font-sans text-neutral-200 text-sm sm:text-base font-light leading-relaxed">
                At Afterlife Club, our generative AI legacy platform, we faced a pivotal product decision: whether to build synthetic voice cloning. While voice cloning is a common AI demonstration, our user interviews with grieving families revealed deep emotional unease and fear of the uncanny valley. I made the firm product call to forbid artificial voice cloning and instead anchor the product in reflective daily journaling and family memory vaults. This decision earned a 92% user trust rating and an 88% task completion rate, proving that long-term user safety always beats short-term technological hype.
              </p>
            </div>

            {/* Story 03 */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs sm:text-sm tracking-[0.16em] text-white font-semibold uppercase">
                03 · Ground-Truth Execution: Hardware Telemetry and Clinical Workflows
              </h3>
              <p className="font-sans text-neutral-200 text-sm sm:text-base font-light leading-relaxed">
                I love digging into the physical realities of technology. At Luxshare-ICT, I walked EV assembly lines alongside floor technicians to understand production friction, writing unified bilingual PRDs and Python telemetry scripts across 200 inspection checkpoints to cut operator errors by 30%. At Warmilu, I collaborated directly with relief clinicians and neonatal nurses to overhaul the intake and procurement funnel for non-electric infant incubators, lifting conversion by 20% and reducing triage latency by 40%.
              </p>
            </div>

            {/* Story 04 */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs sm:text-sm tracking-[0.16em] text-white font-semibold uppercase">
                04 · Venture Mentorship, Discipline, and Ensemble Craft
              </h3>
              <p className="font-sans text-neutral-200 text-sm sm:text-base font-light leading-relaxed">
                Beyond product roadmaps, 14 years of classical violin taught me micro-timing, patience under pressure, and how individual voices harmonize into an effortless ensemble. As an ELP Cohort 2 Fellow and CFE Peer Advisor, I bring this same discipline to mentoring 80+ student founders at Michigan—helping them structure hypotheses, prototype rapidly, and build ventures grounded in human need.
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PHOTO GALLERY SPREAD (MORE PHOTOS + UPLOAD SLOTS FOR NEW PHOTOS)           */}
          {/* ========================================================================= */}
          <div className="pt-10 border-t border-white/[0.08]">
            {/* Header Stamp */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-xs sm:text-sm tracking-[0.16em] text-white font-semibold uppercase">
                05 · Photographic Moments & Creative Craft
              </h3>
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider hidden sm:inline">
                Real Moments & Archival Documentation
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light mb-8 max-w-2xl leading-relaxed">
              Candid documentation across campus leadership, arts curation, venture advising, musical performances, and physical craft discipline. Additional archival photos will be uploaded here.
            </p>

            {/* Editorial Multi-Photo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {PHOTO_MOMENTS.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col rounded-3xl overflow-hidden bg-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/[0.06] transition-all duration-300 hover:border-white/20"
                >
                  {/* Photo Container */}
                  <div className={`relative w-full ${item.aspect || 'aspect-[4/3]'} overflow-hidden bg-black/50`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/90 via-transparent to-transparent pointer-events-none" />

                    {/* Tag badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase tracking-wider text-neutral-200">
                      {item.tag}
                    </div>
                  </div>

                  {/* Caption & Context */}
                  <div className="p-5 sm:p-6 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-syne text-lg sm:text-xl font-bold text-white tracking-tight">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Reserved Upload Slot Card (Ready for Kelsey's upcoming uploads) */}
              <div className="relative flex flex-col justify-center items-center p-8 sm:p-10 rounded-3xl border border-dashed border-white/20 bg-white/[0.02] text-center min-h-[260px] group hover:border-white/40 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 text-neutral-300 group-hover:text-white transition-colors">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h4 className="font-syne text-base sm:text-lg font-bold text-white tracking-tight">
                  Upcoming Archival Photos
                </h4>
                <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light max-w-xs mt-2 leading-relaxed">
                  Reserved for new venture documentation, capstone presentations, and team field photos uploading soon.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-neutral-400" />
                  <span>Gallery Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Close Button */}
          <div className="pt-12 sm:pt-16 text-center">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#0055FF] hover:text-white transition-all shadow-xl cursor-pointer"
            >
              <span>Return to Portfolio</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
