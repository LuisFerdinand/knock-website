// components/home/ServicesSection.tsx
"use client";

import { Home, Hammer } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Map icon names to Lucide React components
const iconMap: Record<string, any> = {
  Home,
  Hammer,
};

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ServicesData {
  section: {
    heading: string;
    description: string;
    ctaText: string;
    ctaLink: string;
  };
  services: Service[];
}

export default function ServicesSection() {
  const [servicesData, setServicesData] = useState<ServicesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServicesData();
  }, []);

  const fetchServicesData = async () => {
    try {
      const response = await fetch("/api/home/services");
      if (!response.ok) throw new Error("Failed to fetch services data");
      const result = await response.json();
      setServicesData(result.data);
    } catch (error) {
      console.error("Error fetching services data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-background transition-colors duration-300 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </section>
    );
  }

  if (!servicesData || !servicesData.section) {
    return null;
  }

  return (
    <section className="section-padding bg-background transition-colors duration-300 min-h-screen flex items-center">
      <div className="container-custom pt-20">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="mb-4 text-secondary">{servicesData.section.heading}</h2>
          <p className="text-lg text-muted-foreground">
            {servicesData.section.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {servicesData.services.map((service) => {
            const IconComponent = iconMap[service.icon] || Home;
            
            return (
              <div 
                key={service.id} 
                className="group relative p-6 border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-ring"
              >
                {/* Icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-ring transition-all duration-300 group-hover:bg-ring group-hover:text-white">
                  <IconComponent className="h-6 w-6" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-secondary">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="my-10 text-center">
          <Link 
            href={servicesData.section.ctaLink}
            className="inline-flex items-center justify-center px-8 py-3 rounded-md border-2 border-border bg-background text-foreground font-medium transition-all duration-300 hover:bg-ring hover:text-white hover:border-ring"
          >
            {servicesData.section.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}