import bcrypt from "bcryptjs";
import generateToken from "../../common/auth/generateToken.js";

export const loginService = async (
  email,
  password
) => {

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const token = generateToken({
    email,
  });

  return {
    email,
    hashedPassword,
    token,
  };
};