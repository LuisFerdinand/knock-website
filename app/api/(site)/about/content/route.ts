// app/api/(site)/about/content/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { aboutContent } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch about content sections
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sectionId = searchParams.get('sectionId');

    // If sectionId is provided, fetch single section
    if (sectionId) {
      const section = await db
        .select()
        .from(aboutContent)
        .where(eq(aboutContent.sectionId, sectionId))
        .limit(1);

      if (section.length === 0) {
        return NextResponse.json(
          { error: 'Section not found', success: false },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: section[0],
      });
    }

    // Fetch all active sections, ordered by order field
    const allSections = await db
      .select()
      .from(aboutContent)
      .where(eq(aboutContent.isActive, true))
      .orderBy(aboutContent.order);

    return NextResponse.json({
      success: true,
      data: allSections,
      count: allSections.length,
    });
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about content', success: false },
      { status: 500 }
    );
  }
}