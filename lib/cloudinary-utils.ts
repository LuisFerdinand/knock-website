// lib/cloudinary-utils.ts
import { v2 as cloudinary } from 'cloudinary';

/**
 * Generate a Cloudinary URL with transformations
 */
export function getCloudinaryUrl(publicId: string, options = {}) {
  return cloudinary.url(publicId, {
    secure: true,
    ...options,
  });
}

/**
 * Get optimized image URL for different use cases
 */
export const cloudinaryTransforms = {
  // Thumbnail for admin list view
  thumbnail: (publicId: string) =>
    getCloudinaryUrl(publicId, {
      width: 300,
      height: 200,
      crop: 'fill',
      quality: 'auto',
      fetch_format: 'auto',
    }),

  // Medium size for gallery grid
  gallery: (publicId: string) =>
    getCloudinaryUrl(publicId, {
      width: 800,
      height: 600,
      crop: 'limit',
      quality: 'auto',
      fetch_format: 'auto',
    }),

  // Large size for lightbox/detail view
  fullsize: (publicId: string) =>
    getCloudinaryUrl(publicId, {
      width: 1920,
      height: 1080,
      crop: 'limit',
      quality: 'auto:good',
      fetch_format: 'auto',
    }),

  // Before/After comparison
  comparison: (publicId: string) =>
    getCloudinaryUrl(publicId, {
      width: 1200,
      height: 800,
      crop: 'fill',
      quality: 'auto',
      fetch_format: 'auto',
    }),

  // Responsive images with srcset
  responsive: (publicId: string) => {
    const widths = [320, 640, 768, 1024, 1280, 1536];
    return widths.map((width) => ({
      src: getCloudinaryUrl(publicId, {
        width,
        crop: 'limit',
        quality: 'auto',
        fetch_format: 'auto',
      }),
      width,
    }));
  },

  // Blurred placeholder for lazy loading
  placeholder: (publicId: string) =>
    getCloudinaryUrl(publicId, {
      width: 40,
      height: 40,
      crop: 'fill',
      quality: 'auto:low',
      effect: 'blur:1000',
      fetch_format: 'auto',
    }),
};

/**
 * Delete an image from Cloudinary
 */
export async function deleteCloudinaryImage(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

/**
 * Batch delete images from Cloudinary
 */
export async function deleteCloudinaryImages(publicIds: string[]) {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    console.error('Error batch deleting images:', error);
    return null;
  }
}

/**
 * Get image info from Cloudinary
 */
export async function getCloudinaryImageInfo(publicId: string) {
  try {
    const result = await cloudinary.api.resource(publicId);
    return {
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      url: result.secure_url,
      createdAt: result.created_at,
    };
  } catch (error) {
    console.error('Error getting image info:', error);
    return null;
  }
}

/**
 * Upload image from URL
 */
export async function uploadFromUrl(url: string, folder: string = 'portfolio') {
  try {
    const result = await cloudinary.uploader.upload(url, {
      folder,
      quality: 'auto',
      fetch_format: 'auto',
    });
    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Error uploading from URL:', error);
    return null;
  }
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(publicId: string, widths: number[] = [320, 640, 1024, 1920]) {
  return widths
    .map((width) => {
      const url = getCloudinaryUrl(publicId, {
        width,
        crop: 'limit',
        quality: 'auto',
        fetch_format: 'auto',
      });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Extract public ID from Cloudinary URL
 */
export function extractPublicId(url: string): string | null {
  try {
    const matches = url.match(/\/v\d+\/(.+)\.\w+$/);
    return matches ? matches[1] : null;
  } catch {
    return null;
  }
}