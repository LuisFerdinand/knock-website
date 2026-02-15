// app/api/(site)/home/services/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { homeServicesSection, homeServices } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch services section with items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // If id is provided, fetch single service item
    if (id) {
      const service = await db
        .select()
        .from(homeServices)
        .where(eq(homeServices.id, parseInt(id)))
        .limit(1);

      if (service.length === 0) {
        return NextResponse.json(
          { error: 'Service not found', success: false },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: service[0],
      });
    }

    // Fetch the section header
    const sectionHeader = await db
      .select()
      .from(homeServicesSection)
      .where(eq(homeServicesSection.isActive, true))
      .limit(1);

    // Fetch all active service items, ordered by order field
    const serviceItems = await db
      .select()
      .from(homeServices)
      .where(eq(homeServices.isActive, true))
      .orderBy(homeServices.order);

    return NextResponse.json({
      success: true,
      data: {
        section: sectionHeader.length > 0 ? sectionHeader[0] : null,
        services: serviceItems,
      },
      count: serviceItems.length,
    });
  } catch (error) {
    console.error('Error fetching services section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services section', success: false },
      { status: 500 }
    );
  }
}