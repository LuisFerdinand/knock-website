// components/layout/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useIntro } from "@/context/IntroContext";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { isIntroActive } = useIntro();
  
  // Show header if not on home page or if intro is not active
  const showHeader = !isHomePage || !isIntroActive;

  return (
    <>
      {/* Header without animation */}
      {showHeader && <Header />}

      <main>{children}</main>
      <Footer />
    </>
  );
}