import { Context, Next } from "koa";

export default async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (e) {
    ctx.status = e.status || 500;
    ctx.body = {
      resultCode: 1,
      message: e.message || "Internet Server Error",
    };
  }
};
