import User from "../user/user.model.js";

export const getDashboard = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin dashboard",
  });
};

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User deleted",
  });
};
