// app/api/(site)/about/team/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { teamMembers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch all active team members
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // If id is provided, fetch single team member
    if (id) {
      const member = await db
        .select()
        .from(teamMembers)
        .where(eq(teamMembers.id, parseInt(id)))
        .limit(1);

      if (member.length === 0) {
        return NextResponse.json(
          { error: 'Team member not found', success: false },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: member[0],
      });
    }

    // Fetch all active team members, ordered by order field
    const allMembers = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.isActive, true))
      .orderBy(teamMembers.order);

    return NextResponse.json({
      success: true,
      data: allMembers,
      count: allMembers.length,
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members', success: false },
      { status: 500 }
    );
  }
}