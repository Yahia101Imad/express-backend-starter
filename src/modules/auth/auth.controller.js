import asyncHandler from "../../utils/asyncHandler.js";
import {
  loginService,
  registerService,
  forgotPasswordService,
} from "./auth.service.js";
import sendResponse from "../../common/utils/sendResponse.js";
import generateAccessToken from "../../common/auth/generateAccessToken.js";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import Session from "./session.model.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const deviceInfo = req.headers["user-agent"];
  const ipAddress = req.ip;

  const result = await registerService(
    name,
    email,
    password,
    deviceInfo,
    ipAddress,
  );

  sendResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const deviceInfo = req.headers["user-agent"];
  const ipAddress = req.ip;

  const result = await loginService(email, password, deviceInfo, ipAddress);

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

  const session = await Session.findOne({
    refreshToken,
  });

  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Invalid session",
    });
  }

  const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);

  const newAccessToken = generateAccessToken({
    id: decoded.id,
  });

  res.status(200).json({
    success: true,
    accessToken: newAccessToken,
  });
});

export const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({
    user: req.user.id,
  }).select("-refreshToken");

  sendResponse(res, {
    data: sessions,
    message: "Sessions fetched",
  });
});

export const revokeSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  await Session.deleteOne({
    _id: sessionId,
    user: req.user.id,
  });

  sendResponse(res, {
    message: "Session revoked",
  });
});

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  await Session.deleteOne({
    refreshToken,
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

// NOTE:
// logoutAll is protected by Access Token.
// Expired Access Tokens should be refreshed on the frontend via /refresh-token,
// then the original request should be retried automatically.
// This keeps logoutAll authenticated while maintaining a smooth UX.
export const logoutAll = asyncHandler(async (req, res) => {
  await Session.deleteMany({
    user: req.user.id,
  });

  sendResponse(res, {
    message: "Logged out from all devices",
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const result = await forgotPasswordService(email);

  sendResponse(res, {
    message: "Password reset token generated",
    data: result,
  });
});
