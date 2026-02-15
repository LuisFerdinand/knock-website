// app/api/admin/home/hero/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { homeHero } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET - Fetch hero section
export async function GET() {
  try {
    const hero = await db
      .select()
      .from(homeHero)
      .limit(1);

    return NextResponse.json({
      success: true,
      data: hero.length > 0 ? hero[0] : null,
    });
  } catch (error) {
    console.error("Error fetching hero:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero", success: false },
      { status: 500 }
    );
  }
}

// POST - Create or update hero section
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if hero exists
    const existing = await db.select().from(homeHero).limit(1);

    let result;
    if (existing.length > 0) {
      // Update existing
      result = await db
        .update(homeHero)
        .set({
          title: body.title,
          description: body.description,
          backgroundImage: body.backgroundImage,
          backgroundImagePublicId: body.backgroundImagePublicId,
          isActive: body.isActive ?? true,
          updatedAt: new Date(),
        })
        .where(eq(homeHero.id, existing[0].id))
        .returning();
    } else {
      // Create new
      result = await db
        .insert(homeHero)
        .values({
          title: body.title,
          description: body.description,
          backgroundImage: body.backgroundImage,
          backgroundImagePublicId: body.backgroundImagePublicId,
          isActive: body.isActive ?? true,
        })
        .returning();
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Error saving hero:", error);
    return NextResponse.json(
      { error: "Failed to save hero", success: false },
      { status: 500 }
    );
  }
}