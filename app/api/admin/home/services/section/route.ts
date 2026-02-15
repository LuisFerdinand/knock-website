// app/api/admin/home/services/section/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { homeServicesSection } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET - Fetch services section header
export async function GET() {
  try {
    const section = await db
      .select()
      .from(homeServicesSection)
      .limit(1);

    return NextResponse.json({
      success: true,
      data: section.length > 0 ? section[0] : null,
    });
  } catch (error) {
    console.error("Error fetching services section:", error);
    return NextResponse.json(
      { error: "Failed to fetch services section", success: false },
      { status: 500 }
    );
  }
}

// POST - Create or update services section header
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if section exists
    const existing = await db.select().from(homeServicesSection).limit(1);

    let result;
    if (existing.length > 0) {
      // Update existing
      result = await db
        .update(homeServicesSection)
        .set({
          heading: body.heading,
          description: body.description,
          ctaText: body.ctaText,
          ctaLink: body.ctaLink,
          isActive: body.isActive ?? true,
          updatedAt: new Date(),
        })
        .where(eq(homeServicesSection.id, existing[0].id))
        .returning();
    } else {
      // Create new
      result = await db
        .insert(homeServicesSection)
        .values({
          heading: body.heading,
          description: body.description,
          ctaText: body.ctaText,
          ctaLink: body.ctaLink,
          isActive: body.isActive ?? true,
        })
        .returning();
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Error saving services section:", error);
    return NextResponse.json(
      { error: "Failed to save services section", success: false },
      { status: 500 }
    );
  }
}