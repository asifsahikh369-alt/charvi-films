// src/pages/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Sparkles, Film, Clock } from 'lucide-react';
import { supabase } from '../supabaseClient';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PROJECT_TYPES = [
    'COMMERCIAL CAMPAIGN',
    'NARRATIVE SHORT / FEATURE',
    'MUSIC VIDEO',
    'TALENT / STAR BOOKING',
    'POST-PRODUCTION / COLOR',
];

export default function Contact({ session }) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        project_type: PROJECT_TYPES[0],
        budget_range: '₹40K - ₹1L',
        message: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            // 1. Save submission record in Supabase database
            const { error: dbError } = await supabase.from('contact_messages').insert([formData]);
            if (dbError) throw dbError;

            // 2. Dispatch instant email alert via Resend
            const resendResponse = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: 'Charvi Films <onboarding@resend.dev>',
                    to: ['sarvansharma14@gmail.com'],
                    subject: `[NEW REQUISITION] ${formData.project_type} - ${formData.full_name}`,
                    html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
            <h2 style="color: #4f46e5; margin-bottom: 20px;">🎬 New Production Requisition</h2>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p><strong>Full Name:</strong> ${formData.full_name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone / WhatsApp:</strong> ${formData.phone || 'Not provided'}</p>
            <p><strong>Project Category:</strong> ${formData.project_type}</p>
            <p><strong>Budget Range:</strong> ${formData.budget_range}</p>
            <br />
            <p><strong>Message Overview:</strong></p>
            <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #4f46e5;">
              ${formData.message}
            </blockquote>
          </div>
        `,
                }),
            });

            if (!resendResponse.ok) {
                const errorDetail = await resendResponse.json();
                console.warn('Resend Notification Notice:', errorDetail);
            }

            setStatus({
                type: 'success',
                message: 'REQUISITION TRANSMITTED SUCCESSFULLY. OUR PRODUCTION LINE WILL CONTACT YOU SHORTLY.',
            });

            // Reset Form
            setFormData({
                full_name: '',
                email: '',
                phone: '',
                project_type: PROJECT_TYPES[0],
                budget_range: '₹40K - ₹1L',
                message: '',
            });
        } catch (err) {
            console.error('Submission Error:', err.message);
            setStatus({
                type: 'error',
                message: err.message || 'FAILED TO TRANSMIT REQUISITION. PLEASE EMAIL DIRECTLY.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black relative">
            <Navbar session={session} />

            <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 relative z-10 space-y-16">

                {/* ========================================================= */}
                {/* PAGE HEADER */}
                {/* ========================================================= */}
                <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 font-mono text-xs text-indigo-400 bg-indigo-950/40 border border-indigo-500/30 px-3.5 py-1.5 rounded-full uppercase tracking-widest">
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                            <span>[PRODUCTION REQUISITION TERMINAL]</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-white">
                            INITIATE PROJECT
                        </h1>
                        <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                            Films // Narrative Films // Music Videos // Talent Bookings
                        </p>
                    </div>

                    <div className="font-mono text-xs text-zinc-400 bg-black/60 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
                        <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
                        <div>
                            <p className="text-white font-bold uppercase">RESPONSE WINDOW</p>
                            <p className="text-[10px] text-zinc-500">WITHIN 12–24 HOURS</p>
                        </div>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* FORM & CONTACT INFO LAYOUT */}
                {/* ========================================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Direct Official Contact Specs */}
                    <div className="lg:col-span-5 space-y-8 font-mono">
                        <div className="bg-zinc-900/40 border border-white/10 p-8 rounded-2xl space-y-6">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2 border-b border-white/10 pb-4">
                                <Film className="w-4 h-4" />
                                [OFFICIAL PRODUCTION HEADQUARTERS]
                            </h2>

                            <div className="space-y-6 text-xs">
                                {/* Official Email */}
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-indigo-400 shrink-0">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">OFFICIAL EMAIL</span>
                                        <a href="mailto:sarvansharma14@gmail.com" className="text-white font-bold hover:text-indigo-300 transition-colors">
                                            sarvansharma14@gmail.com
                                        </a>
                                    </div>
                                </div>

                                {/* Direct Booking Line */}
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-indigo-400 shrink-0">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">TALENT & PRODUCTION LINE</span>
                                        <a href="tel:+919699701903" className="text-white font-bold hover:text-indigo-300 transition-colors">
                                            +91 9699701903
                                        </a>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-indigo-400 shrink-0">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">STUDIO LOCATION</span>
                                        <span className="text-zinc-300">MUMBAI // PUNJAB // BHOJPURI CINEMA HUBS</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Requisition Guidelines Box */}
                        <div className="p-6 bg-indigo-950/20 border border-indigo-500/30 rounded-2xl text-xs space-y-2">
                            <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px]">
                                NOTICE FOR TALENT & STARCAST BOOKINGS:
                            </span>
                            <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                                Please specify project dates, tentative shoot locations, and category requirements in the message field for expedited scheduling.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Interactive Requisition Form */}
                    <div className="lg:col-span-7 bg-zinc-900/60 border border-white/10 p-8 sm:p-10 rounded-3xl relative">

                        {/* Status Toast Notification */}
                        {status && (
                            <div
                                className={`mb-6 p-4 rounded-xl border flex items-center gap-3 text-xs font-mono ${status.type === 'success'
                                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                                        : 'bg-red-950/40 border-red-500/40 text-red-300'
                                    }`}
                            >
                                {status.type === 'success' ? (
                                    <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                                )}
                                <span>{status.message}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-zinc-400 mb-2 uppercase tracking-wider text-[10px]">
                                        FULL NAME / COMPANY *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        placeholder="e.g. RAJESH KUMAR"
                                        className="w-full bg-black/60 border border-white/10 rounded-xl p-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-zinc-400 mb-2 uppercase tracking-wider text-[10px]">
                                        EMAIL ADDRESS *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="name@company.com"
                                        className="w-full bg-black/60 border border-white/10 rounded-xl p-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Phone */}
                                <div>
                                    <label className="block text-zinc-400 mb-2 uppercase tracking-wider text-[10px]">
                                        WHATSAPP / PHONE NUMBER
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+91 98765 43210"
                                        className="w-full bg-black/60 border border-white/10 rounded-xl p-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>

                                {/* Project Category */}
                                <div>
                                    <label className="block text-zinc-400 mb-2 uppercase tracking-wider text-[10px]">
                                        PROJECT CATEGORY *
                                    </label>
                                    <select
                                        value={formData.project_type}
                                        onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                                        className="w-full bg-black/60 border border-white/10 rounded-xl p-3.5 text-white focus:outline-none focus:border-indigo-500 uppercase transition-colors"
                                    >
                                        {PROJECT_TYPES.map((type) => (
                                            <option key={type} value={type} className="bg-zinc-900 text-white">
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Budget Range */}
                            <div>
                                <label className="block text-zinc-400 mb-2 uppercase tracking-wider text-[10px]">
                                    ESTIMATED BUDGET RANGE
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {['₹40K - ₹1L', '₹1L - ₹5L', '₹5L - ₹15L', '₹15L+'].map((budget) => (
                                        <button
                                            type="button"
                                            key={budget}
                                            onClick={() => setFormData({ ...formData, budget_range: budget })}
                                            className={`py-2.5 px-3 rounded-xl border text-[10px] uppercase transition-all ${formData.budget_range === budget
                                                    ? 'bg-indigo-600 border-indigo-400 text-white font-bold'
                                                    : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white'
                                                }`}
                                        >
                                            {budget}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-zinc-400 mb-2 uppercase tracking-wider text-[10px]">
                                    PRODUCTION OVERVIEW & REQUISITION DETAILS *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Outline shoot dates, key deliverables, or specific talent requirements..."
                                    className="w-full bg-black/60 border border-white/10 rounded-xl p-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition-colors text-xs"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01]"
                            >
                                {loading ? (
                                    <span>TRANSMITTING REQUISITION...</span>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>TRANSMIT TO PRODUCTION LINE</span>
                                    </>
                                )}
                            </button>

                        </form>
                    </div>

                </div>

            </main>

            <Footer />
        </div>
    );
}