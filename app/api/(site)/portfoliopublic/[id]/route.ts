// app/api/(site)/portfolio/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PortfolioManager } from '@/lib/portfolio';

/**
 * GET /api/portfolio/[id]
 * Returns a single published project by ID for public display
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }
    
    // Get the project
    const project = await PortfolioManager.getProjectById(projectId);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Only return if project is published
    if (project.status !== 'published') {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Format the response to match frontend interface
    const formattedProject = {
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
    };
    
    return NextResponse.json(formattedProject);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// Optionally, enable ISR
export const revalidate = 60; // Revalidate every 60 seconds