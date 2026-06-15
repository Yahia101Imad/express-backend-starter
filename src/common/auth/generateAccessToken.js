import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

const generateAccessToken = (payload) => {
  return jwt.sign(
    payload,
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN,
    }
  );
};

export default generateAccessToken;