// app/api/admin/home/services/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { homeServices } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// PUT - Update service item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const body = await request.json();

    const updatedService = await db
      .update(homeServices)
      .set({
        title: body.title,
        description: body.description,
        icon: body.icon,
        order: body.order,
        isActive: body.isActive,
        updatedAt: new Date(),
      })
      .where(eq(homeServices.id, idNum))
      .returning();

    if (updatedService.length === 0) {
      return NextResponse.json(
        { error: "Service not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedService[0],
    });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service", success: false },
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

    const updatedService = await db
      .update(homeServices)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(homeServices.id, idNum))
      .returning();

    if (updatedService.length === 0) {
      return NextResponse.json(
        { error: "Service not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedService[0],
    });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service", success: false },
      { status: 500 }
    );
  }
}

// DELETE - Delete service item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);

    const deletedService = await db
      .delete(homeServices)
      .where(eq(homeServices.id, idNum))
      .returning();

    if (deletedService.length === 0) {
      return NextResponse.json(
        { error: "Service not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service", success: false },
      { status: 500 }
    );
  }
}