// src/App.jsx
import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { supabase } from './supabaseClient';

// Components
import CameraCursor from './components/CameraCursor';
import Preloader from './components/Preloader';
import ThemeToggle from './components/ThemeToggle';
import AnimatedRoutes from './AnimatedRoutes';

export default function App() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <HashRouter>
      {/* 1. Multilingual Loading Screen (Runs once on start) */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Tactical Camera Custom Cursor */}
      <CameraCursor />

      {/* 3. Global Floating Theme Toggle */}
      <ThemeToggle />

      {/* 4. Animated Route Transitions Handler (Curtain Panel Transition) */}
      <AnimatedRoutes session={session} setSession={setSession} />
    </HashRouter>
  );
}