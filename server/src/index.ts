require("dotenv").config();

import Koa from "koa";

import config from "./configs";
import mongooseConfig from "./configs/mongoose";
import libs from "./libs";
import controllers from "./controllers";

const app = new Koa();

libs.forEach((l) => app.use(l));

app.use(controllers.routes());
app.use(controllers.allowedMethods());
mongooseConfig();

app.listen(config.port, () =>
  console.log(`Server started on port: ${config.port}`)
);
