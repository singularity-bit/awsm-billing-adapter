import { allow } from "graphql-shield";
import { Permissions, Roles } from "../models/index";
const { rule, shield, or, and, not } = require("graphql-shield");

function checkPermission(
  user: { [x: string]: { permissions: string | any[] } },
  permission: Permissions
) {
  if (user && user.data) {
    return user.data.permissions.includes(permission);
  }
  return false;
}

const isAuthenticated = rule({ cache: "contextual" })(
  (parent: any, args: any, { user }: any) => {
    return user !== null;
  }
);
const isAdmin = rule({ cache: "contextual" })(
  async (
    parent: any,
    args: any,
    ctx: { user: { role: string } },
    info: any
  ) => {
    return ctx.user.role === Roles.ADMIN;
  }
);

const isClient = rule({ cache: "contextual" })(
  async (
    parent: any,
    args: any,
    ctx: { user: { role: string } },
    info: any
  ) => {
    return ctx.user.role === Roles.CLIENT;
  }
);

const canReadAnyInvoice = rule({ cache: "contextual" })(
  async (_parent: any, _args: any, { user }: any) => {
    return checkPermission(user, Permissions.ANY);
  }
);

const canReadOwnInvoice = rule({ cache: "contextual" })(
  async (parent: any, args: any, { user }: any) => {
    return checkPermission(user, Permissions.OWN);
  }
);

const isReadingOwnInvoice = rule({ cache: "contextual" })(
  async (parent: any, { id }: any, { user }: any) => {
    return user && user.sub === id;
  }
);

export default shield(
  {
    Query: {
      user: or(and(canReadOwnInvoice, isReadingOwnInvoice), canReadAnyInvoice),
      navigation: isAuthenticated,
      currentUser:isAuthenticated
    },
    Mutation: {
      login: allow,
      register: allow,
    },
  },
  {
    allowExternalErrors: allow,
  }
);
