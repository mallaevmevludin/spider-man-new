import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpiderTheme } from './ThemeContext';
import { useSpiderAudio } from './AudioContext';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { accentColor } = useSpiderTheme();
  const { playHover, playClick } = useSpiderAudio();

  const menuItems = [
    { label: 'История', href: '#story' },
    { label: 'Технологии', href: '#suit' },
    { label: 'Враги', href: '#villains' },
    { label: 'Путь', href: '#timeline' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-[#020617] flex flex-col p-8"
        >
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ 
              backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="flex justify-between items-center mb-20 relative z-10">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center font-black italic" style={{ backgroundColor: accentColor }}>S</div>
              <span className="text-xl font-black tracking-tighter uppercase">Spider-Man</span>
            </div>
            <button 
              onClick={() => { playClick(); onClose(); }}
              onMouseEnter={playHover}
              className="p-2 glass rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-8 relative z-10">
            {menuItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { playClick(); onClose(); }}
                onMouseEnter={playHover}
                className="text-5xl font-black uppercase tracking-tighter hover:italic transition-all inline-block"
                style={{ color: 'white' }}
                whileHover={{ x: 20, color: accentColor }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="mt-auto relative z-10">
            <a 
              href="https://wa.me/79094843001"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { playClick(); onClose(); }}
              onMouseEnter={playHover}
              className="w-full glass py-6 rounded-3xl text-lg font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center"
            >
              Купить билеты
            </a>
            <p className="text-center text-slate-500 mt-8 text-[10px] uppercase tracking-[0.2em]">
              © 2026 MARVEL / SONY PICTURES
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

