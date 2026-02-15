// app/api/admin/about/values-section/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aboutValuesSection } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET - Fetch values section header
export async function GET() {
  try {
    const section = await db
      .select()
      .from(aboutValuesSection)
      .limit(1);

    return NextResponse.json({
      success: true,
      data: section.length > 0 ? section[0] : null,
    });
  } catch (error) {
    console.error("Error fetching values section:", error);
    return NextResponse.json(
      { error: "Failed to fetch values section", success: false },
      { status: 500 }
    );
  }
}

// POST - Create or update values section header
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if section exists
    const existing = await db.select().from(aboutValuesSection).limit(1);

    let result;
    if (existing.length > 0) {
      // Update existing
      result = await db
        .update(aboutValuesSection)
        .set({
          heading: body.heading,
          description: body.description,
          isActive: body.isActive ?? true,
          updatedAt: new Date(),
        })
        .where(eq(aboutValuesSection.id, existing[0].id))
        .returning();
    } else {
      // Create new
      result = await db
        .insert(aboutValuesSection)
        .values({
          heading: body.heading,
          description: body.description,
          isActive: body.isActive ?? true,
        })
        .returning();
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Error saving values section:", error);
    return NextResponse.json(
      { error: "Failed to save values section", success: false },
      { status: 500 }
    );
  }
}