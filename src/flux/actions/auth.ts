import { IUser } from "../../api/auth";

export default {
  setAuthUser: (loggedIn: boolean, user: IUser) =>
    ({
      type: "AUTH/SET_AUTH_USER",
      loggedIn,
      user,
    } as const),
};
