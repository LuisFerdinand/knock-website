import { pgTable, text, integer, timestamp, varchar, jsonb, serial, boolean } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  year: varchar('year', { length: 10 }).notNull(),
  area: varchar('area', { length: 50 }).notNull(),
  completion: varchar('completion', { length: 10 }).notNull(),
  description: text('description').notNull(),
  // Make beforeImage optional since some projects don't have it
  beforeImage: varchar('before_image', { length: 500 }),
  beforeImagePublicId: varchar('before_image_public_id', { length: 500 }),
  afterImage: varchar('after_image', { length: 500 }).notNull(),
  afterImagePublicId: varchar('after_image_public_id', { length: 500 }),
  galleryImages: jsonb('gallery_images').$type<string[]>().default([]),
  galleryImagePublicIds: jsonb('gallery_image_public_ids').$type<string[]>().default([]),
  tags: jsonb('tags').$type<string[]>().notNull(),
  // Optional fields for additional information
  client: varchar('client', { length: 255 }),
  scope: text('scope'),
  budget: varchar('budget', { length: 100 }),
  team: text('team'),
  // Status and ordering
  status: varchar('status', { length: 20 }).default('published'), // published, draft, archived
  featured: boolean('featured').default(false),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;