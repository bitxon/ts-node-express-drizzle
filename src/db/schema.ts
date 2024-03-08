import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const currencyEnum = pgEnum("currency", ["USD", "EUR", "GBP"]);

export const accountTable = pgTable("account", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  currency: currencyEnum("currency").notNull().default("USD"), //default value required to be set for old records during migration
  balance: integer("balance").notNull().default(0),
});
