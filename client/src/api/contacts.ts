import axios from "axios";
import { IApi } from "./index";

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
interface IGetContacts extends IApi {
  contacts: Array<IContact>;
}
interface IGetContact extends IApi {
  contact: IContact;
}
interface ICreateContact extends IApi {
  _id: string;
}

export default {
  getContacts: () => {
    return instance.get<IGetContacts>(`/`).then((res) => res.data);
  },
  getContact: (_id: string) => {
    return instance.get<IGetContact>(`${_id}`).then((res) => res.data);
  },
  createContact: (name: string, surname: string, phone: string) => {
    return instance
      .post<ICreateContact>("create", { name, surname, phone })
      .then((res) => res.data);
  },
  updateContact: (
    _id: string,
    name: string,
    surname: string,
    phone: string
  ) => {
    return instance
      .put<IApi>(`${_id}`, { name, surname, phone })
      .then((res) => res.data);
  },
  deleteContact(_id: string) {
    return instance.delete<IApi>(`${_id}`).then((res) => res.data);
  },
};
