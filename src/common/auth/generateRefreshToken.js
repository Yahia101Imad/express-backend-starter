import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

const generateRefreshToken = (payload) => {
  return jwt.sign(
    payload,
    env.JWT_REFRESH_SECRET,
    {
      expiresIn:
        env.JWT_REFRESH_EXPIRES_IN,
    }
  );
};

export default generateRefreshToken;