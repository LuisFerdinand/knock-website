// components/home/AboutSection.tsx
"use client";

import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface AboutFeature {
  id: number;
  feature: string;
}

interface AboutData {
  section: {
    heading: string;
    description: string;
    highlightText: string;
    yearsLabel: string;
    clientsLabel: string;
    mainImage: string;
    secondaryImage: string;
  };
  features: AboutFeature[];
}

export default function AboutSection() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch("/api/home/about");
      if (!response.ok) throw new Error("Failed to fetch about data");
      const result = await response.json();
      setAboutData(result.data);
    } catch (error) {
      console.error("Error fetching about data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-linear-to-br from-background/50 to-background/80 backdrop-blur-sm transition-colors duration-300 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </section>
    );
  }

  if (!aboutData || !aboutData.section) {
    return null;
  }

  return (
    <section className="section-padding bg-linear-to-br from-background/50 to-background/80 backdrop-blur-sm transition-colors duration-300 min-h-screen flex items-center">
      <div className="container-custom pt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-4/3 overflow-hidden relative">
              <Image
                src={aboutData.section.mainImage}
                alt="Proyek Desain Interior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              {/* Years of Excellence Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-6xl font-bold mb-2">
                    {aboutData.section.yearsLabel}
                  </div>
                  <div className="text-xl">Pengalaman</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 overflow-hidden hidden md:block">
              <Image
                src={aboutData.section.secondaryImage}
                alt="Klien Puas"
                fill
                className="object-cover filter grayscale"
              />
              <div className="absolute inset-0 bg-(--color-primary)/80 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <div className="text-3xl font-bold">
                    {aboutData.section.clientsLabel}
                  </div>
                  <div className="text-sm mt-1">Klien Puas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <h2 className="mb-6 text-foreground">
              {aboutData.section.heading}
            </h2>
            
            <p className="mb-6 text-lg text-muted-foreground font-semibold">
              {aboutData.section.description}
            </p>

            <ul className="mb-8 space-y-3 font-bold">
              {aboutData.features.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-(--color-secondary) shrink-0" />
                  <span className="text-foreground/80">{item.feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}