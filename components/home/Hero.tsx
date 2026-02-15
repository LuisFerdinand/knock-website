// components/home/Hero.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface HeroData {
  title: string;
  description: string;
  backgroundImage: string;
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await fetch("/api/home/hero");
      if (!response.ok) throw new Error("Failed to fetch hero data");
      const result = await response.json();
      setHeroData(result.data);
    } catch (error) {
      console.error("Error fetching hero data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="relative w-full h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </section>
    );
  }

  if (!heroData) {
    return null;
  }

  return (
    <section className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* 
        PARALLAX BACKGROUND IMAGE
      */}
      <div className="fixed bottom-0 left-0 w-full h-[120vh] -z-10 grayscale-[80%] contrast-125">
        <Image
          src={heroData.backgroundImage}
          alt="Modern architecture sketch"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 
        TOP HALF (Colored Overlay)
      */}
      <div className="h-1/2 w-full bg-background z-10 transition-colors duration-300 relative">
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent opacity-100" />
      </div>

      {/* 
        CONTENT AREA
      */}
      <div className="absolute top-0 left-0 w-full h-1/2 z-20 flex flex-col items-start justify-center pt-20 pointer-events-none">
        <div className="container-custom w-full pointer-events-auto">
          <h1 className="text-secondary mt-8 mb-0 tracking-loose text-left whitespace-pre-line">
            {heroData.title}
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mb-10 text-left tracking-tight text-muted-foreground">
            {heroData.description}
          </p>
        </div>
      </div>

      {/* 
        BOTTOM HALF (Window to Image)
      */}
      <div className="h-1/2 w-full relative z-0 pointer-events-none" />
    </section>
  );
}