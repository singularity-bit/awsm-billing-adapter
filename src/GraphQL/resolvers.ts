import { pages, settings, users } from "../database/data";
import bcrypt from "bcrypt";
import { AuthenticationError, UserInputError ,ForbiddenError} from "apollo-server-express";
import { generateToken } from "../helpers/jwt";
import { InputLogin, Permissions, Roles, TokenData, UserData } from "../models";
import { User } from "../database/schema";
import mongoose, { Error } from "mongoose";
import { authUser, createUser, findUser } from "./utilis";

export const resolvers = {
  Query: {
    navigation(parent: any, args: any, context: { user: any }, info: any) {
      return pages;
    },
    profileSettings(parent: any, args: any, context: { user: any }, info: any) {
      return settings;
    },
    async currentUser(parent: any, args: any, context: { user: any }, info: any){
      const user=context.user.user
      if(!user){
        throw new ForbiddenError('User token expired, please contact admin')
      }
      return {user}
    },
    user(parent: any, args: { id: any }, context: any, info: any) {
      const { id } = args;
      const userId = context.user;
      const user = users.find(({ id }) => id == userId);
      const userRole = user?.role;

      if (userRole !== "ADMIN" && userRole !== "CLIENT") {
        return {
          error: "You have no permission to perform this action",
        };
      }

      return users.find(({ id: userId }) => userId == id);
    },

    users(parent: any, args: any, context: { user: any }, info: any) {
      const userId = context.user;
      const user = users.find(({ id }) => id == userId);
      const userRole = user?.role;

      if (userRole !== "ADMIN" && userRole !== "CLIENT") {
        return {
          error: "You have no permission to perform this action",
        };
      }
      return users;
    },
  },
  Mutation: {
    async login(_parent: any, { input: { email, password } }: InputLogin) {
      const user = await authUser({ input: { email, password } });
      return user;
    },
    async register(
      _parent: any,
      { input: { email, password, firstName, lastName, cnp,permissions=Permissions.OWN,role=Roles.CLIENT } }: UserData
    ) {
      const user = await createUser({
        input: { email, password, firstName, lastName, cnp,permissions,role },
      });

      return user;
    },
  },
};
