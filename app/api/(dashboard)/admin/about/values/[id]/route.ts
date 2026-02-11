// app/api/(dashboard)/admin/about/values/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aboutValues } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET - Fetch a specific about value
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID", success: false },
        { status: 400 }
      );
    }

    const value = await db
      .select()
      .from(aboutValues)
      .where(eq(aboutValues.id, id))
      .limit(1);

    if (value.length === 0) {
      return NextResponse.json(
        { error: "Value not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: value[0],
    });
  } catch (error) {
    console.error("Error fetching about value:", error);
    return NextResponse.json(
      { error: "Failed to fetch about value", success: false },
      { status: 500 }
    );
  }
}

// PUT - Update a specific about value
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID", success: false },
        { status: 400 }
      );
    }

    const updatedValue = await db
      .update(aboutValues)
      .set({
        icon: body.icon,
        title: body.title,
        description: body.description,
        order: body.order,
        isActive: body.isActive,
        updatedAt: new Date(),
      })
      .where(eq(aboutValues.id, id))
      .returning();

    if (updatedValue.length === 0) {
      return NextResponse.json(
        { error: "Value not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedValue[0],
    });
  } catch (error) {
    console.error("Error updating about value:", error);
    return NextResponse.json(
      { error: "Failed to update about value", success: false },
      { status: 500 }
    );
  }
}

// DELETE - Delete a specific about value
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID", success: false },
        { status: 400 }
      );
    }

    const deletedValue = await db
      .delete(aboutValues)
      .where(eq(aboutValues.id, id))
      .returning();

    if (deletedValue.length === 0) {
      return NextResponse.json(
        { error: "Value not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: deletedValue[0],
    });
  } catch (error) {
    console.error("Error deleting about value:", error);
    return NextResponse.json(
      { error: "Failed to delete about value", success: false },
      { status: 500 }
    );
  }
}