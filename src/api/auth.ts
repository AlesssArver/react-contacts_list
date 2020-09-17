import { instance } from "./index";

export type IUser = {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
};

export default {
  register(name: string, surname: string, email: string, password: string) {
    return instance
      .post("users", {
        name,
        surname,
        email,
        password,
      })
      .then((res) => res.data);
  },
  getUsers: () => {
    return instance.get("users").then((res) => res.data);
  },
  getUser: (id: string) => {
    return instance.get(`users/${id}`).then((res) => res.data);
  },
  deleteUser(id: string) {
    return instance.delete(`users/${id}`).then((res) => res.data);
  },
};
