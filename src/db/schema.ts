import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const accountTable = pgTable("account", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
});
