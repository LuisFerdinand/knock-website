// app/(dashboard)/dashboard/admin/page.tsx
"use client";

import { useSession } from "@/components/providers/SessionProvider";
import { 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Plus, 
  FolderOpen, 
  Settings,
  TrendingUp,
  Calendar
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useSession();

  const stats = [
    {
      label: "Total Projects",
      value: "24",
      icon: Briefcase,
      color: "primary",
      bgColor: "bg-primary-100 dark:bg-primary-900/30",
      iconColor: "text-primary-700 dark:text-primary-300",
      trend: "+12%",
      trendUp: true,
    },
    {
      label: "Active Projects",
      value: "12",
      icon: TrendingUp,
      color: "green",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-700 dark:text-green-300",
      trend: "+8%",
      trendUp: true,
    },
    {
      label: "Completed",
      value: "8",
      icon: CheckCircle2,
      color: "secondary",
      bgColor: "bg-secondary-100 dark:bg-secondary-900/30",
      iconColor: "text-secondary-700 dark:text-secondary-300",
      trend: "+3",
      trendUp: true,
    },
    {
      label: "Pending",
      value: "4",
      icon: Clock,
      color: "orange",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-700 dark:text-orange-300",
      trend: "-2",
      trendUp: false,
    },
  ];

  const quickActions = [
    {
      title: "New Project",
      description: "Create a new project",
      icon: Plus,
      color: "primary",
      borderColor: "border-primary-300 dark:border-primary-600",
      hoverColor: "hover:border-primary-500 dark:hover:border-primary-400",
      iconBg: "bg-primary-100 dark:bg-primary-900/30",
      iconColor: "text-primary-700 dark:text-primary-300",
    },
    {
      title: "View All Projects",
      description: "Manage existing projects",
      icon: FolderOpen,
      color: "secondary",
      borderColor: "border-secondary-300 dark:border-secondary-600",
      hoverColor: "hover:border-secondary-500 dark:hover:border-secondary-400",
      iconBg: "bg-secondary-100 dark:bg-secondary-900/30",
      iconColor: "text-secondary-700 dark:text-secondary-300",
    },
    {
      title: "Settings",
      description: "Configure dashboard",
      icon: Settings,
      color: "tertiary",
      borderColor: "border-tertiary-300 dark:border-primary-600",
      hoverColor: "hover:border-tertiary-400 dark:hover:border-primary-500",
      iconBg: "bg-tertiary-200 dark:bg-primary-800/30",
      iconColor: "text-primary-800 dark:text-primary-200",
    },
  ];

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-800 to-secondary-700 dark:from-primary-100 dark:to-secondary-300 bg-clip-text text-transparent">
            Welcome back, {user?.name}!
          </h1>
          <Sparkles className="h-8 w-8 text-secondary-500 dark:text-secondary-400" />
        </div>
        <p className="text-lg text-muted-foreground flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Admin Dashboard - Manage your projects and settings
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group relative bg-white dark:bg-primary-900/40 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-primary-100 dark:border-primary-800 hover:border-primary-200 dark:hover:border-primary-700 overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/10 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity -mr-16 -mt-16"></div>
              
              <div className="relative flex items-start justify-between">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <div className="flex items-end gap-3">
                    <p className="text-4xl font-bold text-primary-900 dark:text-primary-50">
                      {stat.value}
                    </p>
                    <span className={`text-sm font-semibold pb-1 ${stat.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className={`p-4 ${stat.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-primary-900/40 rounded-2xl shadow-sm p-8 border border-primary-100 dark:border-primary-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-8 bg-gradient-to-b from-secondary-500 to-secondary-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-50">
            Quick Actions
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className={`group relative p-6 border-2 border-dashed ${action.borderColor} ${action.hoverColor} rounded-xl transition-all duration-300 text-left hover:shadow-lg overflow-hidden`}
              >
                {/* Background decoration */}
                <div className={`absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/30 dark:from-primary-900/20 dark:to-secondary-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative space-y-4">
                  <div className={`inline-flex p-3 ${action.iconBg} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${action.iconColor}`} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 group-hover:text-primary-700 dark:group-hover:text-primary-200 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Section (Optional) */}
      <div className="bg-white dark:bg-primary-900/40 rounded-2xl shadow-sm p-8 border border-primary-100 dark:border-primary-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-secondary-500 to-secondary-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-50">
              Recent Activity
            </h2>
          </div>
          <button className="text-sm font-medium text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 transition-colors">
            View All →
          </button>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors border border-transparent hover:border-primary-200 dark:hover:border-primary-700"
            >
              <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-primary-900 dark:text-primary-50">
                  Project status updated
                </p>
                <p className="text-sm text-muted-foreground">
                  {index === 0 ? "2 hours ago" : index === 1 ? "5 hours ago" : "1 day ago"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}