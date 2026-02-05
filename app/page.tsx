// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import AboutSection from "@/components/home/AboutSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import CTASection from "@/components/home/CTASection";
import IntroLoader from "@/components/IntroLoader";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  const handleIntroComplete = () => {
    console.log("Intro complete, transitioning to main content");
    setShowIntro(false);
    // Mark intro as shown in sessionStorage
    sessionStorage.setItem("introShown", "true");
  };

  // Render content in the background while intro plays
  // This ensures everything is loaded and ready
  return (
    <>
      {/* Main content - always rendered but hidden during intro */}
      <div style={{ 
        visibility: (isClient && showIntro) ? 'hidden' : 'visible',
        opacity: (isClient && showIntro) ? 0 : 1,
        transition: 'opacity 0.3s ease-in-out'
      }}>
        <Hero />
        <ServicesSection />
        <AboutSection />
        <PortfolioSection />
        <CTASection />
      </div>

      {/* Intro loader overlay - shown on top when active */}
      {isClient && showIntro && (
        <IntroLoader onComplete={handleIntroComplete} />
      )}
    </>
  );
}