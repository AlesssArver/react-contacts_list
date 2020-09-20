import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export enum ResultCodes {
  Success = 0,
  Error = 1,
}
