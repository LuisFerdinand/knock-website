// components/layout/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  // Calculate initial state without side effects
  const getInitialHeaderState = () => {
    if (typeof window === 'undefined') return true;
    if (!isHomePage) return true;
    
    const introShown = sessionStorage.getItem("introShown");
    return introShown === "true";
  };

  const [showHeader, setShowHeader] = useState(getInitialHeaderState);

  // Handle intro timer
  useEffect(() => {
    // Only run timer logic on home page when intro hasn't been shown
    if (!isHomePage) return;
    if (typeof window === 'undefined') return;
    
    const introShown = sessionStorage.getItem("introShown");
    if (introShown === "true") return;

    // Wait for intro to complete (10s GIF + 0.8s exit animation)
    const timer = setTimeout(() => {
      console.log("Timer complete - showing header");
      setShowHeader(true);
    }, 10800);
    
    return () => {
      clearTimeout(timer);
    };
  }, [isHomePage]);

  // Handle pathname changes (when navigating to non-home pages)
  useEffect(() => {
    if (!isHomePage && !showHeader) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowHeader(true);
    }
  }, [isHomePage, showHeader]);

  return (
    <>
      {/* Animated Header */}
      <AnimatePresence>
        {showHeader && (
          <motion.div
            key="header"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number]
            }}
          >
            <Header />
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>
      <Footer />
    </>
  );
}