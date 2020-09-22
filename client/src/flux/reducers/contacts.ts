import { InferActionsTypes, ThunkType } from "../index";
import api, { IContact } from "../../api/contacts";
import { ResultCodes } from "../../api";
import action from "../actions/contacts";
import snackbarAction from "../actions/snackbar";

const initialState = {
  contacts: [] as Array<IContact>,
  contact: {} as IContact,
};
type IInitialState = typeof initialState;
type IActions = InferActionsTypes<typeof action & typeof snackbarAction>;
type T = ThunkType<IActions>;

export default (state = initialState, action: IActions): IInitialState => {
  switch (action.type) {
    case "CONTACT/GET_CONTACTS":
      return { ...state, contacts: action.contacts };
    case "CONTACT/GET_CONTACT":
      return { ...state, contact: action.contact };
    case "CONTACT/CREATE_CONTACT":
      return {
        ...state,
        contacts: [
          ...state.contacts,
          {
            _id: action._id,
            name: action.name,
            surname: action.surname,
            phone: action.phone,
          },
        ],
      };
    case "CONTACT/UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((c) => {
          if (c._id === action._id)
            return {
              ...c,
              name: action.name,
              surname: action.surname,
              phone: action.phone,
            };
          return c;
        }),
      };
    case "CONTACT/DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((c) => c._id !== action._id),
      };
    default:
      return state;
  }
};

export const getContacts = (): T => async (dispatch) => {
  const data = await api.getContacts();
  if (data.resultCode === ResultCodes.Success)
    dispatch(action.getContacts(data.contacts));
};
export const getContact = (_id: string): T => async (dispatch) => {
  const data = await api.getContact(_id);
  if (data.resultCode === ResultCodes.Success)
    dispatch(action.getContact(data.contact));
};
export const createContact = (
  name: string,
  surname: string,
  phone: string
): T => async (dispatch) => {
  const data = await api.createContact(name, surname, phone);
  if (data.resultCode === ResultCodes.Success) {
    dispatch(action.createContact(data._id, name, surname, phone));
    dispatch(snackbarAction.setSnackbar(true, "success", data.message));
  } else dispatch(snackbarAction.setSnackbar(true, "error", data.message));
};
export const updateContact = (
  _id: string,
  name: string,
  surname: string,
  phone: string
): T => async (dispatch) => {
  const data = await api.updateContact(_id, name, surname, phone);
  if (data.resultCode === ResultCodes.Success) {
    dispatch(action.updateContact(_id, name, surname, phone));
    dispatch(snackbarAction.setSnackbar(true, "success", data.message));
  } else dispatch(snackbarAction.setSnackbar(true, "error", data.message));
};
export const deleteContact = (_id: string): T => async (dispatch) => {
  const data = await api.deleteContact(_id);
  if (data.resultCode === ResultCodes.Success)
    dispatch(snackbarAction.setSnackbar(true, "success", data.message));
  else dispatch(snackbarAction.setSnackbar(true, "error", data.message));
};
