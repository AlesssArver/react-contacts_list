import axios from "axios";
import { IApi } from "./index";

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
interface ILogin extends IApi {
  token: string;
}
interface IMe extends IApi {
  token: string;
  user: IUser;
}

export default {
  register(email: string, password: string) {
    return instance
      .post<IApi>("register", {
        email,
        password,
      })
      .then((res) => res.data);
  },
  login(email: string, password: string) {
    return instance
      .post<ILogin>("login", {
        email,
        password,
      })
      .then((res) => res.data);
  },
  getMe() {
    return instance.get<IMe>("/me").then((res) => res.data);
  },
  deleteUser(id: string) {
    return instance.delete<IApi>(`${id}`).then((res) => res.data);
  },
};
