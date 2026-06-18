import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import { getMe } from "./me.controller.js";

const router = express.Router();

router.get("/", protect, getMe);
// TODO:
// PATCH /me
// DELETE /me
// GET /me/sessions
// GET /me/activity

export default router;
