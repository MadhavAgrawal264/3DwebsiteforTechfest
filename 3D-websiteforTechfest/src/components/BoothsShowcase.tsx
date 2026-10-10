import React from 'react';
import { Sparkles, Eye, Trophy, ArrowRight, ExternalLink } from 'lucide-react';
import { BOOTHS_DATA } from '../data/techfestData';
import { Booth } from '../types/techfest';
import { cyberSound } from '../audio/cyberSound';

interface BoothsShowcaseProps {
  onSelectBooth: (booth: Booth) => void;
  onWarpToBooth: (booth: Booth) => void;
}

export const BoothsShowcase: React.FC<BoothsShowcaseProps> = ({
  onSelectBooth,
  onWarpToBooth,
}) => {
  return (
    <section id="booths" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
          <span>INTERACTIVE SPATIAL EXHIBITION</span>
          <span aria-hidden="true">·</span>
          <span>5 THEMED SECTORS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-cyber font-extrabold text-white tracking-tight">
          Explore Cyber <span className="text-cyan-400">Booth Pavilions</span>
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-2xl">
          Click any booth to fly the 3D camera into its coordinates or inspect the competition rulebooks and arena telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BOOTHS_DATA.map((booth, idx) => (
          <div
            key={booth.id}
            className={`cyber-glass cyber-glass-hover rounded-xl p-6 border flex flex-col justify-between group ${
              booth.id === 'portfolio' ? 'border-cyan-400/50 lg:col-span-1 bg-cyan-950/20' : 'border-slate-800'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono text-cyan-400">{booth.codename}</span>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: booth.themeColor }}
                />
              </div>

              <h3 className="text-xl font-cyber font-bold text-white group-hover:text-cyan-300 transition-colors">
                {booth.name}
              </h3>

              <p className="text-xs text-slate-400 mt-1 font-mono">{booth.tagline}</p>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed line-clamp-3">
                {booth.description}
              </p>

              {/* Specs pill preview */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800">
                {booth.specs.slice(0, 2).map((s) => (
                  <div key={s.label} className="text-[11px]">
                    <span className="text-slate-500 block">{s.label}</span>
                    <span className="text-slate-200 font-mono font-semibold">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2">
              <button
                onClick={() => {
                  cyberSound.playWarp();
                  onWarpToBooth(booth);
                }}
                className="flex-1 py-2 px-3 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Fly 3D Camera</span>
              </button>

              <button
                onClick={() => {
                  cyberSound.playClick();
                  onSelectBooth(booth);
                }}
                className="py-2 px-3 text-xs font-mono text-slate-300 hover:text-white rounded border border-slate-700 hover:border-cyan-400/50 bg-black/50 transition-colors cursor-pointer"
                title="View Full Details"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
