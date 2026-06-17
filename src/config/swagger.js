import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express Backend Starter",
      version: "1.0.0",
      description:
        "Professional backend API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: ["./src/modules/**/*.routes.js"],
};

const swaggerSpec =
  swaggerJSDoc(options);

export default swaggerSpec;