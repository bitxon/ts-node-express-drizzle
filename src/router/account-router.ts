import { Router } from "express";
import { createAccount, getAllAccounts, getOneAccountById } from "../controller/account-controller.js";

const router = Router();
router.post("/accounts", createAccount);
router.get("/accounts", getAllAccounts);
router.get("/accounts/:id", getOneAccountById);

export default router;
