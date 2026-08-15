import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, SlidersHorizontal,
  Film, Clapperboard, Camera, Layers, Sparkles, Tv, Flame, Zap, Award, TrendingUp, CheckCircle2, ArrowRight 
} from 'lucide-react';
import { supabase } from '../supabaseClient';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FairyGuide from '../components/FairyGuide';
import CinemaModal from '../components/CinemaModal';
import HeroVideoBlend from '../components/HeroVideoBlend';
import { playShutterClick, playHoverTick } from '../utils/audio';

// Pipeline Stages Data
const PRODUCTION_PIPELINES = [
  {
    num: '01',
    title: 'PRE-PRODUCTION & SCRIPT LAB',
    icon: Clapperboard,
    tag: 'CONCEPT TO SCREENPLAY',
    desc: 'From initial storyboarding and character arcs to multi-state location scouting across Mumbai, Punjab, and regional hubs.',
    highlights: ['Screenplay Development', 'Starcast Scouting', 'Budgeting & Shooting Schedules']
  },
  {
    num: '02',
    title: 'PRINCIPAL PHOTOGRAPHY',
    icon: Camera,
    tag: 'CINEMATIC EXECUTION',
    desc: 'Equipped with RED 8K VistaVision systems, anamorphic optics, and heavy aerial drone rigs to capture high-octane visual storytelling.',
    highlights: ['8K RAW Recording', 'Anamorphic Glass', 'Heavy-Lift Drone Aerials']
  },
  {
    num: '03',
    title: 'POST-PRODUCTION & COLOR',
    icon: Layers,
    tag: '4K HDR MASTERING',
    desc: 'In-house DaVinci Resolve color grading suites, Dolby Atmos sound design, and custom VFX pipelines for theatrical and digital delivery.',
    highlights: ['DCI-P3 Color Grading', 'Spatial Audio Mixing', 'CGI & Visual Effects']
  },
  {
    num: '04',
    title: 'DISTRIBUTION & TALENT HUB',
    icon: Tv,
    tag: 'THEATRICAL & OTT RELEASE',
    desc: 'End-to-end liaison with regional cinema networks, theatrical distributors, and major digital streaming platforms.',
    highlights: ['Pan-India Distribution', 'Music Record Label Launch', 'A-List Starcast Management']
  }
];

// Studio Stat Counter Data
const STUDIO_STATS = [
  { value: '27+', label: 'REGIONAL & NATIONAL REELS', sub: 'Films & Feature Projects' },
  { value: '8K VV', label: 'MASTER RESOLUTION', sub: 'RAW Cinema Capture' },
  { value: '25+', label: 'STARCAST COLLABORATIONS', sub: 'Mainstream & Regional Icons' },
  { value: '100%', label: 'IN-HOUSE PRODUCTION', sub: 'Script to Final Render' }
];

// Animation Variants for Smooth Scroll Reveals
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  }
};

const darkThemes = {
    default: '#0a0a0a',
    catalogue: '#171207',
    selected: '#0f1021',
    footer: '#081a1a',
};

const lightThemes = {
    default: '#e0f2fe',   // Soft Ice Sky (Column 2 from sample swatch)
    catalogue: '#bae6fd', // Powder Sky Blue (Column 3 from sample swatch)
    selected: '#7dd3fc',  // Cerulean Sky (Column 4 from sample swatch)
    footer: '#38bdf8',    // Ocean Azure Sky (Column 5 from sample swatch)
};

// Available Filter Categories
const CATEGORIES = ['ALL', 'FILM', 'NARRATIVE', 'MUSIC VIDEO'];

export default function Home({ session }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeProject, setActiveProject] = useState(null);
    const [videoEnded, setVideoEnded] = useState(false);

    // Theme state detection & sync
    const activeSectionRef = useRef('default');
    const [isLight, setIsLight] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'light' || document.documentElement.classList.contains('light-theme');
        }
        return false;
    });

    const activeThemeSet = isLight ? lightThemes : darkThemes;
    const [backgroundColor, setBackgroundColor] = useState(activeThemeSet.default);

    useEffect(() => {
        const handleThemeChange = (e) => {
            if (e.detail !== undefined) {
                setIsLight(e.detail);
            } else {
                setIsLight(document.documentElement.classList.contains('light-theme'));
            }
        };

        window.addEventListener('theme-changed', handleThemeChange);
        return () => window.removeEventListener('theme-changed', handleThemeChange);
    }, []);

    useEffect(() => {
        const currentKey = activeSectionRef.current || 'default';
        setBackgroundColor((isLight ? lightThemes : darkThemes)[currentKey]);
    }, [isLight]);

    // Search & Filtering State
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    // Section Refs for Intersection Observer
    const heroRef = useRef(null);
    const catalogueRef = useRef(null);
    const selectedRef = useRef(null);
    const footerRef = useRef(null);

    useEffect(() => {
        const fetchPublicProjects = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select(`*, categories ( name, slug )`)
                    .order('created_at', { ascending: false });
                if (error) throw error;
                setProjects(data || []);
            } catch (error) {
                console.error('Error loading portfolio stream:', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPublicProjects();
    }, []);

    // Intersection Observer for Background Colors
    useEffect(() => {
        const sectionRefs = [
            { ref: heroRef, key: 'default' },
            { ref: catalogueRef, key: 'catalogue' },
            { ref: selectedRef, key: 'selected' },
            { ref: footerRef, key: 'footer' },
        ];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const matched = sectionRefs.find((s) => s.ref.current === entry.target);
                        if (matched) {
                            activeSectionRef.current = matched.key;
                            const activeThemes = document.documentElement.classList.contains('light-theme')
                                ? lightThemes
                                : darkThemes;
                            setBackgroundColor(activeThemes[matched.key]);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        sectionRefs.forEach((s) => s.ref.current && observer.observe(s.ref.current));
        return () => sectionRefs.forEach((s) => s.ref.current && observer.unobserve(s.ref.current));
    }, []);

    // Filter Logic: Filters projects by category and search term
    const filteredProjects = projects.filter((project) => {
        const categoryName = project.categories?.name?.toUpperCase() || 'GENERAL';
        const matchesCategory =
            selectedCategory === 'ALL' || categoryName === selectedCategory;
        const matchesSearch =
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
            categoryName.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <motion.div
            animate={{ backgroundColor }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="min-h-screen text-white selection:bg-white selection:text-black font-sans relative"
        >
            {/* 1. Interactive Components */}
            <FairyGuide />
            <Navbar session={session} />

            {/* ========================================================= */}
            {/* HERO SECTION WITH TIMED REVEAL */}
            {/* ========================================================= */}
            <section ref={heroRef} className="h-screen flex flex-col items-center justify-center relative px-6 select-none overflow-hidden">
                {/* 1. Background Video Blend (Triggers videoEnded when complete) */}
                <HeroVideoBlend onVideoEnd={() => setVideoEnded(true)} />

                {/* Ambient Backlight */}
                <div className="absolute w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

                {/* 2. Title Typography (Slides from Left & Right when video ends) */}
                <div className="relative flex items-center justify-center gap-6 sm:gap-16 md:gap-20 text-4xl sm:text-7xl md:text-8xl font-black uppercase tracking-widest text-white z-10 overflow-hidden py-4">
                    {/* CHARVI (Slides in from Left) */}
                    <motion.span
                        initial={{ x: '-150%', opacity: 0 }}
                        animate={videoEnded ? { x: 0, opacity: 1 } : { x: '-150%', opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block"
                    >
                        CHARVI
                    </motion.span>

                    {/* Convergence Center Gap */}
                    <div className="w-12 sm:w-24 md:w-32 h-16" />

                    {/* FILMS (Slides in from Right) */}
                    <motion.span
                        initial={{ x: '150%', opacity: 0 }}
                        animate={videoEnded ? { x: 0, opacity: 1 } : { x: '150%', opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block"
                    >
                        FILMS
                    </motion.span>
                </div>

                {/* 3. Subtitle & Hero Actions (Fade in smoothly after title enters) */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={videoEnded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                    className="mt-8 flex flex-col items-center gap-6 z-10"
                >
                    <p className="font-mono text-xs sm:text-sm text-zinc-400 uppercase tracking-[0.4em] text-center">
                        Cinematic Production Studio // Visual Archive
                    </p>

                    {/* 🎬 1-CLICK SHOWREEL CTA BUTTON */}
                    <button
                        onClick={() => {
                            playShutterClick();
                            setActiveProject({
                                id: 'showreel-2026',
                                title: 'CHARVI FILMS // 2026 MASTER SHOWREEL',
                                description: 'Compilation of principal cinematography, film reels, and musical visual projects.',
                                video_url: 'https://vimeo.com/76979871', // Default showreel URL
                                categories: { name: 'FEATURED REEL' }
                            });
                        }}
                        onMouseEnter={playHoverTick}
                        className="group px-6 py-3 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest rounded-full hover:bg-indigo-400 hover:text-black transition-all duration-300 flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] transform hover:scale-105 cursor-pointer"
                    >
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                        <span>[WATCH 2026 SHOWREEL ▶]</span>
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={videoEnded ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="absolute bottom-10 flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500 z-10"
                >
                    <span>[SCROLL TO UNLOCK ARCHIVE]</span>
                    <div className="w-px h-6 bg-linear-to-b from-white to-transparent animate-bounce mt-1" />
                </motion.div>
            </section>

            {/* ========================================================= */}
            {/* CHARVI FILMS PRODUCTION ECOSYSTEM & WORKFLOW PIPELINE */}
            {/* ========================================================= */}
            <section ref={catalogueRef} id="catalogue" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-20 font-sans relative overflow-hidden select-none z-10">
              
              {/* ========================================================= */}
              {/* 1. STUDIO OVERVIEW & BRAND ETHOS */}
              {/* ========================================================= */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-white/10 pb-16"
              >
                {/* Left Column: Brand Statement */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-indigo-500 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>[CHARVI FILMS // PRODUCTION ECOSYSTEM]</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-wider leading-tight text-white">
                    CRAFTING HIGH-OCTANE VISUAL CINEMA ACROSS NATIONWIDE MARKETS
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                    <strong className="text-white font-semibold">Charvi Films</strong> refers to <strong className="text-white font-semibold">Charvi Films (I) Private Limited</strong>, an active non-government registered business entity located in Mumbai, Maharashtra (near the Mira Road & Andheri production hubs). Owned, produced, and directed by executive producer <strong className="text-white font-semibold">Sarvan Sharma</strong>, our studio bridges mainstream Bollywood aesthetics with high-energy regional cinema across Bhojpuri, Punjabi, and commercial feature films.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                      <Film className="w-4 h-4 text-indigo-500" />
                      <span>NARRATIVE CINEMA</span>
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                      <Flame className="w-4 h-4 text-amber-500" />
                      <span>FILM PRODUCTIONS</span>
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                      <Zap className="w-4 h-4 text-emerald-500" />
                      <span>PUNJABI & BHOJPURI REELS</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Studio Mission Banner Card */}
                <div className="lg:col-span-5 relative">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="p-8 sm:p-10 rounded-3xl bg-linear-to-br from-indigo-950/40 via-zinc-900/60 to-black/80 border border-indigo-500/30 shadow-2xl relative overflow-hidden font-mono space-y-6"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold">
                        [STUDIO CREATIVE DIRECTIVE]
                      </span>
                      <Award className="w-6 h-6 text-indigo-400" />
                    </div>

                    <blockquote className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans font-light italic border-l-2 border-indigo-500 pl-4">
                      "Every frame must communicate scale, emotion, and technical mastery. We don't just record video; we build immersive cinematic experiences."
                    </blockquote>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <p className="text-white font-bold uppercase">SARVAN SHARMA (PRODUCER)</p>
                        <p className="text-[10px] text-zinc-400">CHARVI FILMS (I) PRIVATE LIMITED // MUMBAI</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] uppercase tracking-wider border border-emerald-500/30">
                        ACTIVE SETS
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* ========================================================= */}
              {/* 2. LIVE PRODUCTION HUD COUNTER STATS */}
              {/* ========================================================= */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono"
              >
                {STUDIO_STATS.map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    onMouseEnter={playHoverTick}
                    className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-indigo-500/50 transition-all duration-300 group"
                  >
                    <span className="text-3xl sm:text-5xl font-black text-white group-hover:text-indigo-500 transition-colors block mb-2">
                      {stat.value}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white block">
                      {stat.label}
                    </span>
                    <span className="text-[9px] text-zinc-400 uppercase tracking-widest block mt-1">
                      {stat.sub}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* ========================================================= */}
              {/* 3. 4-STAGE PRODUCTION PIPELINE GRID */}
              {/* ========================================================= */}
              <div className="space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs text-indigo-500 uppercase tracking-widest">
                      <TrendingUp className="w-4 h-4" />
                      <span>[PRODUCTION WORKFLOW PIPELINE]</span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-wider text-white">
                      THE CINEMA EXECUTION ENGINE
                    </h3>
                  </div>
                  <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest max-w-xs">
                    Seamless end-to-end technical & narrative infrastructure.
                  </p>
                </div>

                {/* Interactive Cards Grid */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {PRODUCTION_PIPELINES.map((pipeline) => {
                    const IconComponent = pipeline.icon;
                    return (
                      <motion.div
                        key={pipeline.num}
                        variants={itemVariants}
                        whileHover={{ y: -6 }}
                        onMouseEnter={playHoverTick}
                        onClick={playShutterClick}
                        className="group p-8 rounded-3xl bg-black/5 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 hover:border-indigo-500/60 transition-all duration-500 flex flex-col justify-between space-y-6 relative overflow-hidden cursor-pointer"
                      >
                        {/* Background Ambient Glow on Hover */}
                        <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all pointer-events-none" />

                        <div className="space-y-4 relative z-10">
                          <div className="flex items-center justify-between font-mono text-xs">
                            <span className="text-indigo-500 font-bold text-sm">[{pipeline.num}]</span>
                            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] uppercase tracking-widest">
                              {pipeline.tag}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <h4 className="text-xl font-black uppercase text-white tracking-wider group-hover:text-indigo-400 transition-colors">
                              {pipeline.title}
                            </h4>
                          </div>

                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                            {pipeline.desc}
                          </p>
                        </div>

                        {/* Technical Deliverable Bullet Checklist */}
                        <div className="pt-4 border-t border-black/5 dark:border-white/10 font-mono text-xs space-y-2 relative z-10">
                          {pipeline.highlights.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-[11px] text-zinc-400">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

            </section>

            {/* ========================================================= */}
            {/* SELECTED WORK (WITH SEARCH & CATEGORY FILTERING) */}
            {/* ========================================================= */}
            <section
                ref={selectedRef}
                id="selected-work"
                className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 sm:px-12 border-t border-white/5"
            >
                {/* Section Header */}
                <div className="border-b border-white/10 pb-6 mb-10 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                    <div>
                        <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            [N°02 SELECTED ARCHIVE // LIVE STREAM]
                        </h2>
                    </div>
                    <Link
                        to="/login"
                        className="self-start md:self-auto text-[9px] font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors border border-white/10 hover:border-indigo-500/50 px-3.5 py-1.5 rounded-full bg-black/30 backdrop-blur-sm"
                    >
                        Portal Access //
                    </Link>
                </div>

                {/* SEARCH & FILTER CONTROLS BAR */}
                <div className="mb-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 font-mono text-xs">

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500 shrink-0 mr-1" />
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3.5 py-2 rounded-full border text-[10px] tracking-wider uppercase transition-all duration-300 shrink-0 ${selectedCategory === cat
                                    ? 'bg-indigo-600/80 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                                    : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                {cat} //
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="SEARCH BY TITLE OR SPECS..."
                            className="w-full bg-black/40 border border-white/10 rounded-full pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition-all font-mono uppercase tracking-wider"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                </div>

                {/* RESULTS GRID */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-3 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                        <div className="h-5 w-5 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                        <span>Syncing Deployed Feeds...</span>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl font-mono text-xs text-zinc-500 uppercase tracking-widest space-y-3">
                        <p>[NO RECORD MATCHED YOUR SEARCH MATRIX]</p>
                        {(searchTerm || selectedCategory !== 'ALL') && (
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedCategory('ALL'); }}
                                className="text-[10px] text-indigo-400 hover:underline uppercase"
                            >
                                RESET FILTERS //
                            </button>
                        )}
                    </div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                        <AnimatePresence>
                            {filteredProjects.map((project) => (
                                <motion.article
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => setActiveProject(project)}
                                    className="group relative flex flex-col justify-between cursor-pointer"
                                >
                                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-950 border border-white/10 group-hover:border-indigo-500/60 transition-all duration-500 shadow-xl group-hover:shadow-[0_0_35px_rgba(99,102,241,0.25)]">
                                        <img
                                            src={project.thumbnail_url}
                                            alt={project.title}
                                            className="h-full w-full object-cover filter grayscale contrast-125 brightness-75 opacity-70 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                            <div className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-indigo-500/40 text-indigo-300 font-mono text-[10px] tracking-widest uppercase flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                                                PLAY REEL //
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 px-1">
                                        <div className="flex items-center justify-between gap-4">
                                            <h3 className="text-sm font-black uppercase tracking-wider text-zinc-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                                {project.title}
                                            </h3>
                                            <span className="text-[10px] font-mono text-zinc-500 group-hover:text-indigo-400 lowercase shrink-0 transition-colors">
                                                /{project.categories?.slug || 'general'}
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </section>

            {/* ========================================================= */}
            {/* FOOTER */}
            {/* ========================================================= */}
            <div ref={footerRef}>
                <Footer />
            </div>

            {/* Lightbox Cinema Modal */}
            <CinemaModal project={activeProject} onClose={() => setActiveProject(null)} />
        </motion.div>
    );
}