import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import allowRoles from "../../middlewares/role.middleware.js";

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Your profile",
    user: req.user,
  });
});

// for "admin" only
router.get(
  "/admin",
  protect,
  allowRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome admin",
    });
  }
);

export default router;