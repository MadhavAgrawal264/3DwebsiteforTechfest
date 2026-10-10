import React from 'react';
import { ArrowDown, Zap, Terminal, Sparkles, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';
import { BOOTHS_DATA, FESTIVAL_METRICS } from '../data/techfestData';
import { Booth } from '../types/techfest';
import { cyberSound } from '../audio/cyberSound';

interface HeroOverlayProps {
  onWarpToBooth: (booth: Booth) => void;
  onExploreClick: () => void;
  onOpenPortfolio: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  onWarpToBooth,
  onExploreClick,
  onOpenPortfolio,
}) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none">
      {/* Top Banner & Edition Kicker */}
      <div className="pointer-events-auto max-w-2xl mt-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <span>IIT BOMBAY POWAI</span>
          <span aria-hidden="true">·</span>
          <span>ANNUAL SCIENCE & TECH CONCLAVE</span>
          <span aria-hidden="true">·</span>
          <span>DECEMBER 2026</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-cyber font-extrabold text-white tracking-tight leading-none">
          TECHFEST <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400">
            CYBER METROPOLIS
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
          Asia's largest science and technology festival reimagined as an interactive 3D cyberpunk city.
          Traverse futuristic sector booths, combat robotics arenas, and cutting-edge research pavilions.
        </p>

        {/* Developer attribution kicker */}
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <span>Engineered & Designed by</span>
          <button
            onClick={() => {
              cyberSound.playClick();
              onOpenPortfolio();
            }}
            className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
          >
            Madhav Agrawal (Web Developer)
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              cyberSound.playClick();
              onExploreClick();
            }}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded shadow-[0_0_25px_rgba(0,243,255,0.4)] transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>Explore 3D Booths</span>
          </button>

          <button
            onClick={() => {
              cyberSound.playClick();
              onOpenPortfolio();
            }}
            className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-cyan-300 bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 rounded backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <Terminal className="w-4 h-4" />
            <span>Developer Portfolio</span>
          </button>
        </div>
      </div>

      {/* Interactive 3D Booth Warp Bar */}
      <div className="pointer-events-auto my-8">
        <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive 3D Sector Warp Stations (Click to Fly)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BOOTHS_DATA.map((booth, idx) => (
            <button
              key={booth.id}
              onClick={() => {
                cyberSound.playWarp();
                onWarpToBooth(booth);
              }}
              className="group text-left p-3.5 rounded-lg bg-black/70 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-400/60 backdrop-blur-md transition-all duration-200 cursor-pointer hover:-translate-y-1 shadow-lg"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-300">
                  0{idx + 1}
                </span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: booth.themeColor }}
                />
              </div>
              <div className="text-xs font-cyber font-bold text-white group-hover:text-cyan-300 truncate">
                {booth.name.split('&')[0].trim()}
              </div>
              <div className="text-[11px] text-slate-400 truncate mt-0.5">
                {booth.category}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Festival Key Metrics Row */}
      <div className="pointer-events-auto border-t border-slate-800/80 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          {FESTIVAL_METRICS.map((metric) => (
            <div key={metric.label} className="p-3 bg-black/40 backdrop-blur-sm rounded border border-slate-800/60">
              <div className="text-xl sm:text-2xl font-cyber font-extrabold text-white tabular-nums tracking-wide">
                {metric.value}
              </div>
              <div className="text-xs font-medium text-slate-300 mt-0.5">{metric.label}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{metric.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Scroll Cue */}
      <div className="pointer-events-auto mx-auto mt-6 flex flex-col items-center gap-1.5 text-slate-400">
        <span className="text-[11px] font-mono tracking-widest uppercase">Scroll Down to Tour City</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-cyan-400" />
      </div>
    </div>
  );
};
