import User from "./user.model.js";
import getPagination from "../../utils/pagination.js";

export const getUsersService = async (query) => {
  const { page, limit, skip } = getPagination(query);

  const users = await User.find({
    isDeleted: false,
  })
    .skip(skip)
    .limit(limit)
    .select("-password");

  const total = await User.countDocuments({
    isDeleted: false,
  });

  return {
    users,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateMeService = async (userId, updateData) => {
  const allowedFields = ["name", "email"];

  const filteredData = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  const user = await User.findByIdAndUpdate(userId, filteredData, {
    new: true,
    runValidators: true,
  }).select("-password");

  return user;
};

export const deleteMeService = async (userId) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      isDeleted: true,
      deletedAt: new Date(),
    },
    {
      new: true,
    },
  );
};

export const getUserByIdService = async (id) => {
  const user = await User.findOne({
    _id: id,
    isDeleted: false,
  }).select("-password");

  return user;
};

export const updateUserService = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  return user;
};

export const deleteUserService = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      isDeleted: true,
      deletedAt: new Date(),
    },
    {
      new: true,
    },
  );

  return user;
};
