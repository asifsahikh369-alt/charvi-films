import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Upcoming({ session }) {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleNotify = (e) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* 1. Global Navbar */}
      <Navbar session={session} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex flex-col items-center justify-center">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[11px] tracking-[0.3em] uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>CONFIDENTIAL // OFFICIAL SLATE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
            Upcoming <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              Theatrical Feature
            </span>
          </h1>

          <p className="mt-4 text-zinc-400 font-mono text-xs sm:text-sm tracking-wider uppercase">
            Charvi Films presents the upcoming commercial mass-entertainer.
          </p>
        </div>

        {/* --- BLURRED POSTER SHOWCASE CARD --- */}
        <div className="relative w-full max-w-xl mx-auto rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 shadow-[0_0_80px_rgba(245,158,11,0.15)] group">
          
          {/* Poster Image Container */}
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-black flex items-center justify-center">
            
            {/* The Movie Poster with Permanent Blur Effect */}
            <img 
              src="/nikal-padi-poster.jpg" 
              alt="Charvi Films Upcoming Theatrical Feature"
              className="w-full h-full object-cover object-center transform blur-2xl scale-110 opacity-75 select-none pointer-events-none"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />

            {/* Director Viewfinder Framing Marks */}
            <div className="absolute inset-6 pointer-events-none opacity-60">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-400" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-400" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-400" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-400" />
            </div>

            {/* Top Badge: Status */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-400">
              <span className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                PROJ: CONFIDENTIAL SLATE
              </span>
              <span className="bg-amber-500/20 text-amber-400 border border-amber-400/40 px-3 py-1.5 rounded-full font-bold">
                POST-PRODUCTION
              </span>
            </div>

            {/* Center Lock Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
              <span className="text-xs font-mono tracking-[0.4em] text-amber-400 uppercase mb-3">
                CHARVI FILMS PRESENTS
              </span>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-zinc-300 font-mono text-xs uppercase tracking-widest">
                🔒 TOP SECRET // TITLE UNDER WRAPS
              </div>
            </div>

            {/* Bottom Floating Marquee: COMING SOON IN CINEMAS */}
            <div className="absolute bottom-8 left-6 right-6 z-20">
              <div className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-black text-center text-sm sm:text-lg tracking-[0.25em] uppercase shadow-[0_0_40px_rgba(245,158,11,0.5)] transform hover:scale-[1.02] transition-transform">
                🎬 COMING SOON IN CINEMAS
              </div>
            </div>

          </div>

          {/* Project Details Footer */}
          <div className="p-6 bg-zinc-950 border-t border-white/10 text-center font-mono">
            <div className="flex justify-around items-center text-xs text-zinc-400 border-b border-white/5 pb-4 mb-4">
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">Format</span>
                <span className="text-white font-semibold">Theatrical Feature</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">Audio</span>
                <span className="text-white font-semibold">Dolby Atmos</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">Language</span>
                <span className="text-white font-semibold">Hindi</span>
              </div>
            </div>

            {/* Email Alert Signup */}
            <div className="mt-2">
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider mb-3">
                Get notified when the Official Trailer & Release Date drop:
              </p>
              
              {emailSubmitted ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  ✓ You are on the VIP First-Look screening list.
                </div>
              ) : (
                <form onSubmit={handleNotify} className="flex gap-2 max-w-sm mx-auto">
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl bg-black border border-white/15 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 font-sans"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors"
                  >
                    Alert Me
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* 2. Global Footer */}
      <Footer />

    </div>
  );
}
