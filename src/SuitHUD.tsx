import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSpiderTheme } from './ThemeContext';
import { Activity, Wind, Target, Cpu } from 'lucide-react';

export const SuitHUD: React.FC = () => {
  const { theme, accentColor, hudMetrics } = useSpiderTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dynamicPulse, setDynamicPulse] = useState(hudMetrics.pulse);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    const pulseInterval = setInterval(() => {
      setDynamicPulse(hudMetrics.pulse + Math.floor(Math.random() * 5 - 2));
    }, 1000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(pulseInterval);
    };
  }, [hudMetrics.pulse]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
      <motion.div
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        className="relative w-full h-full p-10"
      >
        {/* HUD Corners */}
        <div className="absolute top-10 left-10 w-24 h-24 border-t border-l opacity-20" style={{ borderColor: accentColor }} />
        <div className="absolute top-10 right-10 w-24 h-24 border-t border-r opacity-20" style={{ borderColor: accentColor }} />
        <div className="absolute bottom-10 left-10 w-24 h-24 border-b border-l opacity-20" style={{ borderColor: accentColor }} />
        <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r opacity-20" style={{ borderColor: accentColor }} />

        {/* Top Left: Biometric Scan */}
        <div className="absolute top-20 md:top-24 left-6 md:left-10 space-y-4 scale-75 md:scale-100 origin-top-left">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4" style={{ color: accentColor }} />
            <div className="text-[10px] font-mono tracking-widest uppercase opacity-60" style={{ color: accentColor }}>Biometrics</div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono">{dynamicPulse}</span>
            <span className="text-[8px] font-mono opacity-40">BPM</span>
          </div>
          <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: ['20%', '80%', '20%'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-full" 
              style={{ backgroundColor: accentColor }} 
            />
          </div>
        </div>

        {/* Top Right: Atmospheric Analysis */}
        <div className="absolute top-20 md:top-24 right-6 md:right-10 text-right space-y-4 scale-75 md:scale-100 origin-top-right">
          <div className="flex items-center justify-end gap-3">
            <div className="text-[10px] font-mono tracking-widest uppercase opacity-60" style={{ color: accentColor }}>Atmosphere</div>
            <Wind className="w-4 h-4" style={{ color: accentColor }} />
          </div>
          <div className="flex items-baseline justify-end gap-2">
            <span className="text-2xl font-black font-mono">{hudMetrics.altitude}</span>
            <span className="text-[8px] font-mono opacity-40">ALT/M</span>
          </div>
          <div className="text-[8px] font-mono opacity-40 uppercase">Pressure: 101.3 kPa</div>
        </div>

        {/* Bottom Left: Neural Sync */}
        <div className="absolute bottom-20 md:bottom-24 left-6 md:left-10 space-y-4 scale-75 md:scale-100 origin-bottom-left hidden sm:block">
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4" style={{ color: accentColor }} />
            <div className="text-[10px] font-mono tracking-widest uppercase opacity-60" style={{ color: accentColor }}>Neural Link</div>
          </div>
          <div className="text-xl font-black font-mono tracking-tighter">SYNC: {hudMetrics.syncRate}%</div>
          <div className="flex gap-1">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                className="w-1.5 h-4"
                style={{ backgroundColor: i < hudMetrics.syncRate / 10 ? accentColor : 'rgba(255,255,255,0.05)' }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Right: Targeting System */}
        <div className="absolute bottom-20 md:bottom-24 right-6 md:right-10 text-right space-y-4 scale-75 md:scale-100 origin-bottom-right hidden sm:block">
          <div className="flex items-center justify-end gap-3">
            <div className="text-[10px] font-mono tracking-widest uppercase opacity-60" style={{ color: accentColor }}>Targeting</div>
            <Target className="w-4 h-4" style={{ color: accentColor }} />
          </div>
          <div className="text-[10px] font-mono opacity-60 uppercase">
            X: {Math.floor(mousePos.x * 100)}<br />
            Y: {Math.floor(mousePos.y * 100)}<br />
            Z: 0.00
          </div>
        </div>

        {/* Center Crosshair (Subtle) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-10 h-px bg-white" />
          <div className="w-px h-10 bg-white" />
          <div className="absolute w-20 h-20 border border-dashed border-white rounded-full animate-spin-slow" />
        </div>
      </motion.div>
    </div>
  );
};
