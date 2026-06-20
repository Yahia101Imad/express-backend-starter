import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import { getMe, updateMe } from "./me.controller.js";

const router = express.Router();

router.get("/", protect, getMe);
// TODO:
router.patch("/", protect, updateMe);
// DELETE /me
// GET /me/sessions
// GET /me/activity

export default router;
