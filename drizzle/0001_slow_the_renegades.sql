DO $$ BEGIN
 CREATE TYPE "currency" AS ENUM('USD', 'EUR', 'GBP');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "currency" "currency" DEFAULT 'USD' NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "balance" integer DEFAULT 0 NOT NULL;