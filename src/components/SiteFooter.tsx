import React from 'react';
import type { SupportedLanguage } from '../data/translations';

interface SiteFooterProps {
  language: SupportedLanguage;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ language }) => {
  const isZh = language === 'zh';

  return (
    <footer className="relative z-10 w-full border-t border-white/[0.06] py-16 sm:py-20 px-4 sm:px-8 lg:px-12 bg-[#050608] select-none">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        {/* Title */}
        <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight">
          {isZh ? '共同创造' : "Let's build together"}
        </h2>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-mono text-xs sm:text-sm text-neutral-400">
          <a
            href="https://linkedin.com/in/kel-lin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/Kelslin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            GitHub ↗
          </a>
          <a
            href="mailto:kelslin@umich.edu"
            className="hover:text-white transition-colors duration-200"
          >
            Email ↗
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFAA00] hover:text-[#FFC043] transition-colors duration-200"
          >
            {isZh ? '请求简历 ↗' : 'Request Resume ↗'}
          </a>
        </div>

        {/* Location & School */}
        <div className="pt-2 font-mono text-xs text-neutral-500">
          Ann Arbor, MI · University of Michigan
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
