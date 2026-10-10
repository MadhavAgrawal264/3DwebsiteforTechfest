import React from 'react';
import { Linkedin, Github, Mail, Heart, ExternalLink } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/techfestData';
import { cyberSound } from '../audio/cyberSound';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenPortfolio: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenPortfolio }) => {
  return (
    <footer className="border-t border-cyan-500/15 bg-[#04060d] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Festival Info */}
        <div className="text-center md:text-left">
          <div className="text-lg font-cyber font-bold text-white tracking-wider">
            TECHFEST <span className="text-cyan-400">IIT BOMBAY</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Asia's Premier Science & Technology Conclave · Powai, Mumbai 400076
          </p>
          <div className="text-xs text-slate-500 mt-2">
            © 2026 Techfest, IIT Bombay. All rights reserved.
          </div>
        </div>

        {/* Developer Credit & Portfolio Spotlight */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center md:text-left max-w-md">
          <div className="text-xs font-mono text-cyan-400 mb-1">
            WEBSITE ARCHITECT & DEVELOPER
          </div>
          <div className="text-sm font-cyber font-bold text-white flex items-center justify-center md:justify-start gap-2">
            <span>{DEVELOPER_PROFILE.name}</span>
            <span className="text-xs text-slate-500 font-normal">· {DEVELOPER_PROFILE.title}</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Specialized in 3D WebGL, Three.js, and interactive frontend applications.
          </p>
          <div className="mt-3 flex items-center justify-center md:justify-start gap-3">
            <a
              href={DEVELOPER_PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#0077b5] hover:text-cyan-300 transition-colors font-medium"
            >
              <Linkedin className="w-3.5 h-3.5 fill-current" />
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => {
                cyberSound.playClick();
                onOpenPortfolio();
              }}
              className="text-xs text-slate-400 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              View Full Portfolio
            </button>
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
          <button
            onClick={() => onNavigateSection('hero')}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Metropolis
          </button>
          <button
            onClick={() => onNavigateSection('booths')}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Booths
          </button>
          <button
            onClick={() => onNavigateSection('competitions')}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Competitions
          </button>
          <button
            onClick={() => onNavigateSection('keynotes')}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Keynotes
          </button>
          <button
            onClick={() => onNavigateSection('portfolio')}
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer"
          >
            Portfolio
          </button>
        </div>
      </div>
    </footer>
  );
};
