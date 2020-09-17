import { InferActionsTypes, ThunkType } from "../index";
import api, { IContact } from "../../api/contacts";
import action from "../actions/contacts";

const initialState = {
  contacts: [] as Array<IContact>,
};
type IInitialState = typeof initialState;
type IActions = InferActionsTypes<typeof action>;
type T = ThunkType<IActions>;

export default (state = initialState, action: IActions): IInitialState => {
  switch (action.type) {
    case "CONTACT/GET_CONTACTS":
      return { ...state, contacts: action.contacts };
    case "CONTACT/CREATE_CONTACT":
      return {
        ...state,
        contacts: [
          ...state.contacts,
          {
            id: action.id,
            name: action.name,
            surname: action.surname,
            tel: action.tel,
          },
        ],
      };
    case "CONTACT/UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((c) => {
          if (c.id === action.id)
            return {
              ...c,
              name: action.name,
              surname: action.surname,
              tel: action.tel,
            };
          return c;
        }),
      };
    case "CONTACT/DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== action.id),
      };
    default:
      return state;
  }
};

export const getContacts = (userId: string) => async (dispatch: any) => {
  const data = await api.getContacts(userId);
  dispatch(action.getContacts(data));
};
export const createContact = (
  userId: string,
  name: string,
  surname: string,
  tel: string
) => async (dispatch: any) => {
  const data = await api.createContact(userId, name, surname, tel);
  dispatch(action.createContact(userId, data.id, name, surname, tel));
};
export const updateContact = (
  id: string,
  name: string,
  surname: string,
  tel: string
) => async (dispatch: any) => {
  const data = await api.updateContact(id, name, surname, tel);
};
export const deleteContact = (id: string) => async (dispatch: any) => {
  const data = await api.deleteContact(id);
  dispatch(action.deleteContact(id));
};
