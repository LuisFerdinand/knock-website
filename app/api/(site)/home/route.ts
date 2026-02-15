// app/api/(site)/home/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { 
  homeHero, 
  homeServicesSection, 
  homeServices, 
  homeAboutSection, 
  homeAboutFeatures 
} from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch all home page data in one request
export async function GET() {
  try {
    // Fetch hero section
    const hero = await db
      .select()
      .from(homeHero)
      .where(eq(homeHero.isActive, true))
      .limit(1);

    // Fetch services section header
    const servicesSection = await db
      .select()
      .from(homeServicesSection)
      .where(eq(homeServicesSection.isActive, true))
      .limit(1);

    // Fetch services items
    const services = await db
      .select()
      .from(homeServices)
      .where(eq(homeServices.isActive, true))
      .orderBy(homeServices.order);

    // Fetch about section
    const aboutSection = await db
      .select()
      .from(homeAboutSection)
      .where(eq(homeAboutSection.isActive, true))
      .limit(1);

    // Fetch about features
    const aboutFeatures = await db
      .select()
      .from(homeAboutFeatures)
      .where(eq(homeAboutFeatures.isActive, true))
      .orderBy(homeAboutFeatures.order);

    return NextResponse.json({
      success: true,
      data: {
        hero: hero.length > 0 ? hero[0] : null,
        services: {
          section: servicesSection.length > 0 ? servicesSection[0] : null,
          items: services,
        },
        about: {
          section: aboutSection.length > 0 ? aboutSection[0] : null,
          features: aboutFeatures,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch home page data', success: false },
      { status: 500 }
    );
  }
}