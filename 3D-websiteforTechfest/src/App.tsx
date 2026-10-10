import React, { useState, useEffect, useCallback } from 'react';
import { CyberScene3D } from './components/CyberScene3D';
import { Header } from './components/Header';
import { HeroOverlay } from './components/HeroOverlay';
import { BoothsShowcase } from './components/BoothsShowcase';
import { CompetitionsGrid } from './components/CompetitionsGrid';
import { KeynotesShowcase } from './components/KeynotesShowcase';
import { DeveloperPortfolio } from './components/DeveloperPortfolio';
import { Footer } from './components/Footer';
import { BoothModal } from './components/BoothModal';
import { TechfestPassModal } from './components/TechfestPassModal';
import { Booth } from './types/techfest';
import { BOOTHS_DATA } from './data/techfestData';
import { cyberSound } from './audio/cyberSound';

export default function App() {
  const [activeBoothId, setActiveBoothId] = useState<string | null>(null);
  const [selectedBoothModal, setSelectedBoothModal] = useState<Booth | null>(null);
  const [hoveredBooth, setHoveredBooth] = useState<Booth | null>(null);
  const [isFreeOrbit, setIsFreeOrbit] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [passInitialEvent, setPassInitialEvent] = useState<string | undefined>();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor window scroll to drive 3D camera spline
  useEffect(() => {
    const handleScroll = () => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const progress = Math.max(0, Math.min(1, window.scrollY / totalScrollable));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mute audio toggle
  const handleToggleMute = useCallback(() => {
    const nextState = cyberSound.toggleMute();
    setIsMuted(nextState);
  }, []);

  // Free Orbit toggle
  const handleToggleFreeOrbit = useCallback(() => {
    setIsFreeOrbit((prev) => !prev);
    setActiveBoothId(null);
  }, []);

  // Warp to booth (fly camera & open details if desired)
  const handleWarpToBooth = useCallback((booth: Booth) => {
    setActiveBoothId(booth.id);
    setIsFreeOrbit(false);
    // Smooth scroll to top / hero to see the 3D action
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Select booth to open detail modal
  const handleSelectBooth = useCallback((booth: Booth) => {
    setActiveBoothId(booth.id);
    setSelectedBoothModal(booth);
  }, []);

  // Navigation scroll helper
  const handleNavigateSection = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      setActiveBoothId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Event registration handler from competitions or booths
  const handleRegisterEvent = useCallback((eventName: string) => {
    setPassInitialEvent(eventName);
    setSelectedBoothModal(null);
    setIsPassModalOpen(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05070f] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3D WebGL Canvas Layer - Fixed Background Viewport */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <CyberScene3D
          activeBoothId={activeBoothId}
          onSelectBooth={handleSelectBooth}
          onHoverBooth={setHoveredBooth}
          scrollProgress={scrollProgress}
          isFreeOrbit={isFreeOrbit}
          onToggleFreeOrbit={handleToggleFreeOrbit}
        />
      </div>

      {/* Top Header */}
      <Header
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isFreeOrbit={isFreeOrbit}
        onToggleFreeOrbit={handleToggleFreeOrbit}
        onOpenPassModal={() => {
          setPassInitialEvent(undefined);
          setIsPassModalOpen(true);
        }}
        onNavigateSection={handleNavigateSection}
      />

      {/* DOM Overlay Content Layer */}
      <main className="relative z-10 pointer-events-none">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen">
          <HeroOverlay
            onWarpToBooth={handleWarpToBooth}
            onExploreClick={() => handleNavigateSection('booths')}
            onOpenPortfolio={() => handleNavigateSection('portfolio')}
          />
        </section>

        {/* Backdrop Tint for Readable Scrolling Sections */}
        <div className="pointer-events-auto bg-[#05070f]/90 backdrop-blur-lg border-t border-cyan-500/20 shadow-2xl transition-all">
          {/* Booths Showcase */}
          <BoothsShowcase
            onSelectBooth={handleSelectBooth}
            onWarpToBooth={handleWarpToBooth}
          />

          {/* Competitions Grid */}
          <CompetitionsGrid onRegisterEvent={handleRegisterEvent} />

          {/* Keynotes Section */}
          <KeynotesShowcase />

          {/* Dedicated Kanishka Agarwal Developer Portfolio Section */}
          <DeveloperPortfolio />

          {/* Footer */}
          <Footer
            onNavigateSection={handleNavigateSection}
            onOpenPortfolio={() => handleNavigateSection('portfolio')}
          />
        </div>
      </main>

      {/* Interactive Modals */}
      <BoothModal
        booth={selectedBoothModal}
        onClose={() => setSelectedBoothModal(null)}
        onRegisterEvent={handleRegisterEvent}
      />

      <TechfestPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        initialEventName={passInitialEvent}
      />
    </div>
  );
}
