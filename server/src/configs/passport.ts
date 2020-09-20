import { Context } from "koa";
import { Strategy, ExtractJwt } from "passport-jwt";

import config from "./index";
import { User } from "../models";

const cookieExtractor = (ctx: Context) => {
  let token = null;
  token = ctx.cookies.get("authToken");
  return token;
};
// const opts = {
//   jwtFromRequest: cookieExtractor,
//   // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: config.secret,
// };

export default (passport: any) => {
  let opts: any = {};
  opts.jwtFromRequest = cookieExtractor; // check token in cookie
  opts.secretOrKey = config.secret;
  passport.use(
    new Strategy(opts, async (payload, done) => {
      const user = await User.findById(payload._id);

      // user ? done(null, user) : done(null, false);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
  );
};
