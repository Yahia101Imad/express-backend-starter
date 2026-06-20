import asyncHandler from "../../utils/asyncHandler.js";
import User from "../user/user.model.js";
import { updateMeService } from "./me.service.js";

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "name email role createdAt",
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const updateMe = asyncHandler(async (req, res) => {
  const user = await updateMeService(req.user.id, req.body);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: user,
  });
});
