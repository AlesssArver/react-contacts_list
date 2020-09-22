import axios from "axios";

export enum ResultCodes {
  Success = 0,
  Error = 1,
}

export interface IApi<D = {}, RC = ResultCodes> {
  data: D;
  resultCode: RC;
  message?: string;
}
