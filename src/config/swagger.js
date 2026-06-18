import swaggerJSDoc from "swagger-jsdoc";
import { components } from "./swagger.components.js";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Express Backend Starter",
      version: "1.0.0",
    },

    components,
  },

  apis: ["./src/modules/**/*.routes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
