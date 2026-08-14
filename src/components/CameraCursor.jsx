// src/components/CameraCursor.jsx
import React, { useEffect, useState } from 'react';

export default function CameraCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-screen device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  // Do not render anything on touch devices
  if (isTouchDevice) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out hidden md:block"
      style={{
        transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)`,
      }}
    >
      <div className="w-8 h-8 rounded-full border border-amber-400/80 flex items-center justify-center">
        <div className="w-1 h-1 bg-amber-400 rounded-full" />
      </div>
    </div>
  );
}