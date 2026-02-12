// scripts/seed-site-settings.ts
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { siteSettings } from '../lib/db/schema';

// Load environment variables
config({ path: '.env.local' });

// Database setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

/**
 * Sample site settings data
 */
const sampleSiteSettings = [
  {
    key: 'metadata',
    siteName: 'Home & Space Improvement Studio',
    siteTitle: 'Home & Space Improvement Studio',
    siteDescription: 'Premium interior design and architecture services for your dream home',
    keywords: ['interior design', 'architecture', 'home improvement', 'renovation', 'space planning'],
    author: 'Home & Space Improvement Studio',
    themeColor: '#9C7E5A',
    isActive: true,
  },
  {
    key: 'favicon',
    favicon: '/favicon.ico',
    faviconPublicId: '',
    appleTouchIcon: '/apple-touch-icon.png',
    appleTouchIconPublicId: '',
    ogImage: '/og-image.jpg',
    ogImagePublicId: '',
    isActive: true,
  },
];

async function seedSiteSettings() {
  console.log('🌱 Starting site settings seeding...\n');

  try {
    // Clear existing settings
    console.log('Clearing existing site settings...');
    await db.delete(siteSettings);
    console.log('✓ Existing site settings cleared\n');

    // Seed site settings
    console.log('\n\n📦 Seeding site settings...\n');
    let successfulSettings = 0;

    for (const [index, setting] of sampleSiteSettings.entries()) {
      console.log(`\n⚙️ Processing setting ${index + 1}/${sampleSiteSettings.length}: ${setting.key}`);

      // Insert into database
      console.log('Saving to database...');
      await db.insert(siteSettings).values(setting);

      console.log(`✓ Setting "${setting.key}" seeded successfully!`);
      successfulSettings++;
    }

    console.log('\n\n✅ All seeding completed!');
    console.log(`📊 Total settings processed: ${sampleSiteSettings.length}`);
    console.log(`📊 Successfully seeded: ${successfulSettings}`);

  } catch (error) {
    console.error('\n❌ Error seeding site settings:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the seeder
seedSiteSettings()
  .then(() => {
    console.log('\n👋 Site settings seeding process finished. Exiting...');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });