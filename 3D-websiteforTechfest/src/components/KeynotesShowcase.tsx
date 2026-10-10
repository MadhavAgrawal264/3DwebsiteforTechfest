import React from 'react';
import { Sparkles, Mic, Award, Globe, UserCheck } from 'lucide-react';
import { KEYNOTE_SPEAKERS } from '../data/techfestData';

export const KeynotesShowcase: React.FC = () => {
  return (
    <section id="keynotes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
          <span>INTERNATIONAL LECTURE SERIES</span>
          <span aria-hidden="true">·</span>
          <span>DISTINGUISHED MINDS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-cyber font-extrabold text-white tracking-tight">
          Techfest <span className="text-cyan-400">Keynote Conclave</span>
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-2xl">
          Hear from visionary thinkers, Nobel Laureates, astronauts, and pioneering technologists who have graced the stage at IIT Bombay.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {KEYNOTE_SPEAKERS.map((speaker) => (
          <div
            key={speaker.name}
            className="cyber-glass rounded-xl p-6 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-black/60 border border-cyan-500/30 flex items-center justify-center text-2xl mb-4 shadow-[0_0_15px_rgba(0,243,255,0.15)]">
                {speaker.imageFallback}
              </div>

              <div className="text-[11px] font-mono text-cyan-400 mb-1">
                {speaker.tag}
              </div>

              <h3 className="text-lg font-cyber font-bold text-white">
                {speaker.name}
              </h3>

              <div className="text-xs text-slate-400 mt-0.5">
                {speaker.role}
              </div>

              <p className="text-xs text-slate-300 mt-3 italic leading-relaxed border-t border-slate-800/80 pt-3">
                "{speaker.topic}"
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <Mic className="w-3.5 h-3.5 text-cyan-400" />
              <span>IIT Bombay Convocation Hall</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
