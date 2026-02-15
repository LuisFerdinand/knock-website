// app/api/(site)/home/about/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { homeAboutSection, homeAboutFeatures } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch about section with features
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // If id is provided, fetch single feature
    if (id) {
      const feature = await db
        .select()
        .from(homeAboutFeatures)
        .where(eq(homeAboutFeatures.id, parseInt(id)))
        .limit(1);

      if (feature.length === 0) {
        return NextResponse.json(
          { error: 'Feature not found', success: false },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: feature[0],
      });
    }

    // Fetch the section data
    const section = await db
      .select()
      .from(homeAboutSection)
      .where(eq(homeAboutSection.isActive, true))
      .limit(1);

    // Fetch all active features, ordered by order field
    const features = await db
      .select()
      .from(homeAboutFeatures)
      .where(eq(homeAboutFeatures.isActive, true))
      .orderBy(homeAboutFeatures.order);

    return NextResponse.json({
      success: true,
      data: {
        section: section.length > 0 ? section[0] : null,
        features: features,
      },
      count: features.length,
    });
  } catch (error) {
    console.error('Error fetching about section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about section', success: false },
      { status: 500 }
    );
  }
}