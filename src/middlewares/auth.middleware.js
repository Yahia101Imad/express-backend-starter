import AppError from "../common/errors/AppError.js";
import verifyToken from "../common/auth/verifyToken.js";

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return next(
      new AppError(
        "Unauthorized",
        401
      )
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch {
    next(
      new AppError(
        "Invalid token",
        401
      )
    );
  }
};

export default protect;