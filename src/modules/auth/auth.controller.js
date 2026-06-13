import asyncHandler from "../../utils/asyncHandler.js";
import {
  loginService,
  registerService,
} from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const result = await registerService(
    name,
    email,
    password
  );

  res.status(201).json({
    success: true,
    data: result,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginService(email, password);

  res.status(200).json({
    success: true,
    data: result,
  });
});
