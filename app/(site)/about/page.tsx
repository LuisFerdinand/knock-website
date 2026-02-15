/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(site)/about/page.tsx
"use client";

import { CheckCircle, Users, Award, Lightbulb, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Fallback data for values
const fallbackValues = [
  {
    icon: "Award",
    title: "Kualitas Terbaik",
    description: "Kami berkomitmen memberikan hasil kerja dengan standar tertinggi untuk setiap proyek.",
  },
  {
    icon: "Users",
    title: "Tim Profesional",
    description: "Tim kami terdiri dari desainer dan arsitek berpengalaman dengan passion dalam bidangnya.",
  },
  {
    icon: "Lightbulb",
    title: "Inovasi Berkelanjutan",
    description: "Kami selalu mencari solusi kreatif dan berkelanjutan untuk setiap tantangan desain.",
  },
  {
    icon: "CheckCircle",
    title: "Kepuasan Klien",
    description: "Kepuasan klien adalah prioritas utama kami, kami berusaha melampaui ekspektasi.",
  },
];

// Icon mapping
const iconMap: Record<string, any> = {
  Award,
  Users,
  Lightbulb,
  CheckCircle,
};

export default function AboutPage() {
  const [values, setValues] = useState(fallbackValues);
  const [founder, setFounder] = useState<any>(null);
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch values
        const valuesRes = await fetch('/api/about/values');
        if (valuesRes.ok) {
          const valuesData = await valuesRes.json();
          if (valuesData.success && valuesData.data.length > 0) {
            setValues(valuesData.data);
          }
        }

        // Fetch team members
        const teamRes = await fetch('/api/about/team');
        if (teamRes.ok) {
          const teamData = await teamRes.json();
          if (teamData.success && teamData.data.length > 0) {
            // Separate founder and team members
            const founderData = teamData.data.find((member: any) => member.isFounder);
            const teamMembers = teamData.data.filter((member: any) => !member.isFounder);
            
            setFounder(founderData);
            setTeam(teamMembers);
          }
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
        // Keep using fallback data
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Main About Section */}
      <section className="min-h-screen flex items-center">
        <div className="container-custom py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary">
                Menciptakan Ruang yang Menginspirasi
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                KNOCK adalah Home & Space Improvement Studio yang membantu pemilik rumah meningkatkan kualitas ruang hidup—baik dari sisi fungsi, estetika, maupun kenyamanan. Kami percaya bahwa rumah bukan sekedar membangun atau memperbaiki, tetapi tentang meningkatkan cara sebuah ruang digunakan dan dirasakan. Karena itu, setiap proyek KNOCK dimulai dengan pemahaman kebutuhan klien, visualisasi desain yang jelas, dan perencanaan yang terukur.
              </p>

              {/* <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="border-l-4 border-[var(--color-secondary)] pl-6">
                  <div className="text-4xl font-bold text-foreground mb-2">500+</div>
                  <div className="text-muted-foreground">Proyek Selesai</div>
                </div>
                <div className="border-l-4 border-[var(--color-secondary)] pl-6">
                  <div className="text-4xl font-bold text-foreground mb-2">15+</div>
                  <div className="text-muted-foreground">Tahun Pengalaman</div>
                </div>
              </div> */}
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="aspect-4/3 overflow-hidden shadow-2xl relative">
                <Image
                  src="/about/Bricks.png"
                  alt="Knock Studio Team"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-[var(--color-secondary)]/10 rounded-2xl -z-10 hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 flex items-center justify-center overflow-hidden">
        <div className="container-custom flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Content on the left */}
          <div className="w-full lg:w-1/2 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-secondary">
              Tentang Knock Studio
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-lg">
              Menciptakan ruang impian sejak tahun 2021 dengan desain yang inovatif dan berkelanjutan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/schedule">
                <Button size="lg" className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-800)] transition-all duration-300 group">
                  Konsultasi dengan Kami
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="text-foreground">
                  Lihat Karya Kami
                </Button>
              </Link>
            </div>
          </div>

          {/* Image on the right */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-4/3 lg:aspect-square overflow-hidden shadow-2xl relative">
              <Image
                src="/about/aset1.png"
                alt="Modern architecture"
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
      
      {/* Values Section */}
      <section className="min-h-screen flex items-center">
        <div className="container-custom py-20">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">Nilai-Nilai Kami</h2>
            <p className="text-xl text-muted-foreground">
              Nilai-nilai ini menjadi landasan kami dalam bekerja, menjaga kualitas, profesionalisme, dan kepercayaan di setiap proyek.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
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

      {/* Team Section - Updated to fix mobile issues */}
      <section className="min-h-screen py-20 lg:py-0 lg:h-screen flex items-center">
        <div className="container-custom h-full flex flex-col justify-center">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">Tim Profesional Kami</h2>
            <p className="text-xl text-muted-foreground">
              Berkenalan dengan tim kreatif yang siap mewujudkan visi Anda
            </p>
          </div>

          <div className="flex-grow grid gap-12 lg:grid-cols-2 lg:gap-14 items-start">
            {/* Founder Section - Left */}
            {founder && (
              <div className="space-y-6">
                {/* Founder Portrait - Fixed height for mobile */}
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
              </div>
            )}

            {/* Team Members List - Right */}
            {team.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-secondary">Our Team</h3>
                <div className="space-y-4">
                  {team.map((member, index) => (
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
    </div>
  );
}