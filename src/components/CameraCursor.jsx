// src/components/CameraCursor.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CameraCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touchscreens to disable custom cursor on mobile
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Do not render custom cursor on mobile touchscreens
  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden hidden md:block">
      {/* Outer Tactical Crosshairs Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-indigo-400/60 flex items-center justify-center pointer-events-none"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovered ? 1.5 : 1,
          borderColor: isHovered ? '#818cf8' : 'rgba(129, 140, 248, 0.5)',
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.1 }}
      >
        {/* Center Precise Dot */}
        <div className={`w-1 h-1 rounded-full ${isHovered ? 'bg-indigo-400 animate-ping' : 'bg-white'}`} />
      </motion.div>
    </div>
  );
}