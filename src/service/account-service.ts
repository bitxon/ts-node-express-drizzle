import { eq } from "drizzle-orm";
import { Account, RawAccount } from "../api/account.js";
import db from "../db/db.js";
import { accountTable } from "../db/schema.js";

export const create = async (input: RawAccount): Promise<Account> => {
  const results = await db()
    .insert(accountTable)
    .values({ email: input.email, firstName: input.firstName, lastName: input.lastName })
    .returning();
  return results[0]!;
};

export const findAll = async (): Promise<Account[]> => {
  return await db().select().from(accountTable);
};

export const findById = async (id: number): Promise<Account | undefined> => {
  const results = await db().select().from(accountTable).where(eq(accountTable.id, id));
  return results[0];
};
