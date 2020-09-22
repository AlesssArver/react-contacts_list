import action from "../actions/app";
import { InferActionsTypes, ThunkType } from "../index";
import { getMe } from "./auth";

const initialState = {
  initialized: false,
};
type State = typeof initialState;
type Actions = InferActionsTypes<typeof action>;
type T = ThunkType<Actions>;

const app = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case "APP/INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};
export default app;

export const initializeApp = () => (dispatch: any) => {
  dispatch(getMe()).then(() => dispatch(action.initializedSuccess()));
};
