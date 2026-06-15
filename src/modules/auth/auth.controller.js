import asyncHandler from "../../utils/asyncHandler.js";
import { loginService, registerService } from "./auth.service.js";
import sendResponse from "../../common/utils/sendResponse.js";
import generateAccessToken from "../../common/auth/generateAccessToken.js";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const result = await registerService(name, email, password);

  sendResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginService(email, password);

  sendResponse(res, {
    statusCode: 200,
    message: "Login successful",
    data: result,
  });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Refresh token required",
    });
  }

  const decoded = jwt.verify(
    refreshToken,
    env.JWT_REFRESH_SECRET
  );

  const newAccessToken = generateAccessToken({
    id: decoded.id,
  });

  res.status(200).json({
    success: true,
    accessToken: newAccessToken,
  });
});