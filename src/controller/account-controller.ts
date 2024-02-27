import { Request, Response } from "express";
import * as AccountService from "../service/account-service.js";

export const createAccount = async (req: Request, res: Response) => {
  const result = await AccountService.create(req.body);
  res.status(201).json(result);
};

export const findAllAccounts = async (req: Request, res: Response) => {
  const accounts = await AccountService.findAll();
  res.status(200).json(accounts);
};

export const getOneAccountById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await AccountService.findById(id);

  if (!result) {
    res.status(404).send();
  } else {
    res.status(200).json(result);
  }
};
