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
 * With Indonesian context
 */
const sampleProjects = [
  {
    title: "Knock",
    category: "Renovasi Total",
    location: "Puri Bintaro",
    year: "2023",
    area: "450m² / 48T",
    completion: "2023",
    description: "Transformasi total villa tradisional menjadi hunian mewah modern dengan ruang terbuka dan integrasi indoor-outdoor yang seamless.",
    beforeImagePath: path.join(process.cwd(), 'public/portfolio/1/before.jpg'),
    afterImagePath: path.join(process.cwd(), 'public/portfolio/1/after.jpeg'),
    galleryImagePaths: [
      path.join(process.cwd(), 'public/portfolio/1/gallery1.jpeg'),
      path.join(process.cwd(), 'public/portfolio/1/gallery2.jpeg'),
      path.join(process.cwd(), 'public/portfolio/1/gallery3.jpeg'),
      path.join(process.cwd(), 'public/portfolio/1/gallery4.jpeg'),
    ],
    tags: ["Modern", "Mewah", "Berkelanjutan"],
  },
  {
    title: "Taman Depan Minimalis",
    category: "Desain Eksterior",
    location: "Golden Park 2, Cisauk",
    year: "2023",
    area: "280m² / 30T",
    completion: "2023",
    description: "Redesain total taman depan dengan konsep minimalis tropis, menampilkan tanaman hijau asli Indonesia dan elemen batu alam.",
    beforeImagePath: path.join(process.cwd(), 'public/portfolio/2/before.jpg'),
    afterImagePath: path.join(process.cwd(), 'public/portfolio/2/after.jpg'),
    galleryImagePaths: [
      path.join(process.cwd(), 'public/portfolio/2/gallery1.jpg'),
      path.join(process.cwd(), 'public/portfolio/2/gallery2.jpg'),
    ],
    tags: ["Minimalis", "Tropis", "Modern"],
  },
  {
    title: "Taman Depan Minimalis",
    category: "Desain Eksterior",
    location: "Simplicity Cisauk",
    year: "2023",
    area: "280m² / 30T",
    completion: "2023",
    description: "Redesain total taman depan dengan konsep minimalis tropis, menampilkan tanaman hijau asli Indonesia dan elemen batu alam.",
    beforeImagePath: "", // Empty string for projects without before image
    afterImagePath: path.join(process.cwd(), 'public/portfolio/3/after.jpg'),
    galleryImagePaths: [], // Empty array for projects without gallery images
    tags: ["Minimalis", "Tropis", "Modern"],
  },
  {
    title: "Desain Tangga Rumah Tinggal",
    category: "Desain Interior",
    location: "Depok",
    year: "2023",
    area: "150m² / 15T",
    completion: "2023",
    description: "Desain ulang tangga utama dengan material kayu jati dan kaca tempered, menciptakan focal point yang elegan di ruang tamu.",
    beforeImagePath: path.join(process.cwd(), 'public/portfolio/4/before.jpg'),
    afterImagePath: path.join(process.cwd(), 'public/portfolio/4/after.jpg'),
    galleryImagePaths: [
      path.join(process.cwd(), 'public/portfolio/4/gallery1.jpg'),
    ],
    tags: ["Kayu Jati", "Minimalis", "Elegan"],
  },
  {
    title: "Redesain Dapur dan Kamar Mandi",
    category: "Renovasi Interior",
    location: "Maharta",
    year: "2023",
    area: "85m² / 20T",
    completion: "2023",
    description: "Transformasi dapur dan kamar mandi dengan fungsionalitas optimal, menggunakan material premium dan teknologi smart home.",
    beforeImagePath: path.join(process.cwd(), 'public/portfolio/5/before.jpg'),
    afterImagePath: path.join(process.cwd(), 'public/portfolio/5/after.png'),
    galleryImagePaths: [
      path.join(process.cwd(), 'public/portfolio/5/gallery1.png'),
    ],
    tags: ["Modern", "Smart Home", "Fungsional"],
  },
  {
    title: "Desain Interior Kamar Tidur Utama",
    category: "Desain Interior",
    location: "Bekasi Barat, Cisauk",
    year: "2023",
    area: "120m² / 25T",
    completion: "2023",
    description: "Desain ulang total kamar tidur utama dengan konsep resort Bali, menampilkan area lounge dan walk-in closet yang luas.",
    beforeImagePath: path.join(process.cwd(), 'public/portfolio/6/before.jpg'),
    afterImagePath: path.join(process.cwd(), 'public/portfolio/6/after.jpg'),
    galleryImagePaths: [
      path.join(process.cwd(), 'public/portfolio/6/gallery1.jpg'),
    ],
    tags: ["Mewah", "Relaksasi"],
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

      // Upload before image (only if it exists)
      let beforeImage = null;
      if (project.beforeImagePath) {
        console.log('Uploading before image...');
        beforeImage = await uploadToCloudinary(
          project.beforeImagePath,
          `projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`
        );
      }

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

      // Only insert if we have at least the after image
      if (afterImage) {
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
          beforeImage: beforeImage?.url || null,
          beforeImagePublicId: beforeImage?.publicId || null,
          afterImage: afterImage.url,
          afterImagePublicId: afterImage.publicId,
          galleryImages: galleryImages,
          galleryImagePublicIds: galleryPublicIds,
          tags: project.tags,
        });

        console.log(`✓ Project "${project.title}" seeded successfully!`);
        successfulSeeds++;
      } else {
        console.warn(`⚠️  Skipping project "${project.title}" due to missing required after image`);
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