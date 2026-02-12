// app/api/(dashboard)/admin/settings/favicon/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getFaviconSettings, updateFaviconSettings } from '@/lib/site-settings';

export async function GET() {
  try {
    const settings = await getFaviconSettings();
    
    return NextResponse.json({ data: settings });
  } catch (error) {
    console.error('Error fetching favicon settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch favicon settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    const updatedSettings = await updateFaviconSettings(data);
    
    return NextResponse.json({ data: updatedSettings });
  } catch (error) {
    console.error('Error updating favicon settings:', error);
    return NextResponse.json(
      { error: 'Failed to update favicon settings' },
      { status: 500 }
    );
  }
}