// src/pages/UnderMaintenance.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wrench, ShieldAlert, ArrowLeft, Mail, Film, Sparkles } from 'lucide-react';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function UnderMaintenance({ session }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-indigo-500 selection:text-white relative flex flex-col justify-between">
      <Navbar session={session} />

      <main className="max-w-4xl mx-auto px-6 pt-36 pb-20 relative z-10 w-full text-center space-y-10 select-none">
        
        {/* Ambient Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 font-mono text-xs text-amber-500 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full uppercase tracking-widest"
        >
          <Wrench className="w-3.5 h-3.5 animate-spin text-amber-500" />
          <span>[SYSTEM NODE UNDER MAINTENANCE // CALIBRATING]</span>
        </motion.div>

        {/* Headline & Description */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-foreground">
            SECTION UNDER MAINTENANCE
          </h1>
          <p className="font-mono text-xs sm:text-sm text-muted-foreground uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
            This operational module is currently undergoing system upgrades & pipeline optimization to bring you enhanced 8K cinema tools.
          </p>
        </motion.div>

        {/* REQUIRED SPECIFIC THANK YOU BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 sm:p-10 rounded-3xl bg-indigo-950/20 dark:bg-indigo-950/40 border border-indigo-500/30 shadow-2xl relative overflow-hidden font-mono space-y-4 max-w-2xl mx-auto"
        >
          <div className="flex justify-center items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>STUDIO ANNOUNCEMENT</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black uppercase text-foreground tracking-wider">
            Thanks for your patience – Charvi Films
          </h2>

          <p className="text-xs text-muted-foreground font-sans font-light">
            Our principal photography, client portal, and main reel archive remain 100% active. You can continue browsing our live showcase or reach out directly to our production line.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs pt-4"
        >
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-foreground text-background font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO MAIN STREAM</span>
          </Link>

          <a
            href="mailto:sarvansharma14@gmail.com"
            className="w-full sm:w-auto px-8 py-3.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground font-bold uppercase tracking-widest rounded-xl hover:border-indigo-500 transition-all flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-indigo-400" />
            <span>EMAIL PRODUCTION LINE</span>
          </a>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
