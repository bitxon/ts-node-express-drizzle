import express, { Application } from "express";
import bodyParser from "body-parser";
import config from "./config/config.js";
import accountRouter from "./router/account-router.js";

const app: Application = express();
app.use(bodyParser.json());
app.use(accountRouter);

app.listen(config.PORT, () => {
  console.log(`Application is listening http://localhost:${config.PORT}`);
});
