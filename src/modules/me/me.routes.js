import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import { getMe, updateMe, deleteMe } from "./me.controller.js";

const router = express.Router();

router.get("/", protect, getMe);
router.patch("/", protect, updateMe);
router.delete("/", protect, deleteMe);

// TODO:
// GET /me/sessions
// GET /me/activity

export default router;
