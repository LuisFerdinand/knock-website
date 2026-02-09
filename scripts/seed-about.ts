// scripts/seed-about.ts
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { aboutContent, aboutValues, teamMembers } from '../lib/db/schema';

// Load environment variables
config({ path: '.env.local' });

// Database setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

/**
 * Sample about content data
 */
const sampleAboutContent = [
  {
    sectionId: "main-about",
    title: "Menciptakan Ruang yang Menginspirasi",
    highlightText: "Menginspirasi",
    description: "KNOCK adalah Home & Space Improvement Studio yang membantu pemilik rumah meningkatkan kualitas ruang hidup—baik dari sisi fungsi, estetika, maupun kenyamanan. Kami percaya bahwa rumah bukan sekedar membangun atau memperbaiki, tetapi tentang meningkatkan cara sebuah ruang digunakan dan dirasakan. Karena itu, setiap proyek KNOCK dimulai dengan pemahaman kebutuhan klien, visualisasi desain yang jelas, dan perencanaan yang terukur.",
    subtitle: null,
    image: "/about/Bricks.png",
    imagePublicId: "",
    secondaryImage: null,
    secondaryImagePublicId: null,
    ctaButtons: null,
    stats: [
      { value: "500+", label: "Proyek Selesai" },
      { value: "15+", label: "Tahun Pengalaman" }
    ],
    order: 1,
    isActive: true,
  },
  {
    sectionId: "hero",
    title: "Tentang Knock Studio",
    highlightText: "Knock Studio",
    description: "Menciptakan ruang impian sejak tahun 2021 dengan desain yang inovatif dan berkelanjutan.",
    subtitle: null,
    image: "/about/aset1.png",
    imagePublicId: "",
    secondaryImage: null,
    secondaryImagePublicId: null,
    ctaButtons: [
      { text: "Konsultasi dengan Kami", href: "/schedule", variant: "default" as const },
      { text: "Lihat Karya Kami", href: "/portfolio", variant: "outline" as const }
    ],
    stats: null,
    order: 2,
    isActive: true,
  },
  {
    sectionId: "values-section",
    title: "Nilai-Nilai Kami",
    highlightText: null,
    description: "Prinsip yang memandu setiap keputusan desain kami",
    subtitle: null,
    image: null,
    imagePublicId: null,
    secondaryImage: null,
    secondaryImagePublicId: null,
    ctaButtons: null,
    stats: null,
    order: 3,
    isActive: true,
  },
  {
    sectionId: "team-section",
    title: "Tim Profesional Kami",
    highlightText: null,
    description: "Berkenalan dengan tim kreatif yang siap mewujudkan visi Anda",
    subtitle: null,
    image: null,
    imagePublicId: null,
    secondaryImage: null,
    secondaryImagePublicId: null,
    ctaButtons: null,
    stats: null,
    order: 4,
    isActive: false, // Commented out in the page
  },
  {
    sectionId: "cta-section",
    title: "Tertarik Bekerja dengan Kami?",
    highlightText: null,
    description: "Mari diskusikan proyek Anda bersama tim kami. Kami siap membantu mewujudkan ruang impian Anda dengan pendekatan personal dan profesional.",
    subtitle: null,
    image: null,
    imagePublicId: null,
    secondaryImage: null,
    secondaryImagePublicId: null,
    ctaButtons: [
      { text: "Jadwalkan Konsultasi", href: "/schedule", variant: "default" as const },
      { text: "Lihat Karya Kami", href: "/portfolio", variant: "outline" as const }
    ],
    stats: null,
    order: 5,
    isActive: false, // Commented out in the page
  },
];

/**
 * Sample values data
 */
const sampleValues = [
  {
    icon: "Award",
    title: "Kualitas Terbaik",
    description: "Kami berkomitmen memberikan hasil kerja dengan standar tertinggi untuk setiap proyek.",
    order: 1,
    isActive: true,
  },
  {
    icon: "Users",
    title: "Tim Profesional",
    description: "Tim kami terdiri dari desainer dan arsitek berpengalaman dengan passion dalam bidangnya.",
    order: 2,
    isActive: true,
  },
  {
    icon: "Lightbulb",
    title: "Inovasi Berkelanjutan",
    description: "Kami selalu mencari solusi kreatif dan berkelanjutan untuk setiap tantangan desain.",
    order: 3,
    isActive: true,
  },
  {
    icon: "CheckCircle",
    title: "Kepuasan Klien",
    description: "Kepuasan klien adalah prioritas utama kami, kami berusaha melampaui ekspektasi.",
    order: 4,
    isActive: true,
  },
];

/**
 * Sample team members data
 */
const sampleTeamMembers = [
  {
    name: "Andi Pratama",
    position: "Principal Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8GVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    imagePublicId: "",
    bio: null,
    order: 1,
    isActive: false, // Team section is commented out
  },
  {
    name: "Siti Nurhaliza",
    position: "Lead Interior Designer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c6ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8GVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    imagePublicId: "",
    bio: null,
    order: 2,
    isActive: false,
  },
  {
    name: "Budi Santoso",
    position: "Senior 3D Visualizer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8GVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    imagePublicId: "",
    bio: null,
    order: 3,
    isActive: false,
  },
  {
    name: "Maya Putri",
    position: "Project Manager",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8GVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    imagePublicId: "",
    bio: null,
    order: 4,
    isActive: false,
  },
];

async function seedAbout() {
  console.log('🌱 Starting about page seeding...\n');

  try {
    // Clear existing about content
    console.log('Clearing existing about content...');
    await db.delete(aboutContent);
    console.log('✓ Existing about content cleared\n');

    // Clear existing values
    console.log('Clearing existing values...');
    await db.delete(aboutValues);
    console.log('✓ Existing values cleared\n');

    // Clear existing team members
    console.log('Clearing existing team members...');
    await db.delete(teamMembers);
    console.log('✓ Existing team members cleared\n');

    let successfulSeeds = 0;

    // Seed about content
    console.log('📦 Seeding about content...\n');
    for (const [index, content] of sampleAboutContent.entries()) {
      console.log(`\n📄 Processing content ${index + 1}/${sampleAboutContent.length}: ${content.sectionId}`);

      // Insert into database
      console.log('Saving to database...');
      await db.insert(aboutContent).values(content);

      console.log(`✓ Content "${content.sectionId}" seeded successfully!`);
      successfulSeeds++;
    }

    console.log('\n\n📊 About content seeding completed!');
    console.log(`📊 Total content sections processed: ${sampleAboutContent.length}`);
    console.log(`📊 Successfully seeded: ${successfulSeeds}`);

    // Seed values
    console.log('\n\n📦 Seeding values...\n');
    let successfulValues = 0;

    for (const [index, value] of sampleValues.entries()) {
      console.log(`\n💎 Processing value ${index + 1}/${sampleValues.length}: ${value.title}`);

      // Insert into database
      console.log('Saving to database...');
      await db.insert(aboutValues).values(value);

      console.log(`✓ Value "${value.title}" seeded successfully!`);
      successfulValues++;
    }

    console.log('\n\n📊 Values seeding completed!');
    console.log(`📊 Total values processed: ${sampleValues.length}`);
    console.log(`📊 Successfully seeded: ${successfulValues}`);

    // Seed team members
    console.log('\n\n📦 Seeding team members...\n');
    let successfulTeam = 0;

    for (const [index, member] of sampleTeamMembers.entries()) {
      console.log(`\n👤 Processing team member ${index + 1}/${sampleTeamMembers.length}: ${member.name}`);

      // Insert into database
      console.log('Saving to database...');
      await db.insert(teamMembers).values(member);

      console.log(`✓ Team member "${member.name}" seeded successfully!`);
      successfulTeam++;
    }

    console.log('\n\n✅ All seeding completed!');
    console.log(`📊 Total team members processed: ${sampleTeamMembers.length}`);
    console.log(`📊 Successfully seeded: ${successfulTeam}`);

  } catch (error) {
    console.error('\n❌ Error seeding about page:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the seeder
seedAbout()
  .then(() => {
    console.log('\n👋 About page seeding process finished. Exiting...');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });