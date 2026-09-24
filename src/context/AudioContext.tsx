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

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const fadeAudio = (targetVolume: number, onComplete?: () => void) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const step = 0.04;
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
        fadeAudio(0.35);
      })
      .catch(() => {
        setIsPlaying(false);
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
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleSound, playAudio, pauseAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
