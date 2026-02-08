/* eslint-disable react-hooks/immutability */
// app/portfolio/page.tsx
"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useState, useRef, useEffect, TouchEvent, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Define types for our components
interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  className?: string;
}

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

// Before/After comparison component
const BeforeAfterComparison = ({ beforeSrc, afterSrc, className = "" }: BeforeAfterProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(Math.min(100, Math.max(0, percentage)));
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(Math.min(100, Math.max(0, percentage)));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchend', handleGlobalMouseUp);
    }
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After image (full background) */}
      <div className="absolute inset-0">
        <Image
          src={afterSrc}
          alt="After"
          fill
          className="object-cover"
        />
      </div>
      
      {/* Before image (clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image
          src={beforeSrc}
          alt="Before"
          fill
          className="object-cover"
        />
      </div>
      
      {/* Slider line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M10 4L16 10L10 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 text-sm rounded-md">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 text-sm rounded-md">
        After
      </div>
    </div>
  );
};

const projects: Project[] = [
  {
    id: 1,
    title: "Villa Modern di Kemang",
    category: "Renovasi Total",
    location: "Kemang, Jakarta Selatan",
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
    location: "BSD City, Tangerang",
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
    location: "BSD City, Tangerang",
    year: "2023",
    area: "280m² / 30T",
    completion: "2023",
    description: "Redesain total taman depan dengan konsep minimalis tropis, menampilkan tanaman hijau asli Indonesia dan elemen batu alam.",
    beforeImage: "",
    afterImage: "/portfolio/3/after.jpg",
    galleryImages: [
      
    ],
    tags: ["Minimalis", "Tropis", "Modern"],
  },
  {
    id: 4,
    title: "Desain Tangga Rumah Tinggal",
    category: "Desain Interior",
    location: "Kelapa Gading, Jakarta Utara",
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
    location: "Senayan, Jakarta Pusat",
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
    location: "Pondok Indah, Jakarta Selatan",
    year: "2023",
    area: "120m² / 25T",
    completion: "2023",
    description: "Desain ulang total kamar tidur utama dengan konsep resort Bali, menampilkan area lounge dan walk-in closet yang luas.",
    beforeImage: "/portfolio/6/before.jpg",
    afterImage: "/portfolio/6/after.jpg",
    galleryImages: [
      "/portfolio/6/gallery1.jpg",
    ],
    tags: ["Resort Bali", "Mewah", "Relaksasi"],
  },
];

export default function PortfolioPage() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const selectedProject = projects[selectedProjectIndex];
  
  // Get all images for the current project - reordered to have After first, then Before & After
  const allProjectImages = [
    { type: 'after' as const, label: 'After' },
    { type: 'before-after' as const, label: 'Before & After' },
    ...selectedProject.galleryImages.map((_, index) => ({ 
      type: 'gallery' as const, 
      label: `Gallery ${index + 1}` 
    }))
  ];
  
  const currentImageType = allProjectImages[selectedImageIndex];

  useEffect(() => {
    const handleScroll = () => {
      if (imageContainerRef.current) {
        const scrollTop = imageContainerRef.current.scrollTop;
        const scrollHeight = imageContainerRef.current.scrollHeight - imageContainerRef.current.clientHeight;
        const progress = scrollTop / scrollHeight;
        
        const projectIndex = Math.min(
          Math.floor(progress * projects.length),
          projects.length - 1
        );
        
        const projectProgress = (progress * projects.length) % 1;
        
        setScrollProgress(projectProgress);
        
        // Only update project index if it actually changed
        if (projectIndex !== selectedProjectIndex) {
          setSelectedProjectIndex(projectIndex);
          setSelectedImageIndex(0); // Reset image index when project changes
        }
      }
    };

    const container = imageContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [selectedProjectIndex]);

  // Handle keyboard navigation for images within a project
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle arrow keys if not focused on an input
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') return;
      
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, selectedProjectIndex]);

  const scrollToProject = (index: number) => {
    if (imageContainerRef.current) {
      const scrollAmount = index * (imageContainerRef.current.scrollHeight / projects.length);
      imageContainerRef.current.scrollTo({
        top: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allProjectImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allProjectImages.length) % allProjectImages.length);
  };

  const getAnimationStyle = (delay = 0, direction = 'up') => {
    const progress = Math.max(0, Math.min(1, scrollProgress * 1.5 - delay));
    const opacity = 1 - progress;
    
    let translateY = 0;
    let translateX = 0;
    
    switch (direction) {
      case 'up':
        translateY = progress * -50;
        break;
      case 'down':
        translateY = progress * 50;
        break;
      case 'left':
        translateX = progress * -50;
        break;
      case 'right':
        translateX = progress * 50;
        break;
    }
    
    return {
      opacity,
      transform: `translate(${translateX}px, ${translateY}px)`,
      transition: 'opacity 0.15s ease-out, transform 0.15s ease-out'
    };
  };

  // Animation variants for different elements - faster and smoother
  const titleVariants = {
    initial: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number]
      }
    }
  };

  const slideFromRight = {
    initial: { 
      opacity: 0, 
      x: 60,
      rotate: 3
    },
    animate: { 
      opacity: 1, 
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.4,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
        delay: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      x: -60,
      transition: {
        duration: 0.3,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number]
      }
    }
  };

  const slideFromLeft = {
    initial: { 
      opacity: 0, 
      x: -60,
      rotate: -3
    },
    animate: { 
      opacity: 1, 
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.4,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
        delay: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: 60,
      transition: {
        duration: 0.3,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number]
      }
    }
  };

  const fadeScale = {
    initial: { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
        delay: 0.08
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      y: -20,
      transition: {
        duration: 0.25,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number]
      }
    }
  };

  const categoryVariants = {
    initial: { 
      opacity: 0, 
      x: -20,
      rotate: -90
    },
    animate: { 
      opacity: 1, 
      x: 0,
      rotate: -90,
      transition: {
        duration: 0.4,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
        delay: 0.03
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      rotate: -90,
      transition: {
        duration: 0.3,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number]
      }
    }
  };

  const buttonVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
        delay: 0.12
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number]
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Project Showcase */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Scrollable Images Container - This handles project navigation */}
        <div 
          ref={imageContainerRef}
          className="absolute inset-0 overflow-y-scroll scrollbar-hide"
          style={{ scrollSnapType: 'y mandatory' }}
        >
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="relative h-screen w-full"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Image
                src={project.afterImage}
                alt={project.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
          ))}
        </div>

        {/* Current Image Display Overlay - This handles image navigation within project */}
        <div className="absolute inset-0 z-5 pointer-events-none">
          <AnimatePresence mode="wait">
            {currentImageType.type === 'after' ? (
              <motion.div 
                key={`after-${selectedProject.id}`} 
                className="relative w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={selectedProject.afterImage}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </motion.div>
            ) : currentImageType.type === 'before-after' ? (
              <motion.div 
                key={`before-after-${selectedProject.id}`} 
                className="w-full h-full pointer-events-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BeforeAfterComparison
                  beforeSrc={selectedProject.beforeImage}
                  afterSrc={selectedProject.afterImage}
                  className="w-full h-full"
                />
              </motion.div>
            ) : (
              <motion.div 
                key={`gallery-${selectedProject.id}-${selectedImageIndex - 2}`} 
                className="relative w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={selectedProject.galleryImages[selectedImageIndex - 2]}
                  alt={`${selectedProject.title} - Gallery ${selectedImageIndex - 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Animated Text Content Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="h-full w-full text-white px-6 md:px-12 py-24">
            <AnimatePresence mode="wait">
              {/* Project Title - Top Left Area */}
              <motion.div 
                key={`title-${selectedProject.id}`}
                className="absolute top-28 left-10 md:left-16 max-w-2xl"
                variants={titleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={getAnimationStyle(0, 'up')}
              >
                <motion.h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
                  layoutId={`title-${selectedProject.id}`}
                >
                  {selectedProject.title}
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl mt-2 opacity-80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentImageType.label}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* Area Info - Top Right */}
              <motion.div 
                key={`area-${selectedProject.id}`}
                className="absolute top-52 md:top-20 right-8 md:right-20 text-right"
                variants={slideFromRight}
                initial="initial"
                animate="animate"
                exit="exit"
                style={getAnimationStyle(0.1, 'right')}
              >
                <motion.div 
                  className="text-xs md:text-sm opacity-70 mb-1 tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  Luas
                </motion.div>
                <div className="text-xl md:text-3xl font-bold">{selectedProject.area}</div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* Completion - Middle Right */}
              <motion.div 
                key={`completion-${selectedProject.id}`}
                className="absolute top-1/3 right-12 md:right-28 text-right"
                variants={slideFromRight}
                initial="initial"
                animate="animate"
                exit="exit"
                style={getAnimationStyle(0.15, 'right')}
              >
                <motion.div 
                  className="text-xs md:text-sm opacity-70 mb-1 tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.18, duration: 0.3 }}
                >
                  Selesai
                </motion.div>
                <div className="text-lg md:text-2xl font-semibold">{selectedProject.completion}</div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* Location - Lower Left */}
              <motion.div 
                key={`location-${selectedProject.id}`}
                className="absolute bottom-68 md:bottom-72 left-12 md:left-28"
                variants={slideFromLeft}
                initial="initial"
                animate="animate"
                exit="exit"
                style={getAnimationStyle(0.2, 'left')}
              >
                <motion.div 
                  className="text-xs md:text-sm opacity-70 mb-1 tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  Lokasi
                </motion.div>
                <div className="text-lg md:text-2xl font-semibold">{selectedProject.location}</div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* Category - Middle Left */}
              <motion.div 
                key={`category-${selectedProject.id}`}
                className="absolute top-1/2 left-8 md:left-12 origin-left"
                variants={categoryVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={getAnimationStyle(0.05, 'up')}
              >
                <div className="text-sm md:text-base opacity-80 tracking-[0.3em] uppercase">
                  {selectedProject.category}
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* View Details Button - Using Button Component with Variants */}
              <motion.div 
                key={`details-btn-${selectedProject.id}`}
                className="absolute bottom-52 -right-20 md:bottom-44 transform -translate-x-1/2 pointer-events-auto"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Link href={`/portfolio/${selectedProject.id}`}>
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary-900 text-white shadow-lg"
                  >
                    Lihat Proyek Lengkap
                  </Button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation Bar - Improved Styling */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <motion.div 
            className="flex flex-col md:flex-row h-auto md:h-40 bg-background/95 backdrop-blur-md border-t border-border shadow-lg"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number], delay: 0.3 }}
          >
            {/* Left Side - Portfolio Navigation with Image Thumbnails */}
            <div className="flex items-center gap-3 px-6 py-4 md:py-0 overflow-x-auto border-b md:border-b-0 md:border-r border-border md:w-4/5">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => scrollToProject(index)}
                  className={cn(
                    "relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-sm overflow-hidden transition-all duration-300",
                    selectedProjectIndex === index 
                      ? 'ring-2 ring-primary opacity-100' 
                      : 'opacity-50 hover:opacity-80'
                  )}
                >
                  <Image
                    src={project.afterImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  {selectedProjectIndex === index && (
                    <motion.div
                      className="absolute inset-0 border-2 border-primary"
                      layoutId={`project-thumbnail-${project.id}`}
                      transition={{ duration: 0.25, ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number] }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right Side - Gallery Navigation with Arrows and Counter - Using Button Variants */}
            <div className="flex items-center justify-center px-8 py-4 md:py-0">
              <div className="flex items-center gap-4">
                <button
                  onClick={prevImage}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  )}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 15l-5-5 5-5" />
                  </svg>
                </button>
                <div className="text-sm text-muted-foreground min-w-[60px] text-center">
                  {selectedImageIndex + 1} / {allProjectImages.length}
                </div>
                <button
                  onClick={nextImage}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  )}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 15l5-5-5-5" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}