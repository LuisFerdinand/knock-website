// /components/home/CTASection.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section-padding bg-background transition-colors duration-300 min-h-screen flex items-center">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          
          <h2 className="mb-6 text-secondary">
            Siap Mengubah Ruang Anda?
          </h2>
          
          <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            Jadwalkan konsultasi gratis dengan team kami dan mari wujudkan visi Anda. Kami akan mendiskusikan kebutuhan, preferensi, dan membuat rencana khusus untuk proyek Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 group">
                Jadwalkan Konsultasi Gratis
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/portfolio" className="hidden sm:block">
              <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
                Lihat Karya Kami
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-card">
              <div className="text-2xl font-bold text-secondary mb-2">Gratis</div>
              <div className="text-sm text-muted-foreground">Konsultasi Awal</div>
            </div>
            <div className="p-4 bg-card">
              <div className="text-2xl font-bold text-secondary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Dukungan Pelanggan</div>
            </div>
            <div className="p-4 bg-card">
              <div className="text-2xl font-bold text-secondary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Jaminan Kepuasan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}