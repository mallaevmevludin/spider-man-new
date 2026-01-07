import React, { createContext, useContext, useRef, useState, ReactNode } from 'react';

interface AudioContextType {
  isAudioOn: boolean;
  setIsAudioOn: (on: boolean) => void;
  playThwip: () => void;
  playHover: () => void;
  playClick: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Free sound effect URLs (using placeholders that work or simulate with generic sounds)
const SOUNDS = {
  thwip: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Quick swoosh
  hover: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Small click/pop
  click: 'https://assets.mixkit.co/active_storage/sfx/2567/2567-preview.mp3', // Interface click
  ambient: '/theme.mp3' // Peter Parker Theme
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isAudioOn, setIsAudioOn] = useState(true);
  
  const thwipAudio = useRef<HTMLAudioElement | null>(null);
  const hoverAudio = useRef<HTMLAudioElement | null>(null);
  const clickAudio = useRef<HTMLAudioElement | null>(null);
  const ambientAudio = useRef<HTMLAudioElement | null>(null);

  const initAudio = () => {
    if (!thwipAudio.current) {
      thwipAudio.current = new Audio(SOUNDS.thwip);
      hoverAudio.current = new Audio(SOUNDS.hover);
      clickAudio.current = new Audio(SOUNDS.click);
      ambientAudio.current = new Audio(SOUNDS.ambient);
      
      if (ambientAudio.current) {
        ambientAudio.current.loop = true;
        ambientAudio.current.volume = 0.2;
        ambientAudio.current.currentTime = 30;
      }
    }
  };

  const playThwip = () => {
    if (!isAudioOn) return;
    initAudio();
    if (thwipAudio.current) {
      thwipAudio.current.currentTime = 0;
      thwipAudio.current.volume = 0.15;
      thwipAudio.current.play().catch(() => {});
    }
  };

  const playHover = () => {
    if (!isAudioOn) return;
    initAudio();
    if (hoverAudio.current) {
      hoverAudio.current.currentTime = 0;
      hoverAudio.current.volume = 0.1;
      hoverAudio.current.play().catch(() => {});
    }
  };

  const playClick = () => {
    if (!isAudioOn) return;
    initAudio();
    if (clickAudio.current) {
      clickAudio.current.currentTime = 0;
      clickAudio.current.volume = 0.15;
      clickAudio.current.play().catch(() => {});
    }
  };

  const toggleAudio = (on: boolean) => {
    setIsAudioOn(on);
    initAudio();
    if (on) {
      ambientAudio.current?.play().catch(() => {});
    } else {
      ambientAudio.current?.pause();
    }
  };

  return (
    <AudioContext.Provider value={{ isAudioOn, setIsAudioOn: toggleAudio, playThwip, playHover, playClick }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useSpiderAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useSpiderAudio must be used within AudioProvider');
  return context;
};

