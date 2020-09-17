import { InferActionsTypes, ThunkType } from "../index";
import api, { IUser } from "../../api/auth";
import action from "../actions/auth";

const initialState = {
  user: { id: "", name: "", surname: "", email: "", password: "" } as IUser,
  loggedIn: false,
};
type IInitialState = typeof initialState;
type IActions = InferActionsTypes<typeof action>;
type T = ThunkType<IActions>;

export default (state = initialState, action: IActions): IInitialState => {
  switch (action.type) {
    case "AUTH/SET_AUTH_USER":
      return {
        ...state,
        user: action.user,
        loggedIn: action.loggedIn,
      };
    default:
      return state;
  }
};

export const register = (
  name: string,
  surname: string,
  email: string,
  password: string
) => async (dispatch: any) => {
  const data = await api.register(name, surname, email, password);
};
export const login = (email: string, password: string) => async (
  dispatch: any
) => {
  const data = await api.getUsers();
  data.filter((d: IUser) => {
    if (d.email === email && d.password === password)
      dispatch(action.setAuthUser(true, d));
  });
};
export const deleteUser = (id: string) => async (dispatch: any) => {
  const data = await api.deleteUser(id);
  data.filter((d: IUser) => {
    if (d.id === id)
      dispatch(
        action.setAuthUser(false, {
          id: "",
          name: "",
          surname: "",
          email: "",
          password: "",
        })
      );
  });
};
