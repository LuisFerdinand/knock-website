CREATE TABLE "home_about_features" (
	"id" serial PRIMARY KEY NOT NULL,
	"feature" varchar(255) NOT NULL,
	"order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "home_about_section" (
	"id" serial PRIMARY KEY NOT NULL,
	"heading" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"highlight_text" text NOT NULL,
	"years_label" varchar(100) NOT NULL,
	"clients_label" varchar(100) NOT NULL,
	"main_image" varchar(500) NOT NULL,
	"main_image_public_id" varchar(500),
	"secondary_image" varchar(500) NOT NULL,
	"secondary_image_public_id" varchar(500),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "home_hero" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"background_image" varchar(500) NOT NULL,
	"background_image_public_id" varchar(500),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "home_services" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"icon" varchar(50) NOT NULL,
	"order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "home_services_section" (
	"id" serial PRIMARY KEY NOT NULL,
	"heading" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"cta_text" varchar(100) NOT NULL,
	"cta_link" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
