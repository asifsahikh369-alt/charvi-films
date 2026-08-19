import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, Unlock, Sparkles, Film, Music } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Upcoming({ session }) {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [revealed, setRevealed] = useState({
    feature: false,
    song: false
  });

  const handleNotify = (e) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
    }
  };

  const toggleReveal = (id) => {
    setRevealed((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const projects = [
    {
      id: 'feature',
      type: 'Theatrical Feature',
      title: 'Nikal Padi',
      badge: 'CONFIDENTIAL SLATE',
      status: 'POST-PRODUCTION',
      posterSrc: '/nikal-padi-poster.jpg',
      format: 'Theatrical Feature',
      audio: 'Dolby Atmos',
      language: 'Hindi',
      studio: 'Charvi Films',
      icon: Film,
      actionLocked: '🎬 CLICK TO REVEAL FEATURE POSTER',
      actionRevealed: '🎬 COMING SOON IN CINEMAS — RE-LOCK'
    },
    {
      id: 'song',
      type: 'Upcoming Music Video',
      title: 'Teri Rooh',
      badge: 'CONFIDENTIAL SINGLE',
      status: 'IN PRODUCTION',
      posterSrc: '/teri-rooh-poster.png',
      format: 'Music Video / Single',
      audio: 'Dolby Atmos',
      language: 'Hindi',
      studio: 'Charvi Films',
      icon: Music,
      actionLocked: '🎵 CLICK TO REVEAL SONG POSTER',
      actionRevealed: '🎵 COMING SOON ON ALL PLATFORMS — RE-LOCK'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* 1. Global Navbar */}
      <Navbar session={session} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex flex-col items-center justify-center">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[11px] tracking-[0.3em] uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>CONFIDENTIAL // OFFICIAL SLATE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
            Upcoming <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              Releases & Slate
            </span>
          </h1>

          <p className="mt-4 text-zinc-400 font-mono text-xs sm:text-sm tracking-wider uppercase">
            Charvi Films presents upcoming theatrical feature & music video releases.
          </p>
        </div>

        {/* --- POSTERS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl mx-auto mb-16">
          {projects.map((project) => {
            const isProjectRevealed = revealed[project.id];
            const Icon = project.icon;

            return (
              <div 
                key={project.id}
                className="relative w-full rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 shadow-[0_0_80px_rgba(245,158,11,0.15)] group hover:shadow-[0_0_100px_rgba(245,158,11,0.3)] hover:border-amber-500/40 transition-all duration-500 flex flex-col"
              >
                {/* Poster Container - Clickable Button */}
                <button
                  onClick={() => toggleReveal(project.id)}
                  type="button"
                  aria-label={isProjectRevealed ? `Conceal ${project.title} poster` : `Reveal ${project.title} poster`}
                  className="relative aspect-[2/3] w-full overflow-hidden bg-black flex items-center justify-center cursor-pointer select-none group focus:outline-none focus:ring-2 focus:ring-amber-400/50 border-0 p-0"
                >
                  {/* Poster Image */}
                  <img
                    src={project.posterSrc}
                    alt={`${project.title} Poster`}
                    className={`w-full h-full object-cover object-center transform transition-all duration-700 ease-out ${
                      isProjectRevealed
                        ? 'blur-none scale-100 opacity-100'
                        : 'blur-2xl scale-110 opacity-75 group-hover:scale-105'
                    }`}
                  />

                  {/* Vignette Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-700 ${
                    isProjectRevealed ? 'from-black/85 via-transparent to-black/40' : 'from-black via-black/40 to-black/60'
                  }`} />

                  {/* Reveal Glow shimmer */}
                  {isProjectRevealed && (
                    <motion.div 
                      initial={{ opacity: 0.8, scale: 0.9 }}
                      animate={{ opacity: 0, scale: 1.15 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute inset-0 bg-amber-400/20 pointer-events-none"
                    />
                  )}

                  {/* Viewfinder Framing Marks */}
                  <div className="absolute inset-6 pointer-events-none opacity-60">
                    <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 transition-colors duration-500 ${isProjectRevealed ? 'border-amber-300' : 'border-amber-400'}`} />
                    <div className={`absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 transition-colors duration-500 ${isProjectRevealed ? 'border-amber-300' : 'border-amber-400'}`} />
                    <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 transition-colors duration-500 ${isProjectRevealed ? 'border-amber-300' : 'border-amber-400'}`} />
                    <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 transition-colors duration-500 ${isProjectRevealed ? 'border-amber-300' : 'border-amber-400'}`} />
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-400 z-20">
                    <span className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                      {isProjectRevealed ? <Sparkles className="w-3 h-3 text-amber-400" /> : <Lock className="w-3 h-3 text-amber-400" />}
                      <span>{isProjectRevealed ? `UNLOCKED: ${project.title}` : `PROJ: ${project.badge}`}</span>
                    </span>
                    <span className={`backdrop-blur-md px-3 py-1.5 rounded-full font-bold transition-colors ${
                      isProjectRevealed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-400/40'
                    }`}>
                      {isProjectRevealed ? 'FIRST LOOK' : project.status}
                    </span>
                  </div>

                  {/* Center Interactive Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
                    <AnimatePresence mode="wait">
                      {!isProjectRevealed ? (
                        <motion.div
                          key="locked"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col items-center gap-3"
                        >
                          <span className="text-xs font-mono tracking-[0.4em] text-amber-400 uppercase">
                            CHARVI FILMS PRESENTS
                          </span>

                          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/50 text-white font-mono text-xs uppercase tracking-widest shadow-lg group-hover:border-amber-400 group-hover:scale-105 transition-all">
                            <Lock className="w-4 h-4 text-amber-400 animate-pulse" />
                            <span>CLICK TO REVEAL</span>
                            <Eye className="w-4 h-4 text-amber-400" />
                          </div>

                          <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                            Tap poster to unblur {project.type}
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="revealed"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.4 }}
                          className="absolute top-20 flex flex-col items-center gap-1 pointer-events-none"
                        >
                          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-emerald-500/40 text-emerald-400 font-mono text-[11px] tracking-widest uppercase shadow-md">
                            <Unlock className="w-3.5 h-3.5" />
                            <span>{project.title} UNLOCKED</span>
                            <EyeOff className="w-3.5 h-3.5 ml-1 opacity-70" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom Action Marquee */}
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-black text-center text-xs sm:text-sm tracking-[0.2em] uppercase shadow-[0_0_40px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 transform group-hover:scale-[1.02] transition-transform">
                      <Icon className="w-4 h-4" />
                      <span>{isProjectRevealed ? project.actionRevealed : project.actionLocked}</span>
                    </div>
                  </div>

                </button>

                {/* Project Details Footer */}
                <div className="p-6 bg-zinc-950 border-t border-white/10 text-center font-mono flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-1 flex items-center justify-center gap-2">
                      <Icon className="w-4 h-4 text-amber-400" />
                      <span>{project.title}</span>
                    </h3>
                    <p className="text-[11px] text-amber-400/90 uppercase tracking-widest mb-4">
                      {project.type}
                    </p>

                    <div className="flex justify-around items-center text-xs text-zinc-400 border-t border-b border-white/5 py-3 mb-4">
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase">Format</span>
                        <span className="text-white font-semibold">{project.format}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase">Audio</span>
                        <span className="text-white font-semibold">{project.audio}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase">Studio</span>
                        <span className="text-white font-semibold">{project.studio}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* --- GLOBAL EMAIL ALERT SIGNUP --- */}
        <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-zinc-900/60 border border-white/10 text-center font-mono backdrop-blur-md">
          <p className="text-xs text-zinc-300 uppercase tracking-wider mb-3">
            Get notified when Official Trailers, Songs & Release Dates drop:
          </p>
          
          {emailSubmitted ? (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              ✓ You are on the VIP First-Look screening & release list.
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-white/15 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 font-sans"
              />
              <button 
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Alert Me
              </button>
            </form>
          )}
        </div>

      </main>

      {/* 2. Global Footer */}
      <Footer />

    </div>
  );
}
