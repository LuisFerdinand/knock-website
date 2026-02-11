// app/api/(dashboard)/portfolio/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PortfolioManager } from '@/lib/portfolio';
import { z } from 'zod';

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  year: z.string().min(1).optional(),
  area: z.string().min(1).optional(),
  completion: z.enum(['completed', 'in progress']).optional(), // Updated to include "in progress"
  description: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  client: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  team: z.string().optional().nullable(),
  status: z.enum(['published', 'draft', 'archived']).optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  beforeImage: z.string().optional().nullable(),
  beforeImagePublicId: z.string().optional().nullable(),
  afterImage: z.string().optional(),
  afterImagePublicId: z.string().optional().nullable(),
  galleryImages: z.array(z.string()).optional(),
  galleryImagePublicIds: z.array(z.string()).optional(),
});

// GET single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await PortfolioManager.getProjectById(parseInt(id));
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    
    const body = await request.json();
    
    // Validate data
    const validatedData = updateSchema.parse(body);
    
    // Check if project exists
    const existingProject = await PortfolioManager.getProjectById(projectId);
    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Update project
    const updatedProject = await PortfolioManager.updateProject(projectId, validatedData);

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    
    // Check if project exists
    const existingProject = await PortfolioManager.getProjectById(projectId);
    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    await PortfolioManager.deleteProject(projectId);
    
    return NextResponse.json({ 
      message: 'Project deleted successfully',
      success: true 
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}