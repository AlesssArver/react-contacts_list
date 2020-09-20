import Koa, { Context } from "koa";
import Router from "koa-router";
import passport from "koa-passport";

import { Contact } from "../models";

const router = new Router().prefix("/contacts");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (ctx: any) => {
    console.log(ctx.state);
    const contacts = await Contact.find({ owner: ctx.state.user._id });

    ctx.body = { resultCode: 0, contacts };
  }
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (ctx: any) => {
    const contact = await Contact.findById(ctx.params.id);

    ctx.body = { resultCode: 0, contact };
  }
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (ctx: any) => {
    const { name, surname, phone } = ctx.request.body;
    const contact = await new Contact({
      owner: ctx.state.user._id,
      name,
      surname,
      phone,
    }).save();

    ctx.status = 201;
    ctx.body = {
      resultCode: 0,
      id: contact._id,
      message: "Contact was created",
    };
  }
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (ctx: any) => {
    await Contact.findByIdAndDelete(ctx.params.id);

    ctx.body = { resultCode: 0, message: "Contact was deleted" };
  }
);

export default router.routes();
