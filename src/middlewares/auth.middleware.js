import AppError from "../common/errors/AppError.js";
import verifyToken from "../common/auth/verifyToken.js";
import User from "../modules/user/user.model.js";

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    req.user = user;

    next();
  } catch (err) {
    next(new AppError("Invalid token", 401));
  }
};

export default protect;