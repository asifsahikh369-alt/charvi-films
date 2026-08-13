// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { playHoverTick, playShutterClick } from '../utils/audio';

// Custom SVG Icons for Social Platforms
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

// =========================================================================
// 🌐 SOCIAL MEDIA LINKS CONFIGURATION
// Set `hidden: false` to show, or `hidden: true` to hide any platform logo
// =========================================================================
const SOCIAL_LINKS = [
  {
    name: 'INSTAGRAM',
    url: 'https://instagram.com/charvifilms',
    icon: InstagramIcon,
    hidden: false,
  },
  {
    name: 'FACEBOOK',
    url: 'https://facebook.com/charvifilms',
    icon: FacebookIcon,
    hidden: false,
  },
  {
    name: 'YOUTUBE',
    url: 'https://www.youtube.com/@charvifilms5277',
    icon: YoutubeIcon,
    hidden: false,
  },
  {
    name: 'X (TWITTER)',
    url: 'https://x.com/charvifilms',
    icon: TwitterIcon,
    hidden: false,
  },
];

const FOOTER_SECTIONS = [
  {
    title: 'PRODUCT',
    links: [
      'Showcase Engine',
      'AI Frame Scaler',
      'Cinema Layouts',
      'Interface Architecture',
      'Media Cloud Stream',
      'Interactive Treatment',
      'Asset Pipelines',
    ],
  },
  {
    title: 'SOLUTIONS',
    links: [
      'Studio Showreels',
      'Narrative Short Films',
      'Film Productions',
      'Director Portfolios',
      'Documentary Streams',
      'Creative Software',
      'VFX Client Portals',
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      'Cinematography Journal',
      'Security & Protocol',
      'Color Grading Hub',
      'Studio Specs',
      'Plugin Index',
      'Accessibility Code',
    ],
  },
  {
    title: 'SUPPORT',
    links: [
      'Help Terminal',
      'Hire Crew Experts',
      'Report Abuse',
      'System Infrastructure',
    ],
  },
  {
    title: 'COMPANY',
    links: [
      'Network Alliances',
      'Press & Assets',
      'Investor Index',
      'Studio Ventures',
      'Statement Policy',
      'Patent Notice',
      'Sitemap',
      'Careers',
    ],
  },
];

export default function Footer() {
  // Filter out any social links that have `hidden: true`
  const activeSocialLinks = SOCIAL_LINKS.filter((social) => !social.hidden);

  return (
    <footer className="bg-zinc-950 text-white border-t border-white/10 pt-16 pb-12 font-mono text-xs select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-10">
        
        {/* ========================================================= */}
        {/* FOOTER DIRECTORY SUB-LINKS GRID */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 border-b border-white/10 pb-12">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400">
                {section.title}
              </h3>
              <ul className="space-y-2.5 text-[11px] font-sans font-light text-zinc-400">
                {section.links.map((linkName) => (
                  <li key={linkName}>
                    <Link
                      to="/maintenance"
                      onClick={playShutterClick}
                      onMouseEnter={playHoverTick}
                      className="hover:text-white transition-colors block uppercase tracking-wider hover:translate-x-1 duration-200"
                    >
                      {linkName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Redirect Link Line */}
        <div className="text-center">
          <Link
            to="/contact"
            onClick={playShutterClick}
            onMouseEnter={playHoverTick}
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors uppercase tracking-wider inline-block"
          >
            contact :- <span className="text-indigo-400 font-bold hover:underline">sarvansharma14@gmail.com</span>
          </Link>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM LEGAL & COPYRIGHT BAR */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-500 border-t border-white/10 pt-8">
          <p>© 2026 CHARVI FILMS // ALL RIGHTS RESERVED</p>
          <p className="text-indigo-400 uppercase tracking-widest font-bold">
            DIRECTED BY SANGEET KUMAR
          </p>
        </div>

        {/* ========================================================= */}
        {/* SOCIAL LOGOS ROW DIRECTLY BELOW 2026 RIGHT RESERVED */}
        {/* ========================================================= */}
        <div className="flex items-center justify-center gap-6 pt-1">
          {activeSocialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playShutterClick}
                onMouseEnter={playHoverTick}
                className="text-zinc-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 p-1"
                title={`Charvi Films on ${social.name}`}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>

      </div>
    </footer>
  );
}