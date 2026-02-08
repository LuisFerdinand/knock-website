// app/components/dashboard/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Portfolio", href: "/dashboard/portfolio" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <div className="w-64 bg-card border-r border-border shadow-sm">
      <div className="p-6">
        <Link href="/" className="flex items-center">
          {theme === "dark" ? (
            <Image
              src="/logo.gif" 
              alt="Knock Logo" 
              width={300} 
              height={20}
              className="h-auto w-20" 
            />
          ) : (
            <Image
              src="/logo-black.gif" 
              alt="Knock Logo" 
              width={300} 
              height={20}
              className="h-auto w-20" 
            />
          )}
        </Link>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block py-3 px-6 text-foreground hover:bg-muted transition-colors ${
              pathname === item.href ? "bg-muted border-r-4 border-[var(--color-secondary)]" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}