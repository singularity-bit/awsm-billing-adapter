import jwt from "jsonwebtoken";
import { TokenData } from "../models";

export const verifyToken = (token: any) => {
  return jwt.verify(
    token,
    process.env.PRIVATE_KEY!,
    (err: any, veriedToken: any) => {
      if (err) {
        return err;
      } else {
        return veriedToken;
      }
    }
  );
};

export const generateToken = ({user}: TokenData) => {
  return jwt.sign({ user }, process.env.PRIVATE_KEY!, {
    algorithm: "HS256",
  });
};

export const extractToken = (req: any) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};
