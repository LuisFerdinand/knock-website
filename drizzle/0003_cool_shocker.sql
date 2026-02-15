CREATE TABLE "about_hero_section" (
	"id" serial PRIMARY KEY NOT NULL,
	"heading" varchar(255) NOT NULL,
	"subheading" text NOT NULL,
	"cta_consult_text" varchar(100) NOT NULL,
	"cta_consult_link" varchar(255) NOT NULL,
	"cta_portfolio_text" varchar(100) NOT NULL,
	"cta_portfolio_link" varchar(255) NOT NULL,
	"image" varchar(500) NOT NULL,
	"image_public_id" varchar(500),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "about_main_section" (
	"id" serial PRIMARY KEY NOT NULL,
	"heading" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"image" varchar(500) NOT NULL,
	"image_public_id" varchar(500),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "about_team_section" (
	"id" serial PRIMARY KEY NOT NULL,
	"heading" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"team_list_heading" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "about_values_section" (
	"id" serial PRIMARY KEY NOT NULL,
	"heading" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
