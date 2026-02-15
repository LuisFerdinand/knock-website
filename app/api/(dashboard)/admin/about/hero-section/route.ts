// app/api/admin/about/hero-section/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aboutHeroSection } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET - Fetch hero section
export async function GET() {
  try {
    const section = await db
      .select()
      .from(aboutHeroSection)
      .limit(1);

    return NextResponse.json({
      success: true,
      data: section.length > 0 ? section[0] : null,
    });
  } catch (error) {
    console.error("Error fetching hero section:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero section", success: false },
      { status: 500 }
    );
  }
}

// POST - Create or update hero section
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if section exists
    const existing = await db.select().from(aboutHeroSection).limit(1);

    let result;
    if (existing.length > 0) {
      // Update existing
      result = await db
        .update(aboutHeroSection)
        .set({
          heading: body.heading,
          subheading: body.subheading,
          ctaConsultText: body.ctaConsultText,
          ctaConsultLink: body.ctaConsultLink,
          ctaPortfolioText: body.ctaPortfolioText,
          ctaPortfolioLink: body.ctaPortfolioLink,
          image: body.image,
          imagePublicId: body.imagePublicId,
          isActive: body.isActive ?? true,
          updatedAt: new Date(),
        })
        .where(eq(aboutHeroSection.id, existing[0].id))
        .returning();
    } else {
      // Create new
      result = await db
        .insert(aboutHeroSection)
        .values({
          heading: body.heading,
          subheading: body.subheading,
          ctaConsultText: body.ctaConsultText,
          ctaConsultLink: body.ctaConsultLink,
          ctaPortfolioText: body.ctaPortfolioText,
          ctaPortfolioLink: body.ctaPortfolioLink,
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
    console.error("Error saving hero section:", error);
    return NextResponse.json(
      { error: "Failed to save hero section", success: false },
      { status: 500 }
    );
  }
}