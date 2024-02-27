import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  verbose: true,
  strict: true,
} satisfies Config;
