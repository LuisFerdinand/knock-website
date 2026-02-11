import { NextRequest, NextResponse } from 'next/server';
import { PortfolioManager } from '@/lib/portfolio';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ status: string }> }
) {
  try {
    const { status } = await params;
    
    let projects;
    
    if (status === 'in-progress') {
      projects = await PortfolioManager.getInProgressProjects();
    } else if (status === 'completed') {
      projects = await PortfolioManager.getCompletedProjects();
    } else {
      return NextResponse.json(
        { error: 'Invalid completion status. Use "in-progress" or "completed".' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects by completion status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}