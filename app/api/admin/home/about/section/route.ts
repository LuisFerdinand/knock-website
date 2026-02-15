// app/api/admin/home/about/section/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { homeAboutSection } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET - Fetch about section
export async function GET() {
  try {
    const section = await db
      .select()
      .from(homeAboutSection)
      .limit(1);

    return NextResponse.json({
      success: true,
      data: section.length > 0 ? section[0] : null,
    });
  } catch (error) {
    console.error("Error fetching about section:", error);
    return NextResponse.json(
      { error: "Failed to fetch about section", success: false },
      { status: 500 }
    );
  }
}

// POST - Create or update about section
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if section exists
    const existing = await db.select().from(homeAboutSection).limit(1);

    let result;
    if (existing.length > 0) {
      // Update existing
      result = await db
        .update(homeAboutSection)
        .set({
          heading: body.heading,
          description: body.description,
          highlightText: body.highlightText,
          yearsLabel: body.yearsLabel,
          clientsLabel: body.clientsLabel,
          mainImage: body.mainImage,
          mainImagePublicId: body.mainImagePublicId,
          secondaryImage: body.secondaryImage,
          secondaryImagePublicId: body.secondaryImagePublicId,
          isActive: body.isActive ?? true,
          updatedAt: new Date(),
        })
        .where(eq(homeAboutSection.id, existing[0].id))
        .returning();
    } else {
      // Create new
      result = await db
        .insert(homeAboutSection)
        .values({
          heading: body.heading,
          description: body.description,
          highlightText: body.highlightText,
          yearsLabel: body.yearsLabel,
          clientsLabel: body.clientsLabel,
          mainImage: body.mainImage,
          mainImagePublicId: body.mainImagePublicId,
          secondaryImage: body.secondaryImage,
          secondaryImagePublicId: body.secondaryImagePublicId,
          isActive: body.isActive ?? true,
        })
        .returning();
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Error saving about section:", error);
    return NextResponse.json(
      { error: "Failed to save about section", success: false },
      { status: 500 }
    );
  }
}