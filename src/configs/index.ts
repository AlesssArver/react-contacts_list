export default {
  port: process.env.PORT || 8080,
  mongoUrl:
    process.env.MONGO_URL ||
    "mongodb+srv://admin:admin@cluster0-7s2go.mongodb.net/react-contacts",
  secret: process.env.SECRET || "UUIE93KJ22&B",
};
