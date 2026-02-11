// app/api/(dashboard)/portfolio/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PortfolioManager } from '@/lib/portfolio';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
  year: z.string().min(1, 'Year is required'),
  area: z.string().min(1, 'Area is required'),
  completion: z.enum(['completed', 'in progress']),
  description: z.string().min(1, 'Description is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  client: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  team: z.string().optional().nullable(),
  status: z.enum(['published', 'draft', 'archived']).default('published'),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  beforeImage: z.string().optional().nullable(),
  beforeImagePublicId: z.string().optional().nullable(),
  afterImage: z.string().optional().nullable(),
  afterImagePublicId: z.string().optional().nullable(),
  galleryImages: z.array(z.string()).default([]),
  galleryImagePublicIds: z.array(z.string()).default([]),
});

// GET all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const completion = searchParams.get('completion');
    
    let projects;
    
    if (completion === 'in progress') {
      projects = await PortfolioManager.getInProgressProjects();
    } else if (completion === 'completed') {
      projects = await PortfolioManager.getCompletedProjects();
    } else {
      projects = await PortfolioManager.getAllProjects();
    }
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate data
    const validatedData = projectSchema.parse(body);
    
    // Create project
    const newProject = await PortfolioManager.createProject(validatedData);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}