import authRoutes from "../modules/auth/auth.routes.js";

const setupRoutes = (app) => {

  app.use(
    "/api/auth",
    authRoutes
  );

};

export default setupRoutes;