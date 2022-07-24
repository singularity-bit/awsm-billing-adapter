import { pages, settings, users } from "../database/data";
import bcrypt from "bcrypt";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import { generateToken } from "../helpers/jwt";
import { InputLogin, UserData } from "../models";
import { User } from "../database/schema";
import mongoose, { Error } from "mongoose";
import { authUser, createUser } from "./utilis";

export const resolvers = {
  Query: {
    navigation(parent: any, args: any, context: { user: any }, info: any) {
      return pages;
    },
    profileSettings(parent: any, args: any, context: { user: any }, info: any) {
      return settings;
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
      { input: { email, password, firstName, lastName, cnp } }: UserData
    ) {
      const user = await createUser({
        input: { email, password, firstName, lastName, cnp },
      });

      return user;
    },
  },
};
