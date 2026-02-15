// lib/db/schema.ts - Updated with home page sections
import { pgTable, text, integer, timestamp, varchar, jsonb, serial, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: varchar('image', { length: 500 }),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('user'), // 'user' or 'admin'
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations (if needed in the future)
export const usersRelations = relations(users, ({ many }) => ({
  // Add relations to other tables if needed
}));

// Your existing projects table - UPDATED
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  year: varchar('year', { length: 10 }).notNull(),
  area: varchar('area', { length: 50 }).notNull(),
  completion: varchar('completion', { length: 20 }).notNull(), // Increased length to accommodate "in progress"
  description: text('description').notNull(),
  beforeImage: varchar('before_image', { length: 500 }),
  beforeImagePublicId: varchar('before_image_public_id', { length: 500 }),
  afterImage: varchar('after_image', { length: 500 }),
  afterImagePublicId: varchar('after_image_public_id', { length: 500 }),
  galleryImages: jsonb('gallery_images').$type<string[]>().default([]),
  galleryImagePublicIds: jsonb('gallery_image_public_ids').$type<string[]>().default([]),
  tags: jsonb('tags').$type<string[]>().notNull(),
  client: varchar('client', { length: 255 }),
  scope: text('scope'),
  budget: varchar('budget', { length: 100 }),
  team: text('team'),
  status: varchar('status', { length: 20 }).default('published'),
  featured: boolean('featured').default(false),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Contact form submissions table - Updated with image fields
export const contactSubmissions = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address').notNull(),
  service: varchar('service', { length: 100 }).notNull(),
  area: varchar('area', { length: 100 }), // Made optional
  budget: varchar('budget', { length: 100 }), // Made optional
  details: text('details'), // Additional details
  images: jsonb('images').$type<string[]>().default([]), // Array of image URLs
  imagePublicIds: jsonb('image_public_ids').$type<string[]>().default([]), // Array of Cloudinary public IDs
  status: varchar('status', { length: 50 }).default('new'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Services table
export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  serviceId: varchar('service_id', { length: 100 }).notNull().unique(), // e.g., 'home-renovation'
  icon: varchar('icon', { length: 50 }).notNull(), // Icon name from lucide-react
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  duration: varchar('duration', { length: 100 }).notNull(),
  features: jsonb('features').$type<string[]>().notNull(),
  bestFor: text('best_for').notNull(),
  image: varchar('image', { length: 500 }).notNull(),
  imagePublicId: varchar('image_public_id', { length: 500 }),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Service comparison features table
export const serviceComparisonFeatures = pgTable('service_comparison_features', {
  id: serial('id').primaryKey(),
  feature: varchar('feature', { length: 255 }).notNull(),
  renovation: boolean('renovation').default(false),
  visualization: boolean('visualization').default(false),
  consultation: boolean('consultation').default(false),
  estimation: boolean('estimation').default(false),
  execution: boolean('execution').default(false),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// ABOUT PAGE TABLES - FULL CMS
// ============================================

// About page main section (top section with large image)
export const aboutMainSection = pgTable('about_main_section', {
  id: serial('id').primaryKey(),
  heading: varchar('heading', { length: 255 }).notNull(),
  description: text('description').notNull(),
  image: varchar('image', { length: 500 }).notNull(),
  imagePublicId: varchar('image_public_id', { length: 500 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// About page hero section (with CTA buttons)
export const aboutHeroSection = pgTable('about_hero_section', {
  id: serial('id').primaryKey(),
  heading: varchar('heading', { length: 255 }).notNull(),
  subheading: text('subheading').notNull(),
  ctaConsultText: varchar('cta_consult_text', { length: 100 }).notNull(),
  ctaConsultLink: varchar('cta_consult_link', { length: 255 }).notNull(),
  ctaPortfolioText: varchar('cta_portfolio_text', { length: 100 }).notNull(),
  ctaPortfolioLink: varchar('cta_portfolio_link', { length: 255 }).notNull(),
  image: varchar('image', { length: 500 }).notNull(),
  imagePublicId: varchar('image_public_id', { length: 500 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// About page values section header
export const aboutValuesSection = pgTable('about_values_section', {
  id: serial('id').primaryKey(),
  heading: varchar('heading', { length: 255 }).notNull(),
  description: text('description').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// About values table
export const aboutValues = pgTable('about_values', {
  id: serial('id').primaryKey(),
  icon: varchar('icon', { length: 50 }).notNull(), // Icon name from lucide-react
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// About page team section header
export const aboutTeamSection = pgTable('about_team_section', {
  id: serial('id').primaryKey(),
  heading: varchar('heading', { length: 255 }).notNull(),
  description: text('description').notNull(),
  teamListHeading: varchar('team_list_heading', { length: 100 }).notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Team members table
export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  position: varchar('position', { length: 255 }).notNull(),
  image: varchar('image', { length: 500 }).notNull(),
  imagePublicId: varchar('image_public_id', { length: 500 }),
  bio: text('bio'),
  isFounder: boolean('is_founder').default(false),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 100 }).notNull().unique(), // 'metadata' or 'favicon'
  siteName: varchar('site_name', { length: 255 }),
  siteTitle: varchar('site_title', { length: 255 }),
  siteDescription: text('site_description'),
  favicon: varchar('favicon', { length: 500 }),
  faviconPublicId: varchar('favicon_public_id', { length: 500 }),
  appleTouchIcon: varchar('apple_touch_icon', { length: 500 }),
  appleTouchIconPublicId: varchar('apple_touch_icon_public_id', { length: 500 }),
  ogImage: varchar('og_image', { length: 500 }),
  ogImagePublicId: varchar('og_image_public_id', { length: 500 }),
  keywords: jsonb('keywords').$type<string[]>().default([]),
  author: varchar('author', { length: 255 }),
  themeColor: varchar('theme_color', { length: 50 }).default('#9C7E5A'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// HOME PAGE TABLES
// ============================================

// Home page hero section
export const homeHero = pgTable('home_hero', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  backgroundImage: varchar('background_image', { length: 500 }).notNull(),
  backgroundImagePublicId: varchar('background_image_public_id', { length: 500 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Home page services section header
export const homeServicesSection = pgTable('home_services_section', {
  id: serial('id').primaryKey(),
  heading: varchar('heading', { length: 255 }).notNull(),
  description: text('description').notNull(),
  ctaText: varchar('cta_text', { length: 100 }).notNull(),
  ctaLink: varchar('cta_link', { length: 255 }).notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Home page services items
export const homeServices = pgTable('home_services', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  icon: varchar('icon', { length: 50 }).notNull(), // Icon name from lucide-react
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Home page about section
export const homeAboutSection = pgTable('home_about_section', {
  id: serial('id').primaryKey(),
  heading: varchar('heading', { length: 255 }).notNull(),
  description: text('description').notNull(),
  highlightText: text('highlight_text').notNull(),
  yearsLabel: varchar('years_label', { length: 100 }).notNull(),
  clientsLabel: varchar('clients_label', { length: 100 }).notNull(),
  mainImage: varchar('main_image', { length: 500 }).notNull(),
  mainImagePublicId: varchar('main_image_public_id', { length: 500 }),
  secondaryImage: varchar('secondary_image', { length: 500 }).notNull(),
  secondaryImagePublicId: varchar('secondary_image_public_id', { length: 500 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Home page about section features
export const homeAboutFeatures = pgTable('home_about_features', {
  id: serial('id').primaryKey(),
  feature: varchar('feature', { length: 255 }).notNull(),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Export types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type ServiceComparisonFeature = typeof serviceComparisonFeatures.$inferSelect;
export type NewServiceComparisonFeature = typeof serviceComparisonFeatures.$inferInsert;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type NewSiteSetting = typeof siteSettings.$inferInsert;

// Home page types
export type HomeHero = typeof homeHero.$inferSelect;
export type NewHomeHero = typeof homeHero.$inferInsert;
export type HomeServicesSection = typeof homeServicesSection.$inferSelect;
export type NewHomeServicesSection = typeof homeServicesSection.$inferInsert;
export type HomeService = typeof homeServices.$inferSelect;
export type NewHomeService = typeof homeServices.$inferInsert;
export type HomeAboutSection = typeof homeAboutSection.$inferSelect;
export type NewHomeAboutSection = typeof homeAboutSection.$inferInsert;
export type HomeAboutFeature = typeof homeAboutFeatures.$inferSelect;
export type NewHomeAboutFeature = typeof homeAboutFeatures.$inferInsert;

export type AboutMainSection = typeof aboutMainSection.$inferSelect;
export type NewAboutMainSection = typeof aboutMainSection.$inferInsert;
export type AboutHeroSection = typeof aboutHeroSection.$inferSelect;
export type NewAboutHeroSection = typeof aboutHeroSection.$inferInsert;
export type AboutValuesSection = typeof aboutValuesSection.$inferSelect;
export type NewAboutValuesSection = typeof aboutValuesSection.$inferInsert;
export type AboutTeamSection = typeof aboutTeamSection.$inferSelect;
export type NewAboutTeamSection = typeof aboutTeamSection.$inferInsert;
export type AboutValue = typeof aboutValues.$inferSelect;
export type NewAboutValue = typeof aboutValues.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;