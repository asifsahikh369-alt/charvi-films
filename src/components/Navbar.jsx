// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ShieldCheck, Menu, X } from 'lucide-react';
import { toggleSound, getSoundState, playShutterClick, playHoverTick } from '../utils/audio';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ session }) {
  const location = useLocation();
  const [audioOn, setAudioOn] = useState(getSoundState());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setAudioOn(newState);
    if (newState) playShutterClick();
  };

  const closeMobileMenu = () => {
    playShutterClick();
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'WORK', path: '/work' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CLIENTS', path: '/clients' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 bg-zinc-950/85 backdrop-blur-md border-b border-white/10 font-mono text-xs select-none">
        <div className="max-w-full mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              onClick={playShutterClick}
              onMouseEnter={playHoverTick}
              className="flex items-center gap-2.5 font-black tracking-widest text-white hover:text-indigo-400 transition-colors uppercase text-sm group -ml-3 sm:-ml-6 -mb-3 self-end"
            >
              {/* Golden Charvi Films Logo */}
              <img 
                src="/charvi-logo.png" 
                alt="Charvi Films Logo" 
                className="h-11 sm:h-12 max-h-11 sm:max-h-12 w-auto shrink-0 object-contain filter drop-shadow-[0_0_10px_rgba(234,179,8,0.4)] group-hover:scale-105 transition-transform duration-300"
              />

              <div className="flex flex-col pb-2 sm:pb-2.5">
                <span className="leading-none text-white tracking-widest font-black">CHARVI FILMS</span>
                <span className="text-[8px] text-amber-400 tracking-[0.25em] font-mono leading-tight mt-0.5">STUDIO</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={playShutterClick}
                  onMouseEnter={playHoverTick}
                  className={`transition-all duration-300 tracking-widest text-[11px] uppercase ${
                    isActive
                      ? 'text-white font-bold border-b-2 border-indigo-500 pb-0.5'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.name} //
                </Link>
              );
            })}
          </div>

          {/* Right Controls: Audio Toggle, Theme Toggle, Portal & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle */}
            <ThemeToggle variant="inline" />

            {/* Audio Toggle Button */}
            <button
              onClick={handleSoundToggle}
              onMouseEnter={playHoverTick}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] uppercase tracking-wider transition-all ${
                audioOn
                  ? 'bg-indigo-950/50 border-indigo-500/40 text-indigo-300'
                  : 'bg-black/40 border-white/10 text-zinc-500 hover:text-zinc-300'
              }`}
              title="Toggle UI Audio Micro-Interactions"
            >
              {audioOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline">SOUND: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="hidden sm:inline">SOUND: OFF</span>
                </>
              )}
            </button>

            {/* Portal Button (Desktop) */}
            <div className="hidden sm:block">
              {session ? (
                <Link
                  to="/admin"
                  onClick={playShutterClick}
                  onMouseEnter={playHoverTick}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-[10px] uppercase tracking-wider"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>TERMINAL</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={playShutterClick}
                  onMouseEnter={playHoverTick}
                  className="text-zinc-400 hover:text-white text-[10px] uppercase tracking-widest border border-white/10 hover:border-indigo-500/50 px-3 py-1.5 rounded-full bg-black/40 transition-colors"
                >
                  PORTAL ↗
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => {
                playShutterClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-xl bg-zinc-900 border border-white/10 text-white hover:text-indigo-400 transition-colors"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </nav>

      {/* FULL SCREEN MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-2xl md:hidden pt-24 px-6 pb-8 flex flex-col justify-between font-mono select-none"
          >
            {/* Mobile Nav Links */}
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-3 flex justify-between items-center text-[10px] text-zinc-500 uppercase tracking-widest">
                <span>[NAVIGATION DIRECTORY]</span>
                <span className="text-indigo-400">CHARVI FILMS // 2026</span>
              </div>

              <div className="flex flex-col gap-4">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={`text-2xl font-black uppercase tracking-wider py-2 border-b border-white/5 flex items-center justify-between transition-colors ${
                        isActive ? 'text-indigo-400' : 'text-zinc-300 hover:text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                      <span className="text-xs font-normal text-zinc-600">0{idx + 1} //</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Footer Portal Access */}
            <div className="pt-6 border-t border-white/10">

              {session ? (
                <Link
                  to="/admin"
                  onClick={closeMobileMenu}
                  className="w-full py-3 bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>OPEN ADMIN TERMINAL</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-xl text-center block"
                >
                  ADMIN PORTAL ACCESS ↗
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}