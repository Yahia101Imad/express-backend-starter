import asyncHandler from "../../utils/asyncHandler.js";
import User from "../user/user.model.js";
import {
  getUsersService,
  updateMeService,
  deleteMeService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "./user.service.js";

export const getDashboard = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin dashboard",
  });
};

export const getUsers = asyncHandler(async (req, res) => {
  const result = await getUsersService(req.query);

  res.status(200).json({
    success: true,

    page: result.page,

    limit: result.limit,

    total: result.total,

    totalPages: result.totalPages,

    data: result.users,
  });
});

export const getMe = asyncHandler(async (req, res) => {
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

export const getUserById = asyncHandler(async (req, res) => {
  const user = await getUserByIdService(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// TODO: admin can update everything "req.body" even "role" so:
// don't allow to edit role field
export const updateUser = asyncHandler(async (req, res) => {
  const user = await updateUserService(req.params.id, req.body);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await deleteUserService(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
