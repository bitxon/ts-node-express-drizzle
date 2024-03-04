import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrateSchema = async (dbUrl: string) => {
  const connection = postgres(dbUrl, { max: 1 }); // we need exacly one connection for migration
  await migrate(drizzle(connection), { migrationsFolder: "drizzle" });
  await connection.end();
};

export default migrateSchema;
