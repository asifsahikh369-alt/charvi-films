// src/components/PageTransition.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Physical cinematic camera shutter momentum easing
const shutterEase = [0.76, 0, 0.24, 1];

export default function PageTransition({ children }) {
  return (
    <div className="relative w-full min-h-screen">

      {/* 🎬 1. TOP ANAMORPHIC SHUTTER BLADE */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: shutterEase }}
        style={{ originY: 0 }}
        className="fixed top-0 left-0 right-0 h-1/2 bg-[#09090b] z-[9999] pointer-events-none border-b border-amber-500/35 flex flex-col justify-end items-center pb-2 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.95)]"
      >
        {/* Top Gold Anamorphic Lens Streak */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-90 shadow-[0_0_20px_rgba(245,158,11,0.8)]" />
        
        {/* Top Viewfinder HUD Meta */}
        <div className="flex items-center gap-6 font-mono text-[9px] text-amber-400/70 uppercase tracking-[0.35em] mb-1 select-none">
          <span>[CHARVI FILMS // ANAMORPHIC SHUTTER]</span>
          <span>CAM_01 // 24.00 FPS</span>
        </div>
      </motion.div>

      {/* 🎬 2. BOTTOM ANAMORPHIC SHUTTER BLADE */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: shutterEase }}
        style={{ originY: 1 }}
        className="fixed bottom-0 left-0 right-0 h-1/2 bg-[#09090b] z-[9999] pointer-events-none border-t border-amber-500/35 flex flex-col justify-start items-center pt-2 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.95)]"
      >
        {/* Bottom Gold Anamorphic Lens Streak */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-90 shadow-[0_0_20px_rgba(245,158,11,0.8)]" />

        {/* Bottom Viewfinder HUD Meta */}
        <div className="flex items-center gap-6 font-mono text-[9px] text-amber-400/70 uppercase tracking-[0.35em] mt-1 select-none">
          <span>RAW // LOG-C3</span>
          <span className="flex items-center gap-1.5 text-red-500 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            REC ▶ 00:00:24:18
          </span>
        </div>
      </motion.div>

      {/* 🎬 3. CENTER LENS CROSSHAIR RETICLE */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 1.1 }}
        exit={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-amber-400/45" />
          <div className="absolute h-full w-[1px] bg-amber-400/45" />
          <div className="w-7 h-7 rounded-full border border-amber-400/65 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,1)]" />
          </div>
        </div>
      </motion.div>

      {/* 🎬 4. PAGE CONTENT REVEAL (Clean Opacity Fade Only - Leaves Scroll & Stacking Context Unchanged) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>

    </div>
  );
}