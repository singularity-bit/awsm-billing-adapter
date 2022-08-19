import { AuthenticationError, UserInputError } from "apollo-server-express";
import { User } from "../database/schema";
import { generateToken } from "../helpers/jwt";
import { InputLogin, IUser, UserData } from "../models";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
export const createUser = async ({
  input: { email, password, firstName, lastName, cnp,permissions,role },
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
    permissions,
    role
  });

  if (newUser) {
    return {
      token: generateToken({
        user:{
          email:newUser.email,
          permissions:newUser.permissions,
          role:newUser.role,
          firstName:newUser.firstName,
          lastName:newUser.lastName
        }}),
    };
  }
  throw new Error("Failed to insert in db");
};

export const authUser = async ({ input: { email, password } }: InputLogin) => {

  const user = await User.findOne({ email });
  const validPw = await bcrypt.compare(password, user?.password!);
  console.log('validPw',validPw)
  if (!user || !validPw) {
    throw new AuthenticationError("Invalid credentials");
  }
  return {
    token: generateToken({
      user:{
        email:user.email,
        permissions:user.permissions,
        role:user.role,
        firstName:user.firstName,
        lastName:user.lastName
      }
    }),
  };
};



export const findUser=async ({email}: Pick<IUser,'email'>)=>{
 const user:IUser | null=await User.findOne({email})

 if(!user){
  throw new AuthenticationError("user does not exist")
 }
 return {user}
}