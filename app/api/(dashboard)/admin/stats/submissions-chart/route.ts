// app/api/(dashboard)/admin/stats/submissions-chart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { sql, gte } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get("period") || "week"; // day, week, month

    // Calculate date range based on period
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "day":
        // Last 24 hours
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "month":
        // Last 30 days
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "week":
      default:
        // Last 7 days
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
    }

    // Query submissions with proper date formatting
    let submissions;
    
    if (period === "day") {
      // Group by hour
      submissions = await db.execute(sql`
        SELECT 
          TO_CHAR(created_at, 'YYYY-MM-DD HH24:00') as date,
          CAST(COUNT(*) as INTEGER) as count
        FROM contact_submissions
        WHERE created_at >= ${startDate.toISOString()}
        GROUP BY TO_CHAR(created_at, 'YYYY-MM-DD HH24:00')
        ORDER BY date
      `);
    } else {
      // Group by day
      submissions = await db.execute(sql`
        SELECT 
          TO_CHAR(created_at, 'YYYY-MM-DD') as date,
          CAST(COUNT(*) as INTEGER) as count
        FROM contact_submissions
        WHERE created_at >= ${startDate.toISOString()}
        GROUP BY TO_CHAR(created_at, 'YYYY-MM-DD')
        ORDER BY date
      `);
    }

    // Create a map of existing data
    const submissionMap = new Map();
    submissions.rows.forEach((row: any) => {
      submissionMap.set(row.date, row.count);
    });

    // Fill in missing dates with 0 counts
    const chartData = [];

    if (period === "day") {
      // Generate 24 hours
      for (let i = 23; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 60 * 60 * 1000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hour = String(date.getHours()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day} ${hour}:00`;

        chartData.push({
          label: `${date.getHours()}:00`,
          value: submissionMap.get(dateStr) || 0,
          date: dateStr,
        });
      }
    } else {
      // Generate days
      const days = period === "month" ? 30 : 7;
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day}`;
        const label = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        chartData.push({
          label,
          value: submissionMap.get(dateStr) || 0,
          date: dateStr,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: chartData,
      period,
    });
  } catch (error) {
    console.error("Error fetching submissions chart data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch submissions chart data",
        success: false,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}