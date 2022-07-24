import mongoose from "mongoose";
import { IUser, Permissions, Roles } from "../models";
const { Schema } = mongoose;

const userChema = new Schema<IUser>({
  id: { type: Schema.Types.ObjectId },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  cnp: { type: String },
  password: { type: String, required: true },
  permissions: { type: [String] },
  role: { type: String },
});

export const User = mongoose.model("users", userChema);
