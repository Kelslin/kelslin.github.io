import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowUpRight, ShieldCheck, Check, Copy } from 'lucide-react';

interface RequestResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestResumeModal({ isOpen, onClose }: RequestResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const email = 'kelslin@umich.edu';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#060709]/92 backdrop-blur-2xl"
        />

        {/* Modal Viewport (Frameless Editorial Card) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-lg p-6 sm:p-8 text-neutral-100 selection:bg-[#002FA7] selection:text-white"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-[#70CFFF]" />
              <span>DIRECT VERIFICATION & PRIVACY</span>
            </div>
            <button
              onClick={onClose}
              className="group flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
            >
              <span>Close</span>
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300 text-amber-400" />
            </button>
          </div>

          {/* Heading */}
          <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-3">
            Request Tailored Résumé
          </h3>

          <p className="font-sans text-sm text-neutral-300 font-light leading-relaxed mb-6">
            To prevent automatic scraper harvesting and ensure teams receive the specific edition tailored to their opportunity (0→1 Founder, Technical PM, or UX Systems), my official PDF is shared directly upon request.
          </p>

          {/* Action Row */}
          <div className="border-t border-b border-white/10 py-5 my-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400 uppercase tracking-wider">Direct Email</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{email}</span>
                <button
                  onClick={handleCopy}
                  className="p-1 text-neutral-400 hover:text-white transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <a
              href={`mailto:${email}?subject=Kelsey%20Lin%20Résumé%20Request&body=Hi%20Kelsey,%0D%0A%0D%0AI%20would%20love%20to%20review%20your%20tailored%20résumé%20for%20a%20Product%20Management%20role.%0D%0A%0D%0ACompany:%0D%0ARole:%0D%0A`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black font-sans text-xs font-semibold uppercase tracking-wider hover:bg-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Request via Email</span>
            </a>
          </div>

          {/* Socials / Secondary */}
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 font-sans">
            <span>Connect on professional network:</span>
            <a
              href="https://www.linkedin.com/in/kelsey-lin/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-white hover:text-amber-300 transition-colors"
            >
              <span>LinkedIn Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0044FF]" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
