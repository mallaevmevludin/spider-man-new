import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpiderTheme } from './ThemeContext';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { accentColor } = useSpiderTheme();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING SYSTEMS...');

  const statuses = [
    'CONNECTING TO MULTIVERSE...',
    'SYNCING STARK TECH PROTOCOLS...',
    'ANALYZING BIOMETRIC DATA...',
    'CALIBRATING WEB-SHOOTERS...',
    'ACCESSING NEURAL INTERFACE...',
    'READY'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        const next = prev + Math.random() * 15;
        return next > 100 ? 100 : next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const statusIndex = Math.min(
      Math.floor((progress / 100) * statuses.length),
      statuses.length - 1
    );
    setStatus(statuses[statusIndex]);
  }, [progress]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Scanning Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>

      <div className="relative w-80 md:w-96">
        {/* Logo/Icon Area */}
        <motion.div
          animate={{ 
            boxShadow: [
              `0 0 20px ${accentColor}33`,
              `0 0 40px ${accentColor}66`,
              `0 0 20px ${accentColor}33`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 mb-12 mx-auto rounded-sm border-2 flex items-center justify-center font-black italic text-4xl"
          style={{ borderColor: accentColor, color: accentColor }}
        >
          S
        </motion.div>

        {/* Status Text */}
        <div className="mb-4 flex justify-between items-end">
          <span className="text-[10px] font-mono tracking-widest" style={{ color: accentColor }}>
            {status}
          </span>
          <span className="text-xl font-mono font-bold" style={{ color: accentColor }}>
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full absolute left-0 top-0"
            style={{ backgroundColor: accentColor, width: `${progress}%` }}
          />
          {/* Scanning pulse */}
          <motion.div
            animate={{ left: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </div>

        {/* Tech Accents */}
        <div className="mt-8 flex justify-between gap-4 opacity-40">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-px bg-slate-700 relative">
              <motion.div
                animate={{ height: ['0%', '100%', '0%'] }}
                transition={{ duration: 1 + i * 0.2, repeat: Infinity }}
                className="w-full absolute bottom-0"
                style={{ backgroundColor: accentColor }}
              />
            </div>
          ))}
          <div className="flex-1 text-[8px] font-mono text-slate-500 leading-tight">
            DECRYPTING MULTIVERSE SIGNATURES...<br />
            TARGET: EARTH-616, EARTH-1610, EARTH-96283<br />
            ENCRYPTION: 2048-BIT STARK-LEVEL
          </div>
        </div>
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </motion.div>
  );
};

