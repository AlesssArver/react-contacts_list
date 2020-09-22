import { Schema, model, Document } from "mongoose";
import { IContact } from "./Contact";

export type IUser = Document & {
  email: string;
  password: string;
  contacts: Array<IContact>;
};

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      private: true,
    },
    contacts: [{ type: Schema.Types.ObjectId, ref: "Contact" }],
  },
  { timestamps: true }
);

export const User = model<IUser>("User", schema);
