import React from 'react';
import { Volume2, VolumeX, Compass, Sparkles, User, Ticket } from 'lucide-react';
import { cyberSound } from '../audio/cyberSound';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
  isFreeOrbit: boolean;
  onToggleFreeOrbit: () => void;
  onOpenPassModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  onToggleMute,
  isFreeOrbit,
  onToggleFreeOrbit,
  onOpenPassModal,
  onNavigateSection,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#05070f]/85 backdrop-blur-md border-b border-cyan-500/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              cyberSound.playClick();
              onNavigateSection('hero');
            }}
            className="text-lg font-cyber font-bold tracking-wider text-white hover:text-cyan-300 transition-colors whitespace-nowrap"
          >
            TECHFEST <span className="text-cyan-400">IIT BOMBAY</span>
          </a>
        </div>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-slate-300">
          <button
            onClick={() => {
              cyberSound.playHover();
              onNavigateSection('hero');
            }}
            className="hover:text-cyan-300 transition-colors whitespace-nowrap hover:underline underline-offset-4 cursor-pointer"
          >
            3D Metropolis
          </button>
          <button
            onClick={() => {
              cyberSound.playHover();
              onNavigateSection('booths');
            }}
            className="hover:text-cyan-300 transition-colors whitespace-nowrap hover:underline underline-offset-4 cursor-pointer"
          >
            Exhibition Booths
          </button>
          <button
            onClick={() => {
              cyberSound.playHover();
              onNavigateSection('competitions');
            }}
            className="hover:text-cyan-300 transition-colors whitespace-nowrap hover:underline underline-offset-4 cursor-pointer"
          >
            Competitions
          </button>
          <button
            onClick={() => {
              cyberSound.playHover();
              onNavigateSection('keynotes');
            }}
            className="hover:text-cyan-300 transition-colors whitespace-nowrap hover:underline underline-offset-4 cursor-pointer"
          >
            Keynotes
          </button>
          <button
            onClick={() => {
              cyberSound.playHover();
              onNavigateSection('portfolio');
            }}
            className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors whitespace-nowrap hover:underline underline-offset-4 cursor-pointer flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5" />
            Madhav's Portfolio
          </button>
        </nav>

        {/* Zone 3: 1 primary action + helper utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Audio toggle button */}
          <button
            onClick={() => {
              cyberSound.playClick();
              onToggleMute();
            }}
            className="p-2 text-slate-400 hover:text-cyan-300 transition-colors rounded border border-slate-800 hover:border-cyan-500/40 bg-black/40"
            title={isMuted ? 'Unmute Cyber Synth Audio' : 'Mute Audio'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* 3D Orbit Toggle */}
          <button
            onClick={() => {
              cyberSound.playClick();
              onToggleFreeOrbit();
            }}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded border transition-colors ${
              isFreeOrbit
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40'
                : 'border-slate-800 text-slate-400 hover:text-white bg-black/40'
            }`}
            title="Toggle Free 3D Orbit"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{isFreeOrbit ? 'Orbit On' : 'Tour Mode'}</span>
          </button>

          {/* Primary Action CTA */}
          <button
            onClick={() => {
              cyberSound.playClick();
              onOpenPassModal();
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded shadow-[0_0_20px_rgba(0,243,255,0.35)] transition-all whitespace-nowrap cursor-pointer active:scale-95"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Get Cyber Pass</span>
          </button>
        </div>
      </div>
    </header>
  );
};
