// app/api/admin/about/team-section/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aboutTeamSection } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET - Fetch team section header
export async function GET() {
  try {
    const section = await db
      .select()
      .from(aboutTeamSection)
      .limit(1);

    return NextResponse.json({
      success: true,
      data: section.length > 0 ? section[0] : null,
    });
  } catch (error) {
    console.error("Error fetching team section:", error);
    return NextResponse.json(
      { error: "Failed to fetch team section", success: false },
      { status: 500 }
    );
  }
}

// POST - Create or update team section header
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if section exists
    const existing = await db.select().from(aboutTeamSection).limit(1);

    let result;
    if (existing.length > 0) {
      // Update existing
      result = await db
        .update(aboutTeamSection)
        .set({
          heading: body.heading,
          description: body.description,
          teamListHeading: body.teamListHeading,
          isActive: body.isActive ?? true,
          updatedAt: new Date(),
        })
        .where(eq(aboutTeamSection.id, existing[0].id))
        .returning();
    } else {
      // Create new
      result = await db
        .insert(aboutTeamSection)
        .values({
          heading: body.heading,
          description: body.description,
          teamListHeading: body.teamListHeading,
          isActive: body.isActive ?? true,
        })
        .returning();
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Error saving team section:", error);
    return NextResponse.json(
      { error: "Failed to save team section", success: false },
      { status: 500 }
    );
  }
}