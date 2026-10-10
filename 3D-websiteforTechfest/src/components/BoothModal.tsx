import React from 'react';
import { X, Trophy, Calendar, MapPin, Sparkles, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { Booth } from '../types/techfest';
import { cyberSound } from '../audio/cyberSound';

interface BoothModalProps {
  booth: Booth | null;
  onClose: () => void;
  onRegisterEvent: (eventName: string) => void;
}

export const BoothModal: React.FC<BoothModalProps> = ({
  booth,
  onClose,
  onRegisterEvent,
}) => {
  if (!booth) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#090d1a] border border-cyan-500/30 text-slate-100 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 sm:p-8"
        style={{
          boxShadow: `0 0 35px -5px ${booth.themeColor}33`,
        }}
      >
        {/* Top Bar with Codename and Close */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-cyan-400">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: booth.themeColor }}
              />
              <span>{booth.codename}</span>
              <span aria-hidden="true">·</span>
              <span>{booth.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-cyber font-bold text-white mt-1">
              {booth.name}
            </h2>
            <p className="text-sm text-slate-400 mt-1">{booth.tagline}</p>
          </div>

          <button
            onClick={() => {
              cyberSound.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Details Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
          <div className="p-3 rounded-lg bg-black/40 border border-slate-800 flex items-center gap-3">
            <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Prize Pool</div>
              <div className="text-sm font-semibold text-white">{booth.prizePool}</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-slate-800 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Event Dates</div>
              <div className="text-sm font-semibold text-white">{booth.dates}</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-slate-800 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Campus Venue</div>
              <div className="text-sm font-semibold text-white truncate">{booth.venue}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Sector Overview</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{booth.description}</p>
        </div>

        {/* Technical Specs Grid */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Arena & Technical Specifications</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {booth.specs.map((spec) => (
              <div key={spec.label} className="p-2.5 rounded bg-black/50 border border-slate-800/80">
                <div className="text-[11px] text-slate-400">{spec.label}</div>
                <div className="text-xs font-cyber font-bold text-cyan-300 mt-0.5">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Highlights */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Key Highlights</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {booth.highlights.map((hl, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Events in this Booth */}
        <div className="border-t border-slate-800 pt-5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Flagship Competitions & Challenges
          </h3>
          <div className="space-y-3">
            {booth.featuredEvents.map((event) => (
              <div
                key={event.title}
                className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-cyber font-bold text-white">{event.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      Prize: {event.prize}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{event.description}</p>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {event.teamsRegistered} teams registered so far
                  </div>
                </div>

                <button
                  onClick={() => {
                    cyberSound.playClick();
                    onRegisterEvent(event.title);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded transition-all whitespace-nowrap self-start sm:self-auto cursor-pointer"
                >
                  Register Entry
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
