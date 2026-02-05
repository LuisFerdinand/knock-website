// components/IntroLoader.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);
  const [showClickPrompt, setShowClickPrompt] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollListenerRef = useRef<(() => void) | null>(null);
  const { theme } = useTheme();

  // Set mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize audio and scroll listener
  useEffect(() => {
    console.log("IntroLoader mounted - waiting for user click");
    
    const audio = new Audio("/knock-sound.mp3");
    audio.volume = 0.8;
    audio.loop = false;
    audioRef.current = audio;

    // Add scroll listener to skip intro on scroll
    const handleScroll = () => {
      console.log("Scroll detected, skipping intro");
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current);
        scrollListenerRef.current = null;
      }
      // eslint-disable-next-line react-hooks/immutability
      handleSkipIntro();
    };
    
    scrollListenerRef.current = handleScroll;
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      console.log("IntroLoader unmounting");
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  const handleSkipIntro = () => {
    console.log("Skipping intro animation");
    setIsPlaying(false);
    setShowClickPrompt(false);
    
    // Call onComplete immediately with a short delay for animation
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const startIntro = async () => {
    // Prevent multiple starts
    if (hasStarted) return;
    
    console.log("Starting intro sequence");
    setHasStarted(true);
    setShowClickPrompt(false);
    setIsPlaying(true);

    // Play audio
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        console.log("✅ Audio playing");
      } catch (error) {
        console.log("❌ Audio playback error:", error);
      }
    }

    // Set timer for intro completion (9 seconds)
    timerRef.current = setTimeout(() => {
      console.log("Intro timer complete - starting exit");
      setIsPlaying(false);
      
      // After exit animation, call onComplete
      setTimeout(() => {
        console.log("Calling onComplete");
        onComplete();
      }, 800); // Match the exit animation duration
    }, 9000);
  };

  const handleGifLoad = () => {
    console.log("✅ GIF loaded successfully");
    setGifLoaded(true);
  };

  const handleGifError = () => {
    console.log("❌ GIF failed to load");
    setGifLoaded(true);
  };

  // Determine which logo to use based on theme
  const logoSrc = mounted && theme === "light" ? "/logo-black.gif" : "/logo.gif";

  return (
    <>
      {/* Click prompt screen */}
      <AnimatePresence mode="wait">
        {showClickPrompt && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background cursor-pointer"
            onClick={startIntro}
            initial={{ opacity: 1 }}
            exit={{ 
              y: "-100%",
              opacity: 0,
              transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
            }}
          >
            {/* Logo preview (static) */}
            <motion.div
              className="relative w-48 h-48 md:w-64 md:h-64 mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={logoSrc}
                alt="Logo"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </motion.div>

            {/* Click prompt text with pulse animation */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.p
                className="text-foreground/70 text-lg md:text-xl tracking-wide font-light mb-2"
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Click anywhere to start
              </motion.p>
              <p className="text-foreground/50 text-sm tracking-wider uppercase">
                Tap to knock
              </p>
              <p className="text-foreground/30 text-xs mt-2">
                Or scroll to skip
              </p>
            </motion.div>

            {/* Ripple effect indicator */}
            <motion.div
              className="absolute bottom-20 w-16 h-16 rounded-full border-2 border-foreground/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro animation screen */}
      <AnimatePresence mode="wait">
        {isPlaying && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ 
              y: "-100%", // Slide entire page up and out
              opacity: 0,
              transition: { 
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1] // Smooth ease-in-out
              }
            }}
          >
            {/* GIF Container */}
            <motion.div
              className="relative w-72 h-72 md:w-96 md:h-96"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ 
                scale: gifLoaded ? 1 : 0.7, 
                opacity: gifLoaded ? 1 : 0.3,
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              exit={{ 
                scale: 0.9, 
                opacity: 0,
                y: -50,
                transition: { 
                  duration: 0.5,
                  ease: [0.76, 0, 0.24, 1]
                }
              }}
            >
              <Image
                src={logoSrc}
                alt="Loading animation"
                fill
                className="object-contain"
                priority
                unoptimized
                onLoad={handleGifLoad}
                onError={handleGifError}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: gifLoaded ? 1 : 0.5, 
                y: 0,
              }}
              transition={{ 
                duration: 0.6,
                delay: 0.3
              }}
              exit={{ 
                opacity: 0, 
                y: -20,
                transition: { duration: 0.5 }
              }}
            >
              <p className="text-foreground/70 text-sm md:text-base tracking-[0.3em] uppercase font-light">
                {gifLoaded ? "Knock Knock..." : "Loading..."}
              </p>
              <p className="text-foreground/30 text-xs mt-2">
                Scroll to skip
              </p>
            </motion.div>

            {/* Progress indicator */}
            <motion.div
              className="absolute bottom-20 w-48 h-1 bg-foreground/10 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: gifLoaded ? 1 : 0 }}
              transition={{ delay: 0.5 }}
              exit={{ 
                opacity: 0,
                y: -20,
                transition: { duration: 0.4 }
              }}
            >
              <motion.div
                className="h-full bg-secondary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 9, 
                  ease: "linear" 
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}