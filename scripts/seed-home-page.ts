// scripts/seed-home-page.ts
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { 
  homeHero, 
  homeServicesSection, 
  homeServices, 
  homeAboutSection, 
  homeAboutFeatures 
} from '../lib/db/schema';

// Load environment variables
config({ path: '.env.local' });

// Database setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

/**
 * Hero section data
 */
const heroData = {
  title: "Home & Space\nImprovement\nStudio",
  description: "Izinkan tim kami mengetuk pintu rumah Anda dan memulai proses transformasi perancangan ruang untuk rumah yang lebih nyaman, fungsional, dan berkarakter sesuai kebutuhan Anda.",
  backgroundImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
  backgroundImagePublicId: "",
  isActive: true,
};

/**
 * Services section header data
 */
const servicesSectionData = {
  heading: "Our Service",
  description: "Solusi renovasi dan pembangunan rumah yang komprehensif dan disesuaikan dengan kebutuhan Anda",
  ctaText: "Lihat Semua Layanan",
  ctaLink: "/services",
  isActive: true,
};

/**
 * Services items data
 */
const servicesData = [
  {
    title: "Pembangunan",
    description: "Layanan pembangunan rumah dari awal dengan desain modern dan material berkualitas tinggi. Kami memastikan setiap detail sesuai dengan visi dan kebutuhan Anda.",
    icon: "Home",
    order: 1,
    isActive: true,
  },
  {
    title: "Renovasi",
    description: "Transformasi dan pembaruan rumah existing Anda menjadi lebih modern dan functional. Dari renovasi kecil hingga perombakan total, kami siap membantu.",
    icon: "Hammer",
    order: 2,
    isActive: true,
  },
];

/**
 * About section data
 */
const aboutSectionData = {
  heading: "Menciptakan Ruang yang Menginspirasi & Menyenangkan",
  description: "Di Knock, kami percaya bahwa setiap ruang memiliki potensi untuk menjadi luar biasa. Dengan pengalaman bertahun-tahun, kami telah mengubah banyak rumah menjadi lebih berkarakter dan fungsional.",
  highlightText: "Di Knock, kami percaya bahwa setiap ruang memiliki potensi untuk menjadi luar biasa. Dengan pengalaman bertahun-tahun, kami telah mengubah banyak rumah menjadi lebih berkarakter dan fungsional.",
  yearsLabel: "Tahunan",
  clientsLabel: "Puluhan",
  mainImage: "/home/about-section-2.jpg",
  mainImagePublicId: "",
  secondaryImage: "/home/about-section-1.jpg",
  secondaryImagePublicId: "",
  isActive: true,
};

/**
 * About section features data
 */
const aboutFeaturesData = [
  {
    feature: "Tim desain berpengalaman",
    order: 1,
    isActive: true,
  },
  {
    feature: "Komitmen terhadap kepuasan klien",
    order: 2,
    isActive: true,
  },
  {
    feature: "Manajemen proyek yang efisien",
    order: 3,
    isActive: true,
  },
  {
    feature: "Konsiderasi praktik berkelanjutan",
    order: 4,
    isActive: true,
  },
];

async function seedHomePage() {
  console.log('🌱 Starting home page seeding...\n');

  try {
    // Clear existing data
    console.log('Clearing existing home page data...');
    await db.delete(homeHero);
    await db.delete(homeServicesSection);
    await db.delete(homeServices);
    await db.delete(homeAboutSection);
    await db.delete(homeAboutFeatures);
    console.log('✓ Existing data cleared\n');

    // Seed Hero Section
    console.log('\n\n📦 Seeding Hero Section...\n');
    await db.insert(homeHero).values(heroData);
    console.log('✓ Hero section seeded successfully!');

    // Seed Services Section Header
    console.log('\n\n📦 Seeding Services Section Header...\n');
    await db.insert(homeServicesSection).values(servicesSectionData);
    console.log('✓ Services section header seeded successfully!');

    // Seed Services Items
    console.log('\n\n📦 Seeding Services Items...\n');
    let successfulServices = 0;

    for (const [index, service] of servicesData.entries()) {
      console.log(`\n🔧 Processing service ${index + 1}/${servicesData.length}: ${service.title}`);
      await db.insert(homeServices).values(service);
      console.log(`✓ Service "${service.title}" seeded successfully!`);
      successfulServices++;
    }

    console.log('\n\n📊 Services items seeding completed!');
    console.log(`📊 Total services processed: ${servicesData.length}`);
    console.log(`📊 Successfully seeded: ${successfulServices}`);

    // Seed About Section
    console.log('\n\n📦 Seeding About Section...\n');
    await db.insert(homeAboutSection).values(aboutSectionData);
    console.log('✓ About section seeded successfully!');

    // Seed About Features
    console.log('\n\n📦 Seeding About Features...\n');
    let successfulFeatures = 0;

    for (const [index, feature] of aboutFeaturesData.entries()) {
      console.log(`\n✨ Processing feature ${index + 1}/${aboutFeaturesData.length}: ${feature.feature}`);
      await db.insert(homeAboutFeatures).values(feature);
      console.log(`✓ Feature "${feature.feature}" seeded successfully!`);
      successfulFeatures++;
    }

    console.log('\n\n📊 About features seeding completed!');
    console.log(`📊 Total features processed: ${aboutFeaturesData.length}`);
    console.log(`📊 Successfully seeded: ${successfulFeatures}`);

    console.log('\n\n✅ All home page seeding completed!');
    console.log('\n📝 Summary:');
    console.log(`   - Hero Section: 1`);
    console.log(`   - Services Section Header: 1`);
    console.log(`   - Services Items: ${successfulServices}`);
    console.log(`   - About Section: 1`);
    console.log(`   - About Features: ${successfulFeatures}`);

  } catch (error) {
    console.error('\n❌ Error seeding home page:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the seeder
seedHomePage()
  .then(() => {
    console.log('\n👋 Home page seeding process finished. Exiting...');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });