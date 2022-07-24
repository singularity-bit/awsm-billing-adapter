import { AuthenticationError, UserInputError } from "apollo-server-express";
import { User } from "../database/schema";
import { generateToken } from "../helpers/jwt";
import { InputLogin, UserData } from "../models";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
export const createUser = async ({
  input: { email, password, firstName, lastName, cnp },
}: UserData): Promise<UserInputError | { token: string }> => {
  let user = await User.exists({ email });

  if (user) {
    throw new UserInputError("User already exist");
  }
  let salt = await bcrypt.genSalt(SALT_ROUNDS);
  let hashPw = await bcrypt.hash(password, salt);

  let newUser = await User.create({
    email,
    password: hashPw,
    firstName,
    lastName,
    cnp,
  });

  if (newUser) {
    return {
      token: generateToken(newUser.id),
    };
  }
  throw new Error("Failed to insert in db");
};

export const authUser = async ({ input: { email, password } }: InputLogin) => {
  const user = await User.findOne({ email });
  const validPw = await bcrypt.compare(password, user?.password || "");
  if (!user || !validPw) {
    throw new AuthenticationError("Invalid credentials");
  }
  return {
    token: generateToken(user.id),
  };
};
