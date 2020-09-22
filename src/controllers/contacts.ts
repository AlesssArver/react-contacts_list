import Koa, { Context } from "koa";
import Router from "koa-router";
import passport from "koa-passport";

import { Contact } from "../models";

const router = new Router().prefix("/contacts");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (ctx: any) => {
    const contacts = await Contact.find({ owner: ctx.state.user._id });

    ctx.body = { resultCode: 0, contacts };
  }
);
router.get(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (ctx: any) => {
    const contact = await Contact.findById(ctx.params._id);

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
      _id: contact._id,
      message: "Contact was created",
    };
  }
);
router.put(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (ctx: any) => {
    const { name, surname, phone } = ctx.request.body;
    await Contact.findByIdAndUpdate(ctx.params._id, {
      name,
      surname,
      phone,
    });

    ctx.body = { resultCode: 0, message: "Contact was updated" };
  }
);
router.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (ctx: any) => {
    await Contact.findByIdAndDelete(ctx.params._id);

    ctx.body = { resultCode: 0, message: "Contact was deleted" };
  }
);

export default router.routes();
