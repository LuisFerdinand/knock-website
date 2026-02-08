// app/api/images/url/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCloudinaryUrl } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const { publicId, options } = await request.json();
    
    if (!publicId) {
      return NextResponse.json({ error: 'Public ID required' }, { status: 400 });
    }

    const url = getCloudinaryUrl(publicId, options);
    
    return NextResponse.json({ url });
  } catch (error) {
    console.error('URL generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate URL' },
      { status: 500 }
    );
  }
}