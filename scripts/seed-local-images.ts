// scripts/seed-local-images.ts
// Use this version if you have local images instead of URLs

import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { v2 as cloudinary } from 'cloudinary';
import { projects } from '../lib/db/schema';
import * as path from 'path';

config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function uploadToCloudinary(
  imagePath: string,
  folder: string = 'projects'
): Promise<{ url: string; publicId: string }> {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });

    console.log(`✓ Uploaded: ${result.public_id}`);
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error(`Error uploading ${imagePath}:`, error);
    throw error;
  }
}

/**
 * Sample project data with LOCAL file paths
 * Structure your images in a folder like: public/seed-images/
 */
const sampleProjects = [
  {
    title: 'Modern Villa Renovation',
    category: 'Residential',
    location: 'Beverly Hills, CA',
    year: '2023',
    area: '4,500 sq ft',
    completion: 'Completed',
    description: 'A complete transformation of a 1960s villa into a modern luxury residence.',
    // Use absolute paths or paths relative to where you run the script
    beforeImagePath: path.join(process.cwd(), 'public/seed-images/villa-before.jpg'),
    afterImagePath: path.join(process.cwd(), 'public/seed-images/villa-after.jpg'),
    galleryImagePaths: [
      path.join(process.cwd(), 'public/seed-images/villa-gallery-1.jpg'),
      path.join(process.cwd(), 'public/seed-images/villa-gallery-2.jpg'),
      path.join(process.cwd(), 'public/seed-images/villa-gallery-3.jpg'),
    ],
    tags: ['Modern', 'Luxury', 'Sustainable', 'Smart Home'],
    client: 'Private Client',
    scope: 'Full interior renovation, kitchen remodel, bathroom upgrades',
    budget: '$800K - $1M',
    team: 'Lead Designer: Jane Doe, Architect: John Smith',
  },
  // Add more projects here...
];

async function seedProjects() {
  console.log('🌱 Starting database seeding with local images...\n');

  try {
    console.log('Clearing existing projects...');
    await db.delete(projects);
    console.log('✓ Existing projects cleared\n');

    for (const [index, project] of sampleProjects.entries()) {
      console.log(`\n📦 Processing project ${index + 1}/${sampleProjects.length}: ${project.title}`);

      const beforeImage = await uploadToCloudinary(
        project.beforeImagePath,
        `projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`
      );

      const afterImage = await uploadToCloudinary(
        project.afterImagePath,
        `projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`
      );

      const galleryImages = [];
      const galleryPublicIds = [];

      for (const imagePath of project.galleryImagePaths) {
        const uploaded = await uploadToCloudinary(
          imagePath,
          `projects/${project.title.toLowerCase().replace(/\s+/g, '-')}/gallery`
        );
        galleryImages.push(uploaded.url);
        galleryPublicIds.push(uploaded.publicId);
      }

      await db.insert(projects).values({
        title: project.title,
        category: project.category,
        location: project.location,
        year: project.year,
        area: project.area,
        completion: project.completion,
        description: project.description,
        beforeImage: beforeImage.url,
        beforeImagePublicId: beforeImage.publicId,
        afterImage: afterImage.url,
        afterImagePublicId: afterImage.publicId,
        galleryImages: galleryImages,
        galleryImagePublicIds: galleryPublicIds,
        tags: project.tags,
        client: project.client,
        scope: project.scope,
        budget: project.budget,
        team: project.team,
      });

      console.log(`✓ Project "${project.title}" seeded successfully!`);
    }

    console.log('\n\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

seedProjects()
  .then(() => {
    console.log('\n👋 Seeding process finished. Exiting...');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });