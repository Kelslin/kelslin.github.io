import React, { useState } from 'react';
import { VolumeX, Minimize2, Maximize2 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface LeftBottomAudioIndicatorProps {
  isMacroActive?: boolean;
}

export default function LeftBottomAudioIndicator({ isMacroActive = false }: LeftBottomAudioIndicatorProps) {
  const { isPlaying, toggleSound } = useAudio();
  const [isOverviewMinimized, setIsOverviewMinimized] = useState(false);

  // When inside project deck/modals, it is strictly an icon and never expands
  const isMinimized = isMacroActive || isOverviewMinimized;

  return (
    <div className="fixed bottom-3.5 sm:bottom-4 left-3.5 sm:left-6 z-40 pointer-events-auto select-none">
      {isMinimized ? (
        /* ========================================================================= */
        /* 1. PROJECT DECK & MINIMIZED MODE: STRICT ICON ONLY (NO HOVER EXPAND)       */
        /* ========================================================================= */
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={toggleSound}
            className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.6)] cursor-pointer active:scale-95 ${
              isPlaying
                ? 'bg-[#06080E]/90 border-amber-400/50 text-amber-300 shadow-[0_0_18px_rgba(255,170,0,0.3)] hover:border-amber-300'
                : 'bg-[#06080E]/80 hover:bg-[#06080E]/95 border-white/20 hover:border-amber-400/50 text-neutral-400 hover:text-white'
            }`}
            title={
              isPlaying
                ? 'Music On (Click to turn off)'
                : 'Music Off (Click to turn on)'
            }
          >
            {isPlaying ? (
              <span className="flex items-end gap-0.5 h-3 w-3 py-0.5">
                <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
                <span className="w-0.5 bg-amber-300 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-2/3" />
                <span className="w-0.5 bg-blue-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-4/5" />
              </span>
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>

          {/* Only allow expanding on homepage overview if user manually minimized it there; NEVER in deck */}
          {!isMacroActive && isOverviewMinimized && (
            <button
              type="button"
              onClick={() => setIsOverviewMinimized(false)}
              className="ml-1.5 p-1 rounded-full bg-[#06080E]/80 hover:bg-[#06080E]/95 border border-white/15 text-neutral-400 hover:text-white cursor-pointer"
              title="Expand music pill"
            >
              <Maximize2 className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. OVERVIEW HOMEPAGE PILL: CLEAR "MUSIC OFF" / "MUSIC ON"                 */
        /* ========================================================================= */
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleSound}
            className={`group flex items-center gap-2.5 py-1.5 px-3 sm:py-2 sm:px-3.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.6)] cursor-pointer active:scale-95 ${
              isPlaying
                ? 'bg-[#06080E]/90 border-amber-400/40 text-amber-200 shadow-[0_0_24px_rgba(255,170,0,0.25)] hover:border-amber-400/70'
                : 'bg-[#06080E]/80 hover:bg-[#06080E]/95 border-white/15 hover:border-amber-400/40 text-neutral-400 hover:text-white'
            }`}
            title={
              isPlaying
                ? 'Music On (Click to turn off)'
                : 'Music Off (Click to turn on)'
            }
          >
            {isPlaying ? (
              <>
                <span className="flex items-end gap-1 h-3.5 w-3.5 py-0.5 shrink-0">
                  <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
                  <span className="w-0.5 bg-amber-300 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-2/3" />
                  <span className="w-0.5 bg-blue-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-4/5" />
                </span>

                <div className="flex flex-col items-start text-left leading-none">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-amber-300">
                    <span>MUSIC ON</span>
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] text-neutral-400 tracking-wider hidden sm:block mt-0.5">
                    Floating Reflections ♫
                  </span>
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-300 transition-colors shrink-0" />

                <div className="flex flex-col items-start text-left leading-none">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.14em] text-neutral-300 group-hover:text-white">
                    <span>MUSIC OFF</span>
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] text-neutral-500 group-hover:text-neutral-300 tracking-wider hidden sm:block mt-0.5">
                    Click to play
                  </span>
                </div>
              </>
            )}
          </button>

          {/* Minimize Button on Overview */}
          <button
            type="button"
            onClick={() => setIsOverviewMinimized(true)}
            className="p-1.5 rounded-full bg-[#06080E]/80 hover:bg-[#06080E]/95 border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white cursor-pointer transition-colors"
            title="Minimize to icon"
          >
            <Minimize2 className="w-2.5 h-2.5" />
          </button>
        </div>
      )}
    </div>
  );
}
