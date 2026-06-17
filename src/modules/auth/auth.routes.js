import express from "express";
import {
  login,
  register,
  refreshToken,
  logout,
  getSessions,
  revokeSession,
  logoutAll,
  forgotPassword,
} from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "./validators/auth.schema.js";
import protect from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/refresh-token", refreshToken);

router.get("/sessions", protect, getSessions);

router.delete("/sessions/:sessionId", protect, revokeSession);

router.post("/logout", protect, logout);

router.post("/logout-all", protect, logoutAll);

router.post("/forgot-password", forgotPassword);

export default router;
