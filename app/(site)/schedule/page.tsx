// app/schedule/page.tsx
"use client";

import { useState } from "react";
import { User, MapPin, Home, DollarSign, Check } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    service: "Design & Build",
    area: "",
    budget: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      address: "",
      service: "Design & Build",
      area: "",
      budget: ""
    });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 pt-16">
      <main className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you as soon as possible to discuss your project.
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6 md:p-8">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-card-foreground mb-2">
                  Thank You!
                </h2>
                <p className="text-muted-foreground mb-8">
                  We&apos;ve received your inquiry and will get back to you shortly.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-ring text-white rounded-lg hover:bg-ring/90 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Nama */}
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                    Nama <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                </div>

                {/* Alamat Lengkap */}
                <div className="mb-6">
                  <label htmlFor="address" className="block text-sm font-medium text-card-foreground mb-2">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <textarea
                      id="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                      placeholder="Masukkan alamat lengkap properti"
                    />
                  </div>
                </div>

                {/* Service */}
                <div className="mb-6">
                  <label htmlFor="service" className="block text-sm font-medium text-card-foreground mb-2">
                    Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  >
                    <option value="Design & Build">Design & Build</option>
                    <option value="Design Only">Design Only</option>
                    <option value="Build Only">Build Only</option>
                    <option value="Interior">Interior</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>

                {/* Luasan */}
                <div className="mb-6">
                  <label htmlFor="area" className="block text-sm font-medium text-card-foreground mb-2">
                    Luasan <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="area"
                      type="text"
                      required
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      placeholder="contoh: 100 m² atau 10x15 m"
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Masukkan luas area dalam meter persegi (m²)
                  </p>
                </div>

                {/* Estimasi Budget */}
                <div className="mb-8">
                  <label htmlFor="budget" className="block text-sm font-medium text-card-foreground mb-2">
                    Estimasi Budget <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="budget"
                      type="text"
                      required
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      placeholder="contoh: Rp 100.000.000 - Rp 200.000.000"
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Berikan estimasi budget untuk proyek Anda
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-ring text-white rounded-lg hover:bg-ring/90 transition-colors font-medium text-lg"
                >
                  Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}