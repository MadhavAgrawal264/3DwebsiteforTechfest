import React, { useState } from 'react';
import { 
  Linkedin, 
  Github, 
  Mail, 
  ExternalLink, 
  Code, 
  Layers, 
  Terminal, 
  Sparkles, 
  Check, 
  Copy, 
  Send,
  Award,
  Cpu,
  Monitor
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEVELOPER_PROFILE } from '../data/techfestData';
import { cyberSound } from '../audio/cyberSound';

export const DeveloperPortfolio: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const handleLinkedInClick = () => {
    cyberSound.playSuccess();
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00f3ff', '#ff007f', '#ffffff']
    });
    window.open(DEVELOPER_PROFILE.linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLinkedIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    cyberSound.playClick();
    navigator.clipboard.writeText(DEVELOPER_PROFILE.linkedinUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || !contactMessage.trim()) return;
    cyberSound.playSuccess();
    setContactSent(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f3ff', '#10b981']
    });
  };

  return (
    <section id="portfolio" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Section Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090e1f]/70 to-transparent pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
          <span>PORTFOLIO SHOWCASE</span>
          <span aria-hidden="true">·</span>
          <span>CREATIVE ENGINEER BEHIND TECHFEST 3D</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-cyber font-extrabold text-white tracking-tight">
          Web Developer: <span className="text-cyan-400">{DEVELOPER_PROFILE.name}</span>
        </h2>
        <p className="mt-2 text-base text-slate-300 max-w-2xl">
          Meet the engineer who designed and built this 3D interactive cyberpunk experience for Techfest IIT Bombay.
        </p>
      </div>

      {/* Main Developer Hero Card */}
      <div className="cyber-glass rounded-2xl p-6 sm:p-10 mb-16 border border-cyan-500/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Avatar & Quick Info */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="relative mb-6">
              {/* Holographic Avatar Frame */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-slate-900 to-fuchsia-500/20 border-2 border-cyan-400 p-1 flex items-center justify-center shadow-[0_0_30px_rgba(0,243,255,0.25)]">
                <div className="w-full h-full rounded-xl bg-[#070b16] flex flex-col items-center justify-center p-4 relative overflow-hidden">
                  <Monitor className="w-12 h-12 text-cyan-400 mb-2 animate-pulse" />
                  <span className="text-xs font-cyber font-bold text-white tracking-wider">
                    {DEVELOPER_PROFILE.name.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">LEAD DEV</span>
                  {/* Subtle Grid Accent */}
                  <div className="absolute inset-0 bg-[radial-gradient(#00f3ff_1px,transparent_1px)] [background-size:8px_8px] opacity-20 pointer-events-none" />
                </div>
              </div>
              <span className="absolute -bottom-2 -right-2 px-2.5 py-1 text-[10px] font-mono font-bold bg-cyan-400 text-black rounded-md shadow-md">
                AVAILABLE FOR WORK
              </span>
            </div>

            <h3 className="text-2xl font-cyber font-bold text-white">
              {DEVELOPER_PROFILE.name}
            </h3>
            <p className="text-sm text-cyan-400 font-mono mt-0.5">
              {DEVELOPER_PROFILE.title}
            </p>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              {DEVELOPER_PROFILE.bio}
            </p>

            {/* Prominent LinkedIn CTA Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-3 w-full">
              <button
                onClick={handleLinkedInClick}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#0077b5] hover:bg-[#006097] text-white font-medium text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,119,181,0.4)] transition-all cursor-pointer active:scale-95"
              >
                <Linkedin className="w-4 h-4 fill-white" />
                <span>Connect on LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>

              <button
                onClick={handleCopyLinkedIn}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                title="Copy LinkedIn Profile Link"
                aria-label="Copy LinkedIn Link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copiedLink && (
              <p className="text-[11px] text-emerald-400 font-mono mt-1.5">
                LinkedIn profile URL copied to clipboard!
              </p>
            )}
          </div>

          {/* Right Column: Stats & Skills Matrix */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {DEVELOPER_PROFILE.stats.map((stat) => (
                <div key={stat.label} className="p-3 rounded-xl bg-black/40 border border-slate-800">
                  <div className="text-2xl font-cyber font-bold text-white tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Skills Categorized */}
            <div className="space-y-4">
              {DEVELOPER_PROFILE.skills.map((skillGroup) => (
                <div key={skillGroup.category} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-2">
                    <Code className="w-3.5 h-3.5" />
                    <span>{skillGroup.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs text-slate-300 px-2.5 py-1 rounded bg-black/50 border border-slate-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Grid */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-cyber font-bold text-white">
              Featured Portfolio Projects
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Engineered by Kanishka Agarwal across 3D graphics, full-stack systems, and web apps.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEVELOPER_PROFILE.projects.map((proj) => (
            <div
              key={proj.id}
              className="cyber-glass cyber-glass-hover rounded-xl p-6 border border-slate-800 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-xs font-mono text-cyan-400">{proj.category}</span>
                  <span className="text-xs font-mono text-slate-500">{proj.period}</span>
                </div>

                <h4 className="text-xl font-cyber font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h4>

                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  {proj.description}
                </p>

                <div className="mt-3 p-2.5 rounded bg-cyan-950/20 border border-cyan-800/30 text-xs text-cyan-200">
                  <span className="font-semibold text-cyan-400">Impact: </span>
                  {proj.impact}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {proj.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono text-slate-300 bg-black/60 px-2 py-0.5 rounded border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <a
                  href={DEVELOPER_PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>Discuss with Madhav</span>
                </a>

                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Contact / Collaboration Card */}
      <div className="cyber-glass rounded-2xl p-6 sm:p-10 border border-cyan-500/20">
        <div className="max-w-2xl mx-auto text-center">
          <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
          <h3 className="text-2xl sm:text-3xl font-cyber font-bold text-white">
            Get in Touch with Madhav Agrawal
          </h3>
          <p className="text-sm text-slate-300 mt-2">
            Interested in building cutting-edge 3D WebGL experiences, technical architectures, or discussing festival collaboration?
          </p>

          {contactSent ? (
            <div className="mt-6 p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-200">
              <Check className="w-8 h-8 mx-auto text-emerald-400 mb-2" />
              <div className="font-cyber font-bold text-lg">Message Transmitted!</div>
              <p className="text-xs mt-1 text-emerald-300">
                Thank you for reaching out. Madhav will get back to you shortly at {contactEmail}.
              </p>
              <button
                onClick={() => setContactSent(false)}
                className="mt-4 px-4 py-1.5 text-xs font-mono bg-emerald-900/60 hover:bg-emerald-900 rounded text-emerald-200"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="mt-8 space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="E.g. Alex Sharma"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="alex@techfirm.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Project or Inquiry Note</label>
                <textarea
                  rows={3}
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Tell Madhav about your ideas or inquiry..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <a
                  href={`mailto:${DEVELOPER_PROFILE.email}`}
                  className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct: {DEVELOPER_PROFILE.email}</span>
                </a>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit to Madhav</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
