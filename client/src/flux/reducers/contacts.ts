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

export const getContacts = () => async (dispatch: any) => {
  const data = await api.getContacts();
  dispatch(action.getContacts(data.contacts));
};
export const createContact = (
  name: string,
  surname: string,
  phone: string
) => async (dispatch: any) => {
  const data = await api.createContact(name, surname, phone);
  dispatch(action.createContact(data._id, name, surname, phone));
};
export const updateContact = (
  id: string,
  name: string,
  surname: string,
  phone: string
) => async (dispatch: any) => {
  const data = await api.updateContact(id, name, surname, phone);
};
export const deleteContact = (id: string) => async (dispatch: any) => {
  const data = await api.deleteContact(id);
  dispatch(action.deleteContact(id));
};
