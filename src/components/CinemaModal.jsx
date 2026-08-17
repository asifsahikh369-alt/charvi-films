// src/components/CinemaModal.jsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Camera, Film, Calendar, Tag, ExternalLink } from 'lucide-react';
export default function CinemaModal({ project, onClose }) {
  // Listen for 'Escape' key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  // Format video URL for embed compatibility (YouTube / Vimeo / Direct link fallback)
  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&color=ffffff&title=0&byline=0&portrait=0`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(project.video_url);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-y-auto">

        {/* Dark Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
        />

        {/* Main Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl bg-zinc-950 border border-white/15 shadow-2xl overflow-hidden z-10 my-auto rounded-sm"
        >
          {/* Brutalist Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-black/60 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-white font-bold tracking-widest uppercase">[REEL PLAYBACK // LIVE]</span>
              <span className="hidden sm:inline text-zinc-600">|</span>
              <span className="hidden sm:inline text-zinc-500">REF: {project.id?.toString().slice(0, 8) || 'N°00'}</span>
            </div>

            <button
              onClick={onClose}
              className="flex items-center gap-2 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xs border border-white/10"
            >
              <span>ESC</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Video Player Frame */}
          <div className="relative aspect-video w-full bg-black border-b border-white/10 group">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : project.thumbnail_url ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={project.thumbnail_url}
                  alt={project.title}
                  className="w-full h-full object-cover filter grayscale-40"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
                  <Play className="w-12 h-12 text-white/70" />
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                    [NO DIRECT REEL STREAM AVAILABLE]
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Technical Metadata & Information Grid */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left 2 Columns: Project Overview */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{project.categories?.name || 'FEATURED ARCHIVE'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-wider text-white">
                  {project.title}
                </h2>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                {project.description ||
                  'Engineered with high-contrast narrative focus. Captured using high-dynamic-range digital cinematography for immersive playback environments.'}
              </p>

              {/* Technical Spec Badges */}
              <div className="pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[10px] uppercase">
                <div className="p-3 border border-white/5 bg-black/40">
                  <span className="text-zinc-600 block mb-1">FPS RATE</span>
                  <span className="text-zinc-300 font-bold">24.00 fps</span>
                </div>
                <div className="p-3 border border-white/5 bg-black/40">
                  <span className="text-zinc-600 block mb-1">ASPECT RATIO</span>
                  <span className="text-zinc-300 font-bold">2.39:1 Anamorphic</span>
                </div>
                <div className="p-3 border border-white/5 bg-black/40">
                  <span className="text-zinc-600 block mb-1">COLOR WORKSPACE</span>
                  <span className="text-zinc-300 font-bold">ACEScct / Rec.709</span>
                </div>
                <div className="p-3 border border-white/5 bg-black/40">
                  <span className="text-zinc-600 block mb-1">AUDIO MIX</span>
                  <span className="text-zinc-300 font-bold">Dolby Atmos 7.1</span>
                </div>
              </div>
            </div>

            {/* Right Column: Credits & Metadata Sidebar */}
            <div className="space-y-6 border-l-0 lg:border-l border-white/10 lg:pl-8 font-mono text-xs">
              <h3 className="text-zinc-500 uppercase tracking-[0.3em] font-bold">
                [PRODUCTION SPECS]
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-zinc-500 flex items-center gap-2">
                    <Film className="w-3.5 h-3.5" /> Producer
                  </span>
                  <span className="text-white font-medium">Sarvan Sharma</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-zinc-500 flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5" /> Camera System
                  </span>
                  <span className="text-white font-medium">ARRI Alexa Mini LF</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-zinc-500 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> Release Year
                  </span>
                  <span className="text-white font-medium">
                    {project.created_at ? new Date(project.created_at).getFullYear() : '2026'}
                  </span>
                </div>
              </div>

              {project.external_link && (
                <a
                  href={project.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-bold uppercase tracking-widest text-[11px] hover:bg-zinc-200 transition-colors rounded-xs"
                >
                  <span>Launch External Stream</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}