import express from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware.js";
import setupRoutes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Express Backend Starter Running",
  });
});

app.use(errorMiddleware);

setupRoutes(app);

export default app;