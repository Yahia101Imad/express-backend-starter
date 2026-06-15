import express from "express";
import { login, register } from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "./validators/auth.schema.js";
import { refreshToken } from "./auth.controller.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/refresh-token", refreshToken);

export default router;
