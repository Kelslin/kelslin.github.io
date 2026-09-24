import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export function HeroAudioPill() {
  const { isPlaying, toggleSound } = useAudio();

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`group inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border transition-all duration-300 backdrop-blur-md cursor-pointer shadow-lg select-none ${
        isPlaying
          ? 'bg-amber-500/15 border-amber-400/50 text-white shadow-[0_0_24px_rgba(255,170,0,0.35)]'
          : 'bg-white/[0.08] hover:bg-white/[0.16] border-white/20 hover:border-amber-400/60 text-neutral-200 hover:text-white hover:shadow-[0_0_24px_rgba(255,170,0,0.3)]'
      }`}
      title="Listen to ambient piano lo-fi soundtrack by Kelsey Lin"
    >
      {/* Animated Equalizer Sound Bars */}
      <span className="flex items-end gap-1 h-3.5 w-3.5 py-0.5 shrink-0">
        <span
          className={`w-0.5 rounded-full transition-all ${
            isPlaying
              ? 'bg-amber-400 animate-[bounce_0.6s_ease-in-out_infinite] h-full'
              : 'bg-neutral-400 group-hover:bg-amber-400 h-2'
          }`}
        />
        <span
          className={`w-0.5 rounded-full transition-all ${
            isPlaying
              ? 'bg-amber-300 animate-[bounce_0.8s_ease-in-out_infinite_0.2s] h-3/4'
              : 'bg-neutral-400 group-hover:bg-amber-300 h-3'
          }`}
        />
        <span
          className={`w-0.5 rounded-full transition-all ${
            isPlaying
              ? 'bg-blue-400 animate-[bounce_0.5s_ease-in-out_infinite_0.4s] h-full'
              : 'bg-neutral-400 group-hover:bg-blue-400 h-1.5'
          }`}
        />
      </span>
      <span className="font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase font-semibold">
        {isPlaying ? 'Soundtrack: Floating Reflections ♫' : '✦ Experience With Sound (Click to Play)'}
      </span>
    </button>
  );
}

export function FloatingSoundToast() {
  const { isPlaying, toggleSound } = useAudio();

  // Non-intrusive: only show toast when sound is actively playing
  if (!isPlaying) return null;

  return (
    <div className="hidden sm:block fixed bottom-6 left-5 sm:left-12 z-30 pointer-events-auto select-none">
      <button
        type="button"
        onClick={toggleSound}
        className="group flex items-center gap-2 py-1.5 px-3 rounded-full backdrop-blur-xl border border-amber-400/40 bg-[#06080E]/90 text-amber-200 text-[11px] font-mono tracking-wider transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.7)] cursor-pointer hover:border-amber-400/70"
        title="Ambient Sound Playing (Click to pause)"
      >
        <span className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300 text-[10px] shrink-0 group-hover:scale-110 transition-transform">
          ♫
        </span>
        <span className="font-medium whitespace-nowrap">
          Floating Reflections · Lo-Fi Piano
        </span>
        <span className="flex items-end gap-0.5 h-2.5 w-2.5 ml-1">
          <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
          <span className="w-0.5 bg-amber-300 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-2/3" />
          <span className="w-0.5 bg-blue-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-4/5" />
        </span>
      </button>
    </div>
  );
}
