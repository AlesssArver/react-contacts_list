import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/api/contacts/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export type IContact = {
  _id: string;
  name: string;
  surname: string;
  tel: string;
};
export default {
  getContacts: () => {
    return instance.get<Array<IContact>>(`/`).then((res) => res.data);
  },
  getContact: (id: string) => {
    return instance.get(`contacts?id=${id}`).then((res) => res.data);
  },
  createContact: (name: string, surname: string, tel: string) => {
    return instance
      .post("create", { name, surname, tel })
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
