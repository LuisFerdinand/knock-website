// app/(site)/portfolio/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Define types for our components
interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  completion: string;
  description: string;
  beforeImage?: string;
  afterImage: string;
  galleryImages: string[];
  tags: string[];
  order: number; // Added order field
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/portfoliopublic');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        // The API already returns projects sorted by order, but we ensure it here as well
        const sortedProjects = data.sort((a: Project, b: Project) => a.order - b.order);
        setProjects(sortedProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const selectedProject = projects[selectedProjectIndex];
  
  // Get all images for the current project - only include after and gallery images
  const allProjectImages = selectedProject ? [
    { type: 'after' as const, label: 'After' },
    ...selectedProject.galleryImages.map((_, index) => ({ 
      type: 'gallery' as const, 
      label: `Gallery ${index + 1}` 
    }))
  ] : [];
  
  const currentImageType = allProjectImages[selectedImageIndex];

  useEffect(() => {
    const handleScroll = () => {
      if (imageContainerRef.current && projects.length > 0) {
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
  }, [selectedProjectIndex, projects.length]);

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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || projects.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h2 className="text-2xl font-bold mb-2">No Projects Available</h2>
          <p className="text-muted-foreground mb-4">
            {error || 'There are no published projects at the moment.'}
          </p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

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
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
            </div>
          ))}
        </div>

        {/* Current Image Display Overlay - This handles image navigation within project */}
        <div className="absolute inset-0 z-5 pointer-events-none">
          <AnimatePresence mode="wait">
            {currentImageType && currentImageType.type === 'after' ? (
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
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
              </motion.div>
            ) : currentImageType && currentImageType.type === 'gallery' ? (
              <motion.div 
                key={`gallery-${selectedProject.id}-${selectedImageIndex}`} 
                className="relative w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={selectedProject.galleryImages[selectedImageIndex - 1]}
                  alt={`${selectedProject.title} - ${currentImageType.label}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Animated Text Content Overlay */}
        {selectedProject && (
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
                  {/* <motion.p 
                    className="text-lg md:text-xl mt-2 opacity-80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.3 }}
                  >
                    {currentImageType?.label}
                  </motion.p> */}
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
                  className="absolute top-1/3 right-8 md:right-28 text-right"
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
        )}

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
                <div className="text-sm text-muted-foreground min-w-15 text-center">
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