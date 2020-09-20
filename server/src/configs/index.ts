export default {
  port: process.env.PORT || 8080,
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.SECRET || "secret",
};
