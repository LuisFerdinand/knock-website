// /omponents/home/PortfolioSection.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "Knock (Puri Bintaro)",
    category: "Arsitektur",
    image: "/portfolio/1/after.jpeg",
  },
  {
    title: "Golden Park2 (Cisauk)",
    category: "Desain Interior",
    image: "/portfolio/2/after.jpg",
  },
  {
    title: "Rumah Minimalis",
    category: "Desain Interior",
    image: "/portfolio/3/after.jpg",
  },
  {
    title: "Gama (Depok)",
    category: "Desain Interior",
    image: "/portfolio/4/after.jpg",
  },
];

export default function PortfolioSection() {
  return (
    <section className="section-padding bg-background py-10 transition-colors duration-300">
      <div className="container-custom pt-20">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="mb-4 text-foreground">Proyek Unggulan</h2>
          <p className="text-lg text-muted-foreground">
            Jelajahi portofolio proyek desain luar biasa kami
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <Link 
              key={index}
              href="/portfolio"
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border"
            >
              <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-sm text-white/80 mb-2">{project.category}</div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}