import passport from "koa-passport";
import passportConfig from "../configs/passport";

passportConfig(passport);

export default passport.initialize();
