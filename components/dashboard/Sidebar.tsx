/* eslint-disable @typescript-eslint/no-explicit-any */
// components/dashboard/Sidebar.tsx - Collapsible with tooltips
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "@/components/providers/SessionProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { 
  Home, 
  LogOut, 
  LayoutDashboard, 
  Image as ImageIcon, 
  FolderOpen, 
  Settings, 
  Heart, 
  User, 
  Contact,
  Wrench,
  Package,
  Info,
  KeyRound,
  Users,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define proper types for navigation items
interface NavigationItem {
  name: string;
  icon: any;
  href?: string;
  isCategory?: boolean;
  isSubItem?: boolean;
}

interface SidebarProps {
  userRole: "admin" | "user";
  isCollapsed: boolean;
}

export function Sidebar({ userRole, isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useSession();
  const { theme } = useTheme();

  const adminNavigation: NavigationItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Portfolio",
      href: "/dashboard/admin/portfolio",
      icon: ImageIcon,
    },
    {
      name: "About",
      href: "/dashboard/admin/about",
      icon: Info,
    },
    {
      name: "Home Page",
      icon: Home,
      isCategory: true,
    },
    {
      name: "Hero Section",
      href: "/dashboard/admin/home/hero",
      icon: ImageIcon,
      isSubItem: true,
    },
    {
      name: "Services Section",
      href: "/dashboard/admin/home/services",
      icon: Wrench,
      isSubItem: true,
    },
    {
      name: "About Section",
      href: "/dashboard/admin/home/about",
      icon: Info,
      isSubItem: true,
    },
    {
      name: "Services",
      icon: Package,
      isCategory: true,
    },
    {
      name: "Service Management",
      href: "/dashboard/admin/services",
      icon: Wrench,
      isSubItem: true,
    },
    {
      name: "Comparison Matrix",
      href: "/dashboard/admin/comparison",
      icon: LayoutDashboard,
      isSubItem: true,
    },
    {
      name: "Contact Form",
      href: "/dashboard/admin/contact-submissions",
      icon: Contact,
    },
    {
      name: "User Management",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
    {
      name: "Change Password",
      href: "/dashboard/admin/change-password",
      icon: KeyRound,
    },
  ];

  const userNavigation: NavigationItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard/user",
      icon: LayoutDashboard,
    },
    {
      name: "My Projects",
      href: "/dashboard/user/portfolio",
      icon: FolderOpen,
    },
    {
      name: "Favorites",
      href: "/dashboard/user/favorites",
      icon: Heart,
    },
    {
      name: "Profile",
      href: "/dashboard/user/profile",
      icon: User,
    },
    {
      name: "Change Password",
      href: "/dashboard/user/change-password",
      icon: KeyRound,
    },
  ];

  const navigation = userRole === "admin" ? adminNavigation : userNavigation;

  const NavigationLink = ({ item }: { item: NavigationItem }) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;

    const linkContent = (
      <Link
        href={item.href || "#"}
        className={`flex items-center gap-3 px-3 py-3 text-sm transition-all duration-200 group relative overflow-hidden ${
          isCollapsed ? "justify-center" : ""
        } ${
          isActive 
            ? "bg-secondary/15 text-secondary font-semibold shadow-sm" 
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }`}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary to-secondary/50" />
        )}
        
        {/* Hover background effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isActive ? 'opacity-100' : ''}`} />
        
        <Icon className={`h-5 w-5 transition-all duration-200 relative z-10 flex-shrink-0 ${
          isActive ? "text-secondary" : "text-muted-foreground group-hover:text-foreground group-hover:scale-110"
        }`} />
        {!isCollapsed && <span className="relative z-10">{item.name}</span>}
      </Link>
    );

    // Wrap in tooltip if collapsed
    if (isCollapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {linkContent}
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {item.name}
          </TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

  const SubNavigationLink = ({ item }: { item: NavigationItem }) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;

    const linkContent = (
      <Link
        href={item.href || "#"}
        className={`flex items-center gap-3 pr-3 py-2.5 text-sm transition-all duration-200 group relative overflow-hidden ${
          isCollapsed ? "pl-3 justify-center" : "pl-8"
        } ${
          isActive 
            ? "bg-secondary/15 text-secondary font-semibold shadow-sm" 
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }`}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary to-secondary/50 rounded-r-full" />
        )}
        
        {/* Hover background effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isActive ? 'opacity-100' : ''}`} />
        
        <Icon className={`h-4 w-4 transition-all duration-200 relative z-10 flex-shrink-0 ${
          isActive ? "text-secondary" : "text-muted-foreground group-hover:text-foreground group-hover:scale-110"
        }`} />
        {!isCollapsed && <span className="relative z-10">{item.name}</span>}
      </Link>
    );

    // Wrap in tooltip if collapsed
    if (isCollapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {linkContent}
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {item.name}
          </TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

  const BottomButton = ({ 
    onClick, 
    icon: Icon, 
    label, 
    variant = "default" 
  }: { 
    onClick: () => void; 
    icon: any; 
    label: string;
    variant?: "default" | "danger";
  }) => {
    const buttonContent = (
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-200 group relative overflow-hidden ${
          isCollapsed ? "justify-center" : ""
        } ${
          variant === "danger"
            ? "text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }`}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${
          variant === "danger" ? "from-red-500/5" : "from-primary/5"
        } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
        <Icon className="h-5 w-5 transition-all duration-200 group-hover:scale-110 relative z-10 flex-shrink-0" />
        {!isCollapsed && <span className="relative z-10">{label}</span>}
      </button>
    );

    if (isCollapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {buttonContent}
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return buttonContent;
  };

  return (
    <TooltipProvider>
      <div 
        className={`bg-gradient-to-b from-card to-card/50 border-r border-border/50 backdrop-blur-sm h-full flex flex-col transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo Section */}
        <div className={`p-6 pb-4 ${isCollapsed ? "px-2" : ""}`}>
          <Link 
            href={userRole === "admin" ? "/dashboard/admin" : "/dashboard/user"} 
            className="flex items-center group justify-center"
          >
            {!isCollapsed && (
              <>
                {theme === "dark" ? (
                  <Image
                    src="/logo.gif" 
                    alt="Logo" 
                    width={300} 
                    height={20}
                    className="h-auto w-20 transition-transform duration-300 group-hover:scale-105" 
                    priority
                  />
                ) : (
                  <Image
                    src="/logo-black.gif" 
                    alt="Logo" 
                    width={300} 
                    height={20}
                    className="h-auto w-20 transition-transform duration-300 group-hover:scale-105" 
                    priority
                  />
                )}
              </>
            )}
            {isCollapsed && (
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="text-secondary font-bold text-sm">
                  {userRole === "admin" ? "A" : "U"}
                </span>
              </div>
            )}
          </Link>
          {!isCollapsed && (
            <div className="mt-3 px-3 py-2 bg-secondary/10 border border-secondary/20">
              <p className="text-xs text-foreground font-semibold uppercase tracking-widest">
                {userRole === "admin" ? "Admin Panel" : "User Portal"}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <div className="space-y-1 px-3">
            {navigation.map((item, index) => {
              // Category header (non-clickable)
              if (item.isCategory) {
                if (isCollapsed) {
                  // Show a simple divider when collapsed
                  return (
                    <div key={item.name} className="my-2">
                      <div className="h-px bg-border/50" />
                    </div>
                  );
                }

                return (
                  <div 
                    key={item.name}
                    className="flex items-center px-3 py-3 mt-6 mb-2"
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="size-4 text-secondary" />
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-border/50 ml-3" />
                  </div>
                );
              }

              // Sub-items (indented)
              if (item.isSubItem) {
                return <SubNavigationLink key={item.name} item={item} />;
              }

              // Regular items
              return <NavigationLink key={item.name} item={item} />;
            })}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-border/50 p-3 space-y-1 bg-card/80 backdrop-blur-sm">
          <BottomButton
            onClick={() => window.location.href = "/"}
            icon={Home}
            label="Go to Site"
          />
          <BottomButton
            onClick={() => logout()}
            icon={LogOut}
            label="Sign Out"
            variant="danger"
          />
        </div>
      </div>
    </TooltipProvider>
  );
}