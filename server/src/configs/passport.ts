import { Strategy, ExtractJwt } from "passport-jwt";

import config from "./index";
import { User } from "../models";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,
};

export default (passport: any) => {
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
