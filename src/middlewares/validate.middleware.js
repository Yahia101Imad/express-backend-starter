import AppError from "../common/errors/AppError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const result =
      schema.safeParse(req.body);

    if (!result.success) {
      const firstError =
        result.error.issues[0];

      return next(
        new AppError(
          firstError.message,
          400
        )
      );
    }

    req.body = result.data;

    next();
  };
};

export default validate;