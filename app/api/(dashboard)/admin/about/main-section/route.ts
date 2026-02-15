// app/api/admin/about/main-section/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aboutMainSection } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET - Fetch main section
export async function GET() {
  try {
    const section = await db
      .select()
      .from(aboutMainSection)
      .limit(1);

    return NextResponse.json({
      success: true,
      data: section.length > 0 ? section[0] : null,
    });
  } catch (error) {
    console.error("Error fetching main section:", error);
    return NextResponse.json(
      { error: "Failed to fetch main section", success: false },
      { status: 500 }
    );
  }
}

// POST - Create or update main section
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if section exists
    const existing = await db.select().from(aboutMainSection).limit(1);

    let result;
    if (existing.length > 0) {
      // Update existing
      result = await db
        .update(aboutMainSection)
        .set({
          heading: body.heading,
          description: body.description,
          image: body.image,
          imagePublicId: body.imagePublicId,
          isActive: body.isActive ?? true,
          updatedAt: new Date(),
        })
        .where(eq(aboutMainSection.id, existing[0].id))
        .returning();
    } else {
      // Create new
      result = await db
        .insert(aboutMainSection)
        .values({
          heading: body.heading,
          description: body.description,
          image: body.image,
          imagePublicId: body.imagePublicId,
          isActive: body.isActive ?? true,
        })
        .returning();
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Error saving main section:", error);
    return NextResponse.json(
      { error: "Failed to save main section", success: false },
      { status: 500 }
    );
  }
}