// app/api/admin/home/about/features/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { homeAboutFeatures } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

// GET - Fetch all features
export async function GET() {
  try {
    const features = await db
      .select()
      .from(homeAboutFeatures)
      .orderBy(homeAboutFeatures.order, desc(homeAboutFeatures.createdAt));

    return NextResponse.json({
      success: true,
      data: features,
      count: features.length,
    });
  } catch (error) {
    console.error("Error fetching features:", error);
    return NextResponse.json(
      { error: "Failed to fetch features", success: false },
      { status: 500 }
    );
  }
}

// POST - Create new feature
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newFeature = await db
      .insert(homeAboutFeatures)
      .values({
        feature: body.feature,
        order: body.order,
        isActive: body.isActive ?? true,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newFeature[0],
    });
  } catch (error) {
    console.error("Error creating feature:", error);
    return NextResponse.json(
      { error: "Failed to create feature", success: false },
      { status: 500 }
    );
  }
}