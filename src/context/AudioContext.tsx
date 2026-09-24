import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleSound: () => void;
  playAudio: () => void;
  pauseAudio: () => void;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  toggleSound: () => {},
  playAudio: () => {},
  pauseAudio: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const userMutedRef = useRef(false);

  const fadeAudio = (targetVolume: number, onComplete?: () => void) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const step = 0.03;
    const intervalTime = 40;

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

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        fadeAudio(0.32);
      })
      .catch((err) => {
        console.warn('Audio playback waiting for user interaction:', err);
      });
  };

  const pauseAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeAudio(0, () => {
      audio.pause();
      setIsPlaying(false);
    });
  };

  const toggleSound = () => {
    if (isPlaying) {
      userMutedRef.current = true;
      pauseAudio();
    } else {
      userMutedRef.current = false;
      playAudio();
    }
  };

  useEffect(() => {
    const audio = new Audio('/ambient-theme.m4a');
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const handleError = () => {
      if (audio.src.includes('.m4a')) {
        audio.src = '/ambient-theme.mp3';
        audio.load();
      }
    };
    audio.addEventListener('error', handleError);

    // 1. Attempt unmuted autoplay immediately on mount
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        fadeAudio(0.32);
      })
      .catch(() => {
        // 2. If browser autoplay policy blocks unmuted audio on 0-click,
        // attach passive one-time listeners so first user interaction starts sound automatically
        const unlockOnFirstInteraction = () => {
          if (userMutedRef.current || !audioRef.current) return;
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              fadeAudio(0.32);
            })
            .catch(() => {});
        };

        window.addEventListener('pointerdown', unlockOnFirstInteraction, { once: true, passive: true });
        window.addEventListener('click', unlockOnFirstInteraction, { once: true, passive: true });
        window.addEventListener('touchstart', unlockOnFirstInteraction, { once: true, passive: true });
        window.addEventListener('keydown', unlockOnFirstInteraction, { once: true, passive: true });
      });

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleSound, playAudio, pauseAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
