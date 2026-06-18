export const components = {
  schemas: {
    RegisterDto: {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        name: {
          type: "string",
          example: "Yahia",
        },
        email: {
          type: "string",
          example: "yahia@test.com",
        },
        password: {
          type: "string",
          example: "12345678",
        },
      },
    },

    LoginDto: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          example: "yahia@test.com",
        },
        password: {
          type: "string",
          example: "12345678",
        },
      },
    },

    RefreshTokenDto: {
      type: "object",
      required: ["refreshToken"],
      properties: {
        refreshToken: {
          type: "string",
        },
      },
    },
  },
};
