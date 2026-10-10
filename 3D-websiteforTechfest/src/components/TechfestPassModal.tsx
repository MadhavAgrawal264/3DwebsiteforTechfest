import React, { useState } from 'react';
import { X, Ticket, Sparkles, Download, Check, ShieldCheck, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cyberSound } from '../audio/cyberSound';

interface TechfestPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEventName?: string;
}

export const TechfestPassModal: React.FC<TechfestPassModalProps> = ({
  isOpen,
  onClose,
  initialEventName,
}) => {
  const [attendeeName, setAttendeeName] = useState('Alex Mercer');
  const [organization, setOrganization] = useState('IIT Bombay / Tech Explorer');
  const [passTier, setPassTier] = useState('Cyber All-Access Pass');
  const [passGenerated, setPassGenerated] = useState(false);
  const [passId, setPassId] = useState('TF26-9041-CYBER');

  if (!isOpen) return null;

  const handleGeneratePass = (e: React.FormEvent) => {
    e.preventDefault();
    cyberSound.playSuccess();
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const surname = attendeeName.split(' ').pop()?.toUpperCase() || 'USER';
    setPassId(`TF26-${randomHex}-${surname}`);
    setPassGenerated(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f3ff', '#ff007f', '#f59e0b', '#10b981'],
    });
  };

  const handlePrint = () => {
    cyberSound.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#090d19] border border-cyan-500/30 text-white p-6 sm:p-8 shadow-[0_0_60px_rgba(0,243,255,0.25)]">
        {/* Close Button */}
        <button
          onClick={() => {
            cyberSound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close Pass Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!passGenerated ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Ticket className="w-4 h-4" />
              <span>OFFICIAL REGISTRATION CONSOLE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-cyber font-bold">
              Claim Your Cyber Pass
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {initialEventName
                ? `Registering for: ${initialEventName}. Generate your verified Techfest 2026 digital badge.`
                : 'Generate your official Techfest IIT Bombay Cyberpunk Access Pass with verified hologram code.'}
            </p>

            <form onSubmit={handleGeneratePass} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/70 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  University / College / Organization
                </label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/70 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Access Tier
                </label>
                <select
                  value={passTier}
                  onChange={(e) => setPassTier(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/70 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="Cyber All-Access Pass">Cyber All-Access Pass (Full Conclave & Arenas)</option>
                  <option value="RoboWars Combat Pass">RoboWars Combat Pass (Lexan Cage Front Row)</option>
                  <option value="Quantum & AI Pass">Quantum & AI Pass (Workshops & Compute Labs)</option>
                  <option value="Developer Summit Pass">Developer Summit Pass (Web3 & Three.js Lab)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded shadow-[0_0_20px_rgba(0,243,255,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Issue Official Cyber Pass</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Holographic Pass Display */
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Check className="w-4 h-4" />
                <span>PASS VERIFIED & ISSUED</span>
              </div>
              <span className="text-xs font-mono text-cyan-400">{passId}</span>
            </div>

            {/* The Badge Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#0c1428] via-[#080d1a] to-[#1a0f28] border-2 border-cyan-400 relative overflow-hidden shadow-[0_0_30px_rgba(0,243,255,0.2)]">
              {/* Holographic Watermark Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#00f3ff_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                  <div>
                    <div className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">
                      TECHFEST IIT BOMBAY 2026
                    </div>
                    <div className="text-lg font-cyber font-bold text-white">
                      OFFICIAL ATTENDEE BADGE
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-cyan-300" />
                  </div>
                </div>

                <div className="my-5 grid grid-cols-3 gap-4 items-center">
                  <div className="col-span-2">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Attendee Name</div>
                    <div className="text-xl font-cyber font-bold text-white">{attendeeName}</div>

                    <div className="text-[10px] font-mono text-slate-400 uppercase mt-2">Affiliation</div>
                    <div className="text-xs text-slate-200 truncate">{organization}</div>

                    <div className="text-[10px] font-mono text-slate-400 uppercase mt-2">Pass Classification</div>
                    <div className="text-xs font-bold text-cyan-300">{passTier}</div>
                  </div>

                  {/* Mock Holographic QR Code */}
                  <div className="flex flex-col items-center justify-center p-2 rounded bg-black/60 border border-cyan-500/30">
                    <QrCode className="w-16 h-16 text-cyan-400" />
                    <span className="text-[8px] font-mono text-cyan-400 mt-1">SCAN AT GATE</span>
                  </div>
                </div>

                {/* Bottom Barcode Strip */}
                <div className="border-t border-cyan-500/20 pt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>DATES: DEC 18-20, 2026</span>
                  <span>POWAI, MUMBAI</span>
                  <span className="text-cyan-400 font-bold">IIT BOMBAY</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Print / Save Badge</span>
              </button>

              <button
                onClick={() => setPassGenerated(false)}
                className="py-2.5 px-4 text-xs font-mono text-slate-300 hover:text-white rounded border border-slate-800 hover:border-slate-700 bg-black/40"
              >
                Edit Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
