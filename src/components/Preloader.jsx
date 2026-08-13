// src/components/Preloader.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Multilingual Brand Translations with Distinct Typographic Styles
const TRANSLATIONS = [
  { text: 'CHARVI FILMS', style: 'font-sans font-black tracking-[0.25em] text-white' },
  { text: 'चारवी फिल्म्स', style: 'font-serif font-semibold tracking-normal text-zinc-200' }, // Hindi: Elegant Serif
  { text: 'चारवी फिल्म्स', style: 'font-sans font-light tracking-widest text-zinc-100 uppercase' }, // Marathi: Ultra Light
  { text: 'சார்வி பிலிம்ஸ்', style: 'font-mono font-extrabold tracking-tight text-white' }, // Tamil: Tech Monospace
  { text: 'చార్వి ఫిల్మ్స్', style: 'font-sans font-bold tracking-wide text-zinc-300' }, // Telugu: Clean Sans
  { text: 'チャーヴィ・フィルムズ', style: 'font-mono font-light tracking-[0.3em] text-zinc-100' }, // Japanese: Futuristic Minimalist
  { text: '차르비 필름', style: 'font-sans font-black tracking-tighter text-white' }, // Korean: Heavy Brutalist
  { text: 'شارفي فيلمز', style: 'font-serif font-medium italic tracking-wider text-zinc-200' }, // Arabic: Elegant Italic Serif
  { text: 'ЧАРВИ ФИЛЬМС', style: 'font-mono font-black tracking-[0.2em] text-zinc-100 uppercase' }, // Russian: Constructivist
  { text: 'ચારવી ફિલ્મ્સ', style: 'font-sans font-semibold tracking-normal text-zinc-300' }, // Gujarati: Soft Sans
  { text: 'ಚಾರ್ವಿ ಫಿಲ್ಮ್ಸ್', style: 'font-serif font-bold tracking-wide text-zinc-200' }, // Kannada: Classic Serif
  { text: 'ചാർവി ഫിലിംസ്', style: 'font-sans font-extrabold tracking-tight text-white' }, // Malayalam: Bold Sans
  { text: 'চারভি ফিল্মস', style: 'font-serif font-light tracking-widest text-zinc-300' }, // Bengali: Artistic Light Serif
  { text: 'CHARVI FILMS', style: 'font-sans font-black tracking-[0.25em] text-white' }, // Final English Lock
];

const curtainEase = [0.76, 0, 0.24, 1];

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Fast, lag-free text switching (~120ms per language)
  useEffect(() => {
    if (index < TRANSLATIONS.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 120); // Smooth shutter speed
      return () => clearTimeout(timer);
    } else {
      // Hold the final title briefly before parting curtains
      const doneTimer = setTimeout(() => {
        setIsDone(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 550);
      }, 350);
      return () => clearTimeout(doneTimer);
    }
  }, [index, onComplete]);

  const currentItem = TRANSLATIONS[index];

  return (
    <div className="fixed inset-0 z-10000 pointer-events-none flex items-center justify-center overflow-hidden">

      {/* LEFT CURTAIN PANEL */}
      <motion.div
        initial={{ x: 0 }}
        animate={isDone ? { x: '-100%' } : { x: 0 }}
        transition={{ duration: 0.55, ease: curtainEase }}
        className="absolute inset-y-0 left-0 w-1/2 bg-zinc-950 border-r border-white/10 pointer-events-auto flex items-center justify-end pr-4"
      >
        <div className="w-px h-32 bg-linear-to-b from-transparent via-indigo-500/40 to-transparent" />
      </motion.div>

      {/* RIGHT CURTAIN PANEL */}
      <motion.div
        initial={{ x: 0 }}
        animate={isDone ? { x: '100%' } : { x: 0 }}
        transition={{ duration: 0.55, ease: curtainEase }}
        className="absolute inset-y-0 right-0 w-1/2 bg-zinc-950 border-l border-white/10 pointer-events-auto flex items-center justify-start pl-4"
      >
        <div className="w-px h-32 bg-linear-to-b from-transparent via-indigo-500/40 to-transparent" />
      </motion.div>

      {/* CENTER TYPOGRAPHY WITH DYNAMIC FONT SHAPES & STYLES */}
      {!isDone && (
        <div className="relative z-10 flex items-center justify-center text-center px-6 select-none h-20">
          <motion.h1
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.05, ease: 'easeOut' }}
            className={`text-2xl sm:text-4xl md:text-5xl ${currentItem.style}`}
          >
            {currentItem.text}
          </motion.h1>
        </div>
      )}

    </div>
  );
}