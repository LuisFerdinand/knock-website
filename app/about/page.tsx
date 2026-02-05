// app/about/page.tsx
"use client";

import { CheckCircle, Users, Award, Lightbulb, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Award,
    title: "Kualitas Terbaik",
    description: "Kami berkomitmen memberikan hasil kerja dengan standar tertinggi untuk setiap proyek.",
  },
  {
    icon: Users,
    title: "Tim Profesional",
    description: "Tim kami terdiri dari desainer dan arsitek berpengalaman dengan passion dalam bidangnya.",
  },
  {
    icon: Lightbulb,
    title: "Inovasi Berkelanjutan",
    description: "Kami selalu mencari solusi kreatif dan berkelanjutan untuk setiap tantangan desain.",
  },
  {
    icon: CheckCircle,
    title: "Kepuasan Klien",
    description: "Kepuasan klien adalah prioritas utama kami, kami berusaha melampaui ekspektasi.",
  },
];

const team = [
  {
    name: "Andi Pratama",
    position: "Principal Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8GVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Siti Nurhaliza",
    position: "Lead Interior Designer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c6ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8GVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Budi Santoso",
    position: "Senior 3D Visualizer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8GVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Maya Putri",
    position: "Project Manager",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8GVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container-custom flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Content on the left */}
          <div className="w-full lg:w-1/2 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Tentang <span className="text-foreground">Knock Studio</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-lg">
              Menciptakan ruang impian sejak tahun 2008 dengan desain yang inovatif dan berkelanjutan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/schedule">
                <Button size="lg" className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-800)] transition-all duration-300 group">
                  Jadwalkan Konsultasi
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
            <div className="aspect-4/3 lg:aspect-square rounded-2xl overflow-hidden shadow-2xl relative">
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8GVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&auto=format&fit=crop"
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-[var(--color-primary)] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[var(--color-primary)] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen flex items-center">
        <div className="container-custom py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Menciptakan Ruang yang <span className="text-[var(--color-secondary)]">Menginspirasi</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Knock Studio adalah studio desain arsitektur dan interior yang berbasis di Jakarta. 
                Didirikan pada tahun 2008, kami telah berdedikasi untuk menciptakan ruang yang 
                tidak hanya fungsional tetapi juga estetis dan berkelanjutan.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Filosofi kami adalah mendengarkan kebutuhan klien, memahami gaya hidup mereka, 
                dan menerjemahkannya ke dalam desain yang unik dan personal. Setiap proyek adalah 
                perjalanan kolaboratif antara tim kami dan klien.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="border-l-4 border-(--color-secondary) pl-6">
                  <div className="text-4xl font-bold text-foreground mb-2">500+</div>
                  <div className="text-muted-foreground">Proyek Selesai</div>
                </div>
                <div className="border-l-4 border-(--color-secondary) pl-6">
                  <div className="text-4xl font-bold text-foreground mb-2">15+</div>
                  <div className="text-muted-foreground">Tahun Pengalaman</div>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl relative">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8GVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
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

      {/* Values Section */}
      <section className="min-h-screen flex items-center">
        <div className="container-custom py-20">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Nilai-Nilai Kami</h2>
            <p className="text-xl text-muted-foreground">
              Prinsip yang memandu setiap keputusan desain kami
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index} 
                  className="group p-8 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border"
                >
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] transition-all duration-500 group-hover:bg-[var(--color-secondary)] group-hover:text-white">
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
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

      {/* Team Section */}
      <section className="min-h-screen flex items-center">
        <div className="container-custom py-20">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Tim Profesional Kami</h2>
            <p className="text-xl text-muted-foreground">
              Berkenalan dengan tim kreatif yang siap mewujudkan visi Anda
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{member.name}</h3>
                <p className="text-muted-foreground">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-800)] text-white">
        <div className="container-custom py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Tertarik Bekerja dengan Kami?
            </h2>
            
            <p className="mb-12 text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Mari diskusikan proyek Anda bersama tim kami. Kami siap membantu mewujudkan 
              ruang impian Anda dengan pendekatan personal dan profesional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/schedule">
                <Button size="lg" className="bg-white text-foreground hover:bg-gray-100 transition-all duration-300 text-lg px-8 py-6 group">
                  Jadwalkan Konsultasi
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground transition-all duration-300 text-lg px-8 py-6">
                  Lihat Karya Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}