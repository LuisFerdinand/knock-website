// app/api/(site)/about/values/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { aboutValues } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch all active values
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // If id is provided, fetch single value
    if (id) {
      const value = await db
        .select()
        .from(aboutValues)
        .where(eq(aboutValues.id, parseInt(id)))
        .limit(1);

      if (value.length === 0) {
        return NextResponse.json(
          { error: 'Value not found', success: false },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: value[0],
      });
    }

    // Fetch all active values, ordered by order field
    const allValues = await db
      .select()
      .from(aboutValues)
      .where(eq(aboutValues.isActive, true))
      .orderBy(aboutValues.order);

    return NextResponse.json({
      success: true,
      data: allValues,
      count: allValues.length,
    });
  } catch (error) {
    console.error('Error fetching values:', error);
    return NextResponse.json(
      { error: 'Failed to fetch values', success: false },
      { status: 500 }
    );
  }
}