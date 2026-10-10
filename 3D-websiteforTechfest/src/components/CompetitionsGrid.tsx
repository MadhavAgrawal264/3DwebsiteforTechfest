import React, { useState } from 'react';
import { Trophy, Users, Shield, ArrowUpRight, Flame, Search } from 'lucide-react';
import { BOOTHS_DATA } from '../data/techfestData';
import { cyberSound } from '../audio/cyberSound';

interface CompetitionsGridProps {
  onRegisterEvent: (eventName: string) => void;
}

export const CompetitionsGrid: React.FC<CompetitionsGridProps> = ({ onRegisterEvent }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all events from all booths
  const allEvents = BOOTHS_DATA.flatMap((b) =>
    b.featuredEvents.map((e) => ({
      ...e,
      sectorName: b.name,
      boothId: b.id,
      themeColor: b.themeColor,
      venue: b.venue,
    }))
  );

  const categories = ['all', 'Combat', 'Autonomous', 'Hackathon', 'Quantum', 'Aviation', 'Security'];

  const filteredEvents = allEvents.filter((event) => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="competitions" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            <span>IIT BOMBAY FLAGSHIP CHALLENGES</span>
            <span aria-hidden="true">·</span>
            <span>OVER ₹50 LAKHS PRIZE POOL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cyber font-extrabold text-white tracking-tight">
            Competitions & <span className="text-cyan-400">Arenas</span>
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-xl">
            Compete against the finest minds and roboticists across Asia. Register your team for high-voltage tournaments.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search competitions..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-black/60 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-xl border border-slate-800 overflow-x-auto mb-8 max-w-full">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              cyberSound.playClick();
              setSelectedCategory(cat);
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {cat === 'all' ? 'All Competitions' : cat}
          </button>
        ))}
      </div>

      {/* Competitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((item) => (
          <div
            key={item.title}
            className="cyber-glass cyber-glass-hover rounded-xl p-6 border border-slate-800/80 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-cyan-400">{item.category}</span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.themeColor }}
                />
              </div>

              <h3 className="text-lg font-cyber font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Trophy className="w-3.5 h-3.5" />
                  <span className="font-semibold">{item.prize}</span>
                </div>
                <div className="text-slate-400">
                  {item.teamsRegistered} teams registered
                </div>
              </div>
            </div>

            <div className="mt-5">
              <button
                onClick={() => {
                  cyberSound.playClick();
                  onRegisterEvent(item.title);
                }}
                className="w-full py-2 px-3 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Register Team</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
