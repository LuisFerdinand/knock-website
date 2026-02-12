CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(100) NOT NULL,
	"site_name" varchar(255),
	"site_title" varchar(255),
	"site_description" text,
	"favicon" varchar(500),
	"favicon_public_id" varchar(500),
	"apple_touch_icon" varchar(500),
	"apple_touch_icon_public_id" varchar(500),
	"og_image" varchar(500),
	"og_image_public_id" varchar(500),
	"keywords" jsonb DEFAULT '[]'::jsonb,
	"author" varchar(255),
	"theme_color" varchar(50) DEFAULT '#9C7E5A',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "site_settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "completion" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "after_image" DROP NOT NULL;