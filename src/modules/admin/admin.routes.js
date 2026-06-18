import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import allowPermissions from "../../middlewares/permission.middleware.js";
import { PERMISSIONS } from "../../common/constants/permissions.js";
import { getDashboard } from "./admin.controller.js";

const router = express.Router();

router.get(
  "/dashboard",

  protect,

  allowPermissions(PERMISSIONS.DASHBOARD_VIEW),

  getDashboard,
);

export default router;
