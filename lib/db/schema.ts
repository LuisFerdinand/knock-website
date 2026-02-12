// lib/db/schema.ts - Updated with About page tables
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

// Contact form submissions table - Updated
export const contactSubmissions = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address').notNull(),
  service: varchar('service', { length: 100 }).notNull(),
  area: varchar('area', { length: 100 }), // Made optional
  budget: varchar('budget', { length: 100 }), // Made optional
  details: text('details'), // New field for additional details
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
export type AboutValue = typeof aboutValues.$inferSelect;
export type NewAboutValue = typeof aboutValues.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type NewSiteSetting = typeof siteSettings.$inferInsert;