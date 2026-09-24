import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AmbientAudioPlayerProps {
  audioSrc?: string;
}

export default function AmbientAudioPlayer({
  audioSrc,
}: AmbientAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasFile, setHasFile] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Primary soundscape: /ambient-theme.m4a (AAC/Audio) with /ambient-theme.mp3 fallback
    const initialSrc = audioSrc || '/ambient-theme.m4a';
    const audio = new Audio(initialSrc);
    audio.loop = true;
    audio.volume = 0; // Starts at 0 for smooth fade-in
    audioRef.current = audio;

    // Check if file exists / loads, or fallback to mp3 if needed
    const handleError = () => {
      if (!audioSrc && audio.src.includes('.m4a')) {
        audio.src = '/ambient-theme.mp3';
        audio.load();
        return;
      }
      setHasFile(false);
      setIsPlaying(false);
    };

    audio.addEventListener('error', handleError);

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioSrc]);

  const fadeAudio = (targetVolume: number, onComplete?: () => void) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const step = 0.05;
    const intervalTime = 40; // ~400ms total fade duration

    fadeIntervalRef.current = window.setInterval(() => {
      if (!audioRef.current) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }

      const current = audioRef.current.volume;
      if (Math.abs(current - targetVolume) < step) {
        audioRef.current.volume = targetVolume;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        if (onComplete) onComplete();
      } else if (current < targetVolume) {
        audioRef.current.volume = Math.min(1, current + step);
      } else {
        audioRef.current.volume = Math.max(0, current - step);
      }
    }, intervalTime);
  };

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      fadeAudio(0, () => {
        audio.pause();
        setIsPlaying(false);
      });
    } else {
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasFile(true);
          fadeAudio(0.32); // Soft 32% volume for gentle ambient background
        })
        .catch(() => {
          // Handled gracefully if browser blocked or file missing
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={toggleSound}
        className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-md shadow-sm border ${
          isPlaying
            ? 'bg-white/15 text-white border-blue-400/40 shadow-[0_0_12px_rgba(0,85,255,0.25)]'
            : 'bg-white/[0.06] hover:bg-white/[0.12] text-neutral-400 hover:text-white border-white/10'
        }`}
        title={
          isPlaying
            ? 'Ambient Soundscape: Playing (Click to mute)'
            : hasFile
            ? 'Ambient Soundscape: Muted (Click to play)'
            : 'Drop ambient-theme.mp3 into public/ to activate soundtrack'
        }
      >
        {isPlaying ? (
          <>
            {/* Animated Equalizer Frequency Bars */}
            <span className="flex items-end gap-0.5 h-2.5 w-2.5 py-0.5">
              <span className="w-0.5 bg-blue-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
              <span className="w-0.5 bg-cyan-300 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-2/3" />
              <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-4/5" />
            </span>
            <span className="text-blue-300 font-semibold hidden sm:inline">SOUND [ON]</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors" />
            <span className="text-neutral-400 group-hover:text-white hidden sm:inline">SOUND [OFF]</span>
          </>
        )}
      </button>
    </div>
  );
}
