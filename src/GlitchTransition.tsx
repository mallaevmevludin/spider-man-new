import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const GlitchTransition: React.FC<{ trigger: any }> = ({ trigger }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    setIsGlitching(true);
    const timer = setTimeout(() => setIsGlitching(false), 500);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <AnimatePresence>
      {isGlitching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] pointer-events-none overflow-hidden"
        >
          {/* Glitch Slices */}
          <div className="absolute inset-0 bg-white/5 mix-blend-overlay" />
          
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: '-100%' }}
              animate={{ 
                x: ['-100%', '100%'],
                y: [`${i * 10}%`, `${i * 10}%`],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 0.2, 
                delay: Math.random() * 0.3,
                ease: "easeInOut"
              }}
              className="absolute h-px w-full bg-cyan-400 shadow-[0_0_10px_cyan]"
              style={{ top: `${i * 10}%` }}
            />
          ))}

          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`block-${i}`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                y: [Math.random() * 100, Math.random() * 100],
                scaleX: [1, 2, 1]
              }}
              transition={{ duration: 0.1, delay: Math.random() * 0.2 }}
              className="absolute w-40 h-20 bg-red-500/20 mix-blend-screen"
            />
          ))}

          {/* Color Shift Overlay */}
          <motion.div
            animate={{ 
              backgroundColor: ['transparent', 'rgba(255,0,0,0.1)', 'rgba(0,255,255,0.1)', 'transparent']
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

