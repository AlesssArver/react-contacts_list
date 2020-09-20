import { InferActionsTypes, ThunkType } from "../index";
import api, { IUser } from "../../api/auth";
import { ResultCodes } from "../../api";
import action from "../actions/auth";

const initialState = {
  user: null as null | IUser,
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

export const getMe = (): T => async (dispatch) => {
  const data = await api.getMe();
  console.log(data);
  if (data.resultCode === ResultCodes.Success)
    dispatch(action.setAuthUser(true, data.token, data.user));
};

export const register = (email: string, password: string) => async (
  dispatch: any
) => {
  const data = await api.register(email, password);
  console.log(data);
};
export const login = (email: string, password: string): T => async (
  dispatch
) => {
  const data = await api.login(email, password);
  console.log(data);
  if (data.resultCode === ResultCodes.Success) dispatch(getMe());
};
export const deleteUser = (id: string): T => async (dispatch) => {
  const data = await api.deleteUser(id);
  data.resultCode === 0 && dispatch(action.setAuthUser(false, null, null));
};
