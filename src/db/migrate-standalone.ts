import config from "../config/config.js";
import migrateSchema from "./migration.js";

// This file suppose to be used only in package.json scripts

console.time("DRIZZLE MIGRATION");
await migrateSchema(config().DB_URL);
console.timeEnd("DRIZZLE MIGRATION");
