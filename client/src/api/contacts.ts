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
  phone: string;
};
type IGetContacts = {
  resultCode: number;
  contacts: Array<IContact>;
};
type ICreateContact = {
  resultCode: number;
  message: string;
  _id: string;
};
export default {
  getContacts: () => {
    return instance.get<IGetContacts>(`/`).then((res) => res.data);
  },
  getContact: (id: string) => {
    return instance.get(`contacts/${id}`).then((res) => res.data);
  },
  createContact: (name: string, surname: string, phone: string) => {
    return instance
      .post<ICreateContact>("create", { name, surname, phone })
      .then((res) => res.data);
  },
  updateContact: (id: string, name: string, surname: string, phone: string) => {
    return instance
      .post(`contacts/${id}`, { name, surname, phone })
      .then((res) => res.data);
  },
  deleteContact(id: string) {
    return instance.delete(`contacts/${id}`).then((res) => res.data);
  },
};
