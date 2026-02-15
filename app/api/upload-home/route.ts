/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/upload-home/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { sanitizeFolderName } from '@/lib/utils';

// Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    let folder = formData.get('folder') as string || 'home';
    
    // Sanitize the folder name to remove special characters
    folder = sanitizeFolderName(folder);
    
    // Validate file exists
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided', success: false },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { 
          error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.',
          success: false 
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { 
          error: 'File size too large. Maximum size is 5MB.',
          success: false 
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: folder,
          // Optimizations
          quality: 'auto',
          fetch_format: 'auto',
          // Generate thumbnail
          eager: [
            { width: 400, height: 300, crop: 'fill', quality: 'auto' },
            { width: 800, height: 600, crop: 'fill', quality: 'auto' },
            { width: 1920, height: 1080, crop: 'fill', quality: 'auto' }
          ],
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    return NextResponse.json({ 
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      thumbnail: result.eager?.[0]?.secure_url || result.secure_url,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    
    // Handle specific Cloudinary errors
    if (error.http_code === 401) {
      return NextResponse.json(
        { 
          error: 'Cloudinary authentication failed. Please check your credentials.',
          success: false 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: error.message || 'Upload failed. Please try again.',
        success: false 
      },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove images from Cloudinary
export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'No public ID provided', success: false },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({
      success: result.result === 'ok',
      message: result.result === 'ok' ? 'Image deleted successfully' : 'Failed to delete image',
    });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image', success: false },
      { status: 500 }
    );
  }
}