import React, { useState, useEffect } from 'react';
import { useSpiderTheme } from './ThemeContext';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';
import { WebBackground } from './WebBackground';
import { SuitHUD } from './SuitHUD';
import { VillainsGrid, Timeline } from './ExtraSections';
import { SuitExplorer } from './SuitExplorer';
import { Preloader } from './Preloader';
import { useSpiderAudio } from './AudioContext';
import { MobileMenu } from './MobileMenu';
import { Menu } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';
import { GlitchTransition } from './GlitchTransition';

export default function App() {
  const { theme, setTheme, accentColor, heroImage, title, tagline, description } = useSpiderTheme();
  const { isAudioOn, setIsAudioOn, playThwip, playHover, playClick } = useSpiderAudio();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Smooth scroll
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Auto-play audio on first interaction
    const startAudio = () => {
      setIsAudioOn(true);
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
    window.addEventListener('click', startAudio);
    window.addEventListener('touchstart', startAudio);

    return () => {
      lenis.destroy();
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
  }, [setIsAudioOn]);

  const handlePlayThwip = () => {
    playThwip();
    // SFX Simulation: Flash accent color
    gsap.to(".accent-glow", { opacity: 0.8, duration: 0.1, yoyo: true, repeat: 1 });
  };

  return (
    <div className="relative min-h-screen text-slate-50 overflow-hidden bg-[#020617]">
      <GlitchTransition trigger={theme} />
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <WebBackground />
      <SuitHUD />

      {/* Background with Theme Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={heroImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2 }}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.4), rgba(2, 6, 23, 0.9)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="fixed inset-0 z-0"
        />
      </AnimatePresence>

      <div className="accent-glow fixed inset-0 pointer-events-none z-0 opacity-0 transition-opacity" style={{ background: `radial-gradient(circle at center, ${accentColor}33 0%, transparent 70%)` }} />

      {/* Navbar */}
      <nav className="fixed w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm md:backdrop-blur-none">
        <div className="flex items-center space-x-4 group cursor-pointer" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          onMouseEnter={playHover}
        >
          <div className="w-10 h-10 rounded-sm flex items-center justify-center font-black italic text-xl transition-all group-hover:scale-110 shadow-[0_0_20px_rgba(0,0,0,0.5)]" style={{ backgroundColor: accentColor }}>S</div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter uppercase leading-none">Spider-Man</span>
            <span className="text-[8px] font-mono tracking-[0.3em] uppercase opacity-40">Multiverse Hub</span>
          </div>
        </div>
        <div className="hidden lg:flex space-x-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          {['story', 'suit', 'villains', 'timeline'].map((id) => (
            <a 
              key={id}
              href={`#${id}`} 
              onMouseEnter={playHover} 
              className="hover:text-white transition-all relative group"
            >
              {id === 'story' ? 'History' : id === 'suit' ? 'Tech' : id === 'villains' ? 'Enemies' : 'Legacy'}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 transition-all group-hover:w-full" style={{ backgroundColor: accentColor }} />
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-6">
          <a 
            href="https://wa.me/79094843001"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="hidden md:block glass px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-xl"
          >
            Get Tickets
          </a>
          <button 
            className="lg:hidden glass p-3 rounded-xl"
            onClick={() => { playClick(); setIsMobileMenuOpen(true); }}
            onMouseEnter={playHover}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <section id="story" className="relative z-20 min-h-screen flex items-center pt-20 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          key={theme}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-current opacity-20" style={{ color: accentColor }} />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.5em]" style={{ color: accentColor }}>{tagline}</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black mb-8 uppercase tracking-tighter leading-[1.1] md:leading-[0.9] mix-blend-difference">
            {title.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                <span className="inline-block hover:italic transition-all duration-500 cursor-default">
                  {word === 'Человек-паук:' ? <span style={{ color: accentColor }}>{word}</span> : word}
                </span>
                {' '}
                {word === 'Человек-паук:' && <br />}
              </React.Fragment>
            ))}
          </h1>

          <div className="tech-border max-w-xl" style={{ borderLeftColor: accentColor }}>
            <p className="text-slate-400 text-lg md:text-xl mb-12 font-light leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onMouseEnter={playHover}
                onClick={() => { 
                  handlePlayThwip(); 
                  setIsTrailerOpen(true); 
                  setIsAudioOn(false); // Pause background music when trailer starts
                }}
                className="group relative px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] flex items-center overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                style={{ backgroundColor: accentColor }}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                <Play className="w-4 h-4 mr-3 fill-current group-hover:scale-110 transition-transform" /> 
                Launch Trailer
              </button>
              
              <div className="flex items-center gap-4 px-8 py-5 rounded-full border border-white/10 font-mono text-[10px] tracking-widest uppercase opacity-60">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                Release: H2 2026
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Unique Sections */}
      <SuitExplorer />
      <div id="villains"><VillainsGrid /></div>
      <div id="timeline"><Timeline /></div>

      {/* Theme Switcher */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 md:gap-6 scale-75 md:scale-100">
        {['mcu', 'tobey', 'andrew'].map((t) => (
          <button
            key={t}
            onMouseEnter={playHover}
            onClick={() => { setTheme(t as any); handlePlayThwip(); }}
            className={`w-14 h-14 rounded-full border-2 transition-all p-1 group ${theme === t ? 'scale-125' : 'border-white/20 hover:border-white/50'}`}
            style={{ borderColor: theme === t ? accentColor : undefined }}
          >
            <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden relative">
               <img 
                 src={t === 'mcu' ? 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100' : 
                      t === 'tobey' ? 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=100' : 
                      'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=100'} 
                 className={`w-full h-full object-cover transition-all duration-500 ${theme === t ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
               />
            </div>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="fixed left-8 bottom-8 z-50 flex gap-4">
        <button 
          onMouseEnter={playHover}
          onClick={() => { playClick(); setIsAudioOn(!isAudioOn); }}
          className="glass p-4 rounded-full hover:bg-white hover:text-black transition"
        >
          {isAudioOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      {/* Trailer Modal */}
      <AnimatePresence>
        {isTrailerOpen && (
          <VideoPlayer 
            src="/trailer.mp4" 
            onClose={() => {
              setIsTrailerOpen(false);
              if (isAudioOn) {
                // Resume background music if audio was on
                setIsAudioOn(true);
              }
            }} 
          />
        )}
      </AnimatePresence>

      <footer className="py-20 px-6 text-center border-t border-slate-900 bg-black/50 relative z-10">
        <p className="text-slate-500 text-xs tracking-[0.2em] uppercase mb-4">© 2026 MARVEL / SONY PICTURES. Все права защищены.</p>
        <a 
          href="https://wa.me/79094843001" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-40 hover:opacity-100 hover:text-green-500 transition-all"
        >
          Разработано Mevludin Mallaev
        </a>
      </footer>
    </div>
  );
}
