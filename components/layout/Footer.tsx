// /components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Mail, Instagram, MessageCircle } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container-custom py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
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

          {/* Contact Links */}
          <div className="flex items-center justify-center space-x-8">
            <Link 
              href="https://www.instagram.com/knockpresents/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </Link>
            
            <Link 
              href="https://wa.me/6287886038775" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </Link>
            
            <Link 
              href="mailto:knockpresents@gmail.com" 
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Knock. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}