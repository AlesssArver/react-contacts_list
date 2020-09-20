import { IContact } from "../../api/contacts";

export default {
  getContacts: (contacts: Array<IContact>) =>
    ({
      type: "CONTACT/GET_CONTACTS",
      contacts,
    } as const),
  createContact: (_id: string, name: string, surname: string, phone: string) =>
    ({
      type: "CONTACT/CREATE_CONTACT",
      _id,
      name,
      surname,
      phone,
    } as const),
  updateContact: (_id: string, name: string, surname: string, phone: string) =>
    ({ type: "CONTACT/UPDATE_CONTACT", _id, name, surname, phone } as const),
  deleteContact: (_id: string) =>
    ({ type: "CONTACT/DELETE_CONTACT", _id } as const),
};
