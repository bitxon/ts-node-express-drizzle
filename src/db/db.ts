import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import config from "../config/config.js";

let dsl: PostgresJsDatabase<Record<string, unknown>>;

const db = () => {
  if (!dsl) {
    const connection = postgres(config().DB_URL);
    dsl = drizzle(connection);
  }
  return dsl;
};

export default db;
