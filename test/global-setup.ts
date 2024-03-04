import { Config } from "@jest/types";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import migrateSchema from "../src/db/migration";

export default async function (globalConfig: Config.GlobalConfig, projectConfig: Config.ProjectConfig) {
  // start testcontainers
  const postgres: StartedPostgreSqlContainer = await new PostgreSqlContainer().start();

  // override environment variabless
  process.env.DB_URL = postgres.getConnectionUri();
  console.log(`Override DB_URL: ${process.env.DB_URL}`);

  // migrate DB schema
  await migrateSchema(process.env.DB_URL);
}
