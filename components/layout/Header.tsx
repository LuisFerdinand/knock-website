// components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/ThemeProvider";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-custom flex items-center justify-between py-4">
        {/* 1. LEFT SIDE: Logo - Different logos for light and dark themes */}
        <Link href="/" className="flex items-center z-50 relative">
          {theme === "dark" ? (
            <Image
              src="/logo.gif" 
              alt="Knock Logo" 
              width={800} 
              height={40}
              className="h-auto w-32" 
            />
          ) : (
            <Image
              src="/logo-black.gif" 
              alt="Knock Logo" 
              width={800} 
              height={40}
              className="h-auto w-32" 
            />
          )}
        </Link>

        {/* 2. CENTER SIDE: Navigation Links */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium header-text transition-colors hover:text-[var(--color-secondary)]"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* 3. RIGHT SIDE: Actions (Theme & Schedule) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md transition-colors hover:bg-muted"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 header-text" />
            ) : (
              <Moon className="h-5 w-5 header-text" />
            )}
          </button>

          {/* Schedule Meeting Button */}
          <Button
            size="sm"
            className="header-button-bg header-button-text hover:opacity-90 hover:text-white"
          >
            Schedule Meeting
          </Button>
        </div>

        {/* Mobile menu button (Visible only on mobile) */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md transition-colors z-50 relative hover:bg-muted"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 header-text" />
            ) : (
              <Moon className="h-5 w-5 header-text" />
            )}
          </button>

          {/* Hamburger Menu Button */}
          <button
            type="button"
            className="p-2 z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6 header-text" />
            ) : (
              <Menu className="h-6 w-6 header-text" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md absolute top-full left-0 w-full">
          <div className="container-custom space-y-1 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted hover:text-[var(--color-secondary)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <Button 
                className="w-full header-button-bg header-button-text hover:opacity-90" 
                size="sm"
              >
                Schedule Meeting
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}