import rateLimit from "express-rate-limit";
import { SECURITY } from "../config/security.js";

export const globalLimiter = rateLimit({
  windowMs: SECURITY.GLOBAL_RATE_LIMIT.WINDOW_MS,

  max: SECURITY.GLOBAL_RATE_LIMIT.MAX_REQUESTS,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

export const authLimiter = rateLimit({
  windowMs: SECURITY.AUTH_RATE_LIMIT.WINDOW_MS,

  max: SECURITY.AUTH_RATE_LIMIT.MAX_REQUESTS,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
});
