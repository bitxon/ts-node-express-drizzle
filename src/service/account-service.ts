import { eq, sql } from "drizzle-orm";
import { Account, RawAccount, Transfer } from "../api/account.js";
import db from "../db/db.js";
import { accountTable } from "../db/schema.js";

export const create = async (input: RawAccount): Promise<Account> => {
  const results = await db().insert(accountTable).values(input).returning();
  return results[0]!;
};

export const findAll = async (): Promise<Account[]> => {
  return await db().select().from(accountTable);
};

export const findById = async (id: number): Promise<Account | undefined> => {
  const results = await db().select().from(accountTable).where(eq(accountTable.id, id));
  return results[0];
};

export const transfer = async (transfer: Transfer): Promise<void> => {
  // TODO add validation for sender/receiver - curency and balance;

  await db().transaction(async (tx) => {
    await tx
      .update(accountTable)
      .set({ balance: sql`${accountTable.balance} - ${transfer.amount}` })
      .where(eq(accountTable.id, transfer.senderId));
    await tx
      .update(accountTable)
      .set({ balance: sql`${accountTable.balance} + ${transfer.amount}` })
      .where(eq(accountTable.id, transfer.recipientId));
  });
};
