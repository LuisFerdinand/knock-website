// app/api/(dashboard)/admin/stats/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects, contactSubmissions } from "@/lib/db/schema";
import { sql, eq, and, gte } from "drizzle-orm";

export async function GET() {
  try {
    // Get total projects count
    const totalProjectsResult = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(projects);
    const totalProjects = totalProjectsResult[0]?.count || 0;

    // Get active projects count (published status)
    const activeProjectsResult = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(projects)
      .where(eq(projects.status, "published"));
    const activeProjects = activeProjectsResult[0]?.count || 0;

    // Get featured projects count
    const featuredProjectsResult = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(projects)
      .where(eq(projects.featured, true));
    const featuredProjects = featuredProjectsResult[0]?.count || 0;

    // Get draft projects count
    const draftProjectsResult = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(projects)
      .where(eq(projects.status, "draft"));
    const draftProjects = draftProjectsResult[0]?.count || 0;

    // Get total contact submissions
    const totalSubmissionsResult = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(contactSubmissions);
    const totalSubmissions = totalSubmissionsResult[0]?.count || 0;

    // Get new submissions (status = 'new')
    const newSubmissionsResult = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, "new"));
    const newSubmissions = newSubmissionsResult[0]?.count || 0;

    // Get contacted submissions
    const contactedSubmissionsResult = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, "contacted"));
    const contactedSubmissions = contactedSubmissionsResult[0]?.count || 0;

    // Get completed submissions
    const completedSubmissionsResult = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, "completed"));
    const completedSubmissions = completedSubmissionsResult[0]?.count || 0;

    return NextResponse.json({
      success: true,
      data: {
        projects: {
          total: totalProjects,
          active: activeProjects,
          featured: featuredProjects,
          draft: draftProjects,
        },
        submissions: {
          total: totalSubmissions,
          new: newSubmissions,
          contacted: contactedSubmissions,
          completed: completedSubmissions,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics", success: false },
      { status: 500 }
    );
  }
}