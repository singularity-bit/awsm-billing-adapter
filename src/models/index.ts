import mongoose,{Document} from "mongoose";
export enum Roles {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  GUEST = "GUEST",
}
export enum Permissions {
  ANY = "ANY",
  OWN = "OWN",
}

export type InputLogin = {
  input: {
    email: string;
    password: string;
  };
};
export type UserData = {
  input: {
    email: string;
    firstName: string;
    lastName: string;
    cnp?: string;
    password: string;
    role?:Roles;
    permissions?:Permissions
  };
};

export interface TokenData{
    user:IUserPublicData;
}
export interface IUserPublicData{
  email: string;
  firstName: string;
  lastName: string;
  role: Roles;
  permissions: Permissions;
}
export interface IUser extends Document {
  id: typeof mongoose.Schema.Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  cnp?: string;
  password: string;
  role: Roles;
  permissions: Permissions;
}

enum InvoiceStatus{
  PENDING='pending',
  PAID='paid'
}
export interface Invoice{
  id: typeof mongoose.Schema.Types.ObjectId;
  client:string;
  totalAmount:string;
  currentAmount:string;
  deptAmount:string;
  project:string;
  creationDate:string;
  dueDate:string;
  status:InvoiceStatus;
}
export type DashboardCardProps={
  title?: string;
  icon?: 'GroupOutlinedIcon' | 'ReceiptOutlinedIcon' | 'DownloadingOutlinedIcon' | 'PaidOutlinedIcon'
  content?: string | number
}