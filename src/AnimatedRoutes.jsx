// src/AnimatedRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Page Transition Wrapper
import PageTransition from './components/PageTransition';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Clients from './pages/Clients';
import Contact from './pages/Contact';
import Upcoming from './pages/Upcoming';
import Login from './pages/Login';
import Admin from './pages/Admin';
import UnderMaintenance from './pages/UnderMaintenance';

export default function AnimatedRoutes({ session, setSession }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home session={session} />
            </PageTransition>
          }
        />
        <Route
          path="/work"
          element={
            <PageTransition>
              <Work session={session} />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About session={session} />
            </PageTransition>
          }
        />
        <Route
          path="/clients"
          element={
            <PageTransition>
              <Clients session={session} />
            </PageTransition>
          }
        />
        <Route
          path="/upcoming"
          element={
            <PageTransition>
              <Upcoming session={session} />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact session={session} />
            </PageTransition>
          }
        />
        <Route
          path="/maintenance"
          element={
            <PageTransition>
              <UnderMaintenance session={session} />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login session={session} />
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute session={session}>
              <PageTransition>
                <Admin session={session} setSession={setSession} />
              </PageTransition>
            </AdminRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
