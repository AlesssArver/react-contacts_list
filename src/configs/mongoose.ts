import mongoose from "mongoose";

import config from "./index";

export default () => {
  mongoose
    .connect(config.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("MongoDB has been started"))
    .catch((e) => console.log(e));
};
