import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, X, SkipForward, SkipBack } from 'lucide-react';
import { useSpiderTheme } from './ThemeContext';
import { useSpiderAudio } from './AudioContext';

interface VideoPlayerProps {
  src: string;
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onClose }) => {
  const { accentColor } = useSpiderTheme();
  const { playHover, playClick } = useSpiderAudio();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      playClick();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = (Number(e.target.value) / 100) * videoRef.current!.duration;
    videoRef.current!.currentTime = time;
    setProgress(Number(e.target.value));
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      playClick();
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
    playClick();
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-xl p-2 md:p-10"
      onMouseMove={handleMouseMove}
    >
      {/* Global Close Button (Always visible) */}
      <button 
        onClick={onClose}
        onMouseEnter={playHover}
        className="fixed top-4 right-4 md:top-8 md:right-8 z-[120] p-3 md:p-4 glass rounded-full text-white hover:bg-red-500 transition-all shadow-2xl"
      >
        <X size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Background HUD Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-white/20 to-transparent" />
        <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,6px_100%]" />
      </div>

      <div className="relative w-full max-w-6xl aspect-video rounded-[32px] overflow-hidden group shadow-2xl border border-white/10 glass">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          autoPlay
          playsInline
        />

        {/* Center Play Button (Visible when paused) */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full glass flex items-center justify-center text-white shadow-2xl">
                <Play size={32} className="md:w-[48px] md:h-[48px] ml-1 md:ml-2" fill="currentColor" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Controls Overlay */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-x-0 bottom-0 p-4 md:p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
            >
              {/* Progress Bar */}
              <div className="relative w-full h-1 md:h-1.5 bg-white/10 rounded-full mb-4 md:mb-8 group/progress cursor-pointer">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <motion.div 
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ backgroundColor: accentColor, width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform" style={{ backgroundColor: accentColor }} />
                </motion.div>
                <div className="absolute top-0 left-0 h-full bg-white/20 rounded-full w-full pointer-events-none" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-6">
                  <button 
                    onClick={togglePlay}
                    onMouseEnter={playHover}
                    className="p-2 md:p-3 rounded-full glass hover:bg-white/20 transition-all text-white"
                  >
                    {isPlaying ? <Pause size={18} className="md:w-6 md:h-6" fill="currentColor" /> : <Play size={18} className="md:w-6 md:h-6" fill="currentColor" />}
                  </button>
                  
                  <div className="hidden sm:flex items-center gap-4">
                    <button onMouseEnter={playHover} onClick={() => videoRef.current!.currentTime -= 10} className="text-white/60 hover:text-white transition"><SkipBack size={20} /></button>
                    <button onMouseEnter={playHover} onClick={() => videoRef.current!.currentTime += 10} className="text-white/60 hover:text-white transition"><SkipForward size={20} /></button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} onMouseEnter={playHover} className="text-white">
                      {isMuted ? <VolumeX size={16} className="md:w-5 md:h-5" /> : <Volume2 size={16} className="md:w-5 md:h-5" />}
                    </button>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      value={volume}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setVolume(v);
                        if (videoRef.current) videoRef.current.volume = v;
                      }}
                      className="w-12 md:w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
                      style={{ accentColor: accentColor }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                  <div className="text-[7px] md:text-[10px] font-mono tracking-widest text-white/40 uppercase hidden sm:block">
                    Stark Interface // Video Protocol 04
                  </div>
                  <button onClick={handleFullscreen} onMouseEnter={playHover} className="text-white/60 hover:text-white transition">
                    <Maximize size={16} className="md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative HUD corners */}
      <div className="absolute top-10 left-10 w-32 h-32 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: `${accentColor}44` }} />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: `${accentColor}44` }} />
    </motion.div>
  );
};

