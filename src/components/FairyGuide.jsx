// src/components/FairyGuide.jsx
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
                    <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] mb-0.5" />
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

export default function FairyGuide() {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

    // -------------------------------------------------------------
    // FAIRY 1 (Amber/Gold): Catalogue Section
    // -------------------------------------------------------------
    const fairy1X = useTransform(smoothProgress, [0, 0.2, 0.35], ["-12vw", "-32vw", "-40vw"]);
    const fairy1Y = useTransform(smoothProgress, [0, 0.2, 0.35], ["0vh", "38vh", "50vh"]);
    const fairy1Scale = useTransform(smoothProgress, [0, 0.2], [1, 0.7]);
    const fairy1Opacity = useTransform(smoothProgress, [0.35, 0.45], [1, 0.1]); // Dim after landing

    // -------------------------------------------------------------
    // FAIRY 2 (Violet/Indigo): Selected Work Grid
    // -------------------------------------------------------------
    const fairy2X = useTransform(smoothProgress, [0, 0.2, 0.65], ["0vw", "0vw", "35vw"]);
    const fairy2Y = useTransform(smoothProgress, [0, 0.2, 0.65], ["-2vh", "15vh", "48vh"]);
    const fairy2Scale = useTransform(smoothProgress, [0, 0.65], [1.1, 0.7]);
    const fairy2Opacity = useTransform(smoothProgress, [0.65, 0.75], [1, 0.1]);

    // -------------------------------------------------------------
    // FAIRY 3 (Cyan/Emerald): Footer Matrix
    // -------------------------------------------------------------
    const fairy3X = useTransform(smoothProgress, [0, 0.2, 0.9], ["12vw", "30vw", "0vw"]);
    const fairy3Y = useTransform(smoothProgress, [0, 0.2, 0.9], ["2vh", "28vh", "46vh"]);
    const fairy3Scale = useTransform(smoothProgress, [0, 0.9], [1, 0.7]);
    // No opacity dimming for fairy 3 as it lands on the final section.

    return (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">

            {/* Fairy Glow Overlay Wrapper */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500 flex items-center justify-center"
                style={{
                    mixBlendMode: 'var(--fairy-blend-mode)',
                    opacity: 'var(--fairy-glow-opacity)'
                }}
            >
                {/* Fairy 1: Amber Glow */}
                <motion.div
                    style={{ x: fairy1X, y: fairy1Y, scale: fairy1Scale, opacity: fairy1Opacity, background: 'radial-gradient(circle, var(--fairy-amber-glow) 0%, transparent 70%)' }}
                    initial={{ x: "-100vw", y: "-50vh", opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute w-96 h-96 rounded-full blur-3xl transition-all duration-500"
                />

                {/* Fairy 2: Indigo Glow */}
                <motion.div
                    style={{ x: fairy2X, y: fairy2Y, scale: fairy2Scale, opacity: fairy2Opacity, background: 'radial-gradient(circle, var(--fairy-indigo-glow) 0%, transparent 70%)' }}
                    initial={{ x: "100vw", y: "-50vh", opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="absolute w-96 h-96 rounded-full blur-3xl transition-all duration-500"
                />

                {/* Fairy 3: Cyan Glow */}
                <motion.div
                    style={{ x: fairy3X, y: fairy3Y, scale: fairy3Scale, background: 'radial-gradient(circle, var(--fairy-cyan-glow) 0%, transparent 70%)' }}
                    initial={{ x: "0vw", y: "100vh", opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="absolute w-96 h-96 rounded-full blur-3xl transition-all duration-500"
                />
            </div>

            {/* FAIRY 01: Catalogue (Amber) */}
            <motion.div
                style={{ x: fairy1X, y: fairy1Y, scale: fairy1Scale, opacity: fairy1Opacity }}
                initial={{ x: "-100vw", y: "-50vh", opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
            >
                <HumanoidFairy glowColor="bg-amber-500/40" coreColor="text-amber-300" accentIcon={Sparkles} />
            </motion.div>

            {/* FAIRY 02: Selected Work (Indigo) */}
            <motion.div
                style={{ x: fairy2X, y: fairy2Y, scale: fairy2Scale, opacity: fairy2Opacity }}
                initial={{ x: "100vw", y: "-50vh", opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="absolute"
            >
                <HumanoidFairy glowColor="bg-purple-600/40" coreColor="text-indigo-300" accentIcon={Aperture} />
            </motion.div>

            {/* FAIRY 03: Footer (Cyan) */}
            <motion.div
                style={{ x: fairy3X, y: fairy3Y, scale: fairy3Scale }}
                initial={{ x: "0vw", y: "100vh", opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="absolute"
            >
                <HumanoidFairy glowColor="bg-emerald-500/40" coreColor="text-cyan-300" accentIcon={Compass} />
            </motion.div>

        </div>
    );
}