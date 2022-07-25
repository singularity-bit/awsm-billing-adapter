import mongoose from "mongoose";
import { Invoice, IUser, Permissions, Roles } from "../models";
const { Schema } = mongoose;

const userChema = new Schema<IUser>({
  id: { type: Schema.Types.ObjectId },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  cnp: { type: String },
  password: { type: String, required: true },
  permissions: { type: String },
  role: { type: String },
});

const invoiceSchema=new Schema<Invoice>({
  id: { type: Schema.Types.ObjectId },
  client:{ type: String, required: true },
  creationDate:{type:String,required:true},
  currentAmount:{type:String,required:true},
  deptAmount:{type:String,required:true},
  dueDate:{type:String,required:true},
  project:{type:String,required:true},
  status:{type:String,required:true},
  totalAmount:{type:String,required:true},
})
export const InvoiceCollection=mongoose.model("invoices",invoiceSchema);
export const User = mongoose.model("users", userChema);
