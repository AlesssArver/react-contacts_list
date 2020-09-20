import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/api/auth/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export type IUser = {
  _id: string;
  email: string;
  password: string;
};

export default {
  register(email: string, password: string) {
    return instance
      .post("register", {
        email,
        password,
      })
      .then((res) => res.data);
  },
  login(email: string, password: string) {
    return instance
      .post("login", {
        email,
        password,
      })
      .then((res) => res.data);
  },
  getUser: (id: string) => {
    return instance.get(`${id}`).then((res) => res.data);
  },
  getMe() {
    return instance.get("/me").then((res) => res.data);
  },
  deleteUser(id: string) {
    return instance.delete(`${id}`).then((res) => res.data);
  },
};
