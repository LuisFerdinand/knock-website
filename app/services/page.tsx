// app/services/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Home, 
  Ruler, 
  Palette, 
  Layers, 
  Lightbulb, 
  Building2,
  Sofa,
  Trees,
  Hammer,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Users
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "desain-interior",
    icon: Palette,
    title: "Desain Interior Rumah",
    description: "Transformasi interior rumah Anda dengan desain yang memadukan fungsi dan estetika sempurna.",
    price: "Mulai dari Rp 5.000.000/m²",
    duration: "4-6 minggu",
    features: [
      "Perencanaan tata ruang dan layout",
      "Konsultasi skema warna",
      "Pemilihan dan penempatan furnitur",
      "Desain millwork dan built-in kustom",
    ],
    bestFor: "Pemilik rumah yang ingin merombak tampilan interior tanpa mengubah struktur bangunan",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8GVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
  },
  {
    id: "arsitektur-rumah",
    icon: Home,
    title: "Arsitektur Rumah",
    description: "Layanan arsitektur komprehensif dari konsep awal hingga konstruksi final untuk rumah impian Anda.",
    price: "Mulai dari Rp 75.000.000",
    duration: "3-4 bulan",
    features: [
      "Desain dan perencanaan rumah tinggal",
      "Koordinasi teknik struktur",
      "Perizinan bangunan",
      "Pemodelan 3D dan visualisasi",
    ],
    bestFor: "Klien yang membangun rumah baru atau melakukan renovasi besar yang mengubah struktur",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8GVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
  },
  {
    id: "renovasi-rumah",
    icon: Hammer,
    title: "Renovasi Rumah Lengkap",
    description: "Solusi renovasi rumah menyeluruh dari konsep hingga penyelesaian dengan pengawasan ketat.",
    price: "Mulai dari Rp 10.000.000/m²",
    duration: "2-4 bulan",
    features: [
      "Perombakan tata ruang",
      "Peningkatan fungsionalitas",
      "Pembaruan sistem elektrik dan plumbing",
      "Modernisasi dapur dan kamar mandi",
    ],
    bestFor: "Pemilik rumah yang ingin memperbarui rumah yang ada dengan perubahan signifikan",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8GVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
  },
];

const additionalServices = [
  {
    icon: Lightbulb,
    title: "Desain Pencahayaan",
    description: "Solusi pencahayaan strategis untuk meningkatkan suasana dan fungsionalitas ruangan",
    price: "Mulai dari Rp 2.500.000/ruangan"
  },
  {
    icon: Sofa,
    title: "Kurasi Furnitur",
    description: "Layanan pemilihan dan pengadaan furnitur kustom untuk rumah Anda",
    price: "Mulai dari Rp 5.000.000"
  },
  {
    icon: Trees,
    title: "Integrasi Taman",
    description: "Desain ruang hidup indoor-outdoor yang seamless dengan taman",
    price: "Mulai dari Rp 15.000.000"
  },
  {
    icon: Ruler,
    title: "Perencanaan Tata Ruang",
    description: "Optimasi ruang untuk fungsionalitas dan alur maksimal",
    price: "Mulai dari Rp 3.000.000/ruangan"
  },
];

const comparisonData = [
  {
    feature: "Perubahan Struktur Bangunan",
    interior: "Tidak",
    architecture: "Ya",
    renovation: "Ya",
  },
  {
    feature: "Desain Tata Ruang",
    interior: "Ya",
    architecture: "Ya",
    renovation: "Ya",
  },
  {
    feature: "Pemilihan Material",
    interior: "Ya",
    architecture: "Ya",
    renovation: "Ya",
  },
  {
    feature: "Manajemen Konstruksi",
    interior: "Tidak",
    architecture: "Opsional",
    renovation: "Ya",
  },
  {
    feature: "Visualisasi 3D",
    interior: "Ya",
    architecture: "Ya",
    renovation: "Ya",
  },
  {
    feature: "Perizinan Bangunan",
    interior: "Tidak",
    architecture: "Ya",
    renovation: "Ya (jika diperlukan)",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Services Comparison Section */}
      <section className="py-20 pt-28">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Bandingkan Layanan Kami</h2>
            <p className="text-xl text-muted-foreground">
              Temukan layanan yang paling sesuai dengan kebutuhan rumah Anda
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-foreground">Fitur</th>
                  <th className="text-center p-4 font-semibold text-foreground">Desain Interior</th>
                  <th className="text-center p-4 font-semibold text-foreground">Arsitektur</th>
                  <th className="text-center p-4 font-semibold text-foreground">Renovasi</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="p-4 text-foreground">{row.feature}</td>
                    <td className="text-center p-4">
                      {row.interior === "Ya" ? (
                        <CheckCircle className="h-5 w-5 text-[var(--color-secondary)] mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">{row.interior}</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {row.architecture === "Ya" ? (
                        <CheckCircle className="h-5 w-5 text-[var(--color-secondary)] mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">{row.architecture}</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {row.renovation === "Ya" ? (
                        <CheckCircle className="h-5 w-5 text-[var(--color-secondary)] mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">{row.renovation}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Layanan Utama Kami</h2>
            <p className="text-xl text-muted-foreground">
              Solusi desain rumah yang komprehensif dan disesuaikan dengan kebutuhan Anda
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={service.id} className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  <div className="relative">
                    <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-[var(--color-secondary)]/10 rounded-2xl -z-10 hidden lg:block"></div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-foreground">{service.title}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {service.duration}
                          </div>
                          <div className="text-sm text-[var(--color-secondary)] font-semibold">
                            {service.price}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground">
                      {service.description}
                    </p>
                    
                    <div className="bg-card p-6 rounded-xl border border-border">
                      <h4 className="font-semibold text-foreground mb-3">Cocok untuk:</h4>
                      <p className="text-muted-foreground">{service.bestFor}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Yang termasuk dalam layanan:</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-[var(--color-secondary)] flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Link href="/schedule">
                      <Button className="bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-600)] transition-all duration-300">
                        Konsultasi untuk {service.title}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Layanan Tambahan</h2>
            <p className="text-xl text-muted-foreground">
              Layanan pelengkap untuk melengkapi proyek rumah Anda
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-[var(--color-secondary)]">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] group-hover:bg-[var(--color-secondary)] group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground mb-4">
                      {service.description}
                    </CardDescription>
                    <div className="text-sm font-semibold text-[var(--color-secondary)]">
                      {service.price}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Apa Kata Klien Kami</h2>
            <p className="text-xl text-muted-foreground">
              Kepuasan klien adalah prioritas utama kami
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Tim Knock Studio berhasil mengubah rumah kami menjadi yang selalu kami impikan. Prosesnya mulus dan hasilnya melampaui ekspektasi kami."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-200)]"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Budi Santoso</h4>
                  <p className="text-sm text-muted-foreground">Renovasi Rumah</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Desain interior yang mereka buat untuk apartemen kami sangat fungsional dan estetis. Setiap inci ruang dimanfaatkan dengan maksimal."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-200)]"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Siti Nurhaliza</h4>
                  <p className="text-sm text-muted-foreground">Desain Interior</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Membangun rumah baru dengan Knock Studio adalah pengalaman yang luar biasa. Mereka memahami visi kami dan mewujudkannya dengan sempurna."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-200)]"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Andi Pratama</h4>
                  <p className="text-sm text-muted-foreground">Arsitektur Rumah</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Siap Memulai Proyek Rumah Anda?</h2>
            <p className="mb-8 text-xl text-muted-foreground">
              Jadwalkan konsultasi gratis untuk mendiskusikan proyek Anda dan bagaimana kami dapat membantu mewujudkan visi Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/schedule">
                <Button size="lg" className="">
                  Jadwalkan Konsultasi
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="text-foreground">
                  Lihat Portfolio Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}