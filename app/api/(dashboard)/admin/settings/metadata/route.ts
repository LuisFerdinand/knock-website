// app/api/(dashboard)/admin/settings/metadata/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getMetadataSettings, updateMetadataSettings } from '@/lib/site-settings';

export async function GET() {
  try {
    const settings = await getMetadataSettings();
    
    return NextResponse.json({ data: settings });
  } catch (error) {
    console.error('Error fetching metadata settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metadata settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    const updatedSettings = await updateMetadataSettings(data);
    
    return NextResponse.json({ data: updatedSettings });
  } catch (error) {
    console.error('Error updating metadata settings:', error);
    return NextResponse.json(
      { error: 'Failed to update metadata settings' },
      { status: 500 }
    );
  }
}