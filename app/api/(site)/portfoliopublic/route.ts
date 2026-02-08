// app/api/(site)/portfolio/route.ts
import { NextResponse } from 'next/server';
import { PortfolioManager } from '@/lib/portfolio';

/**
 * GET /api/portfolio
 * Returns all published projects for public display
 */
export async function GET() {
  try {
    // Get only published projects for public site
    const projects = await PortfolioManager.getPublishedProjects();
    
    // Transform data to match the frontend interface
    const formattedProjects = projects.map(project => ({
      id: project.id,
      title: project.title,
      category: project.category,
      location: project.location,
      year: project.year,
      area: project.area,
      completion: project.completion,
      description: project.description,
      beforeImage: project.beforeImage || '',
      afterImage: project.afterImage,
      galleryImages: project.galleryImages || [],
      tags: project.tags || [],
    }));
    
    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error('Error fetching published projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// Optionally, you can enable ISR (Incremental Static Regeneration)
export const revalidate = 60; // Revalidate every 60 seconds