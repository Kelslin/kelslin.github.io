import React from 'react';
import { VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function AmbientAudioPlayer() {
  const { isPlaying, toggleSound } = useAudio();

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={toggleSound}
        className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-md shadow-sm border ${
          isPlaying
            ? 'bg-amber-500/15 text-white border-amber-400/50 shadow-[0_0_14px_rgba(255,170,0,0.3)]'
            : 'bg-white/[0.06] hover:bg-white/[0.14] text-neutral-400 hover:text-white border-white/10 hover:border-amber-400/30'
        }`}
        title={
          isPlaying
            ? 'Ambient Soundscape: Playing (Click to mute)'
            : 'Ambient Soundscape: Muted (Click to play piano lo-fi)'
        }
      >
        {isPlaying ? (
          <>
            {/* Animated Equalizer Frequency Bars */}
            <span className="flex items-end gap-0.5 h-2.5 w-2.5 py-0.5">
              <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
              <span className="w-0.5 bg-amber-300 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-2/3" />
              <span className="w-0.5 bg-blue-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-4/5" />
            </span>
            <span className="text-amber-300 font-semibold hidden sm:inline">SOUND [ON]</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3 h-3 text-neutral-400 group-hover:text-amber-400 transition-colors" />
            <span className="text-neutral-400 group-hover:text-white hidden sm:inline">SOUND [OFF]</span>
          </>
        )}
      </button>
    </div>
  );
}
