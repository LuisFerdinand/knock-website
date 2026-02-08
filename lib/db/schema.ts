// lib/db/schema.ts
import { pgTable, text, integer, timestamp, varchar, jsonb, serial } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  year: varchar('year', { length: 10 }).notNull(),
  area: varchar('area', { length: 50 }).notNull(),
  completion: varchar('completion', { length: 10 }).notNull(),
  description: text('description').notNull(),
  // Store both URL and public ID for flexibility
  beforeImage: varchar('before_image', { length: 500 }).notNull(),
  beforeImagePublicId: varchar('before_image_public_id', { length: 500 }),
  afterImage: varchar('after_image', { length: 500 }).notNull(),
  afterImagePublicId: varchar('after_image_public_id', { length: 500 }),
  galleryImages: jsonb('gallery_images').$type<string[]>().notNull(),
  galleryImagePublicIds: jsonb('gallery_image_public_ids').$type<string[]>(),
  tags: jsonb('tags').$type<string[]>().notNull(),
  client: varchar('client', { length: 255 }),
  scope: text('scope'),
  budget: varchar('budget', { length: 100 }),
  team: text('team'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;