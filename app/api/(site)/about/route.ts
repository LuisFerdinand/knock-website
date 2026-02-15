// app/api/about/route.ts - Get all About page data in one call
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { 
  aboutMainSection,
  aboutHeroSection,
  aboutValuesSection,
  aboutValues,
  aboutTeamSection,
  teamMembers
} from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch all about page data
export async function GET() {
  try {
    // Fetch main section
    const mainSection = await db
      .select()
      .from(aboutMainSection)
      .where(eq(aboutMainSection.isActive, true))
      .limit(1);

    // Fetch hero section
    const heroSection = await db
      .select()
      .from(aboutHeroSection)
      .where(eq(aboutHeroSection.isActive, true))
      .limit(1);

    // Fetch values section header
    const valuesSection = await db
      .select()
      .from(aboutValuesSection)
      .where(eq(aboutValuesSection.isActive, true))
      .limit(1);

    // Fetch values
    const values = await db
      .select()
      .from(aboutValues)
      .where(eq(aboutValues.isActive, true))
      .orderBy(aboutValues.order);

    // Fetch team section header
    const teamSection = await db
      .select()
      .from(aboutTeamSection)
      .where(eq(aboutTeamSection.isActive, true))
      .limit(1);

    // Fetch team members
    const team = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.isActive, true))
      .orderBy(teamMembers.order);

    return NextResponse.json({
      success: true,
      data: {
        mainSection: mainSection.length > 0 ? mainSection[0] : null,
        heroSection: heroSection.length > 0 ? heroSection[0] : null,
        valuesSection: {
          header: valuesSection.length > 0 ? valuesSection[0] : null,
          values: values,
        },
        teamSection: {
          header: teamSection.length > 0 ? teamSection[0] : null,
          members: team,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching about page data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about page data', success: false },
      { status: 500 }
    );
  }
}