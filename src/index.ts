require("dotenv").config();

import path from "path";
import Koa from "koa";
import { Context } from "koa";
import Router from "koa-router";
import serve from "koa-static";
import send from "koa-send";

import config from "./configs";
import mongooseConfig from "./configs/mongoose";
import libs from "./libs";
import controllers from "./controllers";

const app = new Koa();
const router = new Router();

libs.forEach((l) => app.use(l));

app.use(controllers.routes());
app.use(controllers.allowedMethods());
mongooseConfig();

if (process.env.NODE_ENV === "production") {
  app.use(serve("client/build"));
  router.get("*", (ctx: any) => {
    send(ctx, path.resolve(__dirname, "..", "client", "build", "index.html"));
  });
}

app.listen(config.port, () =>
  console.log(`Server started on port: ${config.port}`)
);
