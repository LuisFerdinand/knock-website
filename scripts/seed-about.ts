// scripts/seed-about-full.ts
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { 
  aboutMainSection, 
  aboutHeroSection, 
  aboutValuesSection, 
  aboutValues, 
  aboutTeamSection, 
  teamMembers 
} from '../lib/db/schema';

// Load environment variables
config({ path: '.env.local' });

// Database setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

/**
 * Main Section Data
 */
const mainSectionData = {
  heading: "Menciptakan Ruang yang Menginspirasi",
  description: "KNOCK adalah Home & Space Improvement Studio yang membantu pemilik rumah meningkatkan kualitas ruang hidup—baik dari sisi fungsi, estetika, maupun kenyamanan. Kami percaya bahwa rumah bukan sekedar membangun atau memperbaiki, tetapi tentang meningkatkan cara sebuah ruang digunakan dan dirasakan. Karena itu, setiap proyek KNOCK dimulai dengan pemahaman kebutuhan klien, visualisasi desain yang jelas, dan perencanaan yang terukur.",
  image: "/about/Bricks.png",
  imagePublicId: "",
  isActive: true,
};

/**
 * Hero Section Data
 */
const heroSectionData = {
  heading: "Tentang Knock Studio",
  subheading: "Menciptakan ruang impian sejak tahun 2021 dengan desain yang inovatif dan berkelanjutan.",
  ctaConsultText: "Konsultasi dengan Kami",
  ctaConsultLink: "/schedule",
  ctaPortfolioText: "Lihat Karya Kami",
  ctaPortfolioLink: "/portfolio",
  image: "/about/aset1.png",
  imagePublicId: "",
  isActive: true,
};

/**
 * Values Section Header Data
 */
const valuesSectionData = {
  heading: "Nilai-Nilai Kami",
  description: "Nilai-nilai ini menjadi landasan kami dalam bekerja, menjaga kualitas, profesionalisme, dan kepercayaan di setiap proyek.",
  isActive: true,
};

/**
 * Values Data
 */
const valuesData = [
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
 * Team Section Header Data
 */
const teamSectionData = {
  heading: "Tim Profesional Kami",
  description: "Berkenalan dengan tim kreatif yang siap mewujudkan visi Anda",
  teamListHeading: "Our Team",
  isActive: true,
};

/**
 * Team Members Data
 */
const teamMembersData = [
  // Founder
  {
    name: "Fachry Zella Devandra",
    position: "Founder",
    image: "/about/team/profile.jpeg",
    imagePublicId: "",
    bio: null,
    isFounder: true,
    order: 1,
    isActive: true,
  },
  // Team Members
  {
    name: "Ogy Surya Ari Utama",
    position: "Project Manager",
    image: "",
    imagePublicId: "",
    bio: null,
    isFounder: false,
    order: 2,
    isActive: true,
  },
  {
    name: "Suroto",
    position: "Pelaksana",
    image: "",
    imagePublicId: "",
    bio: null,
    isFounder: false,
    order: 3,
    isActive: true,
  },
  {
    name: "Martinus",
    position: "3D Visualizer",
    image: "",
    imagePublicId: "",
    bio: null,
    isFounder: false,
    order: 4,
    isActive: true,
  },
  {
    name: "Gabby",
    position: "Interior Designer",
    image: "",
    imagePublicId: "",
    bio: null,
    isFounder: false,
    order: 5,
    isActive: true,
  },
  {
    name: "Seandi P",
    position: "Head Finance / Estimator",
    image: "",
    imagePublicId: "",
    bio: null,
    isFounder: false,
    order: 6,
    isActive: true,
  },
];

async function seedAboutPage() {
  console.log('🌱 Starting About page full CMS seeding...\n');

  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await db.delete(aboutMainSection);
    await db.delete(aboutHeroSection);
    await db.delete(aboutValuesSection);
    await db.delete(aboutValues);
    await db.delete(aboutTeamSection);
    await db.delete(teamMembers);
    console.log('✓ Existing data cleared\n');

    // Seed Main Section
    console.log('\n📦 Seeding Main Section...\n');
    await db.insert(aboutMainSection).values(mainSectionData);
    console.log('✓ Main section seeded successfully!');

    // Seed Hero Section
    console.log('\n📦 Seeding Hero Section...\n');
    await db.insert(aboutHeroSection).values(heroSectionData);
    console.log('✓ Hero section seeded successfully!');

    // Seed Values Section Header
    console.log('\n📦 Seeding Values Section Header...\n');
    await db.insert(aboutValuesSection).values(valuesSectionData);
    console.log('✓ Values section header seeded successfully!');

    // Seed Values
    console.log('\n📦 Seeding Values...\n');
    let successfulValues = 0;
    for (const [index, value] of valuesData.entries()) {
      console.log(`💎 Processing value ${index + 1}/${valuesData.length}: ${value.title}`);
      await db.insert(aboutValues).values(value);
      console.log(`✓ Value "${value.title}" seeded successfully!`);
      successfulValues++;
    }
    console.log(`\n📊 Successfully seeded ${successfulValues} values`);

    // Seed Team Section Header
    console.log('\n📦 Seeding Team Section Header...\n');
    await db.insert(aboutTeamSection).values(teamSectionData);
    console.log('✓ Team section header seeded successfully!');

    // Seed Team Members
    console.log('\n📦 Seeding Team Members...\n');
    let successfulTeam = 0;
    for (const [index, member] of teamMembersData.entries()) {
      console.log(`👤 Processing team member ${index + 1}/${teamMembersData.length}: ${member.name}`);
      await db.insert(teamMembers).values(member);
      console.log(`✓ Team member "${member.name}" seeded successfully!`);
      successfulTeam++;
    }

    console.log('\n\n✅ All About page seeding completed!');
    console.log('\n📝 Summary:');
    console.log(`   - Main Section: 1`);
    console.log(`   - Hero Section: 1`);
    console.log(`   - Values Section Header: 1`);
    console.log(`   - Values: ${successfulValues}`);
    console.log(`   - Team Section Header: 1`);
    console.log(`   - Team Members: ${successfulTeam} (1 Founder + ${successfulTeam - 1} Team)`);

  } catch (error) {
    console.error('\n❌ Error seeding about page:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the seeder
seedAboutPage()
  .then(() => {
    console.log('\n👋 About page seeding process finished. Exiting...');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });