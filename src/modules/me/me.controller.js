import asyncHandler from "../../utils/asyncHandler.js";
import User from "../user/user.model.js";
import { updateMeService, deleteMeService } from "./me.service.js";

export const getMe = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user.id).select("name email role createdAt");
  User.findOne({
    _id: userId,
    isDeleted: false,
  }).select("name email role createdAt");

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

export const deleteMe = asyncHandler(async (req, res) => {
  await deleteMeService(req.user.id);

  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
});
