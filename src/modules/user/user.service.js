import User from "./user.model.js";

export const getUsersService =
  async () => {

    const users =
      await User.find({
        isDeleted: false,
      }).select("-password");

    return users;
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
