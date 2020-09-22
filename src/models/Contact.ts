import { Schema, model, Document } from "mongoose";

export type IContact = Document & {
  owner: string;
  surname: string;
  phone: string;
};

const schema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Contact = model<IContact>("Contact", schema);
