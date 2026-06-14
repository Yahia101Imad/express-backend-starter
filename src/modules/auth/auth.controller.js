import asyncHandler from "../../utils/asyncHandler.js";
import { loginService, registerService } from "./auth.service.js";

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
