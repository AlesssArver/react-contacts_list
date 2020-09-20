import { IUser } from "../../api/auth";

export default {
  setAuthUser: (loggedIn: boolean, token: null | string, user: null | IUser) =>
    ({
      type: "AUTH/SET_AUTH_USER",
      loggedIn,
      token,
      user,
    } as const),
};
