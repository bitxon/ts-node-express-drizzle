import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import config from "../config/config.js";

console.log("START DRIZZLE MIGRATION");

const connection = postgres(config().DB_URL, { max: 1 });
await migrate(drizzle(connection), { migrationsFolder: "drizzle" });
await connection.end();

console.log("END DRIZZLE MIGRATION");
