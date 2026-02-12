// app/(dashboard)/dashboard/admin/page.tsx
"use client";

import { useSession } from "@/components/providers/SessionProvider";
import { useEffect, useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  Sparkles,
  Clock,
  Plus,
  FolderOpen,
  Settings,
  TrendingUp,
  Calendar,
  FileText,
  Users,
  Star,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { toast } from "sonner";

interface DashboardStats {
  projects: {
    total: number;
    active: number;
    featured: number;
    draft: number;
  };
  submissions: {
    total: number;
    new: number;
    contacted: number;
    completed: number;
  };
}

interface ChartData {
  label: string;
  value: number;
  date: string;
}

export default function AdminDashboardPage() {
  const { user } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartPeriod, setChartPeriod] = useState<"day" | "week" | "month">("week");
  const [isLoading, setIsLoading] = useState(true);
  const [isChartLoading, setIsChartLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [chartPeriod]);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setStats(data.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to load dashboard statistics");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChartData = async () => {
    setIsChartLoading(true);
    try {
      const response = await fetch(`/api/admin/stats/submissions-chart?period=${chartPeriod}`);
      if (!response.ok) throw new Error("Failed to fetch chart data");
      const data = await response.json();
      setChartData(data.data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
      toast.error("Failed to load chart data");
    } finally {
      setIsChartLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const statsCards = [
    {
      label: "Total Projects",
      value: stats?.projects.total.toString() || "0",
      icon: Briefcase,
      bgColor: "bg-primary-100 dark:bg-primary-900/30",
      iconColor: "text-primary-700 dark:text-primary-300",
      description: "All portfolio projects",
    },
    {
      label: "Active Projects",
      value: stats?.projects.active.toString() || "0",
      icon: TrendingUp,
      bgColor: "bg-primary-100 dark:bg-primary-900/30",
      iconColor: "text-primary-700 dark:text-primary-300",
      description: "Published projects",
    },
    {
      label: "Featured Projects",
      value: stats?.projects.featured.toString() || "0",
      icon: Star,
      bgColor: "bg-secondary-100 dark:bg-secondary-900/30",
      iconColor: "text-primary dark:text-secondary-300",
      description: "Highlighted projects",
    },
    {
      label: "Draft Projects",
      value: stats?.projects.draft.toString() || "0",
      icon: FileText,
      bgColor: "bg-tertiary-100 dark:bg-tertiary-900/30",
      iconColor: "text-tertiary-700 dark:text-tertiary-300",
      description: "Unpublished drafts",
    },
  ];

  const submissionCards = [
    {
      label: "Total Submissions",
      value: stats?.submissions.total.toString() || "0",
      icon: Users,
      bgColor: "bg-primary-100 dark:bg-primary-900/30",
      iconColor: "text-primary-700 dark:text-primary-300",
      description: "All contact forms",
    },
    {
      label: "New Submissions",
      value: stats?.submissions.new.toString() || "0",
      icon: Clock,
      bgColor: "bg-secondary-100 dark:bg-secondary-900/30",
      iconColor: "text-secondary-700 dark:text-secondary-300",
      description: "Pending review",
    },
    {
      label: "Contacted",
      value: stats?.submissions.contacted.toString() || "0",
      icon: CheckCircle2,
      bgColor: "bg-tertiary-100 dark:bg-tertiary-900/30",
      iconColor: "text-tertiary-700 dark:text-tertiary-300",
      description: "In progress",
    },
    {
      label: "Completed",
      value: stats?.submissions.completed.toString() || "0",
      icon: CheckCircle2,
      bgColor: "bg-primary-100 dark:bg-primary-900/30",
      iconColor: "text-primary-700 dark:text-primary-300",
      description: "Finished requests",
    },
  ];

  const quickActions = [
    {
      title: "New Portfolio",
      description: "Create a new portfolio project",
      icon: Plus,
      href: "/dashboard/admin/portfolio/create",
      bgColor: "bg-primary-100 dark:bg-primary-900/30",
      iconColor: "text-primary-700 dark:text-primary-300",
    },
    {
      title: "View All Portfolio",
      description: "Manage existing portfolio",
      icon: FolderOpen,
      href: "/dashboard/admin/portfolio",
      bgColor: "bg-secondary-100 dark:bg-secondary-900/30",
      iconColor: "text-secondary-700 dark:text-secondary-300",
    },
    {
      title: "Contact Submissions",
      description: "Review form submissions",
      icon: Users,
      href: "/dashboard/admin/contact",
      bgColor: "bg-tertiary-100 dark:bg-tertiary-900/30",
      iconColor: "text-tertiary-700 dark:text-tertiary-300",
    },
  ];

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold bg-linear-to-r from-primary-800 to-secondary-600 dark:from-primary-200 dark:to-secondary-400 bg-clip-text text-transparent">
            Welcome back, {user?.name}!
          </h1>
          <Sparkles className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
        </div>
        <p className="text-lg text-muted-foreground flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Admin Dashboard - Manage your projects and submissions
        </p>
      </div>

      {/* Projects Stats Grid */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Portfolio Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-card dark:bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-border hover:border-primary-200 dark:hover:border-primary-700 overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/10 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity -mr-16 -mt-16"></div>

                <div className="relative flex items-start justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {stat.label}
                    </p>
                    <div className="flex items-end gap-3">
                      <p className="text-4xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <div
                    className={`p-4 ${stat.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="size-7 text-foreground" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submissions Stats Grid */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Contact Submissions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {submissionCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-card dark:bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-border hover:border-primary-200 dark:hover:border-primary-700 overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/10 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity -mr-16 -mt-16"></div>

                <div className="relative flex items-start justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {stat.label}
                    </p>
                    <div className="flex items-end gap-3">
                      <p className="text-4xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <div
                    className={`p-4 ${stat.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 text-foreground`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submissions Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Submission Trends</CardTitle>
              <CardDescription>Track contact form submissions over time</CardDescription>
            </div>
            <Tabs value={chartPeriod} onValueChange={(v) => setChartPeriod(v as any)}>
              <TabsList>
                <TabsTrigger value="day">24 Hours</TabsTrigger>
                <TabsTrigger value="week">7 Days</TabsTrigger>
                <TabsTrigger value="month">30 Days</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {isChartLoading ? (
            <div className="flex items-center justify-center h-80">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="label"
                  className="text-xs"
                  tick={{ fill: "currentColor" }}
                  angle={chartPeriod === "day" ? -45 : 0}
                  textAnchor={chartPeriod === "day" ? "end" : "middle"}
                  height={chartPeriod === "day" ? 80 : 30}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: "currentColor" }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Legend />
                <Bar
                  dataKey="value"
                  name="Submissions"
                  fill="#9C7E5A"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="bg-card dark:bg-card rounded-2xl shadow-sm p-8 border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-8 bg-linear-to-b from-secondary-500 to-secondary-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-foreground">
            Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} href={action.href}>
                <div
                  className="group relative p-6 border-2 border-dashed border-border hover:border-primary-300 dark:hover:border-primary-600 rounded-xl transition-all duration-300 text-left hover:shadow-lg overflow-hidden cursor-pointer"
                >
                  {/* Background decoration */}
                  <div
                    className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-secondary-50/30 dark:from-primary-900/20 dark:to-secondary-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></div>

                  <div className="relative space-y-4">
                    <div
                      className={`inline-flex p-3 ${action.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-7 h-7 ${action.iconColor}`} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}