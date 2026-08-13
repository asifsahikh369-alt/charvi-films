// src/components/IntroVideo.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// TOGGLE: Set to true to activate Intro Video, false to keep on standby
const ENABLE_INTRO = false;

export default function IntroVideo({ onComplete }) {
    const [isVisible, setIsVisible] = useState(ENABLE_INTRO);
    const videoRef = useRef(null);

    useEffect(() => {
        if (!ENABLE_INTRO) {
            if (onComplete) onComplete();
            return;
        }
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.5;
        }
    }, [onComplete]);

    const handleEnded = () => {
        setIsVisible(false);
        if (onComplete) onComplete();
    };

    if (!ENABLE_INTRO || !isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-100 bg-black flex items-center justify-center overflow-hidden"
                >
                    {/* Background Intro Video */}
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        onPlay={(e) => { e.target.playbackRate = 1.5; }}
                        onLoadedMetadata={(e) => { e.target.playbackRate = 1.5; }}
                        onEnded={handleEnded}
                        className="w-full h-full object-cover"
                    >
                        <source src="/intro.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Discreet Skip Button for UX */}
                    <button
                        onClick={handleEnded}
                        className="absolute bottom-8 right-8 font-mono text-[10px] uppercase tracking-widest text-zinc-300 hover:text-white bg-black/60 hover:bg-black/90 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105"
                    >
                        [SKIP INTRO //]
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}