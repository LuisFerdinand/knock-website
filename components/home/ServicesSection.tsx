// /components/home/ServicesSection.tsx
"use client";

import { Home, Ruler, Layers, Wallet } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Home,
    title: "Home Renovation",
    description: "Renovasi rumah skala kecil hingga menengah dengan pengerjaan rapih dan terukur.",
  },
  {
    icon: Ruler,
    title: "Design Visualization",
    description: "Desain denah dan visual 3D ringan untuk membantu. melihat dan menyesuaikan kebutuhan sebelum renovasi dimulai.",
  },
  {
    icon: Wallet,
    title: "Consultation & Survey",
    description: "Konsultasi kebutuhan renovasi dan survey lokasi untuk menentukan solusi terbaik.",
  },
  {
    icon: Layers,
    title: "Project Execution",
    description: "Pengerjaan renovasi oleh tim tukang berpengalaman dengan pengawasan langsung agar hasil sesuai rencana.",
  },
];

export default function ServicesSection() {
  return (
    <section className="section-padding bg-background transition-colors duration-300 min-h-screen flex items-center">
      <div className="container-custom pt-20">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="mb-4 text-foreground">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive design solutions tailored to bring your vision to life
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="group relative p-6 rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-ring"
              >
                {/* Icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-ring transition-all duration-300 group-hover:bg-ring group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-card-foreground">
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
            href="/services"
            className="inline-flex items-center justify-center px-8 py-3 rounded-md border-2 border-border bg-background text-foreground font-medium transition-all duration-300 hover:bg-ring hover:text-white hover:border-ring"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}