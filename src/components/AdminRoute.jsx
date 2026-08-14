// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// 🔒 LIST OF AUTHORIZED ADMIN EMAILS
export const ALLOWED_ADMINS = [
  'sarvansharma14@gmail.com',
  'asifsahikh369@gmail.com', // Add any other admin email addresses here
];

export default function AdminRoute({ session, children }) {
  // 1. Not logged in at all -> redirect to /login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if the logged-in email is in the allowed admin list
  const userEmail = session.user?.email?.toLowerCase();
  const isAuthorized = ALLOWED_ADMINS.map((e) => e.toLowerCase()).includes(userEmail);

  if (!isAuthorized) {
    return <Navigate to="/login?error=unauthorized" replace />;
  }

  return children;
}
