// scripts/seed.ts
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { v2 as cloudinary } from 'cloudinary';
import { projects } from '../lib/db/schema';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Database setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

/**
 * Upload an image to Cloudinary
 * @param imagePath - Path to the image file (local path or URL)
 * @param folder - Cloudinary folder name
 * @returns Object with secure_url and public_id, or null if upload fails
 */
async function uploadToCloudinary(
  imagePath: string,
  folder: string = 'projects'
): Promise<{ url: string; publicId: string } | null> {
  try {
    // Check if the path is a local file path
    const isLocalPath = fs.existsSync(imagePath);
    
    if (!isLocalPath) {
      console.warn(`⚠️  Image not found, skipping: ${imagePath}`);
      return null;
    }
    
    const uploadOptions = {
      folder: folder,
      resource_type: 'auto' as const,
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    };

    // Upload from local file
    const result = await cloudinary.uploader.upload(imagePath, uploadOptions);

    console.log(`✓ Uploaded: ${result.public_id}`);
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error(`❌ Error uploading ${imagePath}:`, error);
    return null;
  }
}

/**
 * Sample project data structure using local portfolio images
 * With Jakarta/Indonesia context
 */
const sampleProjects = [
  {
    title: 'Modern Villa Renovation',
    category: 'Residential',
    location: 'Beverly Hills, CA',
    year: '2023',
    area: '4,500 sq ft',
    completion: 'Completed',
    description: 'A complete transformation of a 1960s villa into a modern luxury residence with sustainable features and smart home integration.',
    beforeImagePath: path.join(process.cwd(), 'public/portfolio/1/before.jpg'),
    afterImagePath: path.join(process.cwd(), 'public/portfolio/1/after.jpeg'),
    galleryImagePaths: [
      path.join(process.cwd(), 'public/portfolio/1/gallery1.jpeg'),
      path.join(process.cwd(), 'public/portfolio/1/gallery2.jpeg'),
      path.join(process.cwd(), 'public/portfolio/1/gallery3.jpeg'),
      path.join(process.cwd(), 'public/portfolio/1/gallery4.jpeg'),
    ],
    tags: ['Modern', 'Luxury', 'Sustainable', 'Smart Home'],
    client: 'Private Client',
    scope: 'Full interior renovation, kitchen remodel, bathroom upgrades, outdoor living space',
    budget: '$800K - $1M',
    team: 'Lead Designer: Jane Doe, Architect: John Smith, Contractor: ABC Construction',
  },
  {
    title: 'Downtown Loft Conversion',
    category: 'Commercial',
    location: 'New York, NY',
    year: '2024',
    area: '2,800 sq ft',
    completion: 'In Progress',
    description: 'Converting an industrial warehouse into a modern open-plan office space with collaborative zones and natural lighting.',
    beforeImagePath: path.join(process.cwd(), 'public/portfolio/2/before.jpg'),
    afterImagePath: path.join(process.cwd(), 'public/portfolio/2/after.jpeg'),
    galleryImagePaths: [
      path.join(process.cwd(), 'public/portfolio/2/gallery1.jpeg'),
      path.join(process.cwd(), 'public/portfolio/2/gallery2.jpeg'),
      path.join(process.cwd(), 'public/portfolio/2/gallery3.jpeg'),
      path.join(process.cwd(), 'public/portfolio/2/gallery4.jpeg'),
    ],
    tags: ['Industrial', 'Office', 'Open Plan', 'Contemporary'],
    client: 'TechStart Inc.',
    scope: 'Space planning, interior design, lighting design, furniture selection',
    budget: '$500K - $700K',
    team: 'Lead Designer: Sarah Johnson, Project Manager: Mike Brown',
  },
  {
    title: 'Coastal Beach House',
    category: 'Residential',
    location: 'Malibu, CA',
    year: '2023',
    area: '3,200 sq ft',
    completion: 'Completed',
    description: 'A stunning beachfront property designed to maximize ocean views and create seamless indoor-outdoor living.',
    beforeImagePath: path.join(process.cwd(), 'public/portfolio/3/before.jpg'),
    afterImagePath: path.join(process.cwd(), 'public/portfolio/3/after.jpeg'),
    galleryImagePaths: [
      path.join(process.cwd(), 'public/portfolio/3/gallery1.jpeg'),
      path.join(process.cwd(), 'public/portfolio/3/gallery2.jpeg'),
      path.join(process.cwd(), 'public/portfolio/3/gallery3.jpeg'),
      path.join(process.cwd(), 'public/portfolio/3/gallery4.jpeg'),
    ],
    tags: ['Coastal', 'Modern', 'Luxury', 'Indoor-Outdoor'],
    client: 'Anderson Family',
    scope: 'Full home renovation, deck construction, landscape design',
    budget: '$1M+',
    team: 'Lead Designer: Emily White, Architect: Robert Green, Landscape: GreenScape Design',
  },
  {
    title: 'Urban Apartment Makeover',
    category: 'Residential',
    location: 'San Francisco, CA',
    year: '2023',
    area: '1,800 sq ft',
    completion: 'Completed',
    description: 'A complete redesign of a compact urban apartment to maximize space and functionality while maintaining a modern aesthetic.',
    beforeImagePath: path.join(process.cwd(), 'public/portfolio/4/before.jpg'),
    afterImagePath: path.join(process.cwd(), 'public/portfolio/4/after.jpeg'),
    galleryImagePaths: [
      path.join(process.cwd(), 'public/portfolio/4/gallery1.jpeg'),
      path.join(process.cwd(), 'public/portfolio/4/gallery2.jpeg'),
      path.join(process.cwd(), 'public/portfolio/4/gallery3.jpeg'),
      path.join(process.cwd(), 'public/portfolio/4/gallery4.jpeg'),
    ],
    tags: ['Urban', 'Compact', 'Modern', 'Space-Saving'],
    client: 'Michael Chen',
    scope: 'Full apartment renovation, custom cabinetry, space optimization',
    budget: '$300K - $500K',
    team: 'Lead Designer: Alex Turner, Interior Architect: Lisa Wang',
  },
  {
    title: 'Penthouse Sudirman',
    category: 'Residential',
    location: 'Jakarta Selatan, DKI Jakarta',
    year: '2024',
    area: '350 m²',
    completion: 'Completed',
    description: 'Luxurious penthouse renovation in the heart of Jakarta\'s business district with panoramic city views and Indonesian-inspired modern design.',
    beforeImagePath: path.join(process.cwd(), 'public/portfolio/5/before.jpg'),
    afterImagePath: path.join(process.cwd(), 'public/portfolio/5/after.jpeg'),
    galleryImagePaths: [
      path.join(process.cwd(), 'public/portfolio/5/gallery1.jpeg'),
      path.join(process.cwd(), 'public/portfolio/5/gallery2.jpeg'),
      path.join(process.cwd(), 'public/portfolio/5/gallery3.jpeg'),
      path.join(process.cwd(), 'public/portfolio/5/gallery4.jpeg'),
    ],
    tags: ['Luxury', 'Penthouse', 'Jakarta', 'City View', 'Modern Indonesian'],
    client: 'Bapak Ahmad Wijaya',
    scope: 'Full penthouse renovation, custom furniture, home automation, rooftop garden',
    budget: 'IDR 2.5M - 3.5M',
    team: 'Lead Designer: Siti Nurhaliza, Architect: Budi Santoso, Contractor: PT. Mitra Bangun Sejahtera',
  },
  {
    title: 'Bali-Style Villa in BSD City',
    category: 'Residential',
    location: 'Tangerang Selatan, Banten',
    year: '2023',
    area: '450 m²',
    completion: 'Completed',
    description: 'Tropical modern villa combining Balinese architectural elements with contemporary design, perfect for Jakarta\'s suburban lifestyle.',
    beforeImagePath: path.join(process.cwd(), 'public/portfolio/6/before.jpg'),
    afterImagePath: path.join(process.cwd(), 'public/portfolio/6/after.jpeg'),
    galleryImagePaths: [
      path.join(process.cwd(), 'public/portfolio/6/gallery1.jpeg'),
      path.join(process.cwd(), 'public/portfolio/6/gallery2.jpeg'),
      path.join(process.cwd(), 'public/portfolio/6/gallery3.jpeg'),
      path.join(process.cwd(), 'public/portfolio/6/gallery4.jpeg'),
    ],
    tags: ['Tropical', 'Balinese', 'Modern', 'Villa', 'Suburban'],
    client: 'Keluarga Tanaka',
    scope: 'New construction, landscape design, swimming pool, outdoor pavilion',
    budget: 'IDR 3M - 4M',
    team: 'Lead Designer: Made Wijaya, Architect: I Ketut Suastika, Landscape: Taman Indah Persada',
  },
];

async function seedProjects() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Clear existing projects (optional - comment out if you want to keep existing data)
    console.log('Clearing existing projects...');
    await db.delete(projects);
    console.log('✓ Existing projects cleared\n');

    let successfulSeeds = 0;

    for (const [index, project] of sampleProjects.entries()) {
      console.log(`\n📦 Processing project ${index + 1}/${sampleProjects.length}: ${project.title}`);

      // Upload before image
      console.log('Uploading before image...');
      const beforeImage = await uploadToCloudinary(
        project.beforeImagePath,
        `projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`
      );

      // Upload after image
      console.log('Uploading after image...');
      const afterImage = await uploadToCloudinary(
        project.afterImagePath,
        `projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`
      );

      // Upload gallery images
      console.log(`Uploading gallery images...`);
      const galleryImages = [];
      const galleryPublicIds = [];

      for (const imagePath of project.galleryImagePaths) {
        const uploaded = await uploadToCloudinary(
          imagePath,
          `projects/${project.title.toLowerCase().replace(/\s+/g, '-')}/gallery`
        );
        if (uploaded) {
          galleryImages.push(uploaded.url);
          galleryPublicIds.push(uploaded.publicId);
        }
      }

      // Only insert if we have at least before and after images
      if (beforeImage && afterImage) {
        // Insert into database
        console.log('Saving to database...');
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
        successfulSeeds++;
      } else {
        console.warn(`⚠️  Skipping project "${project.title}" due to missing required images`);
      }
    }

    console.log('\n\n✅ Database seeding completed!');
    console.log(`📊 Total projects processed: ${sampleProjects.length}`);
    console.log(`📊 Successfully seeded: ${successfulSeeds}`);
    console.log(`📊 Skipped: ${sampleProjects.length - successfulSeeds}`);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the seeder
seedProjects()
  .then(() => {
    console.log('\n👋 Seeding process finished. Exiting...');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });