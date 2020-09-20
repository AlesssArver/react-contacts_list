import { IContact } from "../../api/contacts";

export default {
  getContacts: (contacts: Array<IContact>) =>
    ({
      type: "CONTACT/GET_CONTACTS",
      contacts,
    } as const),
  createContact: (_id: string, name: string, surname: string, tel: string) =>
    ({
      type: "CONTACT/CREATE_CONTACT",
      _id,
      name,
      surname,
      tel,
    } as const),
  updateContact: (_id: string, name: string, surname: string, tel: string) =>
    ({ type: "CONTACT/UPDATE_CONTACT", _id, name, surname, tel } as const),
  deleteContact: (_id: string) =>
    ({ type: "CONTACT/DELETE_CONTACT", _id } as const),
};
