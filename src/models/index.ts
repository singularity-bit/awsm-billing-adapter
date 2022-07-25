import mongoose from "mongoose";

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
export interface IUser {
  id: typeof mongoose.Schema.Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  cnp?: string;
  password: string;
  role: Roles;
  permissions: Permissions;
}
