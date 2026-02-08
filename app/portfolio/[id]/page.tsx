/* eslint-disable react-hooks/immutability */
// app/portfolio/[id]/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

// Define types - matching the portfolio page
interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  completion: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  galleryImages: string[];
  tags: string[];
}

// Use the same project data from the portfolio page
const projects: Project[] = [
  {
    id: 1,
    title: "Knock",
    category: "Renovasi Total",
    location: "Puri Bintaro",
    year: "2023",
    area: "450m² / 48T",
    completion: "2023",
    description: "Transformasi total villa tradisional menjadi hunian mewah modern dengan ruang terbuka dan integrasi indoor-outdoor yang seamless.",
    beforeImage: "/portfolio/1/before.jpg",
    afterImage: "/portfolio/1/after.jpeg",
    galleryImages: [
      "/portfolio/1/gallery1.jpeg",
      "/portfolio/1/gallery2.jpeg",
      "/portfolio/1/gallery3.jpeg",
      "/portfolio/1/gallery4.jpeg",
    ],
    tags: ["Modern", "Mewah", "Berkelanjutan"],
  },
  {
    id: 2,
    title: "Taman Depan Minimalis",
    category: "Desain Eksterior",
    location: "Golden Park 2, Cisauk",
    year: "2023",
    area: "280m² / 30T",
    completion: "2023",
    description: "Redesain total taman depan dengan konsep minimalis tropis, menampilkan tanaman hijau asli Indonesia dan elemen batu alam.",
    beforeImage: "/portfolio/2/before.jpg",
    afterImage: "/portfolio/2/after.jpg",
    galleryImages: [
      "/portfolio/2/gallery1.jpg",
      "/portfolio/2/gallery2.jpg",
    ],
    tags: ["Minimalis", "Tropis", "Modern"],
  },
  {
    id: 3,
    title: "Taman Depan Minimalis",
    category: "Desain Eksterior",
    location: "Simplicity Cisauk",
    year: "2023",
    area: "280m² / 30T",
    completion: "2023",
    description: "Redesain total taman depan dengan konsep minimalis tropis, menampilkan tanaman hijau asli Indonesia dan elemen batu alam.",
    beforeImage: "",
    afterImage: "/portfolio/3/after.jpg",
    galleryImages: [],
    tags: ["Minimalis", "Tropis", "Modern"],
  },
  {
    id: 4,
    title: "Desain Tangga Rumah Tinggal",
    category: "Desain Interior",
    location: "Depok",
    year: "2023",
    area: "150m² / 15T",
    completion: "2023",
    description: "Desain ulang tangga utama dengan material kayu jati dan kaca tempered, menciptakan focal point yang elegan di ruang tamu.",
    beforeImage: "/portfolio/4/before.jpg",
    afterImage: "/portfolio/4/after.jpg",
    galleryImages: [
      "/portfolio/4/gallery1.jpg",
    ],
    tags: ["Kayu Jati", "Minimalis", "Elegan"],
  },
  {
    id: 5,
    title: "Redesain Dapur dan Kamar Mandi",
    category: "Renovasi Interior",
    location: "Maharta",
    year: "2023",
    area: "85m² / 20T",
    completion: "2023",
    description: "Transformasi dapur dan kamar mandi dengan fungsionalitas optimal, menggunakan material premium dan teknologi smart home.",
    beforeImage: "/portfolio/5/before.jpg",
    afterImage: "/portfolio/5/after.png",
    galleryImages: [
      "/portfolio/5/gallery1.png",
    ],
    tags: ["Modern", "Smart Home", "Fungsional"],
  },
  {
    id: 6,
    title: "Desain Interior Kamar Tidur Utama",
    category: "Desain Interior",
    location: "Bekasi Barat, Cisauk",
    year: "2023",
    area: "120m² / 25T",
    completion: "2023",
    description: "Desain ulang total kamar tidur utama dengan konsep resort Bali, menampilkan area lounge dan walk-in closet yang luas.",
    beforeImage: "/portfolio/6/before.jpg",
    afterImage: "/portfolio/6/after.jpg",
    galleryImages: [
      "/portfolio/6/gallery1.jpg",
    ],
    tags: ["Mewah", "Relaksasi"],
  },
];

// Smooth Before/After Animation Component (non-interactive)
const BeforeAfterAnimation = ({ 
  beforeSrc, 
  afterSrc, 
  className = "",
  autoPlay = false 
}: { 
  beforeSrc: string;
  afterSrc: string;
  className?: string;
  autoPlay?: boolean;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const duration = 4000; // 4 seconds total
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Smooth easing function (ease-in-out-cubic)
      const easeInOutCubic = rawProgress < 0.5
        ? 4 * rawProgress * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;
      
      // Animation sequence:
      // 0-0.4: Show before image (pause)
      // 0.4-0.8: Slide to reveal after image
      // 0.8-1.0: Show after image (pause)
      
      let slideProgress;
      if (rawProgress < 0.3) {
        // Pause on before image
        slideProgress = 0;
      } else if (rawProgress < 0.7) {
        // Slide transition
        const transitionProgress = (rawProgress - 0.3) / 0.4;
        const easedTransition = transitionProgress < 0.5
          ? 4 * transitionProgress * transitionProgress * transitionProgress
          : 1 - Math.pow(-2 * transitionProgress + 2, 3) / 2;
        slideProgress = easedTransition;
      } else {
        // Pause on after image
        slideProgress = 1;
      }
      
      setProgress(slideProgress);
      
      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setProgress(0); // Reset for next play
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        startAnimation();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle case where beforeSrc is empty
  if (!beforeSrc) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0">
          <Image
            src={afterSrc}
            alt="After"
            fill
            className="object-cover"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 text-sm font-medium rounded-md backdrop-blur-sm"
        >
          After
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* After image (background) */}
      <div className="absolute inset-0">
        <Image
          src={afterSrc}
          alt="After"
          fill
          className="object-cover"
        />
      </div>
      
      {/* Before image (slides out) */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 ${progress * 100}% 0 0)`,
        }}
      >
        <Image
          src={beforeSrc}
          alt="Before"
          fill
          className="object-cover"
        />
      </motion.div>
      
      {/* Labels with fade animation */}
      <AnimatePresence>
        {progress < 0.5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 text-sm font-medium rounded-md backdrop-blur-sm"
          >
            Before
          </motion.div>
        )}
        {progress > 0.5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 text-sm font-medium rounded-md backdrop-blur-sm"
          >
            After
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play Animation Button */}
      {!isAnimating && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={startAnimation}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 hover:bg-black/80 text-white px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm transition-colors flex items-center gap-2 shadow-lg"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 2v12l10-6L3 2z" />
          </svg>
          Play Transformation
        </motion.button>
      )}

      {/* Progress indicator during animation */}
      {isAnimating && (
        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-xs backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Transforming...
        </motion.div>
      )}
    </div>
  );
};

// Gallery Modal Component
const GalleryModal = ({ 
  images, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev,
  project 
}: { 
  images: Array<{ type: string; src: string; label: string }>;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  project: Project;
}) => {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
      >
        <X size={24} />
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight size={28} />
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Image Label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium">
        {currentImage.label}
      </div>

      {/* Main Image Display */}
      <div className="relative w-full h-full p-4 md:p-8" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          {currentImage.type === 'before-after' ? (
            <motion.div
              key={`before-after-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <BeforeAfterAnimation
                beforeSrc={project.beforeImage}
                afterSrc={project.afterImage}
                className="w-full h-full rounded-lg"
                autoPlay={true}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`image-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.label}
                fill
                className="object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Fix for Next.js 15+ - unwrap params Promise
  const resolvedParams = use(params);
  
  // Find project by ID using the same data from portfolio page
  const project = projects.find(p => p.id === parseInt(resolvedParams.id)) || projects[0];
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  // Prepare all images for gallery
  const allImages = [
    { type: 'after', src: project.afterImage, label: 'After' },
    ...(project.beforeImage ? [{ type: 'before', src: project.beforeImage, label: 'Before' }] : []),
    { type: 'before-after', src: '', label: 'Before & After Transformation' },
    ...project.galleryImages.map((img, idx) => ({ 
      type: 'gallery', 
      src: img, 
      label: `Gallery ${idx + 1}` 
    }))
  ];

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setShowGalleryModal(true);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Back Button - Fixed at top with proper z-index */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Hero Section - Adjusted with proper top padding for header */}
      <section className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
        <Image
          src={project.afterImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm md:text-base opacity-80 mb-2 uppercase tracking-wider">
              {project.category}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl max-w-3xl opacity-90">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Information */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-xs md:text-sm text-muted-foreground mb-2 uppercase tracking-wider">Location</div>
            <div className="text-lg md:text-2xl font-semibold">{project.location}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-xs md:text-sm text-muted-foreground mb-2 uppercase tracking-wider">Area</div>
            <div className="text-lg md:text-2xl font-semibold">{project.area}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-xs md:text-sm text-muted-foreground mb-2 uppercase tracking-wider">Completion</div>
            <div className="text-lg md:text-2xl font-semibold">{project.completion}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-xs md:text-sm text-muted-foreground mb-2 uppercase tracking-wider">Year</div>
            <div className="text-lg md:text-2xl font-semibold">{project.year}</div>
          </motion.div>
        </div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-16"
        >
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-secondary/20 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-4 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-bold mb-8"
        >
          Project Gallery
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* After Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openGallery(0)}
          >
            <Image
              src={project.afterImage}
              alt="After"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 text-sm rounded-md backdrop-blur-sm">
              After
            </div>
          </motion.div>

          {/* Before Image - Only show if beforeImage exists */}
          {project.beforeImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => openGallery(1)}
            >
              <Image
                src={project.beforeImage}
                alt="Before"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 text-sm rounded-md backdrop-blur-sm">
                Before
              </div>
            </motion.div>
          )}

          {/* Before/After Animation - Full Width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 relative aspect-[21/9] md:aspect-[16/9] rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openGallery(project.beforeImage ? 2 : 1)}
          >
            <BeforeAfterAnimation
              beforeSrc={project.beforeImage}
              afterSrc={project.afterImage}
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
          </motion.div>

          {/* Gallery Images */}
          {project.galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (index + 3) }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => openGallery((project.beforeImage ? 3 : 2) + index)}
            >
              <Image
                src={img}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 text-sm rounded-md backdrop-blur-sm">
                Gallery {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Modal */}
      <AnimatePresence>
        {showGalleryModal && (
          <GalleryModal
            images={allImages}
            currentIndex={selectedImageIndex}
            onClose={() => setShowGalleryModal(false)}
            onNext={nextImage}
            onPrev={prevImage}
            project={project}
          />
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-4xl font-bold mb-6">
              Interested in a similar project?
            </h3>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can transform your space into something extraordinary.
            </p>
            <Button 
              size="lg" 
              className=""
            >
              Schedule a meeting
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}