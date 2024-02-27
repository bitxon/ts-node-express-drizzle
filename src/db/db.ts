import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import config from "../config/config.js";

const connection = postgres(config.DB_URL);
const db = drizzle(connection);

export default db;
