import Joi from "joi";

export const schemas = {
  authRegister: Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().max(25).required(),
    lastName: Joi.string().max(25).required(),
    password: Joi.string().max(64).required(),
    confirmPassword: Joi.ref("password"),
  }),
  authLogin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const routerHelper = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        req.flash("error_message", result.error.message);
        return res.redirect("back");
      } else {
        next();
      }
    };
  },
};
