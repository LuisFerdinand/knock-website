// app/page.tsx (update this file)
"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import AboutSection from "@/components/home/AboutSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import CTASection from "@/components/home/CTASection";
import IntroLoader from "@/components/IntroLoader";
import { useIntro } from "@/context/IntroContext";

export default function Home() {
  const { isIntroActive, setIntroComplete } = useIntro();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    
    // Check if intro has already been shown in this session
    const introShown = sessionStorage.getItem("introShown");
    if (introShown === "true") {
      setIntroComplete();
    }
  }, [setIntroComplete]);

  const handleIntroComplete = () => {
    console.log("Intro complete, transitioning to main content");
    setIntroComplete();
  };

  return (
    <>
      {/* Main content - always rendered but hidden during intro */}
      <div style={{ 
        visibility: (isClient && isIntroActive) ? 'hidden' : 'visible',
        opacity: (isClient && isIntroActive) ? 0 : 1,
        transition: 'opacity 0.3s ease-in-out'
      }}>
        <Hero />
        <ServicesSection />
        <AboutSection />
        <PortfolioSection />
        <CTASection />
      </div>

      {/* Intro loader overlay - shown on top when active */}
      {isClient && isIntroActive && (
        <IntroLoader onComplete={handleIntroComplete} />
      )}
    </>
  );
}