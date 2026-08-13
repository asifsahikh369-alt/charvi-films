// src/pages/Clients.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Sparkles, SlidersHorizontal, Award, CheckCircle } from 'lucide-react';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Client Roster Data with Google Search URLs
const CLIENTS_DATA = [
    {
        id: 'sangeet-kumar',
        name: 'SANGEET KUMAR',
        role: 'DIRECTOR',
        industry: 'NATIONAL & REGIONAL CINEMA',
        category: 'DIRECTOR',
        photo: '/clients/sangeet-kumar.jpg',
        objectPos: 'object-top',
        googleUrl: 'https://www.google.com/search?q=Sangeet+kumar',
        bio: 'Visionary Director driving high-impact narrative and commercial cinema across regional markets.',
        stats: '27+ DIRECTED REELS',
        tags: ['DIRECTOR', 'CREATIVE HEAD', 'FEATURE FILMS']
    },
    {
        id: 'rani-chattarji',
        name: 'RANI CHATTARJI',
        role: 'LEAD ACTRESS',
        industry: 'BHOJPURI CINEMA',
        category: 'BHOJPURI',
        photo: '/clients/rani-chattarji.jpg',
        googleUrl: 'https://www.google.com/search?q=rani-chattarji',
        bio: 'Iconic leading superstar of Bhojpuri Cinema with a legendary career of box-office blockbusters.',
        stats: '150+ FILMS',
        tags: ['ACTRESS', 'SUPERSTAR', 'BHOJPURI REELS']
    },
    {
        id: 'raj-premi',
        name: 'RAJ PREMI',
        role: 'ACTOR',
        industry: 'BHOJPURI & INDIAN CINEMA',
        category: 'BHOJPURI',
        photo: '/clients/raj-premi.jpg',
        googleUrl: 'https://www.google.com/search?q=Raj+Premi',
        bio: 'Powerhouse actor known for intense dramatic lead roles and villain characters across major regional cinema.',
        stats: '80+ MOVIES',
        tags: ['ACTOR', 'DRAMA', 'FEATURE REELS']
    },
    {
        id: 'shakti-kapoor',
        name: 'SHAKTI KAPOOR',
        role: 'VETERAN ACTOR',
        industry: 'MAINSTREAM & PUNJABI CINEMA',
        category: 'MAINSTREAM',
        photo: '/clients/shakti-kapoor.jpg',
        googleUrl: 'https://www.google.com/search?q=shakti+kapoor',
        bio: 'Legendary Indian actor featuring in hundreds of iconic films, collaborating on special regional projects.',
        stats: '500+ FILMS',
        tags: ['VETERAN ACTOR', 'CINEMATIC ICON', 'SPECIAL FEAT']
    },
    {
        id: 'pramod-moutho',
        name: 'PRAMOD MOUTHO',
        role: 'VETERAN ACTOR',
        industry: 'MAINSTREAM & REGIONAL CINEMA',
        category: 'MAINSTREAM',
        photo: '/clients/pramod-moutho.jpg',
        googleUrl: 'https://www.google.com/search?q=PRAMOD+MOUTHO',
        bio: 'Acclaimed character actor famed for legendary dramatic villain roles and theatrical performances.',
        stats: '100+ FILMS',
        tags: ['ACTOR', 'DRAMATIC LEAD', 'FEATURE FILMS']
    },
    {
        id: 'masa-ali',
        name: 'MASA ALI',
        role: 'PUNJABI SINGER & ARTIST',
        industry: 'PUNJABI MUSIC INDUSTRY',
        category: 'PUNJABI',
        photo: '/clients/masa-ali.jpg',
        googleUrl: 'https://www.google.com/search?q=masha+ali',
        bio: 'High-energy Punjabi vocalist and live performer delivering hit music video releases.',
        stats: '20+ MUSIC REELS',
        tags: ['PUNJABI SINGER', 'VOCALIST', 'MUSIC VIDEOS']
    },
    {
        id: 'rishika-kapoor',
        name: 'RISHIKA KAPOOR',
        role: 'PUNJABI SINGER',
        industry: 'PUNJABI MUSIC INDUSTRY',
        category: 'PUNJABI',
        photo: '/clients/rishika-kapoor.jpg',
        objectPos: 'object-top',
        googleUrl: 'https://www.google.com/search?q=rishika+kapoor',
        bio: 'Sensational Punjabi musical artist collaborating on cinematic concept-driven music videos.',
        stats: '15+ REELS',
        tags: ['PUNJABI SINGER', 'CONCEPT ARTIST', 'MUSIC REELS']
    }
];

const CATEGORIES = ['ALL', 'DIRECTOR', 'BHOJPURI', 'PUNJABI', 'MAINSTREAM'];

export default function Clients({ session }) {
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const filteredClients = CLIENTS_DATA.filter((client) => {
        if (selectedCategory === 'ALL') return true;
        return client.category === selectedCategory || (selectedCategory === 'DIRECTOR' && client.category === 'LEADERSHIP');
    });

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black relative">
            <Navbar session={session} />

            <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 relative z-10 space-y-16">

                {/* ========================================================= */}
                {/* PAGE HEADER & DIRECTORY INDEX */}
                {/* ========================================================= */}
                <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 font-mono text-xs text-indigo-400 bg-indigo-950/40 border border-indigo-500/30 px-3.5 py-1.5 rounded-full uppercase tracking-widest">
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                            <span>[CLIENT ROSTER & COLLABORATORS]</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-white">
                            INDUSTRY TALENT & CLIENTS
                        </h1>
                        <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                            Directors // Bhojpuri Cinema Stars // Punjabi Artists // Mainstream Icons
                        </p>
                    </div>

                    <div className="font-mono text-xs text-zinc-400 bg-black/60 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
                        <Award className="w-5 h-5 text-indigo-400 shrink-0" />
                        <div>
                            <p className="text-white font-bold uppercase">DIRECT TALENT BOOKING</p>
                            <p className="text-[10px] text-zinc-500">sarvansharma14@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* FILTER BAR */}
                {/* ========================================================= */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
                    <SlidersHorizontal className="w-4 h-4 text-zinc-500 shrink-0 mr-2" />
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full border text-[10px] tracking-wider uppercase transition-all duration-300 shrink-0 ${selectedCategory === cat
                                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                                    : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                                }`}
                        >
                            {cat} WORK //
                        </button>
                    ))}
                </div>

                {/* ========================================================= */}
                {/* INTERACTIVE CLIENT CARDS GRID */}
                {/* ========================================================= */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredClients.map((client) => (
                            <motion.div
                                key={client.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="group relative bg-zinc-900/40 border border-white/10 hover:border-indigo-500/60 rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_0_35px_rgba(99,102,241,0.2)]"
                            >
                                <div>
                                    {/* Clickable Photo Frame with Direct External Link */}
                                    <a
                                        href={client.googleUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-zinc-950 border border-white/10 group-hover:border-indigo-500/50 transition-colors mb-6 flex items-center justify-center block group/img overflow-hidden cursor-pointer"
                                        title={`Click to view ${client.name} on Google`}
                                    >
                                        {client.photo ? (
                                            <img
                                                src={client.photo}
                                                alt={client.name}
                                                className={`w-full h-full object-cover ${client.objectPos || 'object-center'} filter contrast-110 group-hover/img:scale-105 transition-transform duration-700`}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            /* Placeholder state when photo is not yet provided */
                                            <div className="flex flex-col items-center justify-center gap-2 p-4 text-center font-mono">
                                                <div className="p-3 rounded-full bg-white/5 border border-white/10 text-indigo-400 group-hover/img:scale-110 transition-transform">
                                                    <User className="w-6 h-6" />
                                                </div>
                                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                                                    [ PHOTO SLOT READY ]
                                                </span>
                                            </div>
                                        )}

                                        {/* Category HUD Badge */}
                                        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-widest text-indigo-300">
                                            {client.industry}
                                        </div>
                                    </a>

                                    {/* Profile Header */}
                                    <div className="space-y-1 mb-3">
                                        <h3 className="text-xl font-black uppercase tracking-wider text-white group-hover:text-indigo-200 transition-colors">
                                            {client.name}
                                        </h3>
                                        <p className="font-mono text-xs text-indigo-400 uppercase tracking-wider">
                                            {client.role}
                                        </p>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-xs text-zinc-400 leading-relaxed font-light mb-6">
                                        {client.bio}
                                    </p>
                                </div>

                                {/* Footer Meta & Stats */}
                                <div className="pt-4 border-t border-white/10 space-y-4 font-mono">
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {client.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Highlights Stat Bar */}
                                    <div className="flex justify-between items-center text-[10px] bg-black/60 p-2.5 rounded-lg border border-white/5">
                                        <span className="text-zinc-500 uppercase">PORTFOLIO HIGHLIGHT:</span>
                                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" />
                                            {client.stats}
                                        </span>
                                    </div>

                                    {/* Optional Direct Contact Button if Email exists */}
                                    {client.email && (
                                        <a
                                            href={`mailto:${client.email}`}
                                            className="w-full py-2 bg-indigo-600/80 hover:bg-indigo-600 text-white font-mono text-[10px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 border border-indigo-400/50 transition-colors"
                                        >
                                            <Mail className="w-3.5 h-3.5" />
                                            <span>CONTACT {client.name.split(' ')[0]}</span>
                                        </a>
                                    )}
                                </div>

                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* ========================================================= */}
                {/* DIRECT CLIENT BOOKING TERMINAL BANNER */}
                {/* ========================================================= */}
                <section className="bg-gradient-to-r from-zinc-900 via-indigo-950/40 to-zinc-900 border border-indigo-500/30 p-8 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                    <div className="space-y-3 max-w-xl">
                        <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 uppercase tracking-widest">
                            <Mail className="w-4 h-4" />
                            <span>[DIRECT TALENT & PRODUCTION REQUISITION]</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-wider text-white">
                            WANT TO COLLABORATE OR BOOK TALENT?
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                            For direct client inquiries, starcast bookings, and co-productions across Bhojpuri, Punjabi, and Bollywood cinema, reach out directly to our production line.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 font-mono text-xs w-full sm:w-auto shrink-0">
                        <a
                            href="mailto:sarvansharma14@gmail.com"
                            className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all text-center shadow-xl"
                        >
                            EMAIL: sarvansharma14@gmail.com ↗
                        </a>
                        <span className="text-[10px] text-zinc-500 text-center uppercase tracking-widest">
                            RESPONSE TIME: WITHIN 24 HOURS
                        </span>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}