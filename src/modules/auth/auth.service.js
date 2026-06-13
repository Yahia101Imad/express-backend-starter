import bcrypt from "bcryptjs";
import generateToken from "../../common/auth/generateToken.js";
import User from "../user/user.model.js";
import AppError from "../../common/errors/AppError.js";

export const registerService = async (name, email, password) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export const loginService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateToken({
    id: user._id,
    email: user.email,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

// export const loginService = async (
//   email,
//   password
// ) => {

//   const hashedPassword =
//     await bcrypt.hash(password, 10);

//   const token = generateToken({
//     email,
//   });

//   return {
//     email,
//     hashedPassword,
//     token,
//   };
// };
