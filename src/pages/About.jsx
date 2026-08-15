// src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { User, Film, Camera, Award, Sparkles, Cpu, Layers, Disc } from 'lucide-react';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GearArsenal from '../components/GearArsenal';

export default function About({ session }) {
    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black relative">
            <Navbar session={session} />

            <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 relative z-10 space-y-32">

                {/* ========================================================= */}
                {/* SECTION 1: DIRECTOR INFO */}
                {/* ========================================================= */}
                <section id="director" className="relative">
                    {/* Section Header Tag */}
                    <div className="border-b border-white/10 pb-4 mb-12 flex justify-between items-baseline font-mono text-xs text-zinc-400 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-indigo-400" />
                            DIRECTOR ARCHIVE
                        </span>
                        <span>CREATIVE DIRECTION</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left Column: Portrait Frame */}
                        <div className="lg:col-span-5 relative group">
                            <div className="relative aspect-3/4 w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 group-hover:border-indigo-500/50 transition-all duration-500 shadow-2xl">
                                <img
                                    src="/director.jpg"
                                    alt="Director Portrait"
                                    className="w-full h-full object-cover filter grayscale contrast-110 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                                {/* HUD Overlay Metadata */}
                                <div className="absolute bottom-6 left-6 right-6 font-mono text-[10px] text-zinc-300 uppercase tracking-widest space-y-1">
                                    <div className="flex justify-between border-b border-white/20 pb-1">
                                        <span>OWNER & PRODUCER:</span>
                                        <span className="text-indigo-400">SARVAN SHARMA</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>DIRECTOR & CREATIVE HEAD:</span>
                                        <span className="text-indigo-400">SARVAN SHARMA</span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Glow */}
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                        </div>

                        {/* Right Column: Bio & Vision Statement */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="space-y-2">
                                <span className="font-mono text-xs text-indigo-400 uppercase tracking-[0.3em]">
                                    CHARVI FILMS (I) PRIVATE LIMITED //
                                </span>
                                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-white">
                                    SARVAN SHARMA
                                </h1>
                                <p className="font-mono text-xs text-zinc-400 uppercase">
                                    FILM DIRECTOR & CREATIVE HEAD
                                </p>
                            </div>

                            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                                <strong className="text-white font-semibold">Charvi Films</strong> refers to <strong className="text-white font-semibold">Charvi Films (I) Private Limited</strong>, an active non-government registered business entity located in Mumbai, Maharashtra (with registration details near Mira Road & Andheri). Owned, produced, and directed by executive producer <strong className="text-white font-semibold">Sarvan Sharma</strong>, our studio delivers high-impact visual storytelling across regional and national cinema.
                            </p>

                            <blockquote className="p-6 bg-zinc-900/50 border-l-2 border-indigo-500 rounded-r-xl font-mono text-xs text-zinc-300 space-y-2">
                                <p>"Cinema isn't just about capturing light—it's about manipulating shadow to reveal emotion that words cannot reach."</p>
                                <cite className="block text-[10px] text-indigo-400 uppercase tracking-widest">— DIRECTOR'S STATEMENT</cite>
                            </blockquote>

                            {/* Stats & Key Strengths Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 font-mono">
                                <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-1">
                                    <span className="text-2xl font-black text-white">27+</span>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">REELS DIRECTED</p>
                                </div>
                                <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-1">
                                    <span className="text-2xl font-black text-white">4K RAW</span>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">ACQUIRED STANDARD</p>
                                </div>
                                <div className="p-4 bg-black/40 border border-white/10 rounded-xl sm:col-span-1 col-span-2 space-y-1">
                                    <span className="text-2xl font-black text-indigo-400">100%</span>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">IN-HOUSE CREATIVE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================================================= */}
                {/* SECTION 2: PRODUCTION INTRO */}
                {/* ========================================================= */}
                <section id="production" className="relative">
                    {/* Section Header Tag */}
                    <div className="border-b border-white/10 pb-4 mb-12 flex justify-between items-baseline font-mono text-xs text-zinc-400 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <Camera className="w-3.5 h-3.5 text-indigo-400" />
                            STUDIO & PRODUCTION
                        </span>
                        <span>TECHNICAL CAPABILITIES</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Capability 1 */}
                        <div className="p-8 bg-zinc-900/40 border border-white/10 hover:border-indigo-500/50 rounded-2xl transition-all duration-300 space-y-4 group">
                            <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl w-fit text-indigo-400 group-hover:scale-110 transition-transform">
                                <Film className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-wider text-white">
                                PRINCIPAL CINEMATOGRAPHY
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                                Full-scale camera department operation. Utilizing high-dynamic-range cinema platforms, anamorphic glass, and tactical lighting design to deliver IMAX-ready visuals.
                            </p>
                        </div>

                        {/* Capability 2 */}
                        <div className="p-8 bg-zinc-900/40 border border-white/10 hover:border-indigo-500/50 rounded-2xl transition-all duration-300 space-y-4 group">
                            <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl w-fit text-indigo-400 group-hover:scale-110 transition-transform">
                                <Disc className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-wider text-white">
                                POST & COLOR SUITE
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                                In-house DaVinci Resolve color grading suite. Custom film grain emulations, precision color science, and spatial audio mastering tailored to digital and theatrical releases.
                            </p>
                        </div>

                        {/* Capability 3 */}
                        <div className="p-8 bg-zinc-900/40 border border-white/10 hover:border-indigo-500/50 rounded-2xl transition-all duration-300 space-y-4 group">
                            <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl w-fit text-indigo-400 group-hover:scale-110 transition-transform">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-wider text-white">
                                GENERATIVE VISUAL FX
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                                Blending traditional live-action camera work with AI-assisted post-processing, virtual set extensions, and digital background enhancements.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <GearArsenal />
                    </div>
                </section>

                {/* ========================================================= */}
                {/* SECTION 3: PROJECT INTRO */}
                {/* ========================================================= */}
                <section id="projects" className="relative">
                    {/* Section Header Tag */}
                    <div className="border-b border-white/10 pb-4 mb-12 flex justify-between items-baseline font-mono text-xs text-zinc-400 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-indigo-400" />
                            FEATURED INITIATIVES
                        </span>
                        <span>PORTFOLIO SCOPE</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Description */}
                        <div className="lg:col-span-7 space-y-6">
                            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white">
                                ARCHIVAL DISCIPLINE ACROSS MULTIPLE CATEGORIES
                            </h2>
                            <p className="text-zinc-300 text-sm leading-relaxed font-light">
                                Our portfolio is categorized into high-impact film projects, narrative short films, and high-energy music video productions. Every project in our database is preserved with full technical specifications and high-bitrate video playback.
                            </p>

                            {/* Project Category Breakdown */}
                            <div className="space-y-4 font-mono text-xs pt-2">
                                <div className="p-4 bg-zinc-900/50 border border-white/10 rounded-xl flex justify-between items-center">
                                    <span className="font-bold text-white uppercase">[FILM PROJECTS]</span>
                                    <span className="text-indigo-400">HIGH-BRAND VISUALS & PROMOS</span>
                                </div>
                                <div className="p-4 bg-zinc-900/50 border border-white/10 rounded-xl flex justify-between items-center">
                                    <span className="font-bold text-white uppercase">[NARRATIVE CINEMA]</span>
                                    <span className="text-indigo-400">SHORT FILMS & DRAMATIC SHORTS</span>
                                </div>
                                <div className="p-4 bg-zinc-900/50 border border-white/10 rounded-xl flex justify-between items-center">
                                    <span className="font-bold text-white uppercase">[MUSIC VIDEOS]</span>
                                    <span className="text-indigo-400">CONCEPT-DRIVEN VISUAL REELS</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Reel Card / CTA Box */}
                        <div className="lg:col-span-5 bg-linear-to-br from-indigo-950/40 via-zinc-900 to-black p-8 rounded-2xl border border-indigo-500/30 space-y-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 flex items-center justify-center mx-auto">
                                <Sparkles className="w-6 h-6" />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-black uppercase tracking-wider text-white">
                                    EXPLORE THE ARCHIVE
                                </h3>
                                <p className="font-mono text-xs text-zinc-400">
                                    Access our full streaming database with real-time category filtering.
                                </p>
                            </div>

                            <a
                                href="#/work"
                                className="inline-block w-full py-3.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all shadow-lg"
                            >
                                OPEN SELECTED WORK STREAM ↗
                            </a>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}