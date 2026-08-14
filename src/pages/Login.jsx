// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, KeyRound, Mail, ArrowRight, Loader2, AlertCircle, RefreshCw, ArrowLeft, Lock } from 'lucide-react';
import { supabase } from '../supabaseClient'; // Adjust path if your client is in src/lib/
import { ALLOWED_ADMINS } from '../components/AdminRoute';
import { playShutterClick, playHoverTick } from '../utils/audio';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login({ session }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('EMAIL'); // 'EMAIL' | 'OTP'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Check if redirected due to unauthorized access
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('error') === 'unauthorized') {
      setErrorMsg('ACCESS DENIED: Your email is not authorized for Admin Console clearance.');
    }
  }, [location]);

  // If already logged in as authorized admin, forward to /admin
  useEffect(() => {
    if (session?.user?.email) {
      const userEmail = session.user.email.toLowerCase();
      if (ALLOWED_ADMINS.map(e => e.toLowerCase()).includes(userEmail)) {
        navigate('/admin');
      }
    }
  }, [session, navigate]);

  // Countdown timer for Resend OTP
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // =========================================================
  // 1. SEND 6-DIGIT OTP TO ADMIN EMAIL
  // =========================================================
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const targetEmail = email.trim().toLowerCase();

    // Check if email is in whitelist before sending OTP
    const isWhitelisted = ALLOWED_ADMINS.map(e => e.toLowerCase()).includes(targetEmail);
    if (!isWhitelisted) {
      setErrorMsg('ACCESS RESTRICTED: Only pre-authorized Charvi Films administrators can request OTPs.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: targetEmail,
        options: {
          shouldCreateUser: false, // Prevents creating unauthorized accounts
        },
      });

      if (error) throw error;

      setStep('OTP');
      setResendTimer(120); // 120s cooldown (2 minutes)
    } catch (err) {
      console.error('OTP Send Error:', err.message);
      setErrorMsg(err.message || 'Failed to dispatch security OTP. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // 2. VERIFY 6-DIGIT OTP CODE
  // =========================================================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (otp.trim().length !== 6) {
      setErrorMsg('Please enter the full 6-digit numeric security token.');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: otp.trim(),
        type: 'email',
      });

      if (error) throw error;

      // Double-verify admin email check
      const sessionEmail = data.session?.user?.email?.toLowerCase();
      if (!ALLOWED_ADMINS.map(e => e.toLowerCase()).includes(sessionEmail)) {
        await supabase.auth.signOut();
        setErrorMsg('UNAUTHORIZED: This credential does not have administrative privileges.');
        return;
      }

      navigate('/admin');
    } catch (err) {
      console.error('OTP Verify Error:', err.message);
      setErrorMsg('Invalid or expired OTP code. Please verify and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-amber-400 selection:text-black relative flex flex-col justify-between">
      <Navbar session={session} />

      <main className="max-w-lg mx-auto px-6 pt-36 pb-20 relative z-10 w-full select-none">
        
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="bg-zinc-900/80 border border-white/10 p-8 sm:p-10 rounded-3xl backdrop-blur-xl shadow-2xl space-y-8 relative overflow-hidden font-mono">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
              ADMIN CLEARANCE
            </h1>
            <p className="text-[11px] text-zinc-400 uppercase tracking-widest">
              CHARVI FILMS // SECURE ACCESS CONSOLE
            </p>
          </div>

          {/* Error Message Box */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5 leading-relaxed"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {/* Animate between EMAIL and OTP steps */}
          <AnimatePresence mode="wait">
            {step === 'EMAIL' ? (
              /* STEP 1: EMAIL INPUT */
              <motion.form
                key="step-email"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSendOtp}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>ADMINISTRATOR EMAIL ADDRESS *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarvansharma14@gmail.com"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  onClick={playShutterClick}
                  onMouseEnter={playHoverTick}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>DISPATCHING OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>REQUEST 6-DIGIT OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* STEP 2: 6-DIGIT OTP VERIFICATION */
              <motion.form
                key="step-otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleVerifyOtp}
                className="space-y-5"
              >
                <div className="space-y-2 text-center">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
                    OTP SENT TO <strong className="text-amber-400">{email}</strong>
                  </span>

                  <input
                    type="text"
                    maxLength={6}
                    required
                    autoFocus
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="••••••"
                    className="w-full bg-black/80 border border-amber-500/50 rounded-xl py-3.5 text-center text-2xl tracking-[0.5em] font-black text-amber-400 placeholder-zinc-700 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <span className="text-[9px] text-zinc-500 block uppercase">
                    Check your email inbox or spam folder for the code
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  onClick={playShutterClick}
                  onMouseEnter={playHoverTick}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>VERIFYING CLEARANCE...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>VERIFY & ACCESS ADMIN</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[10px] pt-2 border-t border-white/10 text-zinc-400">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('EMAIL');
                      setOtp('');
                      setErrorMsg('');
                    }}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>CHANGE EMAIL</span>
                  </button>

                  <button
                    type="button"
                    disabled={resendTimer > 0}
                    onClick={handleSendOtp}
                    className="hover:text-amber-400 transition-colors disabled:opacity-40 disabled:hover:text-zinc-400"
                  >
                    {resendTimer > 0 ? `RESEND IN ${resendTimer}s` : 'RESEND OTP ↺'}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </div>
  );
}