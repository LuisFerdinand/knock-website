/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(site)/about/page.tsx - Full CMS Version
"use client";

import { CheckCircle, Users, Award, Lightbulb, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Icon mapping
const iconMap: Record<string, any> = {
  Award,
  Users,
  Lightbulb,
  CheckCircle,
};

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/about');
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setAboutData(result.data);
          }
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Failed to load page content.</p>
      </div>
    );
  }

  const { mainSection, heroSection, valuesSection, teamSection } = aboutData;

  return (
    <div className="min-h-screen bg-background">
      {/* Main About Section */}
      {mainSection && (
        <section className="min-h-screen flex items-center">
          <div className="container-custom py-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Content Side */}
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-secondary">
                  {mainSection.heading}
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {mainSection.description}
                </p>
              </div>

              {/* Image Side */}
              <div className="relative">
                <div className="aspect-4/3 overflow-hidden shadow-2xl relative">
                  <Image
                    src={mainSection.image}
                    alt={mainSection.heading}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-[var(--color-secondary)]/10 rounded-2xl -z-10 hidden lg:block"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      {heroSection && (
        <section className="relative py-20 flex items-center justify-center overflow-hidden">
          <div className="container-custom flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Content on the left */}
            <div className="w-full lg:w-1/2 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-secondary">
                {heroSection.heading}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-lg">
                {heroSection.subheading}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={heroSection.ctaConsultLink}>
                  <Button size="lg" className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-800)] transition-all duration-300 group">
                    {heroSection.ctaConsultText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href={heroSection.ctaPortfolioLink}>
                  <Button size="lg" variant="outline" className="text-foreground">
                    {heroSection.ctaPortfolioText}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image on the right */}
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-4/3 lg:aspect-square overflow-hidden shadow-2xl relative">
                <Image
                  src={heroSection.image}
                  alt={heroSection.heading}
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-[var(--color-secondary)]/10 rounded-2xl -z-10 hidden lg:block"></div>
            </div>
          </div>
        </section>
      )}
      
      {/* Values Section */}
      {valuesSection && valuesSection.header && (
        <section className="min-h-screen flex items-center">
          <div className="container-custom py-20">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">
                {valuesSection.header.heading}
              </h2>
              <p className="text-xl text-muted-foreground">
                {valuesSection.header.description}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {valuesSection.values.map((value: any, index: number) => {
                const Icon = iconMap[value.icon] || Award;
                return (
                  <div 
                    key={index} 
                    className="group p-8 bg-card shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border"
                  >
                    {/* Icon */}
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] transition-all duration-500 group-hover:bg-[var(--color-secondary)] group-hover:text-white">
                      <Icon className="h-8 w-8" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 text-secondary">
                      {value.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {teamSection && teamSection.header && (
        <section className="min-h-screen py-20 lg:py-0 lg:h-screen flex items-center">
          <div className="container-custom h-full flex flex-col justify-center">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">
                {teamSection.header.heading}
              </h2>
              <p className="text-xl text-muted-foreground">
                {teamSection.header.description}
              </p>
            </div>

            <div className="flex-grow grid gap-12 lg:grid-cols-2 lg:gap-14 items-start">
              {/* Founder Section - Left */}
              {teamSection.members.find((m: any) => m.isFounder) && (
                <div className="space-y-6">
                  {(() => {
                    const founder = teamSection.members.find((m: any) => m.isFounder);
                    return (
                      <>
                        {/* Founder Portrait */}
                        <div className="relative max-w-md mx-auto lg:mx-0 w-full">
                          <div className="aspect-[3/4] w-full overflow-hidden shadow-2xl relative">
                            <Image
                              src={founder.image}
                              alt={founder.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        </div>

                        {/* Founder Info */}
                        <div className="space-y-3">
                          <h3 className="text-3xl mb-1 font-bold text-secondary">
                            {founder.name}
                          </h3>
                          <p className="text-lg text-muted-foreground">
                            {founder.position}
                          </p>
                          {founder.bio && (
                            <p className="text-muted-foreground leading-relaxed pt-2">
                              {founder.bio}
                            </p>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Team Members List - Right */}
              {teamSection.members.filter((m: any) => !m.isFounder).length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-secondary">
                    {teamSection.header.teamListHeading}
                  </h3>
                  <div className="space-y-4">
                    {teamSection.members
                      .filter((m: any) => !m.isFounder)
                      .map((member: any, index: number) => (
                        <div 
                          key={index}
                          className="border-l-2 border-border pl-6 py-2"
                        >
                          <h4 className="text-lg font-semibold text-secondary">
                            {member.name}
                          </h4>
                          <p className="text-muted-foreground">
                            {member.position}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}