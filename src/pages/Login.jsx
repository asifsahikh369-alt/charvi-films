import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Login() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleMagicLinkLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: email,
                options: {
                    // Supabase automatically detects localhost during local dev, 
                    // but you can explicitly pass a redirect path if needed:
                    // redirectTo: window.location.origin + '/#/admin'
                }
            });

            if (error) throw error;

            setMessage({
                type: 'success',
                text: '✨ Magic link sent! Check your email inbox to log in.'
            });
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.error_description || error.message || 'An error occurred.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[75vh] flex items-center justify-center px-6 bg-black">
            <div className="w-full max-w-md border border-white/10 bg-zinc-900/40 backdrop-blur-md p-8 shadow-2xl rounded-sm">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="text-xl font-black tracking-widest uppercase text-white">
                        Admin Portal<span className="text-red-500">.</span>
                    </h2>
                    <p className="text-xs text-zinc-500 tracking-wider mt-2">
                        Enter your email to receive a secure authentication link.
                    </p>
                </div>

                {/* Feedback Messages */}
                {message.text && (
                    <div className={`mb-6 p-4 text-xs tracking-wider rounded-sm border ${message.type === 'success'
                            ? 'bg-zinc-900 text-emerald-400 border-emerald-500/30'
                            : 'bg-zinc-900 text-rose-400 border-rose-500/30'
                        }`}>
                        {message.text}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleMagicLinkLogin} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            className="w-full bg-zinc-950 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:outline-1 focus:outline-white transition-colors duration-200 placeholder:text-zinc-700 rounded-sm"
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-black font-black uppercase text-xs tracking-widest py-3 hover:bg-zinc-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                    >
                        {isLoading ? 'Sending Link...' : 'Send Magic Link'}
                    </button>
                </form>
            </div>
        </div>
    );
}