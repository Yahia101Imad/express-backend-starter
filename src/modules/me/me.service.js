import User from "../user/user.model.js";

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