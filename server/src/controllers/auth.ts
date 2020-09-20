import { Context } from "koa";
import Router from "koa-router";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models";
import config from "../configs";

const router = new Router().prefix("/auth");

router.post("/register", async (ctx: any) => {
  const { email, password } = ctx.request.body;
  const user = await User.findOne({ email });

  user && ctx.throw(400, "User with this email already exist!");

  console.log(ctx.request.body);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  await new User({ email, password: hash }).save();

  ctx.status = 201;
});

router.post("/login", async (ctx: any) => {
  const { email, password } = ctx.request.body;
  const user = await User.findOne({ email });

  !user && ctx.throw(400, "User is not exist");

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const payload = {
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, config.secret, { expiresIn: 3600 * 24 });

    ctx.cookies.set("authToken", token);
    ctx.body = {
      resultCode: 0,
      token: `Bearer: ${token}`,
      message: "U a logged in",
    };
  } else ctx.throw(400, "Password incorrect");
});

router.get("/me", async (ctx: any) => {
  console.log("token");
  const token = ctx.cookies.get("authToken");
  console.log(token);
  let authData: any = jwt.verify(token, config.secret);
  const user = await User.findById(authData._id);
  console.log(token);
  console.log(authData);
  console.log(user);
  ctx.body = { resultCode: 0, token, user };
});

router.delete("/:id", async (ctx: any) => {
  await User.findByIdAndDelete(ctx.params._id);
  ctx.body = { resultCode: 0, message: "User was deleted" };
});

export default router.routes();
