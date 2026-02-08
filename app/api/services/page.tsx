// app/services/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Home, 
  Eye,
  MessageSquare,
  Calculator,
  Wrench,
  MapPin,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  FileText,
  Pencil,
  Check,
  Calendar,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "home-renovation",
    icon: Home,
    title: "Home Renovation",
    description: "Renovasi rumah skala kecil hingga menengah dengan pengerjaan rapih dan terukur.",
    duration: "2-4 minggu",
    features: [
      "Renovasi ruang tamu dan keluarga",
      "Perbaikan struktur dan finishing",
      "Upgrade material berkualitas",
      "Pengawasan langsung tim ahli",
    ],
    bestFor: "Pemilik rumah yang ingin memperbarui tampilan dan fungsi ruangan tanpa perubahan struktur besar",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8GVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
  },
  {
    id: "design-visualization",
    icon: Eye,
    title: "Design Visualization",
    description: "Desain denah dan visual 3D ringan untuk membantu melihat dan menyesuaikan kebutuhan sebelum renovasi dimulai.",
    duration: "1-2 minggu",
    features: [
      "Pembuatan denah layout ruangan",
      "Visualisasi 3D rendering",
      "Multiple design options",
      "Revisi desain unlimited",
    ],
    bestFor: "Klien yang ingin melihat hasil akhir renovasi secara visual sebelum memulai pekerjaan",
    image: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
  },
  {
    id: "consultation-survey",
    icon: MessageSquare,
    title: "Consultation & Survey",
    description: "Konsultasi kebutuhan renovasi dan survey lokasi untuk menentukan solusi terbaik.",
    duration: "1-3 hari",
    features: [
      "Konsultasi kebutuhan detail",
      "Survey dan pengukuran lokasi",
      "Analisis kondisi eksisting",
      "Rekomendasi solusi terbaik",
    ],
    bestFor: "Siapa saja yang ingin memulai proyek renovasi dengan perencanaan yang matang",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2673&q=80",
  },
  {
    id: "cost-estimation",
    icon: Calculator,
    title: "Cost Estimation (RAB)",
    description: "Estimasi biaya yang jelas dan transparan agar bisa menyesuaikan budget sejak awal.",
    duration: "3-5 hari",
    features: [
      "Rincian biaya material detail",
      "Estimasi biaya tenaga kerja",
      "Breakdown per item pekerjaan",
      "Transparansi harga penuh",
    ],
    bestFor: "Pemilik rumah yang ingin mengetahui estimasi biaya renovasi secara detail dan akurat",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
  },
  {
    id: "project-execution",
    icon: Wrench,
    title: "Project Execution",
    description: "Pengerjaan renovasi oleh tim tukang berpengalaman dengan pengawasan langsung agar hasil sesuai rencana.",
    duration: "Sesuai skala proyek",
    features: [
      "Tim tukang berpengalaman",
      "Pengawasan langsung harian",
      "Update progress berkala",
      "Quality control ketat",
    ],
    bestFor: "Klien yang mengutamakan kualitas pengerjaan dan hasil sesuai rencana",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
  },
];

const comparisonData = [
  {
    feature: "Konsultasi & Survey",
    renovation: true,
    visualization: true,
    consultation: true,
    estimation: true,
    execution: false,
  },
  {
    feature: "Desain 3D & Layout",
    renovation: false,
    visualization: true,
    consultation: false,
    estimation: false,
    execution: false,
  },
  {
    feature: "Estimasi Biaya (RAB)",
    renovation: true,
    visualization: false,
    consultation: false,
    estimation: true,
    execution: false,
  },
  {
    feature: "Pengerjaan Renovasi",
    renovation: true,
    visualization: false,
    consultation: false,
    estimation: false,
    execution: true,
  },
  {
    feature: "Pengawasan Proyek",
    renovation: true,
    visualization: false,
    consultation: false,
    estimation: false,
    execution: true,
  },
];

const serviceArea = [
  "Jakarta",
  "Bogor",
  "Depok",
  "Tangerang",
  "Bekasi"
];

const workSteps = [
  {
    number: "01",
    icon: Calendar,
    title: "Set A Survey Schedule",
    subtitle: "Tetapkan Jadwal Survei",
  },
  {
    number: "02",
    icon: MapPin,
    title: "Field Survey",
    subtitle: "Survei Lapangan",
  },
  {
    number: "03",
    icon: Pencil,
    title: "Study Architect's",
    subtitle: "Mempelajari Gambar Kerja Arsitek",
  },
  {
    number: "04",
    icon: Calculator,
    title: "RAB Calculation",
    subtitle: "Menghitung Rencana Anggaran Bangunan (RAB)",
  },
  {
    number: "05",
    icon: Wrench,
    title: "Implementation of Development",
    subtitle: "Pelaksanaan Pembangunan",
  },
  {
    number: "06",
    icon: FileText,
    title: "Implementation Schedule",
    subtitle: "Membuat Jadwal Pelaksanaan",
  },
  {
    number: "07",
    icon: Check,
    title: "Serah Terima Bangunan",
    subtitle: "Building Handover",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Main Services Section */}
      <section className="py-20 pt-24 bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Layanan Utama Kami</h2>
            <p className="text-xl text-muted-foreground">
              Solusi renovasi rumah yang komprehensif dan disesuaikan dengan kebutuhan Anda
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={service.id} className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  <div className={`relative ${!isEven ? 'lg:order-2' : ''}`}>
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
                  
                  <div className={`space-y-6 ${!isEven ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-foreground">{service.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Clock className="h-4 w-4" />
                          {service.duration}
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

                  </div>
                </div>
              );
            })}
          </div>

          {/* Service Area */}
          <div className="max-w-4xl mx-auto mt-20">
            <Card className="border-2 border-[var(--color-secondary)]/20 bg-gradient-to-br from-[var(--color-secondary)]/5 to-background">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                    <MapPin className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle className="text-3xl text-foreground">Service Area</CardTitle>
                <CardDescription className="text-muted-foreground">Area layanan kami meliputi wilayah Jabodetabek</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-3">
                  {serviceArea.map((area, index) => (
                    <div 
                      key={index}
                      className="px-6 py-3 bg-[var(--color-secondary)] text-white rounded-full font-semibold text-sm hover:bg-[var(--color-secondary-600)] transition-colors shadow-md hover:shadow-lg"
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Comparison Section */}
      <section className="py-20 pt-28 bg-muted/30">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Bandingkan Layanan Kami</h2>
            <p className="text-xl text-muted-foreground">
              Temukan layanan yang paling sesuai dengan kebutuhan renovasi Anda
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-background rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-[var(--color-secondary)]">
                  <th className="text-left p-6 font-semibold text-white">Fitur Layanan</th>
                  <th className="text-center p-6 font-semibold text-white">Home Renovation</th>
                  <th className="text-center p-6 font-semibold text-white">Design Visualization</th>
                  <th className="text-center p-6 font-semibold text-white">Consultation</th>
                  <th className="text-center p-6 font-semibold text-white">Cost Estimation</th>
                  <th className="text-center p-6 font-semibold text-white">Project Execution</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="p-6 text-foreground font-medium">{row.feature}</td>
                    <td className="text-center p-6">
                      {row.renovation ? (
                        <CheckCircle className="h-6 w-6 text-[var(--color-secondary)] mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-muted-foreground/30 mx-auto" />
                      )}
                    </td>
                    <td className="text-center p-6">
                      {row.visualization ? (
                        <CheckCircle className="h-6 w-6 text-[var(--color-secondary)] mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-muted-foreground/30 mx-auto" />
                      )}
                    </td>
                    <td className="text-center p-6">
                      {row.consultation ? (
                        <CheckCircle className="h-6 w-6 text-[var(--color-secondary)] mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-muted-foreground/30 mx-auto" />
                      )}
                    </td>
                    <td className="text-center p-6">
                      {row.estimation ? (
                        <CheckCircle className="h-6 w-6 text-[var(--color-secondary)] mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-muted-foreground/30 mx-auto" />
                      )}
                    </td>
                    <td className="text-center p-6">
                      {row.execution ? (
                        <CheckCircle className="h-6 w-6 text-[var(--color-secondary)] mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-muted-foreground/30 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Work Steps Section - Improved Design */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Alur Kerja Kami</h2>
            <p className="text-xl text-muted-foreground">
              Proses kerja yang terstruktur dari awal hingga selesai
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Desktop view with horizontal flow */}
            <div className="hidden lg:block relative">
              <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
                {workSteps.map((step, index) => {
                  const Icon = step.icon;
                  
                  return (
                    <div key={index} className="flex flex-col items-center relative">
                      <div className="rounded-xl shadow-md p-6 w-full hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-lg font-bold text-[var(--color-secondary)]">{step.number}</span>
                          </div>
                          <Icon className="h-8 w-8 text-[var(--color-secondary)] flex-shrink-0" />
                        </div>
                        <h3 className="text-base font-semibold text-foreground mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                      </div>
                      
                      {/* Arrow connector for desktop - horizontal for same row */}
                      {index < workSteps.length - 1 && index % 4 !== 3 && (
                        <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                          <ArrowRight className="h-6 w-6 text-gray-300" />
                        </div>
                      )}
                      
                      {/* Arrow connector for desktop - diagonal to next row */}
                      {index === 3 && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-10">
                          <ArrowRight className="h-6 w-6 text-gray-300 rotate-90" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Tablet view */}
            <div className="hidden md:grid md:grid-cols-2 gap-6 lg:hidden">
              {workSteps.map((step, index) => {
                const Icon = step.icon;
                
                return (
                  <div key={index} className=" rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-[var(--color-secondary)]">{step.number}</span>
                      </div>
                      <Icon className="h-8 w-8 text-[var(--color-secondary)] flex-shrink-0" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                  </div>
                );
              })}
            </div>
            
            {/* Mobile view */}
            <div className="md:hidden space-y-4">
              {workSteps.map((step, index) => {
                const Icon = step.icon;
                
                return (
                  <div key={index} className=" rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-[var(--color-secondary)]">{step.number}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="size-5 text-[var(--color-secondary)]" />
                          <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                      </div>
                    </div>
                    
                    {/* Arrow connector for mobile */}
                    {index < workSteps.length - 1 && (
                      <div className="flex justify-center mt-4">
                        <ArrowRight className="h-5 w-5 text-gray-300 transform rotate-90" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
            <Card className="p-6 bg-background border-2 hover:border-[var(--color-secondary)] transition-all">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                &quot;Tim Knock Studio berhasil mengubah rumah kami menjadi yang selalu kami impikan. Prosesnya mulus dan hasilnya melampaui ekspektasi kami.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)]/20"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Budi Santoso</h4>
                  <p className="text-sm text-muted-foreground">Renovasi Rumah</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-background border-2 hover:border-[var(--color-secondary)] transition-all">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                &quot;Estimasi biaya yang jelas dan transparan sangat membantu kami dalam perencanaan. Tidak ada biaya tersembunyi, semuanya sesuai RAB.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)]/20"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Siti Nurhaliza</h4>
                  <p className="text-sm text-muted-foreground">Renovasi Dapur</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-background border-2 hover:border-[var(--color-secondary)] transition-all">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                &quot;Visualisasi 3D sangat membantu kami melihat hasil akhir sebelum renovasi dimulai. Tim sangat responsif terhadap perubahan yang kami inginkan.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)]/20"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Andi Pratama</h4>
                  <p className="text-sm text-muted-foreground">Renovasi Kamar Tidur</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Siap Memulai Renovasi Rumah Anda?</h2>
            <p className="mb-8 text-xl text-muted-foreground">
              Jadwalkan konsultasi dan survey gratis untuk mendiskusikan kebutuhan renovasi Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/schedule">
                <Button size="lg" className="bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-600)]">
                  Jadwalkan Konsultasi
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="text-foreground border-2">
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