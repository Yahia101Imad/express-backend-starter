import express from "express";
import { getDashboard } from "./admin.controller.js";
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

// TODO:
// GET /admin/stats
// GET /admin/logs

export default router;
