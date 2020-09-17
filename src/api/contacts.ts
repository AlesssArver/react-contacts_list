import { instance } from "./index";

export type IContact = {
  id: string;
  name: string;
  surname: string;
  tel: string;
};
export default {
  getContacts: (userId: string) => {
    return instance
      .get<Array<IContact>>(`contacts?userId=${userId}`)
      .then((res) => res.data);
  },
  getContact: (id: string) => {
    return instance.get(`contacts?id=${id}`).then((res) => res.data);
  },
  createContact: (
    userId: string,
    name: string,
    surname: string,
    tel: string
  ) => {
    return instance
      .post("contacts", { userId, name, surname, tel })
      .then((res) => res.data);
  },
  updateContact: (id: string, name: string, surname: string, tel: string) => {
    return instance
      .post(`contacts/${id}`, { name, surname, tel })
      .then((res) => res.data);
  },
  deleteContact(id: string) {
    return instance.delete(`contacts/${id}`).then((res) => res.data);
  },
};
