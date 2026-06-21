import express from "express";
import { getDashboard } from "./user.controller.js";
import protect from "../../middlewares/auth.middleware.js";
import allowPermissions from "../../middlewares/permission.middleware.js";
import { PERMISSIONS } from "../../common/constants/permissions.js";
import { getMe, updateMe, deleteMe } from "./user.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  allowPermissions(PERMISSIONS.DASHBOARD_VIEW),
  getDashboard,
);

router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);
router.delete("/me", protect, deleteMe);

// TODO:
// GET /users
// GET /users/:id
// PATCH /users/:id
// DELETE /users/:id

export default router;
