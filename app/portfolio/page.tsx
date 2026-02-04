// app/portfolio/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Modern Villa Residence",
    category: "Architecture",
    location: "Beverly Hills, CA",
    year: "2023",
    area: "450m² / 48T",
    completion: "2023",
    description: "A contemporary villa featuring open-plan living spaces and seamless indoor-outdoor integration.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    tags: ["Modern", "Luxury", "Sustainable"],
  },
  {
    id: 2,
    title: "Urban Luxury Apartment",
    category: "Interior Design",
    location: "Manhattan, NY",
    year: "2023",
    area: "280m² / 30T",
    completion: "2023",
    description: "High-end apartment interior showcasing minimalist design with premium finishes.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    tags: ["Contemporary", "Luxury", "Urban"],
  },
  {
    id: 3,
    title: "Minimalist Family Home",
    category: "Complete Projects",
    location: "Portland, OR",
    year: "2022",
    area: "380m² / 41T",
    completion: "2022",
    description: "A serene family home emphasizing clean lines and functional spaces.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    tags: ["Minimalist", "Family", "Eco-Friendly"],
  },
  {
    id: 4,
    title: "Industrial Loft Conversion",
    category: "Renovation",
    location: "Chicago, IL",
    year: "2023",
    area: "320m² / 34T",
    completion: "2023",
    description: "Transformation of a warehouse into a sophisticated living space with industrial charm.",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&q=80",
    tags: ["Industrial", "Loft", "Urban"],
  },
  {
    id: 5,
    title: "Coastal Beach House",
    category: "Architecture",
    location: "Malibu, CA",
    year: "2022",
    area: "520m² / 56T",
    completion: "2022",
    description: "Beachfront property designed to maximize ocean views and natural light.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
    tags: ["Coastal", "Modern", "Luxury"],
  },
  {
    id: 6,
    title: "Scandinavian Apartment",
    category: "Interior Design",
    location: "Seattle, WA",
    year: "2023",
    area: "180m² / 19T",
    completion: "2023",
    description: "Light-filled apartment featuring Nordic-inspired design and natural materials.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80",
    tags: ["Scandinavian", "Cozy", "Natural"],
  },
  {
    id: 7,
    title: "Mid-Century Modern Renovation",
    category: "Renovation",
    location: "Palm Springs, CA",
    year: "2022",
    area: "290m² / 31T",
    completion: "2022",
    description: "Restoration and modernization of a classic mid-century home.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80",
    tags: ["Mid-Century", "Vintage", "Modern"],
  },
  {
    id: 8,
    title: "Contemporary Townhouse",
    category: "Complete Projects",
    location: "Boston, MA",
    year: "2023",
    area: "340m² / 37T",
    completion: "2023",
    description: "Multi-level townhouse with smart home integration and contemporary design.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80",
    tags: ["Contemporary", "Smart Home", "Urban"],
  },
];

export default function PortfolioPage() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const selectedProject = projects[selectedProjectIndex];

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
        setSelectedProjectIndex(projectIndex);
      }
    };

    const container = imageContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToProject = (index: number) => {
    setSelectedProjectIndex(index);
    if (imageContainerRef.current) {
      const scrollAmount = index * (imageContainerRef.current.scrollHeight / projects.length);
      imageContainerRef.current.scrollTo({
        top: scrollAmount,
        behavior: 'smooth'
      });
    }
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
        {/* Scrollable Images Container with AnimatePresence */}
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
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
          ))}
        </div>

        {/* Animated Text Content Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="h-full w-full text-white px-6 md:px-12 py-24">
            <AnimatePresence mode="wait">
              {/* Project Title - Top Left Area */}
              <motion.div 
                key={`title-${selectedProject.id}`}
                className="absolute top-28 left-8 md:left-16 max-w-2xl"
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
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* Area Info - Top Right */}
              <motion.div 
                key={`area-${selectedProject.id}`}
                className="absolute top-36 right-8 md:right-20 text-right"
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
                  Area
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
                  Completion
                </motion.div>
                <div className="text-lg md:text-2xl font-semibold">{selectedProject.completion}</div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* Location - Lower Left */}
              <motion.div 
                key={`location-${selectedProject.id}`}
                className="absolute bottom-56 md:bottom-72 left-12 md:left-28"
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
                  Location
                </motion.div>
                <div className="text-lg md:text-2xl font-semibold">{selectedProject.location}</div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* Category - Middle Left */}
              <motion.div 
                key={`category-${selectedProject.id}`}
                className="absolute top-1/2 left-8 md:left-16 origin-left"
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
              {/* See Overview Button - Bottom Right */}
              <motion.div 
                key={`button-${selectedProject.id}`}
                className="absolute bottom-40 md:bottom-56 right-8 md:right-20 pointer-events-auto"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={getAnimationStyle(0.25, 'down')}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/40 text-white hover:bg-white/20 backdrop-blur-sm bg-white/10"
                  >
                    See Overview +
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <motion.div 
            className="flex h-32 md:h-40 bg-background/90 backdrop-blur-md border-t border-border"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number], delay: 0.3 }}
          >
            {/* Left Side - Thumbnail Navigation */}
            <div className="flex-1 flex items-center gap-3 px-6 overflow-x-auto">
              {projects.map((project, index) => (
                <motion.button
                  key={project.id}
                  onClick={() => scrollToProject(index)}
                  className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-sm overflow-hidden transition-all duration-300 ${
                    selectedProjectIndex === index 
                      ? 'ring-2 ring-secondary opacity-100' 
                      : 'opacity-50 hover:opacity-80'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: selectedProjectIndex === index ? 1 : 0.5, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.35 + index * 0.03 }}
                  whileHover={{ 
                    scale: 1.1,
                    opacity: 1,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  {selectedProjectIndex === index && (
                    <motion.div
                      className="absolute inset-0 border-2 border-secondary"
                      layoutId="thumbnail-border"
                      transition={{ duration: 0.25, ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number] }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Right Side - Back to Works */}
            <motion.div 
              className="flex items-center justify-center px-8 border-l border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Link 
                href="/" 
                className="text-sm md:text-base text-foreground hover:text-secondary transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <motion.span 
                  className="text-xl"
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  ←
                </motion.span> 
                Back to Works
              </Link>
            </motion.div>
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