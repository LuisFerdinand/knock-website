// app/(site)/schedule/page.tsx - Updated with iOS WhatsApp fix
"use client";

import { useState } from "react";
import { User, MapPin, Home, Check, FileText, Upload, X, Image as ImageIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Format number to Indonesian Rupiah
const formatRupiah = (value: string): string => {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, "");
  
  if (!numbers) return "";
  
  // Format with thousand separators
  return new Intl.NumberFormat("id-ID").format(parseInt(numbers));
};

// Parse formatted rupiah back to plain number string
const parseRupiah = (value: string): string => {
  return value.replace(/\D/g, "");
};

interface UploadedImage {
  url: string;
  publicId: string;
  thumbnail: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    service: "renovation",
    area: "",
    budget: "",
    details: ""
  });
  const [displayBudget, setDisplayBudget] = useState("");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = parseRupiah(rawValue);
    
    setFormData({ ...formData, budget: numericValue });
    setDisplayBudget(formatRupiah(rawValue));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed the limit
    if (uploadedImages.length + files.length > 5) {
      setUploadError('Maksimal 5 foto dapat diunggah');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });
      formData.append('folder', 'contact-submissions');

      const response = await fetch('/api/upload-contact-images', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal mengunggah gambar');
      }

      setUploadedImages(prev => [...prev, ...data.images]);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengunggah gambar');
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleRemoveImage = async (publicId: string) => {
    try {
      const response = await fetch('/api/upload-contact-images', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicIds: [publicId] }),
      });

      if (response.ok) {
        setUploadedImages(prev => prev.filter(img => img.publicId !== publicId));
      }
    } catch (err) {
      console.error('Error removing image:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const submissionData = {
        ...formData,
        images: uploadedImages.map(img => img.url),
        imagePublicIds: uploadedImages.map(img => img.publicId),
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Gagal mengirim formulir');
      }
      
      if (data.whatsappUrl) {
        // Detect iOS and Safari
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        
        // For iOS/Safari, use location.href to avoid popup blocking
        // This works better with deep links and doesn't get blocked
        if (isIOS || isSafari) {
          // Small delay to ensure state updates complete
          setTimeout(() => {
            window.location.href = data.whatsappUrl;
          }, 100);
        } else {
          // For other browsers, open in new tab
          window.open(data.whatsappUrl, '_blank');
        }
      }
      
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      address: "",
      service: "renovation",
      area: "",
      budget: "",
      details: ""
    });
    setDisplayBudget("");
    setUploadedImages([]);
    setIsSubmitted(false);
    setError(null);
    setUploadError(null);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 pt-16">
      <main className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-3 text-center">
              Contact us
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Lengkapi formulir di bawah ini dan kami akan menghubungi Anda secepatnya untuk mendiskusikan proyek Anda.
            </p>
          </div>

          <div className="bg-card border border-border p-8 md:p-10">
            {isSubmitted ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 dark:bg-green-900/20 mb-6">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-card-foreground mb-3">
                  Terima Kasih!
                </h2>
                <p className="text-muted-foreground mb-10 max-w-md mx-auto">
                  Kami telah menerima pertanyaan Anda dan akan segera menghubungi Anda kembali.
                </p>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-ring text-white hover:bg-ring/90 transition-colors font-medium"
                >
                  Kirim Pertanyaan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}
                
                {/* Nama */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-card-foreground">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-11 pr-4 py-2.5 border border-border bg-background text-card-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all text-sm"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                </div>

                {/* Alamat Lengkap */}
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-card-foreground">
                    Alamat Lengkap Properti <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <textarea
                      id="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full pl-11 pr-4 py-2.5 border border-border bg-background text-card-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all resize-none text-sm"
                      placeholder="Masukkan alamat lengkap lokasi proyek"
                    />
                  </div>
                </div>

                {/* Service Type */}
                <div className="space-y-2">
                  <label htmlFor="service" className="block text-sm font-medium text-card-foreground">
                    Jenis Layanan <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({...formData, service: value})}
                  >
                    <SelectTrigger className="w-full border-border bg-background focus:ring-1 focus:ring-ring text-sm h-auto py-2.5">
                      <SelectValue placeholder="Pilih jenis layanan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="renovation" className="text-sm">
                        Renovasi
                      </SelectItem>
                      <SelectItem value="new-construction" className="text-sm">
                        Bangun Baru
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Luasan */}
                <div className="space-y-2">
                  <label htmlFor="area" className="block text-sm font-medium text-card-foreground">
                    Luasan Area
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="area"
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      className="w-full pl-11 pr-4 py-2.5 border border-border bg-background text-card-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all text-sm"
                      placeholder="Contoh: 100 m² atau 10x15 m"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Masukkan luas area dalam m²  (opsional)
                  </p>
                </div>

                {/* Estimasi Budget */}
                <div className="space-y-2">
                  <label htmlFor="budget" className="block text-sm font-medium text-card-foreground">
                    Estimasi Anggaran
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground font-medium text-sm">
                      Rp
                    </span>
                    <input
                      id="budget"
                      type="text"
                      value={displayBudget}
                      onChange={handleBudgetChange}
                      className="w-full pl-12 pr-4 py-2.5 border border-border bg-background text-card-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all text-sm"
                      placeholder="100.000.000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Perkiraan anggaran proyek (opsional)
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <label htmlFor="details" className="block text-sm font-medium text-card-foreground">
                    Detail Tambahan
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <textarea
                      id="details"
                      rows={4}
                      value={formData.details}
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                      className="w-full pl-11 pr-4 py-2.5 border border-border bg-background text-card-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all resize-none text-sm"
                      placeholder="Berikan informasi tambahan tentang proyek Anda (opsional)"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-card-foreground">
                    Unggah Foto Properti
                  </label>
                  
                  {/* Upload Button */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      multiple
                      onChange={handleImageUpload}
                      disabled={isUploading || uploadedImages.length >= 5}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-border bg-background text-muted-foreground hover:border-ring hover:text-ring transition-all cursor-pointer text-sm ${
                        (isUploading || uploadedImages.length >= 5) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isUploading ? (
                        <>
                          <Upload className="h-4 w-4 mr-2 animate-spin" />
                          Mengunggah...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="h-4 w-4 mr-2" />
                          {uploadedImages.length >= 5 
                            ? 'Maksimal 5 foto tercapai' 
                            : `Pilih Foto (${uploadedImages.length}/5)`}
                        </>
                      )}
                    </label>
                  </div>

                  {uploadError && (
                    <p className="text-xs text-red-500 mt-1.5">{uploadError}</p>
                  )}

                  <p className="text-xs text-muted-foreground mt-1.5">
                    Unggah foto lokasi atau inspirasi proyek Anda (optional) <br />
                    maksimal 5 foto, 5MB per foto
                  </p>

                  {/* Image Preview Grid */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group aspect-square">
                          <img
                            src={image.thumbnail}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover border border-border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(image.publicId)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-ring text-white hover:bg-ring/90 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}