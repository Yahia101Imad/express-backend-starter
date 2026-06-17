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
  resetPassword,
  verifyEmail,
} from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "./validators/auth.schema.js";
import protect from "../../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Creates a new account and returns tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@test.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", validate(registerSchema), register);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", validate(loginSchema), login);

router.post("/refresh-token", refreshToken);

router.get("/sessions", protect, getSessions);

router.delete("/sessions/:sessionId", protect, revokeSession);

router.post("/logout", protect, logout);

router.post("/logout-all", protect, logoutAll);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/verify-email", verifyEmail);

export default router;
