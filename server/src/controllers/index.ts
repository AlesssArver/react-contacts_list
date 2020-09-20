import Router from "koa-router";

import auth from "./auth";
import contacts from "./contacts";

const router = new Router().prefix("/api");

router.use(auth, contacts);

export default router;
