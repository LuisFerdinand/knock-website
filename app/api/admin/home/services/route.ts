// app/api/admin/home/services/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { homeServices } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

// GET - Fetch all service items
export async function GET() {
  try {
    const services = await db
      .select()
      .from(homeServices)
      .orderBy(homeServices.order, desc(homeServices.createdAt));

    return NextResponse.json({
      success: true,
      data: services,
      count: services.length,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services", success: false },
      { status: 500 }
    );
  }
}

// POST - Create new service item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newService = await db
      .insert(homeServices)
      .values({
        title: body.title,
        description: body.description,
        icon: body.icon,
        order: body.order,
        isActive: body.isActive ?? true,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newService[0],
    });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service", success: false },
      { status: 500 }
    );
  }
}