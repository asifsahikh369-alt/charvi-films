// src/components/HeroVideoBlend.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// TOGGLE: Set to true to activate hero video, false to keep on standby
const ENABLE_HERO_VIDEO = false;

export default function HeroVideoBlend({ onVideoEnd }) {
    const [isEnded, setIsEnded] = useState(!ENABLE_HERO_VIDEO);

    useEffect(() => {
        if (!ENABLE_HERO_VIDEO && onVideoEnd) {
            onVideoEnd();
        }
    }, [onVideoEnd]);

    if (!ENABLE_HERO_VIDEO) return null;

    const handleVideoEnd = () => {
        setIsEnded(true);
        if (onVideoEnd) onVideoEnd();
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
            {/* Feathered Radial Mask Container (Fades out when video ends) */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isEnded ? 0 : 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden"
                style={{
                    maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 80%)',
                    WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 80%)',
                }}
            >
                {/* Background Video (Plays ONCE on load, no loop) */}
                <video
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnd}
                    className="w-full h-full object-cover filter brightness-110 contrast-125"
                >
                    <source src="/intro.mp4" type="video/mp4" />
                </video>
            </motion.div>
        </div>
    );
}