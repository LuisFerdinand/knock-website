// app/api/admin/home/about/features/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { homeAboutFeatures } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// PUT - Update feature
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const body = await request.json();

    const updatedFeature = await db
      .update(homeAboutFeatures)
      .set({
        feature: body.feature,
        order: body.order,
        isActive: body.isActive,
        updatedAt: new Date(),
      })
      .where(eq(homeAboutFeatures.id, idNum))
      .returning();

    if (updatedFeature.length === 0) {
      return NextResponse.json(
        { error: "Feature not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedFeature[0],
    });
  } catch (error) {
    console.error("Error updating feature:", error);
    return NextResponse.json(
      { error: "Failed to update feature", success: false },
      { status: 500 }
    );
  }
}

// PATCH - Partial update
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const body = await request.json();

    const updatedFeature = await db
      .update(homeAboutFeatures)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(homeAboutFeatures.id, idNum))
      .returning();

    if (updatedFeature.length === 0) {
      return NextResponse.json(
        { error: "Feature not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedFeature[0],
    });
  } catch (error) {
    console.error("Error updating feature:", error);
    return NextResponse.json(
      { error: "Failed to update feature", success: false },
      { status: 500 }
    );
  }
}

// DELETE - Delete feature
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);

    const deletedFeature = await db
      .delete(homeAboutFeatures)
      .where(eq(homeAboutFeatures.id, idNum))
      .returning();

    if (deletedFeature.length === 0) {
      return NextResponse.json(
        { error: "Feature not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Feature deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting feature:", error);
    return NextResponse.json(
      { error: "Failed to delete feature", success: false },
      { status: 500 }
    );
  }
}