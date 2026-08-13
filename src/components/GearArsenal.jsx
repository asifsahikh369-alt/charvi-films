// src/components/GearArsenal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Disc, Cpu, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { playShutterClick, playHoverTick } from '../utils/audio';

const CATEGORIES = [
  { id: 'CAMERAS', label: 'CAMERA SYSTEMS' },
  { id: 'LENSES', label: 'ANAMORPHIC & OPTICS' },
  { id: 'LIGHTING', label: 'LIGHTING & GRIP' },
  { id: 'POST', label: 'POST & COLOR SUITE' },
];

const GEAR_DATA = {
  CAMERAS: [
    { name: 'RED V-RAPTOR 8K VV', spec: '8K VistaVision Sensor / 120fps / REDCODE RAW', status: 'IN-HOUSE MASTER' },
    { name: 'ARRI ALEXA MINI LF', spec: 'Large Format Sensor / ARRI ARRIRAW / LPL Mount', status: 'ON REQUISITION' },
    { name: 'SONY FX6 / FX9 RIGS', spec: 'Full Frame Cinema / Dual Native ISO / B-Cam Unit', status: 'IN-HOUSE READY' },
  ],
  LENSES: [
    { name: 'COOKE ANAMORPHIC /i 2X', spec: 'Full Frame Anamorphic Set / Vintage Oval Bokeh', status: 'CINEMA SET' },
    { name: 'ZEISS SUPREME PRIMES', spec: 'Full Frame T1.5 High-Resolution Optics', status: 'IN-HOUSE SET' },
    { name: 'DZOFILM VESPID PRIMES', spec: 'Compact Cinema Glass / T2.1 / Uniform Gear Placement', status: 'TRAVEL KIT' },
  ],
  LIGHTING: [
    { name: 'APUTURE 1200d PRO', spec: 'High-Output Daylight LED / Bowens Mount / Weatherproof', status: 'IN-HOUSE' },
    { name: 'ASTERA TITAN TUBES', spec: 'RGBMA Wireless Pixel Tubes / CRMX Wireless Receiver', status: '8-TUBE KIT' },
    { name: 'DJI RS3 PRO & HEAVY DRONES', spec: 'LiDAR Autofocus / 4K Aerial RAW Transmission', status: 'IN-HOUSE' },
  ],
  POST: [
    { name: 'DAVINCI RESOLVE STUDIO', spec: 'Colorist Suite / Advanced Noise Reduction / ACES Color', status: 'PRO LICENSE' },
    { name: 'APPLE MAC STUDIO M2 ULTRA', spec: '128GB Unified Memory / Dual ProRes Accelerators', status: 'PRIMARY RIG' },
    { name: 'FLANDERS SCIENTIFIC MONITOR', spec: '4K HDR Reference Color Grade Display / DCI-P3 Target', status: 'CALIBRATED' },
  ],
};

export default function GearArsenal() {
  const [activeCategory, setActiveCategory] = useState('CAMERAS');

  return (
    <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 sm:p-10 font-mono space-y-8 relative overflow-hidden">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] text-indigo-400 uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>HARDWARE PIPELINE SPECIFICATIONS</span>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-wider text-white">
            STUDIO GEAR ARSENAL
          </h2>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-full w-fit">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>PRODUCTION READY // 2026 STANDARDS</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              playShutterClick();
              setActiveCategory(cat.id);
            }}
            onMouseEnter={playHoverTick}
            className={`px-4 py-2 rounded-xl border text-[10px] tracking-wider uppercase transition-all duration-300 shrink-0 ${
              activeCategory === cat.id
                ? 'bg-indigo-600 border-indigo-400 text-white font-bold shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                : 'bg-black/50 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gear Specifications List */}
      <div className="min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {GEAR_DATA[activeCategory].map((item) => (
              <div
                key={item.name}
                className="p-5 bg-black/60 border border-white/10 hover:border-indigo-500/40 rounded-2xl flex flex-col justify-between space-y-3 transition-colors group"
              >
                <div className="space-y-1.5">
                  <span className="text-[9px] text-indigo-400 uppercase tracking-widest block font-bold">
                    [HARDWARE NODE]
                  </span>
                  <h3 className="text-sm font-black uppercase text-white group-hover:text-indigo-200 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans font-light">
                    {item.spec}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-zinc-500">
                  <span>STATUS:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
