import bcrypt from "bcryptjs";
import User from "../user/user.model.js";
import AppError from "../../common/errors/AppError.js";
import generateAccessToken from "../../common/auth/generateAccessToken.js";
import generateRefreshToken from "../../common/auth/generateRefreshToken.js";
import Session from "./session.model.js";
import PasswordResetToken from "./password-reset-token.model.js";
import generateRandomToken from "../../common/utils/generateRandomToken.js";

export const registerService = async (
  name,
  email,
  password,
  deviceInfo,
  ipAddress,
) => {
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

  const accessToken = generateAccessToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user._id,
  });

  await Session.create({
    user: user._id,
    refreshToken,
    deviceInfo,
    ipAddress,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

export const loginService = async (email, password, deviceInfo, ipAddress) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const accessToken = generateAccessToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user._id,
  });

  await Session.create({
    user: user._id,
    refreshToken,
    deviceInfo,
    ipAddress,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

export const forgotPasswordService = async (email) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const resetToken = generateRandomToken();

  await PasswordResetToken.deleteMany({
    user: user._id,
  });

  await PasswordResetToken.create({
    user: user._id,
    token: resetToken,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  });

  return {
    resetToken,
  };
};
