// src/components/ThemeToggle.jsx
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ variant = 'floating' }) {
    const [isLight, setIsLight] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'light' || document.documentElement.classList.contains('light-theme');
        }
        return false;
    });

    useEffect(() => {
        const handleThemeChange = (e) => {
            if (e.detail !== undefined) {
                setIsLight(e.detail);
            }
        };

        window.addEventListener('theme-changed', handleThemeChange);
        return () => window.removeEventListener('theme-changed', handleThemeChange);
    }, []);

    const toggleTheme = () => {
        const nextState = !isLight;
        setIsLight(nextState);
        const root = document.documentElement;
        if (nextState) {
            root.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            root.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
        window.dispatchEvent(new CustomEvent('theme-changed', { detail: nextState }));
    };

    if (variant === 'inline') {
        return (
            <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 hover:border-indigo-500 text-xs font-mono tracking-widest uppercase transition-all duration-300 bg-white/5 hover:bg-white/10 text-white cursor-pointer select-none"
                aria-label="Toggle Theme"
                title="Toggle Light / Dark Theme"
            >
                {isLight ? (
                    <>
                        <Moon className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[10px] font-bold">[DARK]</span>
                    </>
                ) : (
                    <>
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[10px] font-bold">[LIGHT]</span>
                    </>
                )}
            </button>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-(--bg-card) backdrop-blur-md border border-(--border-subtle) text-(--text-main) font-mono text-[11px] uppercase tracking-widest shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer select-none"
            aria-label="Toggle Theme"
            title="Toggle Light / Dark Theme"
        >
            {isLight ? (
                <>
                    <Moon className="w-3.5 h-3.5 text-indigo-500" />
                    <span>[DARK MODE]</span>
                </>
            ) : (
                <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>[LIGHT MODE]</span>
                </>
            )}
        </button>
    );
}