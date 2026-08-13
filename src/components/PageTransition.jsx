// src/components/PageTransition.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Easing curve for heavy physical curtain motion
const curtainEase = [0.76, 0, 0.24, 1];

export default function PageTransition({ children }) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* LEFT CURTAIN PANEL */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.65, ease: curtainEase }}
        style={{ originX: 0 }}
        className="fixed inset-y-0 left-0 w-1/2 bg-zinc-950 z-9999 border-r border-white/15 pointer-events-none flex items-center justify-end pr-4"
      >
        {/* Subtle Vertical Accent Line */}
        <div className="w-px h-32 bg-linear-to-b from-transparent via-indigo-500/50 to-transparent" />
      </motion.div>

      {/* RIGHT CURTAIN PANEL */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.65, ease: curtainEase }}
        style={{ originX: 1 }}
        className="fixed inset-y-0 right-0 w-1/2 bg-zinc-950 z-9999 border-l border-white/15 pointer-events-none flex items-center justify-start pl-4"
      >
        {/* Subtle Vertical Accent Line */}
        <div className="w-px h-32 bg-linear-to-b from-transparent via-indigo-500/50 to-transparent" />
      </motion.div>

      {/* PAGE CONTENT REVEAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
      >
        {children}
      </motion.div>

    </div>
  );
}