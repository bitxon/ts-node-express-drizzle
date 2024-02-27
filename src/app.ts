import express from "express";
import router from "./router/router.js";

const app = express();
app.use(express.json());
app.use(router);

export default app;
