import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/user/user.routes.js";

const setupRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRoutes);
};

export default setupRoutes;
