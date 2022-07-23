import { pages, settings, users } from "../data/data";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { AuthenticationError } from "apollo-server-express";
import { generateToken } from "../helpers/jwt";

export const resolvers = {
  Query: {
    navigation(parent: any, args: any, context: { user: any }, info: any) {
      console.log("context", context?.user?.data?.email);
      const user = users.find(
        (user) => user.email === context?.user?.data?.email
      );
      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }
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
    login(_parent: any, { email, password }: any) {
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      } else {
        const { id, email, permissions, role } = user;
        return {
          token: generateToken({ id, email, permissions, role }),
          user: { id, email, permissions, role },
        };
      }
    },
  },
};
