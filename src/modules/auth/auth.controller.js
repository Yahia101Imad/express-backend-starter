import asyncHandler from "../../utils/asyncHandler.js";
import { loginService } from "./auth.service.js";

export const login = asyncHandler(
  async (req, res) => {

    const { email, password } = req.body;

    const result =
      await loginService(
        email,
        password
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);