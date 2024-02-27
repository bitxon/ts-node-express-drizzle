import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import db from "../db/db.js";
import { accountTable } from "../db/schema.js";

export const createAccount = async (req: Request, res: Response) => {
  const result = await db
    .insert(accountTable)
    .values({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    })
    .returning();

  res.status(201).json(result[0]);
};

export const getAllAccounts = async (req: Request, res: Response) => {
  const accounts = await db.select().from(accountTable);
  res.status(200).json(accounts);
};

export const getOneAccountById = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const results = await db.select().from(accountTable).where(eq(accountTable.id, id));

  if (results.length == 0) {
    res.status(404).send();
  } else {
    res.status(200).json(results[0]);
  }
};
