import app from "./app.js";
import config from "./config/config.js";
import db from "./db/db.js";

db(); //Fail-fast: Initialize the database connection before application starts

app.listen(config().PORT, () => {
  console.log(`Application is listening http://localhost:${config().PORT}`);
});
