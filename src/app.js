import express from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware.js";
import setupRoutes from "./routes/index.js";
import logger from "./config/logger.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import helmet from "helmet";
import { globalLimiter } from "./middlewares/rateLimit.middleware.js";

const app = express();

app.use(helmet());
app.use(globalLimiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Express Backend Starter Running",
  });
});

setupRoutes(app);

app.use(errorMiddleware);

export default app;
