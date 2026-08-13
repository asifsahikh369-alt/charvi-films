// src/pages/Work.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, X, SlidersHorizontal, Film } from 'lucide-react';
import { supabase } from '../supabaseClient';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CinemaModal from '../components/CinemaModal';

const CATEGORIES = ['ALL', 'FILM', 'NARRATIVE', 'MUSIC VIDEO'];

export default function Work({ session }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeProject, setActiveProject] = useState(null);

    // Search & Segregation Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('projects')
                .select(`*, categories ( name, slug )`)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (err) {
            console.error('Error fetching work archive:', err.message);
        } finally {
            setLoading(false);
        }
    };

    // Robust Video Segregation Logic
    const filteredProjects = projects.filter((project) => {
        // Extract & normalize category names/slugs
        const rawCatName = project.categories?.name || '';
        const rawCatSlug = project.categories?.slug || '';

        // Convert to normalized uppercase comparison strings (handling hyphens and underscores)
        const normalizedName = rawCatName.toUpperCase().replace(/[-_]/g, ' ');
        const normalizedSlug = rawCatSlug.toUpperCase().replace(/[-_]/g, ' ');
        const targetCategory = selectedCategory.toUpperCase().replace(/[-_]/g, ' ');

        // Category Segregation Match Check
        const matchesCategory =
            selectedCategory === 'ALL' ||
            normalizedName.includes(targetCategory) ||
            normalizedSlug.includes(targetCategory) ||
            targetCategory.includes(normalizedName);

        // Search Query Match Check
        const query = searchTerm.toLowerCase();
        const matchesSearch =
            project.title?.toLowerCase().includes(query) ||
            project.description?.toLowerCase().includes(query) ||
            normalizedName.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black relative">
            <Navbar session={session} />

            <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 relative z-10">

                {/* ========================================================= */}
                {/* HEADER BAR WITH RETURN TO HOME BUTTON */}
                {/* ========================================================= */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-8 mb-12">

                    <div className="space-y-2">
                        {/* RETURN HOME NAVIGATION BUTTON */}
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 font-mono text-xs text-indigo-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 hover:border-indigo-500/50 mb-3 group"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                            <span>[← RETURN TO HOME]</span>
                        </Link>

                        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-white">
                            SELECTED ARCHIVE
                        </h1>
                        <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                            Full Cinematic Catalogue // Filtered Stream
                        </p>
                    </div>

                    <div className="font-mono text-xs text-zinc-500 bg-black/40 border border-white/10 px-4 py-2.5 rounded-2xl h-fit self-start sm:self-auto">
                        TOTAL REELS: <span className="text-white font-bold">{filteredProjects.length}</span> / {projects.length}
                    </div>
                </div>

                {/* ========================================================= */}
                {/* SEGREGATION & SEARCH BAR */}
                {/* ========================================================= */}
                <div className="mb-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 font-mono text-xs">

                    {/* Category Segregation Buttons */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500 shrink-0 mr-1" />
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full border text-[10px] tracking-wider uppercase transition-all duration-300 shrink-0 ${selectedCategory === cat
                                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                                        : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                {cat} //
                            </button>
                        ))}
                    </div>

                    {/* Real-time Search Box */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="SEARCH BY TITLE OR SPECS..."
                            className="w-full bg-black/40 border border-white/10 rounded-full pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-all font-mono uppercase tracking-wider"
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

                {/* ========================================================= */}
                {/* SEGREGATED VIDEO GRID */}
                {/* ========================================================= */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-3 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                        <div className="h-5 w-5 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                        <span>Syncing Video Stream...</span>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl font-mono text-xs text-zinc-500 uppercase tracking-widest space-y-4">
                        <Film className="w-8 h-8 text-zinc-600 mx-auto" />
                        <p>[NO REELS FOUND IN THIS SEGREGATED CATEGORY]</p>
                        {(searchTerm || selectedCategory !== 'ALL') && (
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedCategory('ALL'); }}
                                className="text-[10px] text-indigo-400 hover:underline uppercase"
                            >
                                RESET CATEGORY FILTERS //
                            </button>
                        )}
                    </div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                                /{project.categories?.slug || project.categories?.name || 'general'}
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </main>

            <Footer />

            {/* Video Lightbox Modal */}
            <CinemaModal project={activeProject} onClose={() => setActiveProject(null)} />
        </div>
    );
}