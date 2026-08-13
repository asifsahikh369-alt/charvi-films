// src/components/Hero.jsx
import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Aperture, Compass } from 'lucide-react';

// Humanoid Fairy SVG Silhouette Component
function HumanoidFairy({ glowColor, coreColor, accentIcon: AccentIcon }) {
    return (
        <div className="relative flex items-center justify-center">
            {/* Outer Chromatic Glow */}
            <div className={`absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full ${glowColor} blur-2xl animate-pulse opacity-70`} />

            {/* Humanoid Core & Wings */}
            <div className="relative flex flex-col items-center justify-center">
                {/* Animated Wings */}
                <motion.div
                    animate={{ scaleX: [1, 0.6, 1], rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-3 w-16 h-12 flex justify-between pointer-events-none opacity-80"
                >
                    {/* Left Wing */}
                    <svg className={`w-7 h-10 ${coreColor}`} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6 5 2 11 3 17c2 4 8 3 9-5 0 0-1-6 0-10z" />
                    </svg>
                    {/* Right Wing */}
                    <svg className={`w-7 h-10 ${coreColor} transform scale-x-[-1]`} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6 5 2 11 3 17c2 4 8 3 9-5 0 0-1-6 0-10z" />
                    </svg>
                </motion.div>

                {/* Humanoid Body Silhouette */}
                <div className="relative flex flex-col items-center z-10">
                    {/* Head */}
                    <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] mb-0.5" />
                    {/* Torso & Arms */}
                    <div className="w-2.5 h-6 rounded-t-full bg-linear-to-b from-white via-neutral-200 to-transparent flex items-center justify-center">
                        <div className="w-5 h-[1.5px] bg-white/80 rounded-full" />
                    </div>
                </div>

                {/* Center Essence Orb */}
                <AccentIcon className="absolute w-4 h-4 text-white animate-spin-slow drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] z-20" />
            </div>
        </div>
    );
}

export default function Hero() {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

    // -------------------------------------------------------------
    // FAIRY 1 (Amber/Gold): Convergence -> Catalogue Section
    // -------------------------------------------------------------
    const fairy1X = useTransform(smoothProgress, [0, 0.25, 0.6, 1], ["-12vw", "-32vw", "-38vw", "-40vw"]);
    const fairy1Y = useTransform(smoothProgress, [0, 0.25, 0.6, 1], ["0vh", "38vh", "45vh", "50vh"]);
    const fairy1Scale = useTransform(smoothProgress, [0, 0.25, 1], [1, 0.85, 0.6]);

    // -------------------------------------------------------------
    // FAIRY 2 (Violet/Indigo): Convergence -> Selected Work Grid
    // -------------------------------------------------------------
    const fairy2X = useTransform(smoothProgress, [0, 0.35, 0.7, 1], ["0vw", "0vw", "32vw", "35vw"]);
    const fairy2Y = useTransform(smoothProgress, [0, 0.35, 0.7, 1], ["-2vh", "15vh", "40vh", "48vh"]);
    const fairy2Scale = useTransform(smoothProgress, [0, 0.35, 1], [1.1, 0.9, 0.6]);

    // -------------------------------------------------------------
    // FAIRY 3 (Cyan/Emerald): Convergence -> Footer Matrix
    // -------------------------------------------------------------
    const fairy3X = useTransform(smoothProgress, [0, 0.5, 0.85, 1], ["12vw", "30vw", "0vw", "0vw"]);
    const fairy3Y = useTransform(smoothProgress, [0, 0.5, 0.85, 1], ["2vh", "28vh", "42vh", "46vh"]);
    const fairy3Scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0.65]);

    return (
        <div className="relative bg-black text-white font-sans overflow-hidden">

            {/* ========================================================= */}
            {/* CONVERGING HUMANOID FAIRIES CONTAINER (Fixed viewport overlay) */}
            {/* ========================================================= */}
            <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">

                {/* FAIRY 01: Top-Left Spawn -> Catalogue */}
                <motion.div
                    style={{ x: fairy1X, y: fairy1Y, scale: fairy1Scale }}
                    initial={{ x: "-100vw", y: "-50vh", opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute"
                >
                    <HumanoidFairy
                        glowColor="bg-amber-500/40"
                        coreColor="text-amber-300"
                        accentIcon={Sparkles}
                    />
                </motion.div>

                {/* FAIRY 02: Top-Right Spawn -> Selected Work */}
                <motion.div
                    style={{ x: fairy2X, y: fairy2Y, scale: fairy2Scale }}
                    initial={{ x: "100vw", y: "-50vh", opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="absolute"
                >
                    <HumanoidFairy
                        glowColor="bg-purple-600/40"
                        coreColor="text-indigo-300"
                        accentIcon={Aperture}
                    />
                </motion.div>

                {/* FAIRY 03: Bottom Spawn -> Footer */}
                <motion.div
                    style={{ x: fairy3X, y: fairy3Y, scale: fairy3Scale }}
                    initial={{ x: "0vw", y: "100vh", opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="absolute"
                >
                    <HumanoidFairy
                        glowColor="bg-emerald-500/40"
                        coreColor="text-cyan-300"
                        accentIcon={Compass}
                    />
                </motion.div>

            </div>

            {/* ========================================================= */}
            {/* HERO SECTION DISPLAY */}
            {/* ========================================================= */}
            <section className="min-h-screen flex flex-col items-center justify-center relative px-6 border-b border-white/10 select-none">

                {/* Ambient Backlight */}
                <div className="absolute w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

                {/* Title Group */}
                <div className="relative flex items-center justify-center gap-8 sm:gap-16 md:gap-24 text-4xl sm:text-7xl md:text-8xl font-black uppercase tracking-widest text-white z-10">
                    <motion.span initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        CHARVI
                    </motion.span>

                    {/* Convergence Center Threshold Gap */}
                    <div className="w-16 sm:w-28 md:w-36 h-20" />

                    <motion.span initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        FILMS
                    </motion.span>
                </div>

                <p className="mt-8 font-mono text-xs sm:text-sm text-zinc-400 uppercase tracking-[0.4em] text-center z-10">
                    Cinematic Production Studio // Visual Archive
                </p>

                <div className="absolute bottom-10 flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500 z-10">
                    <span>[SCROLL TO UNLOCK ARCHIVE]</span>
                    <div className="w-px h-6 bg-linear-to-b from-white to-transparent animate-bounce mt-1" />
                </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 01: BRUTALIST CATALOGUE INDEX */}
            {/* ========================================================= */}
            <section id="catalogue" className="max-w-7xl mx-auto px-6 py-28 relative z-10">
                <div className="border-b border-white/10 pb-4 mb-12 font-mono text-xs text-zinc-400 uppercase flex justify-between">
                    <span>[N°01 DIRECTORY INDEX]</span>
                    <span>SERIES (2024 — 2026)</span>
                </div>

                <div className="space-y-4 font-mono">
                    {[
                        { id: "N°01", title: "CELESTIAL REALM", type: "FILM", year: "2026" },
                        { id: "N°02", title: "SILENT SYMPHONY", type: "NARRATIVE", year: "2025" },
                        { id: "N°03", title: "ECHOES OF ETERNITY", type: "MUSIC VIDEO", year: "2025" },
                    ].map((item) => (
                        <div
                            key={item.id}
                            className="p-6 border border-zinc-900 bg-zinc-950/80 hover:border-zinc-700 transition-all flex justify-between items-center group cursor-pointer"
                        >
                            <div className="flex items-center gap-6">
                                <span className="text-zinc-600 text-xs">{item.id}</span>
                                <span className="text-lg font-bold group-hover:translate-x-2 transition-transform">{item.title}</span>
                            </div>
                            <div className="flex gap-8 text-xs text-zinc-500">
                                <span>{item.type}</span>
                                <span>{item.year}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}