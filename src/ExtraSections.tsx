import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpiderTheme } from './ThemeContext';
import { useSpiderAudio } from './AudioContext';
import { X, Shield, Zap, Target, Search, FileText, AlertCircle } from 'lucide-react';

export const VillainsGrid: React.FC = () => {
  const { villains, accentColor } = useSpiderTheme();
  const { playHover, playClick } = useSpiderAudio();
  const [selectedVillain, setSelectedVillain] = useState<any>(null);

  return (
    <section className="py-32 px-6 md:px-12 bg-black relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 mb-6 border-b-2 pb-4"
            style={{ borderBottomColor: accentColor }}
          >
            <Search className="w-8 h-8" style={{ color: accentColor }} />
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Database <span className="opacity-40">Access</span>
            </h2>
          </motion.div>
          <p className="text-slate-500 font-mono text-xs tracking-widest uppercase">Unauthorized Access Detected // Tracking Anomalies</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {villains.map((villain, i) => (
            <motion.div
              key={villain.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => { playClick(); setSelectedVillain(villain); }}
              onMouseEnter={playHover}
              className="relative group cursor-pointer"
            >
              {/* Folder Style Border */}
              <div className="absolute -inset-2 border border-white/5 rounded-2xl group-hover:border-white/20 transition-all duration-500" />
              <div className="absolute top-0 right-4 w-12 h-1 bg-white/10 group-hover:w-20 transition-all duration-500" style={{ backgroundColor: villain.name === selectedVillain?.name ? accentColor : undefined }} />

              <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-6 bg-slate-900">
                <img 
                  src={villain.image} 
                  alt={villain.name} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                />
                
                {/* Scanning Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-px bg-cyan-400/50 shadow-[0_0_15px_cyan] opacity-0 group-hover:opacity-100"
                />

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[10px] font-mono tracking-widest text-white/40 mb-1">RECORD_ID: 00{i+1}</div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:italic transition-all">{villain.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedVillain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 50 }}
              className="max-w-5xl w-full bg-slate-950 border border-white/10 rounded-[32px] md:rounded-[40px] overflow-y-auto md:overflow-hidden relative flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.5)] max-h-[90vh] md:max-h-[none]"
            >
              <button 
                onClick={() => setSelectedVillain(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-20 p-2 md:p-3 glass rounded-full hover:bg-white/10 transition"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>

              <div className="w-full md:w-1/2 aspect-video md:aspect-auto relative bg-black shrink-0">
                <img src={selectedVillain.image} className="w-full h-full object-cover opacity-80" alt={selectedVillain.name} />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-transparent to-transparent" />
                
                {/* ID Tag */}
                <div className="absolute top-4 left-4 md:top-8 md:left-8 p-3 md:p-4 glass rounded-xl border border-white/10">
                  <div className="text-[8px] font-mono uppercase opacity-40 mb-1">Threat Level</div>
                  <div className="text-lg md:text-xl font-black text-red-500">CRITICAL</div>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <FileText className="w-4 h-4 md:w-5 md:h-5" style={{ color: accentColor }} />
                  <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: accentColor }}>Confidential Report</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black uppercase mb-6 md:mb-8 tracking-tighter leading-none">{selectedVillain.name}</h3>
                
                <div className="space-y-8 md:space-y-10 flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <AlertCircle className="w-3 h-3 md:w-4 md:h-4 opacity-40" />
                      <h4 className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-40">Intelligence Summary</h4>
                    </div>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
                      {selectedVillain.description}
                    </p>
                  </div>

                  {selectedVillain.powers && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <h4 className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2" style={{ color: accentColor }}>
                          <Zap size={10} className="md:w-3 md:h-3" /> Abilities
                        </h4>
                        <div className="space-y-1.5 md:space-y-2">
                          {selectedVillain.powers.map((p: string) => (
                            <div key={p} className="text-[9px] md:text-[10px] font-mono text-slate-400 border-l border-white/10 pl-3">{p}</div>
                          ))}
                        </div>
                      </div>
                      <div className="hidden sm:block">
                        <h4 className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2" style={{ color: accentColor }}>
                          <Shield size={10} className="md:w-3 md:h-3" /> Countermeasures
                        </h4>
                        <div className="text-[9px] md:text-[10px] font-mono text-slate-500 italic">Analysis Pending...</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 md:mt-12 flex gap-4">
                  <button className="flex-1 py-4 md:py-5 rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ backgroundColor: accentColor }}>
                    Deploy Containment
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export const Timeline: React.FC = () => {
  const { timeline, accentColor } = useSpiderTheme();

  return (
    <section className="py-32 px-6 md:px-12 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-24">
          <div className="text-[10px] font-mono tracking-[0.5em] uppercase opacity-40 mb-4">Temporal Mapping System</div>
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-4 text-center tracking-tighter">
            Multiverse <span style={{ color: accentColor }}>Timeline</span>
          </h2>
          <div className="w-24 h-1 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>

        <div className="relative">
          {/* Central Neural Path */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5">
            <motion.div 
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 -translate-x-1/2 w-1 h-20 blur-sm"
              style={{ backgroundColor: accentColor }}
            />
          </div>
          
          <div className="space-y-32">
            {timeline.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex items-center ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                {/* Neural Node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full border-2 border-slate-900 z-10" style={{ backgroundColor: accentColor }} />
                  <motion.div 
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border border-dashed"
                    style={{ borderColor: accentColor }}
                  />
                </div>
                
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pr-20 text-right' : 'md:pl-20 text-left'}`}>
                  <div className="inline-block p-6 md:p-8 rounded-[24px] md:rounded-[32px] glass border border-white/5 hover:border-white/20 transition-all group w-full">
                    <span className="text-4xl md:text-6xl font-black opacity-10 block mb-2 md:mb-4 group-hover:opacity-20 transition-opacity font-mono">{event.year}</span>
                    <h3 className="text-xl md:text-2xl font-bold uppercase mb-2 md:mb-4 tracking-tighter" style={{ color: accentColor }}>{event.title}</h3>
                    <p className="text-slate-500 text-sm md:text-base font-light leading-relaxed">{event.description}</p>
                    
                    {/* Decorative Link */}
                    <div className={`hidden md:block absolute top-1/2 w-20 h-px bg-white/10 ${i % 2 === 0 ? 'right-0' : 'left-0'}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
