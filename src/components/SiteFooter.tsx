import React, { useState } from 'react';
import { Mail, Linkedin, Github, FileText, ArrowUp, Copy, Check, Compass, Sparkles } from 'lucide-react';
import type { SupportedLanguage } from '../data/translations';

interface SiteFooterProps {
  language: SupportedLanguage;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ language }) => {
  const [copied, setCopied] = useState(false);
  const email = 'kelslin@umich.edu';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isZh = language === 'zh';

  return (
    <footer className="relative z-10 w-full bg-gradient-to-b from-[#050608]/0 via-[#050608]/80 to-[#030406] border-t border-white/[0.06] pt-20 pb-16 px-4 sm:px-8 lg:px-12 overflow-hidden">
      {/* Ambient background glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#FFAA00]/5 via-amber-900/[0.02] to-transparent blur-3xl pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Section: Editorial Headline & Main Call to Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/[0.06]">
          {/* Main Statement */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-400 font-mono text-[11px] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFAA00] animate-pulse" />
              <span>{isZh ? '开放联系 // 2026 夏季产品管理' : 'OPEN FOR COLLABORATION // SUMMER 2026 PM'}</span>
            </div>

            <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight leading-[1.15]">
              {isZh ? (
                <>
                  共同创造具有<br />
                  <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-neutral-400">
                    深度与温度
                  </span>
                  的产品体验。
                </>
              ) : (
                <>
                  Let's build something<br />
                  <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-neutral-400">
                    thoughtful & enduring
                  </span>
                  {' '}together.
                </>
              )}
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base font-light max-w-xl leading-relaxed pt-2">
              {isZh
                ? '专注于 0→1 复杂技术产品、软硬件协同与高同理心用户体验设计。现居密歇根大学安娜堡，欢迎就产品机会、创意构想或创业交流取得联系。'
                : 'Focusing on 0→1 complex technical products, hardware-software telemetry, and high-empathy user experience systems. Based in Ann Arbor, MI — always open to thoughtful discussions, PM opportunities, and new ideas.'}
            </p>

            {/* Direct Communication Channels */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href={`mailto:${email}`}
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#FFAA00] hover:text-black transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] cursor-pointer"
                title={`Send email to ${email}`}
              >
                <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>{isZh ? '发送邮件' : 'Get in Touch'}</span>
                <span className="opacity-60 text-[10px]">↗</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white border border-white/10 hover:border-white/20 font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{isZh ? '已复制邮箱' : 'Copied to Clipboard!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{email}</span>
                  </>
                )}
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white border border-white/10 hover:border-white/20 font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer"
                title="View Resume PDF"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-400" />
                <span>{isZh ? '简历 PDF ↗' : 'Resume PDF ↗'}</span>
              </a>
            </div>
          </div>

          {/* Quick Links & Location Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:pl-8">
            {/* Direct Social Links */}
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FFAA00] font-semibold mb-4">
                {isZh ? '社交与平台' : 'Network'}
              </div>
              <ul className="space-y-3 font-mono text-xs text-neutral-300">
                <li>
                  <a
                    href="https://linkedin.com/in/kel-lin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200 group"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#FFAA00] transition-colors" />
                    <span>LinkedIn</span>
                    <span className="text-[10px] text-neutral-600 group-hover:text-neutral-400 transition-colors">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Kelslin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200 group"
                  >
                    <Github className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#FFAA00] transition-colors" />
                    <span>GitHub</span>
                    <span className="text-[10px] text-neutral-600 group-hover:text-neutral-400 transition-colors">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://afterlife-club.github.io/afterlife-site/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200 group"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#FFAA00] transition-colors" />
                    <span>Afterlife Club</span>
                    <span className="text-[10px] text-neutral-600 group-hover:text-neutral-400 transition-colors">↗</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick In-Page Jumps */}
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FFAA00] font-semibold mb-4">
                {isZh ? '页面导航' : 'Navigation'}
              </div>
              <ul className="space-y-3 font-mono text-xs text-neutral-400">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToAnchor('about')}
                    className="hover:text-white transition-colors duration-200 text-left cursor-pointer"
                  >
                    01 // {isZh ? '关于与个人哲学' : 'Perspective & About'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToAnchor('chapter-ventures')}
                    className="hover:text-white transition-colors duration-200 text-left cursor-pointer"
                  >
                    02 // {isZh ? '产品与精选项目' : 'Ventures & Products'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToAnchor('leadership')}
                    className="hover:text-white transition-colors duration-200 text-left cursor-pointer"
                  >
                    03 // {isZh ? '校园领导力与生态' : 'Campus Leadership'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-[#FFAA00] transition-colors duration-200 cursor-pointer pt-1"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span>{isZh ? '返回顶部' : 'Back to Top'}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="space-y-1">
            <div>
              <span className="text-neutral-400">© 2026 Kelsey Lin</span>
              <span className="mx-2 text-neutral-700">·</span>
              <span>Ann Arbor, MI</span>
              <span className="mx-2 text-neutral-700">·</span>
              <span className="text-neutral-400">University of Michigan</span>
            </div>
            <div className="text-[11px] text-neutral-600">
              {isZh
                ? '采用 React 18、Three.js 与 Tailwind CSS 构建 · 琉璃材质视觉设计'
                : 'Built with React 18, Three.js & Tailwind CSS · Editorial Liuli Glass Craft'}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] text-neutral-400">
              <Compass className="w-3 h-3 text-[#FFAA00]" />
              <span>42.2780° N, 83.7382° W</span>
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
