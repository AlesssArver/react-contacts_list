import { InferActionsTypes } from "../index";
import action from "../actions/snackbar";

export type ISnackbar = {
  isSnackbar: boolean;
  snackbarType?: "error" | "success" | "info" | "warning";
  text?: string;
};
const initialState: ISnackbar = {
  isSnackbar: false,
  snackbarType: undefined,
  text: "" as string | undefined,
};

type Actions = InferActionsTypes<typeof action>;

export default (state = initialState, action: Actions): ISnackbar => {
  switch (action.type) {
    case "SNACKBAR/SET_SNACKBAR":
      return {
        ...state,
        isSnackbar: action.isSnackbar,
        snackbarType: action.snackbarType,
        text: action.text,
      };
    case "SNACKBAR/CLOSE_SNACKBAR":
      return { ...state, isSnackbar: false };
    default:
      return state;
  }
};
