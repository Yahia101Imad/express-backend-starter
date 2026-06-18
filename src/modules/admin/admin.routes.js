import express from "express";
import { getDashboard, getUsers, deleteUser } from "./admin.controller.js";
import protect from "../../middlewares/auth.middleware.js";
import allowPermissions from "../../middlewares/permission.middleware.js";
import { PERMISSIONS } from "../../common/constants/permissions.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  allowPermissions(PERMISSIONS.DASHBOARD_VIEW),
  getDashboard,
);

router.get(
  "/users",
  protect,
  allowPermissions(PERMISSIONS.USER_READ),
  getUsers,
);

router.delete(
  "/users/:id",
  protect,
  allowPermissions(PERMISSIONS.USER_DELETE),
  deleteUser,
);

export default router;
