import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpiderTheme } from './ThemeContext';
import { useSpiderAudio } from './AudioContext';
import { Shield, Zap, Target, Cpu, Layers, Terminal } from 'lucide-react';

export const SuitExplorer: React.FC = () => {
  const { suitSpecs, accentColor, heroImage, theme } = useSpiderTheme();
  const { playHover, playClick } = useSpiderAudio();
  const [activeSpec, setActiveSpec] = useState<string | null>(null);
  const [liveData, setLiveData] = useState<string[]>([]);
  const infoBoxRef = useRef<HTMLDivElement>(null);
  
  const handleSpecClick = (specId: string) => {
    setActiveSpec(prev => prev === specId ? null : specId);
    playClick();
    
    // On mobile, scroll to info box after a short delay to allow state update
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        infoBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  useEffect(() => {
    const lines = [
      "DECRYPTING SUIT ARCHITECTURE...",
      "SCANNING NANOTECH MESH...",
      "CALIBRATING SENSORS...",
      "NEURAL LINK: STABLE",
      "WEB-SHOOTER PRESSURE: OPTIMAL",
      "INTEGRITY: 98.4%",
      "POWER LEVEL: MAXIMUM"
    ];
    
    const interval = setInterval(() => {
      setLiveData(prev => {
        const next = [...prev, lines[Math.floor(Math.random() * lines.length)]];
        return next.slice(-8);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 px-6 md:px-12 bg-black relative overflow-hidden">
      {/* Background HUD Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-4 mb-8">
            <Layers className="w-6 h-6" style={{ color: accentColor }} />
            <span className="text-[10px] font-mono tracking-[0.5em] uppercase opacity-40">System Analysis</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase mb-8 lg:mb-10 leading-none tracking-tighter">
            Suit <br /> <span style={{ color: accentColor }}>Architecture</span>
          </h2>
          
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-12">
            <div className="p-3 md:p-4 glass rounded-xl md:rounded-2xl border border-white/5">
              <div className="text-[7px] md:text-[8px] font-mono uppercase opacity-40 mb-1 md:mb-2">Structure</div>
              <div className="text-[10px] md:text-xs font-bold">Reinforced Polymer</div>
            </div>
            <div className="p-3 md:p-4 glass rounded-xl md:rounded-2xl border border-white/5">
              <div className="text-[7px] md:text-[8px] font-mono uppercase opacity-40 mb-1 md:mb-2">Weight</div>
              <div className="text-[10px] md:text-xs font-bold">1.2 kg</div>
            </div>
          </div>

          <div className="space-y-6 relative" ref={infoBoxRef}>
            <AnimatePresence mode="wait">
              {activeSpec ? (
                <motion.div
                  key={activeSpec}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-6 md:p-10 glass rounded-[24px] md:rounded-[32px] border-l-4 md:border-l-8 shadow-2xl relative overflow-hidden"
                  style={{ borderLeftColor: accentColor }}
                >
                  <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10">
                    <Target size={80} className="md:w-[120px] md:h-[120px]" style={{ color: accentColor }} />
                  </div>
                  
                  <h3 className="text-xl md:text-3xl font-black uppercase mb-4 md:mb-6 tracking-tighter" style={{ color: accentColor }}>
                    {suitSpecs.find(s => s.id === activeSpec)?.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed font-light text-sm md:text-lg">
                    {suitSpecs.find(s => s.id === activeSpec)?.description}
                  </p>
                  
                  <div className="mt-6 md:mt-8 flex gap-3 md:gap-4">
                    <div className="w-8 md:w-12 h-1 bg-white/20 rounded-full" />
                    <div className="w-3 md:w-4 h-1 bg-white/20 rounded-full" style={{ backgroundColor: accentColor }} />
                  </div>
                </motion.div>
              ) : (
                <div className="p-6 md:p-10 border border-white/5 bg-white/[0.02] rounded-[24px] md:rounded-[32px] text-slate-500 italic flex items-center gap-4 md:gap-6">
                  <Cpu className="w-8 h-8 md:w-10 md:h-10 animate-pulse" />
                  <span className="text-[10px] md:text-sm font-mono tracking-widest uppercase">Select component for deep scan...</span>
                </div>
              )}
            </AnimatePresence>

            {/* Live Data Feed */}
            <div className="mt-8 md:mt-12 p-4 md:p-6 rounded-xl md:rounded-2xl bg-black/50 border border-white/5 font-mono text-[7px] md:text-[8px] space-y-1 hidden md:block">
              <div className="flex items-center gap-2 mb-2 text-cyan-400 opacity-60">
                <Terminal size={10} />
                <span className="tracking-[0.2em] uppercase">Live Data Stream</span>
              </div>
              {liveData.map((line, i) => (
                <motion.div
                  key={`${line}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-white/40"
                >
                  {`> ${line}`}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative">
          <div className="relative aspect-[3/4] max-w-lg mx-auto rounded-[32px] md:rounded-[40px] overflow-hidden glass p-4 md:p-6 border border-white/10">
            <img src={heroImage} className="w-full h-full object-cover rounded-[24px] md:rounded-[32px] opacity-60" alt="Suit Detail" />
            
            {/* Interactive Markers */}
            {suitSpecs.map((spec) => (
              <div
                key={spec.id}
                onMouseEnter={() => { if (window.innerWidth >= 1024) { setActiveSpec(spec.id); playHover(); } }}
                onClick={() => handleSpecClick(spec.id)}
                className="absolute w-10 h-10 md:w-12 md:h-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group/marker flex items-center justify-center"
                style={{ top: spec.top, left: spec.left }}
              >
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: accentColor }} />
                <div className={`relative w-8 h-8 md:w-full md:h-full rounded-full border border-white/20 transition-all duration-500 flex items-center justify-center overflow-hidden ${activeSpec === spec.id ? 'scale-125 border-white/60' : 'group-hover/marker:scale-125'}`}>
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                  <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shadow-[0_0_10px_white]" style={{ backgroundColor: accentColor }} />
                  
                  {/* Decorative Crosshair */}
                  <div className={`absolute inset-0 transition-opacity ${activeSpec === spec.id ? 'opacity-100' : 'opacity-0 group-hover/marker:opacity-100'}`}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-1.5 md:h-2" style={{ backgroundColor: accentColor }} />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-1.5 md:h-2" style={{ backgroundColor: accentColor }} />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 md:w-2 h-px" style={{ backgroundColor: accentColor }} />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 md:w-2 h-px" style={{ backgroundColor: accentColor }} />
                  </div>
                </div>
              </div>
            ))}

            {/* Overlay Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
          </div>
          
          {/* Tech Callout */}
          <div className="absolute -bottom-10 -right-10 w-48 p-4 glass rounded-2xl border border-white/10 hidden xl:block">
            <div className="text-[8px] font-mono uppercase opacity-40 mb-2">Scanner Mode</div>
            <div className="text-[10px] font-bold tracking-widest uppercase">Deep Scan v2.4</div>
            <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="h-full" 
                style={{ backgroundColor: accentColor }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
