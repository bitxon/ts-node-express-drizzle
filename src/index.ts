import app from "./app.js";
import config from "./config/config.js";

app.listen(config.PORT, () => {
  console.log(`Application is listening http://localhost:${config.PORT}`);
});
