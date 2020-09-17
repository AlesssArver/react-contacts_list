import { IContact } from "../../api/contacts";

export default {
  getContacts: (contacts: Array<IContact>) =>
    ({
      type: "CONTACT/GET_CONTACTS",
      contacts,
    } as const),
  createContact: (
    userId: string,
    id: string,
    name: string,
    surname: string,
    tel: string
  ) =>
    ({
      type: "CONTACT/CREATE_CONTACT",
      userId,
      id,
      name,
      surname,
      tel,
    } as const),
  updateContact: (id: string, name: string, surname: string, tel: string) =>
    ({ type: "CONTACT/UPDATE_CONTACT", id, name, surname, tel } as const),
  deleteContact: (id: string) =>
    ({ type: "CONTACT/DELETE_CONTACT", id } as const),
};
