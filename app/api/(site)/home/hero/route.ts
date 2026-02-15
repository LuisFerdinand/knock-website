// app/api/(site)/home/hero/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { homeHero } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch active hero section
export async function GET() {
  try {
    // Fetch the active hero section
    const hero = await db
      .select()
      .from(homeHero)
      .where(eq(homeHero.isActive, true))
      .limit(1);

    if (hero.length === 0) {
      return NextResponse.json(
        { error: 'Hero section not found', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: hero[0],
    });
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero section', success: false },
      { status: 500 }
    );
  }
}