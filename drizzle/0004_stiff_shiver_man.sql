CREATE TABLE "about_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" varchar(100) NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"description" text NOT NULL,
	"highlight_text" text,
	"image" varchar(500),
	"image_public_id" varchar(500),
	"secondary_image" varchar(500),
	"secondary_image_public_id" varchar(500),
	"cta_buttons" jsonb,
	"stats" jsonb,
	"order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "about_content_section_id_unique" UNIQUE("section_id")
);
--> statement-breakpoint
CREATE TABLE "about_values" (
	"id" serial PRIMARY KEY NOT NULL,
	"icon" varchar(50) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL,
	"image" varchar(500) NOT NULL,
	"image_public_id" varchar(500),
	"bio" text,
	"order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
