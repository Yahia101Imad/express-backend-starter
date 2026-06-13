import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

const generateToken = (payload) => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: "7d",
  });
};

export default generateToken;